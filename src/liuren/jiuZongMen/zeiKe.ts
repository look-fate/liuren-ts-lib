import { SanChuan, TianDiPan } from "../type";
import { getGanZhi2Relation, getLiuQin } from "../sanChuan";
import { getGongIndex } from "../tianDiPan";
import { getShangShen } from "../siKe";

/**
 * 贼克法 发三传
 * 皆以前者天盘换到地盘而再推天盘之支
 */
export const zeiKe = (tianDiPan: TianDiPan, yongShen: string, name: string): SanChuan => {
    const shangShen = getShangShen(tianDiPan, yongShen);
    return {
        keTi: name,
        chuChuan: [yongShen, "", "", ""],
        zhongChuan: [shangShen, "", "", ""],
        moChuan: [getShangShen(tianDiPan, shangShen), "", "", ""]
    };
};