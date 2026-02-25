import { ShiErGongEx, TianDiPan, ShiErGong } from "./type";
import { DateInfo } from "../common/date";
import { DiZhiArray, DiZhiIndex, DiZhiNumber } from "../maps/ganZhi";
import { TianGanArray } from "../maps/ganZhi";

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
const getYuanDun = (gan: string): ShiErGongEx => {
    const result: ShiErGongEx = {
        "子": "", "丑": "", "寅": "", "卯": "",
        "辰": "", "巳": "", "午": "", "未": "",
        "申": "", "酉": "", "戌": "", "亥": ""
    };
    const startIndex = WuZiYuanDun[gan] ?? 0;
    for (let i = 0; i < 12; i++) {
        const zhi = DiZhiArray[i];
        const tianGan = TianGanArray[(startIndex + i) % 10];
        result[zhi as keyof ShiErGongEx] = tianGan;
    }
    return result;
};
/**
 * 根据日旬所配又称为旬遁
 */
export const getDunGan = (date: DateInfo, tiandipan: TianDiPan): ShiErGongEx => {
    const dunGan: ShiErGongEx = {
        "子": "",
        "丑": "",
        "寅": "",
        "卯": "",
        "辰": "",
        "巳": "",
        "午": "",
        "未": "",
        "申": "",
        "酉": "",
        "戌": "",
        "亥": ""
    }
    const xun = date.xun;
    const kong = date.kong;
    const gan = xun.substring(0, 1)
    const zhi = xun.substring(1, 2) as string
    const tianPan = tiandipan.天盘
    // 若 甲 午 则 甲在午下 依次排序 甲 乙 丙 丁 戊 己 庚 辛 壬 癸
    const zhiIndex = DiZhiArray.indexOf(zhi)

    for (let i = 0; i < 10; i++) {
        let index = zhiIndex + i;
        const gan = TianGanArray[i as keyof typeof TianGanArray]
        if (index > 11) index = index - 12
        const gong = DiZhiArray[index as keyof typeof DiZhiArray]
        dunGan[gong as keyof ShiErGongEx] = gan as string
    }

    return dunGan
}
const getTianPanIndex = (tianPan: ShiErGong, zhi: string) => {
    for (let i = 0; i < 12; i++) {
        if (tianPan[i as keyof ShiErGong] === zhi) return i
    }
    return -1
}

/**
 * 初建：以日干起五子元遁，顺排十二支得建干序列
 */
export const getChuJian = (date: DateInfo): ShiErGongEx => {
    const riGan = date.bazi.split(" ")[2].substring(0, 1);
    return getYuanDun(riGan);
};

/**
 * 复建：以时干起五子元遁，顺排十二支得建干序列
 */
export const getFuJian = (date: DateInfo): ShiErGongEx => {
    const shiGan = date.bazi.split(" ")[3].substring(0, 1);
    return getYuanDun(shiGan);
};