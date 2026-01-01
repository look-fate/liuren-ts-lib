import { DateInfo } from "../common/date";

export interface ShiErGong {
    0: string,
    1: string,
    2: string,
    3: string,
    4: string,
    5: string,
    6: string,
    7: string,
    8: string,
    9: string,
    10: string,
    11: string,
}

export interface ShiErGongEx {
    "子": string,
    "丑": string,
    "寅": string,
    "卯": string,
    "辰": string,
    "巳": string,
    "午": string,
    "未": string,
    "申": string,
    "酉": string,
    "戌": string,
    "亥": string
}

export interface ShenSha {
    riDe: string;
    riLu: string;
    shengQi: string;
    siQi: string;
    poSui: string;
    sangMen: string;
    diaoKe: string;
}

export interface TianDiPan {
    "地盘": ShiErGong,
    "天盘": ShiErGong,
    "天将": ShiErGong
}

export interface SanChuan {
    "初传": string[],
    "中传": string[],
    "末传": string[],
    "课体": string
}

export interface SiKe {
    "一课": string[],
    "二课": string[],
    "三课": string[],
    "四课": string[]
}

export interface LiuRenResult {
    dateInfo?: DateInfo
    tiandipan?: TianDiPan
    siKe?: SiKe
    sanChuan?: SanChuan
    dunGan?: ShiErGongEx
    shenSha?: ShenSha
}

