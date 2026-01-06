import { DateInfo } from "../common/date";

export interface ShenShaInfo {
    name: string;        // 神煞名称，如 "天德"
    value: string;       // 触发神煞的干支，如 "丁"
    position: string[];  // 所在位置，如 ["人元", "地分"]
    description: string; // 作用说明
    type: '吉' | '凶';
}

export interface Position {
    name: string; // 名称，如 甲、贵人、登明、子
    ganZhi: string; // 对应的干支/地支，如 甲、丑、亥、子
    wuXing: string; // 五行，如 木、土、水、水
    wangXiangXiuQiu?: string; // 旺相休囚死状态，如 旺、相、休、囚、死
}

export interface SiWei {
    renYuan: Position; // 人元 (干)
    guiShen: Position; // 贵神 (神)
    jiangShen: Position; // 将神 (将)
    diFen: Position;   // 地分 (方)
}

/**
 * 五动类型
 * "动"专指人元(干)与地分(方)之间的五行生克关系
 */
export type WuDongType = '贼动' | '妻动' | '官动' | '父动' | '兄动' | '无';

/**
 * 动爻信息
 */
export interface DongYaoInfo {
    type: WuDongType;           // 五动类型
    relationship: string;       // 生克关系，如 "地分克人元"、"人元克地分"
    description: string;        // 含义说明
    isAuspicious: boolean;      // 是否吉利
}

/**
 * 用神类型：贵神或将神
 */
export type YongShenType = '贵神' | '将神';

/**
 * 用神信息
 */
export interface YongShenInfo {
    type: YongShenType;         // 用神类型：贵神或将神
    position: Position;         // 用神的位置信息
    principle: string;          // 取用原则，如 "克日者为用"、"日克者为用"、"无克取将"
    relationship: string;       // 与人元的关系，如 "贵神克人元"、"人元克将神"
    description: string;        // 说明
}

export interface JinKouJueResult {
    date: DateInfo;
    diFen: string;
    siWei: SiWei;
    shenSha: ShenShaInfo[];     // 神煞列表
    dongYao: DongYaoInfo;       // 动爻信息
    yongShen: YongShenInfo;     // 用神信息
}

