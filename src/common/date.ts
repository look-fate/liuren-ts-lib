import { EightChar, LunarHour, SixtyCycle, SolarDay } from "tyme4ts"
import { DingMa, TianMa, YiMa } from "../maps/ma";
import { LiuHe } from "../maps/ganZhi";
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