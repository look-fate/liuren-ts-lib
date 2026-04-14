import sixtyJiaZi from "./maps/sixtyJiaZi";
import { LiuRenResult, LuNianResult, Gender } from "./liuren/type";
import { getDateByObj, getDateBySiZhu, DateInfo } from "./common/date";
import { getDunGan, getChuJian, getFuJian } from "./liuren/dunGan";
import { getJianChu } from "./liuren/jianChu";
import { fillSanChuan, getSanChuan } from "./liuren/sanChuan";
import { getShenSha } from "./liuren/shenSha";
import { getYinYangGuiRen } from "./liuren/yinYangGuiRen";
import { getSiKe } from "./liuren/siKe";
import { getTianDiPan } from "./liuren/tianDiPan";

// 导出大六壬相关
export * from "./liuren/tianDiPan";
export * from "./liuren/siKe";
export * from "./liuren/sanChuan";
export * from "./liuren/dunGan";
export * from "./liuren/jianChu";
export * from "./liuren/shenSha";
export * from "./liuren/yinYangGuiRen";

// 导出通用工具
export * from "./common/date";
export * from "./liuren/type";

// 导出映射工具
export { DiZhiPinyin, DiZhiToPinyin, PinyinToDiZhi, DiZhiKey } from "./maps/ganZhi";

/**
 * 核心计算函数（内部使用）
 */
const computeLiuRen = (date: DateInfo): LiuRenResult => {
    const riGan = date.bazi.split(" ")[2].substring(0, 1);
    const tianDiPan = getTianDiPan(date);
    const siKe = getSiKe(date, tianDiPan);
    const dunGan = getDunGan(date, tianDiPan);
    const jianChu = getJianChu(date, tianDiPan);
    const sanChuan = fillSanChuan(getSanChuan(siKe, tianDiPan), tianDiPan, dunGan, riGan);
    const shenSha = getShenSha(date);
    const yinYangGuiRen = getYinYangGuiRen(date, tianDiPan);
    const chuJian = getChuJian(date);
    const fuJian = getFuJian(date);

    return {
        dateInfo: date,
        tianDiPan,
        siKe,
        sanChuan,
        dunGan,
        chuJian,
        fuJian,
        jianChu,
        shenSha,
        yinYangGuiRen
    };
};

/**
 * 使用 Date 对象进行大六壬排盘
 */
export const getLiuRenByDate = (date: Date): LiuRenResult => {
    return computeLiuRen(getDateByObj(date));
};

/**
 * 使用四柱干支进行大六壬排盘
 */
export const getLiuRenBySiZhu = (year: string, month: string, day: string, hour: string): LiuRenResult => {
    return computeLiuRen(getDateBySiZhu(year, month, day, hour));
};

/**
 * 计算虚岁流年
 */
export const getNianMing = (birthDate: Date, gender: Gender): LuNianResult => {
    const date = getDateByObj(birthDate);
    const year = date.bazi.split(" ")[0];
    const yearNumber = birthDate.getFullYear();
    const nowNumber = new Date().getFullYear();
    const age = nowNumber - yearNumber;

    let luNian = "";
    if (gender === "男") {
        // 男起丙寅顺排
        const startYear = sixtyJiaZi.indexOf("丙寅");
        const startIndex = startYear + age;
        luNian = sixtyJiaZi[startIndex % 60];
    } else {
        // 女起壬申逆排
        const startYear = sixtyJiaZi.indexOf("壬申");
        let startIndex = startYear - age;
        if (startIndex < 0) {
            startIndex = 60 + startIndex;
        }
        luNian = sixtyJiaZi[startIndex % 60];
    }

    return {
        year,
        gender,
        luNian
    };
};
