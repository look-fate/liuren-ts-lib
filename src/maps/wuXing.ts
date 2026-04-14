// 地支五行
export const WuXing = {
    "子": "水",
    "丑": "土",
    "寅": "木",
    "卯": "木",
    "辰": "土",
    "巳": "火",
    "午": "火",
    "未": "土",
    "申": "金",
    "酉": "金",
    "戌": "土",
    "亥": "水",
    "甲": "木",
    "乙": "木",
    "丙": "火",
    "丁": "火",
    "戊": "土",
    "己": "土",
    "庚": "金",
    "辛": "金",
    "壬": "水",
    "癸": "水"
}
// 五行关系
export const Relation = {
    //水
    "水木": "生",
    "水火": "克",
    "水土": "贼",
    "水金": "养",
    "水水": "比",
    //木
    "木水": "养",
    "木火": "生",
    "木土": "克",
    "木金": "贼",
    "木木": "比",
    //火
    "火水": "贼",
    "火火": "比",
    "火土": "生",
    "火金": "克",
    "火木": "养",
    //土
    "土水": "克",
    "土火": "养",
    "土土": "比",
    "土金": "生",
    "土木": "贼",
    //金
    "金水": "生",
    "金火": "贼",
    "金土": "养",
    "金金": "比",
    "金木": "克",
}
// 六亲
export const LiuQin = {
    "生": "子孙",
    "克": "妻财",
    "贼": "官鬼",
    "养": "父母",
    "比": "兄弟"
}

// 五行生克关系
const WuXingSheng: { [key: string]: string } = {
    "木": "火", "火": "土", "土": "金", "金": "水", "水": "木"
};

const WuXingKe: { [key: string]: string } = {
    "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
};

// 根据五行反查生我的五行
const getShengWo = (wuXing: string): string => {
    for (const [k, v] of Object.entries(WuXingSheng)) {
        if (v === wuXing) return k;
    }
    return "";
};

// 根据五行反查克我的五行
const getKeWo = (wuXing: string): string => {
    for (const [k, v] of Object.entries(WuXingKe)) {
        if (v === wuXing) return k;
    }
    return "";
};

// 根据月令地支获取当令五行（旺）
export const getYueLingWuXing = (monthZhi: string): string => {
    // 寅卯 -> 木, 巳午 -> 火, 申酉 -> 金, 亥子 -> 水, 辰戌丑未 -> 土
    const monthZhiToWang: { [key: string]: string } = {
        "寅": "木", "卯": "木",
        "巳": "火", "午": "火",
        "申": "金", "酉": "金",
        "亥": "水", "子": "水",
        "辰": "土", "戌": "土", "丑": "土", "未": "土"
    };
    return monthZhiToWang[monthZhi] || "";
};

// 计算旺相休囚死：同我者旺，我生者相，生我者休，克我者囚，我克者死
export const getWangXiangXiuQiu = (wuXing: string, monthZhi: string): string => {
    if (!wuXing) return "";

    const yueLingWuXing = getYueLingWuXing(monthZhi); // 当令五行（旺）
    if (!yueLingWuXing) return "";

    // 同我者旺
    if (wuXing === yueLingWuXing) return "旺";

    // 我生者相（当令五行生的）
    if (wuXing === WuXingSheng[yueLingWuXing]) return "相";

    // 生我者休（生当令五行的）
    if (wuXing === getShengWo(yueLingWuXing)) return "休";

    // 克我者囚（克当令五行的）
    if (wuXing === getKeWo(yueLingWuXing)) return "囚";

    // 我克者死（当令五行克的）
    if (wuXing === WuXingKe[yueLingWuXing]) return "死";

    return "";
};