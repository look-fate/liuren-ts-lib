import { ShiErGongEx, TianDiPan, ShiErGong } from "./type";
import { DateInfo } from "../common/date";
import { DiZhiArray } from "../maps/ganZhi";

const JianChuArray = ["建", "除", "满", "平", "定", "执", "破", "危", "成", "收", "开", "闭"]

/**
 * 十二建除（建除十二直）
 * 以月建（月柱地支）为"建"，在天盘上找到月建所在宫位起"建"，顺行排列
 */
export const getJianChu = (date: DateInfo, tiandipan: TianDiPan): ShiErGongEx => {
    const result: ShiErGongEx = {
        "子": "", "丑": "", "寅": "", "卯": "", "辰": "", "巳": "",
        "午": "", "未": "", "申": "", "酉": "", "戌": "", "亥": ""
    }

    // 月建 = 月柱地支
    const yueZhi = date.bazi.split(" ")[1].substring(1, 2)

    // 在天盘上找到月建所在的宫位索引
    const tianPan = tiandipan.天盘
    let startIndex = 0
    for (let i = 0; i < 12; i++) {
        if (tianPan[i as keyof ShiErGong] === yueZhi) {
            startIndex = i
            break
        }
    }

    // 从该宫位起"建"，顺排十二建除
    for (let i = 0; i < 12; i++) {
        let index = startIndex + i
        if (index > 11) index -= 12
        const gong = DiZhiArray[index]
        result[gong as keyof ShiErGongEx] = JianChuArray[i]
    }

    return result
}
