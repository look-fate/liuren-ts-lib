import { JiGong } from "../maps/jiGong";
import { DiZhiPinyin } from "../maps/ganZhi";
import { SiKe, TianDiPan } from "./type";
import { DateInfo } from "../common/date";

export const getSiKe = (date: DateInfo, tianDiPan: TianDiPan): SiKe => {
    const siKe: SiKe = {
        ke1: [],
        ke2: [],
        ke3: [],
        ke4: [],
    };
    const riChen = date.bazi.split(" ")[2];
    const riGan = riChen.substring(0, 1);
    const riZhi = riChen.substring(1, 2);

    const jiGong = JiGong[riGan as keyof typeof JiGong];
    let shangShen = getShangShen(tianDiPan, jiGong);
    siKe.ke1 = [`${shangShen}${riGan}`, getTianJiang(tianDiPan, shangShen)];

    let oldShangShen = shangShen;
    shangShen = getShangShen(tianDiPan, shangShen);
    siKe.ke2 = [`${shangShen}${oldShangShen}`, getTianJiang(tianDiPan, shangShen)];

    oldShangShen = shangShen;
    shangShen = getShangShen(tianDiPan, riZhi);
    siKe.ke3 = [`${shangShen}${riZhi}`, getTianJiang(tianDiPan, shangShen)];

    oldShangShen = shangShen;
    shangShen = getShangShen(tianDiPan, shangShen);
    siKe.ke4 = [`${shangShen}${oldShangShen}`, getTianJiang(tianDiPan, shangShen)];
    return siKe;
};

// 获取下神（天盘地支对应的地盘地支）
export const getXiaShen = (tianDiPan: TianDiPan, zhi: string): string => {
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        if (tianDiPan.tianPan[key] === zhi) {
            return tianDiPan.diPan[key];
        }
    }
    return "";
};

// 获取上神（地盘地支对应的天盘地支）
export const getShangShen = (tianDiPan: TianDiPan, zhi: string): string => {
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        if (tianDiPan.diPan[key] === zhi) {
            return tianDiPan.tianPan[key];
        }
    }
    return "";
};

// 获取天将
export const getTianJiang = (tianDiPan: TianDiPan, zhi: string): string => {
    for (let i = 0; i < 12; i++) {
        const key = DiZhiPinyin[i];
        if (tianDiPan.tianPan[key] === zhi) {
            return tianDiPan.tianJiang[key];
        }
    }
    return "";
};