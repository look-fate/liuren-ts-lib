import { DiZhiArray, DiZhiPinyin, DiZhiToPinyin, DiZhiKey } from "../maps/ganZhi";
import { DateInfo } from "../common/date";
import { ShiErGong, TianDiPan } from "./type";
import { ShenJiangArray, ShunNi, YangGui, YinGui, YinYang } from "../maps/shenJiang";

// 创建空的十二宫对象
const createEmptyShiErGong = (): ShiErGong => ({
    zi: "", chou: "", yin: "", mao: "",
    chen: "", si: "", wu: "", wei: "",
    shen: "", you: "", xu: "", hai: ""
});

// 创建地盘（固定）
const createDiPan = (): ShiErGong => ({
    zi: "子", chou: "丑", yin: "寅", mao: "卯",
    chen: "辰", si: "巳", wu: "午", wei: "未",
    shen: "申", you: "酉", xu: "戌", hai: "亥"
});

/**
 * 月将加在占时的时辰之上，然后将十二地支按顺时针依次排列在各地盘地支之上
 */
export const getTianDiPan = (date: DateInfo): TianDiPan => {
    const result: TianDiPan = {
        diPan: createDiPan(),
        tianPan: createEmptyShiErGong(),
        tianJiang: createEmptyShiErGong()
    };

    // 排布天盘
    const yueJiang = date.yuejiang;
    const shiChen = date.bazi.split(" ")[3].substring(1, 2);
    const shiChenIndex = DiZhiArray.indexOf(shiChen);
    const yueJiangIndex = DiZhiArray.indexOf(yueJiang);

    for (let i = 0; i < 12; i++) {
        let indexChenTemp = (shiChenIndex + i) % 12;
        let indexYueJiangTemp = (yueJiangIndex + i) % 12;
        const key = DiZhiPinyin[indexChenTemp];
        result.tianPan[key] = DiZhiArray[indexYueJiangTemp];
    }

    // 选取阴阳贵人
    const yinYang = YinYang[shiChen as keyof typeof YinYang];
    const riGan = date.bazi.split(" ")[2].substring(0, 1);
    const guiZhi = yinYang === "阳"
        ? YangGui[riGan as keyof typeof YangGui]
        : YinGui[riGan as keyof typeof YinGui];

    // 找到贵人在天盘的位置
    let guiIndex = 0;
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        if (guiZhi === result.tianPan[key]) {
            guiIndex = i;
            break;
        }
    }

    // 贵人位置顺逆排布天将
    const shunNi = ShunNi[DiZhiArray[guiIndex] as keyof typeof ShunNi];
    for (let i = 0; i < 12; i++) {
        let index = shunNi === "顺" ? guiIndex + i : guiIndex - i;
        index = ((index % 12) + 12) % 12; // 处理负数
        const key = DiZhiPinyin[index];
        result.tianJiang[key] = ShenJiangArray[i];
    }

    return result;
};

// 根据天盘地支获取其在十二宫中的索引
export const getGongIndex = (tianDiPan: TianDiPan, zhi: string): number => {
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        if (tianDiPan.tianPan[key] === zhi) {
            return i;
        }
    }
    return 0;
};
