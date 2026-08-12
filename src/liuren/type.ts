import { DateInfo } from "../common/date";
import { DiZhiKey } from "../maps/ganZhi";

// 十二宫类型（使用拼音键）
export interface ShiErGong {
    zi: string;
    chou: string;
    yin: string;
    mao: string;
    chen: string;
    si: string;
    wu: string;
    wei: string;
    shen: string;
    you: string;
    xu: string;
    hai: string;
}

// 性别类型
export type Gender = "男" | "女";

export interface ShenShaItem {
    name: string;
    value: string;
    description?: string;
}

export type ShenSha = ShenShaItem[];

export interface YinYangGuiRen {
    yangGuiRen: ShiErGong;  // 阳贵人天将
    yinGuiRen: ShiErGong;   // 阴贵人天将
}

export interface TianDiPan {
    diPan: ShiErGong;   // 地盘
    tianPan: ShiErGong; // 天盘
    tianJiang: ShiErGong; // 天将
}

export interface SanChuan {
    chuChuan: string[];  // 初传
    zhongChuan: string[]; // 中传
    moChuan: string[];   // 末传
    keTi: string;        // 课体（九宗门，三传成三合局/俱土时追加课格，如"元首·润下"）
}

export interface SiKe {
    ke1: string[];  // 一课
    ke2: string[];  // 二课
    ke3: string[];  // 三课
    ke4: string[];  // 四课
}

export interface LiuRenResult {
    dateInfo: DateInfo;
    tianDiPan: TianDiPan;
    siKe: SiKe;
    sanChuan: SanChuan;
    dunGan: ShiErGong;
    chuJian: ShiErGong;
    fuJian: ShiErGong;
    jianChu: ShiErGong;
    shenSha: ShenSha;
    yinYangGuiRen: YinYangGuiRen;
}

export interface LuNianResult {
    year: string;
    luNian: string;
    gender: string;
}
