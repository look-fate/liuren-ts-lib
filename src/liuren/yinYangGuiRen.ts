import { DateInfo } from "../common/date";
import { ShiErGong, TianDiPan, YinYangGuiRen } from "./type";
import { ShenJiangArray, ShunNi, YangGui, YinGui } from "../maps/shenJiang";
import { DiZhiArray, DiZhiPinyin } from "../maps/ganZhi";

// 创建空的十二宫对象
const createEmptyShiErGong = (): ShiErGong => ({
    zi: "", chou: "", yin: "", mao: "",
    chen: "", si: "", wu: "", wei: "",
    shen: "", you: "", xu: "", hai: ""
});

/**
 * 根据贵人地支在天盘上排布十二天将
 */
const arrangeTianJiang = (tianPan: ShiErGong, guiZhi: string): ShiErGong => {
    const tianJiang = createEmptyShiErGong();

    // 找贵人在天盘的位置
    let guiIndex = 0;
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        if (guiZhi === tianPan[key]) {
            guiIndex = i;
            break;
        }
    }

    // 根据贵人落宫的地盘地支判断顺逆
    const shunNi = ShunNi[DiZhiArray[guiIndex] as keyof typeof ShunNi];

    for (let i = 0; i < 12; i++) {
        let index = shunNi === "顺" ? guiIndex + i : guiIndex - i;
        index = ((index % 12) + 12) % 12; // 处理负数
        const key = DiZhiPinyin[index];
        tianJiang[key] = ShenJiangArray[i];
    }

    return tianJiang;
};

/**
 * 同时起出阳贵人和阴贵人的天将盘
 */
export const getYinYangGuiRen = (date: DateInfo, tianDiPan: TianDiPan): YinYangGuiRen => {
    const riGan = date.bazi.split(" ")[2].substring(0, 1);

    const yangGuiZhi = YangGui[riGan as keyof typeof YangGui];
    const yinGuiZhi = YinGui[riGan as keyof typeof YinGui];

    return {
        yangGuiRen: arrangeTianJiang(tianDiPan.tianPan, yangGuiZhi),
        yinGuiRen: arrangeTianJiang(tianDiPan.tianPan, yinGuiZhi),
    };
};
