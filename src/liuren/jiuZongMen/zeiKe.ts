import { SanChuan, ShiErGongEx, TianDiPan } from "../type";
import { getGanZhi2Relation, getLiuQin } from "../sanChuan";
import { getGongIndex } from "../tianDiPan";
import { getShangShen } from "../siKe";
/**
 * 贼克法 发三传
 * 皆以前者天盘换到地盘而再推天盘之支
 */
export const zeiKe = (tiandipan: TianDiPan, yongShen: string, name: string): SanChuan => {
    // "丑",  "龙",  "财",  "辛"
    const sanChuan: SanChuan = {
        "初传": [],
        "中传": [],
        "末传": [],
        "课体": ""
    }
    sanChuan.课体 = name
    sanChuan.初传 = [yongShen, "", "", ""]
    let shangShen = getShangShen(tiandipan, yongShen)
    sanChuan.中传 = [shangShen, "", "", ""]
    sanChuan.末传 = [getShangShen(tiandipan, shangShen), "", "", ""]
    return sanChuan
}