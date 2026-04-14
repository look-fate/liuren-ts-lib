import { ShiErGong, TianDiPan } from "./type";
import { DateInfo } from "../common/date";
import { DiZhiArray, DiZhiPinyin, DiZhiKey } from "../maps/ganZhi";
import { TianGanArray } from "../maps/ganZhi";

// 创建空的十二宫对象
const createEmptyShiErGong = (): ShiErGong => ({
    zi: "", chou: "", yin: "", mao: "",
    chen: "", si: "", wu: "", wei: "",
    shen: "", you: "", xu: "", hai: ""
});

/**
 * 五子元遁口诀：
 * 甲己还加甲 → 子起甲(0)
 * 乙庚丙作初 → 子起丙(2)
 * 丙辛从戊起 → 子起戊(4)
 * 丁壬庚子居 → 子起庚(6)
 * 戊癸何方发，壬子是真途 → 子起壬(8)
 */
const WuZiYuanDun: Record<string, number> = {
    "甲": 0, "己": 0,
    "乙": 2, "庚": 2,
    "丙": 4, "辛": 4,
    "丁": 6, "壬": 6,
    "戊": 8, "癸": 8
};

/**
 * 根据天干起五子元遁，返回十二宫对应的遁干
 */
const getYuanDun = (gan: string): ShiErGong => {
    const result = createEmptyShiErGong();
    const startIndex = WuZiYuanDun[gan] ?? 0;
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        const tianGan = TianGanArray[(startIndex + i) % 10];
        result[key] = tianGan;
    }
    return result;
};

/**
 * 根据日旬所配又称为旬遁
 */
export const getDunGan = (date: DateInfo, tianDiPan: TianDiPan): ShiErGong => {
    const dunGan = createEmptyShiErGong();
    const xun = date.xun;
    const zhi = xun.substring(1, 2);
    const zhiIndex = DiZhiArray.indexOf(zhi);

    // 若 甲午 则 甲在午下 依次排序 甲 乙 丙 丁 戊 己 庚 辛 壬 癸
    for (let i = 0; i < 10; i++) {
        const index = (zhiIndex + i) % 12;
        const key = DiZhiPinyin[index];
        dunGan[key] = TianGanArray[i];
    }

    return dunGan;
};

/**
 * 初建：以日干起五子元遁，顺排十二支得建干序列
 */
export const getChuJian = (date: DateInfo): ShiErGong => {
    const riGan = date.bazi.split(" ")[2].substring(0, 1);
    return getYuanDun(riGan);
};

/**
 * 复建：以时干起五子元遁，顺排十二支得建干序列
 */
export const getFuJian = (date: DateInfo): ShiErGong => {
    const shiGan = date.bazi.split(" ")[3].substring(0, 1);
    return getYuanDun(shiGan);
};