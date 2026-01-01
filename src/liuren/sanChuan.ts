import { JiGong } from "../maps/jiGong"
import { LiuQin, Relation, WuXing } from "../maps/wuXing"
import { SanChuan, ShiErGong, ShiErGongEx, SiKe, TianDiPan } from "./type"
import { zeiKe } from "./jiuZongMen/zeiKe"
import { DiZhiArray, GanZhiYinYang, LiuChong, SanHeFaYong, SanXingYong, TianGanWuHe } from "../maps/ganZhi"
import { getShangShen, getTianJiang, getXiaShen } from "./siKe"
import { YiMa } from "../maps/ma"
import  sanChuanData  from "../sanchuan.json"

export const getSanChuan = (siKe: SiKe, tiandipan: TianDiPan): SanChuan => {
    let sanChuan: SanChuan = {
        "初传": [],
        "中传": [],
        "末传": [],
        "课体": ""
    }
    // 读取四课
    const ke1_shang = siKe.一课[0][0]
    // 课1下为干 转为寄宫
    const ke1_xia = siKe.一课[0][1]
    const riGan = ke1_xia
    const riJi = JiGong[ke1_xia as keyof typeof JiGong]
    const ke2_shang = siKe.二课[0][0]
    const ke2_xia = siKe.二课[0][1]
    const ke3_shang = siKe.三课[0][0]
    const ke3_xia = siKe.三课[0][1]
    const ke4_shang = siKe.四课[0][0]
    const ke4_xia = siKe.四课[0][1]

    const siKeArray = []
    siKeArray.push(ke1_shang + ke1_xia)
    siKeArray.push(ke2_shang + ke2_xia)
    siKeArray.push(ke3_shang + ke3_xia)
    siKeArray.push(ke4_shang + ke4_xia)

    const day = riGan + ke3_xia
    const index = DiZhiArray.indexOf(ke1_shang)
    const ganZhi = sanChuanData[day as keyof typeof sanChuanData][index].干支组合
    sanChuan.课体 = sanChuanData[day as keyof typeof sanChuanData][index].格局
    sanChuan.初传 = [ganZhi.substring(0, 1), "", "", ""]
    sanChuan.中传 = [ganZhi.substring(1, 2), "", "", ""]
    sanChuan.末传 = [ganZhi.substring(2, 3), "", "", ""]
    return sanChuan
}
// "辛",  "龙",  "财",  "丑"
export const fillSanChuan = (sanChuan: SanChuan, tiandipan: TianDiPan, dunGan: ShiErGongEx, riGan: string) => {
    const chu = sanChuan.初传[0]

    let tianJiang = getTianJiang(tiandipan, chu)
    let relation = getLiuQin(riGan, chu)
    let dun = dunGan[chu as keyof typeof dunGan]
    sanChuan.初传 = [chu, tianJiang, relation, dun]

    const zhong = sanChuan.中传[0]
    tianJiang = getTianJiang(tiandipan, zhong)
    relation = getLiuQin(riGan, zhong)
    dun = dunGan[zhong as keyof typeof dunGan]
    sanChuan.中传 = [zhong, tianJiang, relation, dun]

    const mo = sanChuan.末传[0]
    tianJiang = getTianJiang(tiandipan, mo)
    relation = getLiuQin(riGan, mo)
    dun = dunGan[mo as keyof typeof dunGan]
    sanChuan.末传 = [mo, tianJiang, relation, dun]
    return sanChuan
}
export const getGanZhi2WuXing = (ganZhi: string) => {
    let result = ""
    for (let i = 0; i < ganZhi.length; i++) {
        result += WuXing[ganZhi[i] as keyof typeof WuXing]
    }
    return result
}
export const getGanZhi2Relation = (ganZhi: string) => {
    const wuxing = getGanZhi2WuXing(ganZhi)
    const relation = Relation[wuxing as keyof typeof Relation]
    return relation
}
export const getLiuQin = (item1: string, item2: string) => {
    const wuxing1 = getGanZhi2WuXing(item1)
    const wuxing2 = getGanZhi2WuXing(item2)
    const relation = Relation[(wuxing1 + wuxing2) as keyof typeof Relation]
    return LiuQin[relation as keyof typeof LiuQin]
}