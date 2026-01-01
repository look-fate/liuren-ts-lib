import { JiGong } from "../maps/jiGong";
import { SiKe, TianDiPan } from "./type"
import { DateInfo } from "../common/date";

export const getSiKe = (date: DateInfo,tianDiPan: TianDiPan):SiKe => {
    const siKe: SiKe = {
        "一课": [],
        "二课": [],
        "三课": [],
        "四课": [],
    }
    const riChen = date.bazi.split(" ")[2]
    const riGan = riChen.substring(0, 1)
    const riZhi = riChen.substring(1, 2)

    const jiGong = JiGong[riGan as keyof typeof JiGong]
    let shangShen = getShangShen(tianDiPan, jiGong)
    siKe.一课 = [`${shangShen}${riGan}`, getTianJiang(tianDiPan, shangShen)]
    
    let oldShangShen = shangShen
    shangShen = getShangShen(tianDiPan, shangShen)
    siKe.二课 = [`${shangShen}${oldShangShen}`, getTianJiang(tianDiPan, shangShen)]

    oldShangShen = shangShen
    shangShen = getShangShen(tianDiPan, riZhi)
    siKe.三课 = [`${shangShen}${riZhi}`, getTianJiang(tianDiPan, shangShen)]

    oldShangShen = shangShen
    shangShen = getShangShen(tianDiPan, shangShen)
    siKe.四课 = [`${shangShen}${oldShangShen}`, getTianJiang(tianDiPan, shangShen)]
    return siKe;
}
export const getXiaShen = (tianDiPan: TianDiPan, zhi: string) => {
    let TianPan = tianDiPan["天盘"]
    let DiPan = tianDiPan["地盘"]
    for (let i = 0; i < 12; i++) {
        if (TianPan[i as keyof typeof TianPan] === zhi) {
            return DiPan[i as keyof typeof TianPan]
        }
    }
    return ""
}
export const getShangShen = (tianDiPan: TianDiPan, zhi: string) => {
    let DiPan = tianDiPan["地盘"]
    let TianPan = tianDiPan["天盘"]
    for (let i = 0; i < 12; i++) {
        if (DiPan[i as keyof typeof DiPan] === zhi) {
            return TianPan[i as keyof typeof TianPan]
        }
    }
    return ""
}
export const getTianJiang = (tianDiPan: TianDiPan, zhi: string) => {
    let TianJiang = tianDiPan["天将"]
    let TianPan = tianDiPan["天盘"]
    for (let i = 0; i < 12; i++) {
        if (TianPan[i as keyof typeof TianPan] === zhi) {
            return TianJiang[i as keyof typeof TianJiang]
        }
    }
    return ""
}