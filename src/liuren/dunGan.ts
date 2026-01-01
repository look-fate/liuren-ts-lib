import { ShiErGongEx, TianDiPan, ShiErGong } from "./type";
import { DateInfo } from "../common/date";
import { DiZhiArray, DiZhiIndex, DiZhiNumber } from "../maps/ganZhi";
import { TianGanArray } from "../maps/ganZhi";
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