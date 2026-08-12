import { EightChar, LunarHour, SixtyCycle, SolarDay } from "tyme4ts"
import { DingMa, TianMa, YiMa } from "../maps/ma";
import { DiZhiArray, LiuHe, TianGanArray } from "../maps/ganZhi";
import { YueJiang } from "../maps/yueJiang";
/**
        "date": "2025年07月25日 10时13分",
        "bazi": "乙巳 癸未 乙未 辛巳",
        "yima": "巳",
        "kong": [
            "辰",
            "巳"
        ],
        yuejiang: "午",
        xun:"甲午",
        dingma:"酉",
        tianma:"辰"
 */
export interface DateInfo {
    bazi: string,
    date: string,
    kong: string[],
    yima: string,
    yuejiang: string,
    xun: string,
    dingma: string,
    tianma: string
}
export const getDateBySiZhu = (year: string, month: string, day: string, hour: string): DateInfo => {
    const eightChar = new EightChar(year, month, day, hour)
    const solar = eightChar.getSolarTimes(2000, 2050)[0]
    return getDateByObj(new Date(`${solar.getYear()}-${solar.getMonth()}-${solar.getDay()} ${solar.getHour()}:00`))
}

/**
 * 根据古籍常用的“月将、占时、日干支”构造排盘所需的日期信息。
 *
 * 这条路径不反解公历日期，因此年月柱使用占位符明确表示未知；时干则按日干
 * 通过五子元遁推得。月令只影响天马，未传入时根据“月将为月令六合位”反推。
 */
export const getDateByYueJiang = (
    yueJiang: string,
    shiChen: string,
    riGanZhi: string,
    yueLing?: string
): DateInfo => {
    if (!DiZhiArray.includes(yueJiang)) {
        throw new RangeError(`无效的月将地支：${yueJiang}`);
    }
    if (!DiZhiArray.includes(shiChen)) {
        throw new RangeError(`无效的占时地支：${shiChen}`);
    }
    if (!SixtyCycle.NAMES.includes(riGanZhi)) {
        throw new RangeError(`无效的日干支：${riGanZhi}`);
    }
    if (yueLing !== undefined && !DiZhiArray.includes(yueLing)) {
        throw new RangeError(`无效的月令地支：${yueLing}`);
    }

    const riGan = riGanZhi.substring(0, 1);
    const riZhi = riGanZhi.substring(1, 2);
    const riGanIndex = TianGanArray.indexOf(riGan);
    const shiChenIndex = DiZhiArray.indexOf(shiChen);

    // 五子元遁：甲己日起甲子、乙庚日起丙子，依次每组日干前进两位天干。
    const shiGanIndex = ((riGanIndex % 5) * 2 + shiChenIndex) % TianGanArray.length;
    const shiGanZhi = `${TianGanArray[shiGanIndex]}${shiChen}`;
    const sixtyCycle = SixtyCycle.fromName(riGanZhi);
    const xun = sixtyCycle.getTen().toString();
    const resolvedYueLing = yueLing ?? LiuHe[yueJiang as keyof typeof LiuHe];

    return {
        bazi: `-- -- ${riGanZhi} ${shiGanZhi}`,
        date: "",
        kong: sixtyCycle.getExtraEarthBranches().map(item => item.toString()),
        yima: YiMa[riZhi as keyof typeof YiMa],
        yuejiang: yueJiang,
        xun,
        dingma: DingMa[xun as keyof typeof DingMa],
        tianma: TianMa[resolvedYueLing as keyof typeof TianMa]
    };
};

export const getDateByObj = (date: Date): DateInfo => {
    const result: DateInfo = {
        bazi: "",
        date: "",
        kong: [],
        yima: "",
        yuejiang: "",
        xun: "",
        dingma: "",
        tianma: ""
    };
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const solar = SolarDay.fromYmd(year, month, day)
    const lunar = solar.getLunarDay()
    const eightChar = LunarHour.fromYmdHms(lunar.getYear(), lunar.getMonth(), lunar.getDay(), hour, minute, second).getEightChar();

    result.bazi = `${eightChar.getYear()} ${eightChar.getMonth()} ${eightChar.getDay()} ${eightChar.getHour()}`
    result.date = `${year}年${month}月${day}日 ${hour}时${minute}分`
    const sixtyCycle = SixtyCycle.fromName(eightChar.getDay().toString())
    result.kong = sixtyCycle.getExtraEarthBranches().map(item => item.toString())
    result.xun = sixtyCycle.getTen().toString()
    // 月将
    const yueLing = eightChar.getMonth().toString().substring(1, 2)
    const jieQi = solar.getTerm().toString()
    result.yuejiang = YueJiang[jieQi as keyof typeof YueJiang]
    result.tianma = TianMa[yueLing as keyof typeof TianMa]
    result.dingma = DingMa[result.xun as keyof typeof DingMa]

    const hourBranch = eightChar.getDay().toString().substring(1, 2) as keyof typeof YiMa
    if (YiMa.hasOwnProperty(hourBranch)) {
        result.yima = YiMa[hourBranch]
    } else {
        result.yima = ""
    }
    return result
}
