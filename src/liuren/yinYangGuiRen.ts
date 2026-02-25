import { DateInfo } from "../common/date";
import { ShiErGong, TianDiPan, YinYangGuiRen } from "./type";
import { ShenJiangArray, ShunNi, YangGui, YinGui } from "../maps/shenJiang";
import { DiZhiArray } from "../maps/ganZhi";

/**
 * 根据贵人地支在天盘上排布十二天将
 */
const arrangeTianJiang = (tianPan: ShiErGong, guiZhi: string): ShiErGong => {
    const tianJiang: ShiErGong = {
        0: "", 1: "", 2: "", 3: "", 4: "", 5: "",
        6: "", 7: "", 8: "", 9: "", 10: "", 11: "",
    };

    // 找贵人在天盘的位置
    let guiIndex = 0;
    for (let i = 0; i < 12; i++) {
        if (guiZhi === tianPan[i as keyof ShiErGong]) {
            guiIndex = i;
            break;
        }
    }

    // 根据贵人落宫的地盘地支判断顺逆
    const shunNi = ShunNi[DiZhiArray[guiIndex] as keyof typeof ShunNi];

    for (let i = 0; i < 12; i++) {
        let index = guiIndex;
        if (shunNi === "顺") {
            index = index + i;
        } else {
            index = index - i;
        }
        if (index > 11) index -= 12;
        if (index < 0) index += 12;
        tianJiang[index as keyof ShiErGong] = ShenJiangArray[i];
    }

    return tianJiang;
};

/**
 * 同时起出阳贵人和阴贵人的天将盘
 */
export const getYinYangGuiRen = (date: DateInfo, tianDiPan: TianDiPan): YinYangGuiRen => {
    const riGan = date.bazi.split(" ")[2].substring(0, 1);
    const tianPan = tianDiPan.天盘;

    const yangGuiZhi = YangGui[riGan as keyof typeof YangGui];
    const yinGuiZhi = YinGui[riGan as keyof typeof YinGui];

    return {
        阳贵人: arrangeTianJiang(tianPan, yangGuiZhi),
        阴贵人: arrangeTianJiang(tianPan, yinGuiZhi),
    };
};
