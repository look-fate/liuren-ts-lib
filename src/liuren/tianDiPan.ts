import { DiZhiArray } from "../maps/ganZhi";
import { DateInfo } from "../common/date";
import { TianDiPan } from "./type";
import { ShenJiangArray, ShunNi, YangGui, YinGui, YinYang } from "../maps/shenJiang";
/**
 * 月将加在占时的时辰之上，然后将十二地支按顺时针依次排列在各地盘地支之上
 * 
 */
export const getTianDiPan = (date: DateInfo): TianDiPan => {
    const result: TianDiPan = {
        "地盘": {
            0: "子",
            1: "丑",
            2: "寅",
            3: "卯",
            4: "辰",
            5: "巳",
            6: "午",
            7: "未",
            8: "申",
            9: "酉",
            10: "戌",
            11: "亥",
        },
        "天盘": {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: "",
            10: "",
            11: "",
        },
        "天将": {
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
            9: "",
            10: "",
            11: "",
        }
    }
    // 排布天盘
    const tianPan = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
    }
    const yueJiang = date.yuejiang
    const shiChen = date.bazi.split(" ")[3].substring(1, 2)
    // 月将加时遍历天盘
    const shiChenIndex = DiZhiArray.indexOf(shiChen)
    const yueJiangIndex = DiZhiArray.indexOf(yueJiang)
    for (let i = 0; i < 12; i++) {
        let indexChenTemp = shiChenIndex + i
        let indexYueJiangTemp = yueJiangIndex + i
        if (indexChenTemp > 11) {
            indexChenTemp = indexChenTemp - 12
        }
        if (indexYueJiangTemp > 11) {
            indexYueJiangTemp = indexYueJiangTemp - 12
        }
        tianPan[indexChenTemp as keyof typeof tianPan] = DiZhiArray[indexYueJiangTemp]
    }
    result.天盘 = tianPan
    // 排天将
    const tianJiang = {
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
    }
    // 选取阴阳贵人
    const yinYang = YinYang[shiChen as keyof typeof YinYang]
    let guiZhi = ""
    if (yinYang === "阳") {
        guiZhi = YangGui[date.bazi.split(" ")[2].substring(0, 1) as keyof typeof YangGui]
    } else {
        guiZhi = YinGui[date.bazi.split(" ")[2].substring(0, 1) as keyof typeof YinGui]
    }
    // 排布天将
    // 找到贵人位置
    let guiIndex: keyof typeof tianPan = 0
    for (let i = 0; i < 12; i++) {
        if (guiZhi == tianPan[i as keyof typeof tianPan]) {
            guiIndex = i as keyof typeof tianPan
            break
        }
    }
    // 贵人位置顺逆
    const shunNi = ShunNi[DiZhiArray[guiIndex] as keyof typeof ShunNi]
    // 贵人位置顺逆排布天将
    for (let i = 0; i < 12; i++) {
        let index = guiIndex
        if (shunNi === "顺") {
            index = index + i
        } else {
            index = index - i
        }
        if (index > 11) {
            index = index - 12
        }
        if (index < 0) {
            index = index + 12
        }
        tianJiang[index as keyof typeof tianJiang] = ShenJiangArray[i]
    }
    result.天将 = tianJiang
    return result
}

export const getGongIndex = (tiandipan: TianDiPan, tian: string) => {
    const tianPan = tiandipan.天盘
    for (let i = 0; i < 12; i++) {
        if (tianPan[i as keyof typeof tianPan] === tian) {
            return i
        }
    }
    return 0
}
