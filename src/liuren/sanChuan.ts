import { JiGong } from "../maps/jiGong";
import { LiuQin, Relation, WuXing } from "../maps/wuXing";
import { SanChuan, ShiErGong, SiKe, TianDiPan } from "./type";
import { zeiKe } from "./jiuZongMen/zeiKe";
import { DiZhiArray, DiZhiToPinyin, GanZhiYinYang, LiuChong, SanHeFaYong, SanXingYong, TianGanWuHe } from "../maps/ganZhi";
import { getShangShen, getTianJiang, getXiaShen } from "./siKe";
import { YiMa } from "../maps/ma";
import sanChuanData from "../sanchuan.json";

// 三合局课格：三传三支构成三合局（土无三合，另以稼穑课格处理）
const SanHeJuGe = {
    "申子辰": "润下", // 水局：江湖之水，占晴雨主雨雪
    "寅午戌": "炎上", // 火局
    "巳酉丑": "从革", // 金局
    "亥卯未": "曲直", // 木局
} as const;
// 稼穑课格：三传俱土
const TuZhi = ["辰", "戌", "丑", "未"];

/**
 * 判定三传的三合局课格（润下/炎上/从革/曲直）或稼穑（三传俱土），不成局返回空串
 */
export const getSanHeGe = (chuChuan: string, zhongChuan: string, moChuan: string): string => {
    const sorted = [chuChuan, zhongChuan, moChuan].sort().join("");
    for (const [ju, ge] of Object.entries(SanHeJuGe)) {
        // 三合局三支互异，排序后比对即可判等
        if ([...ju].sort().join("") === sorted) {
            return ge;
        }
    }
    // 三传皆在土支 → 稼穑
    if ([chuChuan, zhongChuan, moChuan].every((z) => TuZhi.includes(z))) {
        return "稼穑";
    }
    return "";
};

export const getSanChuan = (siKe: SiKe, tianDiPan: TianDiPan): SanChuan => {
    let sanChuan: SanChuan = {
        chuChuan: [],
        zhongChuan: [],
        moChuan: [],
        keTi: ""
    };
    // 读取四课
    const ke1_shang = siKe.ke1[0][0];
    // 课1下为干 转为寄宫
    const ke1_xia = siKe.ke1[0][1];
    const riGan = ke1_xia;
    const riJi = JiGong[ke1_xia as keyof typeof JiGong];
    const ke2_shang = siKe.ke2[0][0];
    const ke2_xia = siKe.ke2[0][1];
    const ke3_shang = siKe.ke3[0][0];
    const ke3_xia = siKe.ke3[0][1];
    const ke4_shang = siKe.ke4[0][0];
    const ke4_xia = siKe.ke4[0][1];

    const siKeArray = [];
    siKeArray.push(ke1_shang + ke1_xia);
    siKeArray.push(ke2_shang + ke2_xia);
    siKeArray.push(ke3_shang + ke3_xia);
    siKeArray.push(ke4_shang + ke4_xia);

    const day = riGan + ke3_xia;
    const index = DiZhiArray.indexOf(ke1_shang);
    const ganZhi = sanChuanData[day as keyof typeof sanChuanData][index].干支组合;
    sanChuan.keTi = sanChuanData[day as keyof typeof sanChuanData][index].格局;
    // 九宗门之外，追加三合局课格（如"元首·润下"），不成局则保持九宗门名
    const sanHeGe = getSanHeGe(ganZhi.substring(0, 1), ganZhi.substring(1, 2), ganZhi.substring(2, 3));
    if (sanHeGe) {
        sanChuan.keTi = `${sanChuan.keTi}·${sanHeGe}`;
    }
    sanChuan.chuChuan = [ganZhi.substring(0, 1), "", "", ""];
    sanChuan.zhongChuan = [ganZhi.substring(1, 2), "", "", ""];
    sanChuan.moChuan = [ganZhi.substring(2, 3), "", "", ""];
    return sanChuan;
};

// 填充三传的天将、六亲、遁干
export const fillSanChuan = (sanChuan: SanChuan, tianDiPan: TianDiPan, dunGan: ShiErGong, riGan: string): SanChuan => {
    const chu = sanChuan.chuChuan[0];
    const chuKey = DiZhiToPinyin[chu];
    let tianJiang = getTianJiang(tianDiPan, chu);
    let relation = getLiuQin(riGan, chu);
    let dun = dunGan[chuKey];
    sanChuan.chuChuan = [chu, tianJiang, relation, dun];

    const zhong = sanChuan.zhongChuan[0];
    const zhongKey = DiZhiToPinyin[zhong];
    tianJiang = getTianJiang(tianDiPan, zhong);
    relation = getLiuQin(riGan, zhong);
    dun = dunGan[zhongKey];
    sanChuan.zhongChuan = [zhong, tianJiang, relation, dun];

    const mo = sanChuan.moChuan[0];
    const moKey = DiZhiToPinyin[mo];
    tianJiang = getTianJiang(tianDiPan, mo);
    relation = getLiuQin(riGan, mo);
    dun = dunGan[moKey];
    sanChuan.moChuan = [mo, tianJiang, relation, dun];
    return sanChuan;
};
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