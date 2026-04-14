import { ShiErGong, TianDiPan } from "./type";
import { DateInfo } from "../common/date";
import { DiZhiPinyin } from "../maps/ganZhi";

const JianChuArray = ["建", "除", "满", "平", "定", "执", "破", "危", "成", "收", "开", "闭"];

// 创建空的十二宫对象
const createEmptyShiErGong = (): ShiErGong => ({
    zi: "", chou: "", yin: "", mao: "",
    chen: "", si: "", wu: "", wei: "",
    shen: "", you: "", xu: "", hai: ""
});

/**
 * 十二建除（建除十二直）
 * 以月建（月柱地支）为"建"，在天盘上找到月建所在宫位起"建"，顺行排列
 */
export const getJianChu = (date: DateInfo, tianDiPan: TianDiPan): ShiErGong => {
    const result = createEmptyShiErGong();

    // 月建 = 月柱地支
    const yueZhi = date.bazi.split(" ")[1].substring(1, 2);

    // 在天盘上找到月建所在的宫位索引
    let startIndex = 0;
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        if (tianDiPan.tianPan[key] === yueZhi) {
            startIndex = i;
            break;
        }
    }

    // 从该宫位起"建"，顺排十二建除
    for (let i = 0; i < 12; i++) {
        const index = (startIndex + i) % 12;
        const key = DiZhiPinyin[index];
        result[key] = JianChuArray[i];
    }

    return result;
};
