import { riDe, riLu, PoSui } from "../maps/shensha";
import { DateInfo } from "../common/date";
import { ShenSha, ShenShaItem } from "./type";
import { DiZhiArray, DiZhiNumber } from "../maps/ganZhi";

// Helper to get offset branch
const getOffsetBranch = (startBranch: string, offset: number): string => {
    const idx = DiZhiArray.indexOf(startBranch);
    if (idx === -1) return "";
    // Handle negative wrap around
    let newIdx = (idx + offset) % 12;
    if (newIdx < 0) newIdx += 12;
    return DiZhiArray[newIdx];
};

const seasons = {
    "寅": "春", "卯": "春", "辰": "春",
    "巳": "夏", "午": "夏", "未": "夏",
    "申": "秋", "酉": "秋", "戌": "秋",
    "亥": "冬", "子": "冬", "丑": "冬"
};

type RuleType = "Year" | "Season" | "Month" | "Day";

interface ShenShaRule {
    name: string;
    type: RuleType;
    description?: string;
    calc: (yearBranch: string, monthBranch: string, dayStem: string, dayBranch: string, yearStem: string) => string;
}

const getMonthOrdinal = (mb: string): number => {
    const monthOrdinals = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];
    return monthOrdinals.indexOf(mb);
};

const rules: ShenShaRule[] = [
    // --- Year Sha (岁煞) ---
    { name: "太岁", type: "Year", description: "主一年吉凶，代表君王、家长、第一号人物，统制诸煞。", calc: (yB) => yB },
    { name: "岁破", type: "Year", description: "又名大耗，主破坏、破耗财物。代表宰相、二号人物。", calc: (yB) => getOffsetBranch(yB, 6) },
    { name: "病符", type: "Year", description: "代表旧事、病气，也称太上皇。", calc: (yB) => getOffsetBranch(yB, -1) },
    { name: "丧门", type: "Year", description: "主丧事。", calc: (yB) => getOffsetBranch(yB, 2) },
    { name: "吊客", type: "Year", description: "主吊丧之事。", calc: (yB) => getOffsetBranch(yB, -2) },
    { name: "官符", type: "Year", description: "主官司词讼。", calc: (yB) => getOffsetBranch(yB, 4) },
    { name: "白虎", type: "Year", description: "主血光凶丧。", calc: (yB) => getOffsetBranch(yB, -4) },
    { name: "岁墓", type: "Year", description: "主坟墓、病讼、宅灾。", calc: (yB) => getOffsetBranch(yB, -5) },
    { name: "岁刑", type: "Year", description: "主刑伤、官讼。", calc: (yB) => {
        const xingMap: Record<string, string> = {
            "子": "卯", "卯": "子",
            "寅": "巳", "巳": "申", "申": "寅",
            "丑": "戌", "戌": "未", "未": "丑",
            "辰": "辰", "午": "午", "酉": "酉", "亥": "亥"
        };
        return xingMap[yB] || "";
    }},
    { name: "天庭", type: "Year", description: "主朝堂之事。", calc: (yB, mB, dS, dB, yS) => {
         const luMap: Record<string, string> = {
             "甲": "寅", "乙": "卯", "丙": "巳", "丁": "午", "戊": "巳",
             "己": "午", "庚": "申", "辛": "酉", "壬": "亥", "癸": "子"
         };
         const lu = luMap[yS];
         if (!lu) return "";
         return getOffsetBranch(lu, -1);
    }},

    // --- Season Sha (季煞) ---
    { name: "天喜", type: "Season", description: "主喜庆、恩泽、胎产、官迁。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "戌";
        if (s === "夏") return "丑";
        if (s === "秋") return "辰";
        if (s === "冬") return "未";
        return "";
    }},
    { name: "皇书", type: "Season", description: "主科名、官职、考试。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "寅";
        if (s === "夏") return "巳";
        if (s === "秋") return "申";
        if (s === "冬") return "亥";
        return "";
    }},
    { name: "孤辰", type: "Season", description: "主孤独、婚姻不利。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "巳";
        if (s === "夏") return "申";
        if (s === "秋") return "亥";
        if (s === "冬") return "寅";
        return "";
    }},
    { name: "寡宿", type: "Season", description: "主孤独、婚姻不利。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "丑";
        if (s === "夏") return "辰";
        if (s === "秋") return "未";
        if (s === "冬") return "戌";
        return "";
    }},
    { name: "天赦", type: "Season", description: "主官讼解脱、免罪、恩赦。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "戊寅";
        if (s === "夏") return "甲午";
        if (s === "秋") return "戊申";
        if (s === "冬") return "甲子";
        return "";
    }},
    { name: "四废", type: "Season", description: "主百事无成。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "酉";
        if (s === "夏") return "子";
        if (s === "秋") return "卯";
        if (s === "冬") return "午";
        return "";
    }},
    { name: "丧车", type: "Season", description: "主病死。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "酉";
        if (s === "夏") return "子";
        if (s === "秋") return "卯";
        if (s === "冬") return "午";
        return "";
    }},
    { name: "火鬼", type: "Season", description: "主火灾。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "午";
        if (s === "夏") return "酉";
        if (s === "秋") return "子";
        if (s === "冬") return "卯";
        return "";
    }},
    { name: "浴盆", type: "Season", description: "小儿占病忌之。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "辰";
        if (s === "夏") return "未";
        if (s === "秋") return "戌";
        if (s === "冬") return "丑";
        return "";
    }},
    { name: "游神", type: "Season", description: "主飘荡、不稳定。", calc: (yB, mB) => {
        const s = seasons[mB as keyof typeof seasons];
        if (s === "春") return "丑";
        if (s === "夏") return "子";
        if (s === "秋") return "亥";
        if (s === "冬") return "戌";
        return "";
    }},

    // --- Month Sha (月煞) ---
    { name: "月德", type: "Month", description: "主化凶为吉，逢凶化吉。", calc: (yB, mB) => {
        if (["寅", "午", "戌"].includes(mB)) return "巳";
        if (["亥", "卯", "未"].includes(mB)) return "寅";
        if (["申", "子", "辰"].includes(mB)) return "亥";
        if (["巳", "酉", "丑"].includes(mB)) return "申";
        return "";
    }},
    { name: "月合", type: "Month", description: "主顺合吉庆。", calc: (yB, mB) => {
        const heMap: Record<string, string> = {
            "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯",
            "辰": "酉", "酉": "辰", "巳": "申", "申": "巳",
            "午": "未", "未": "午", "子": "丑", "丑": "子"
        };
        return heMap[mB] || "";
    }},
    { name: "生气", type: "Month", description: "主生发、解凶增吉，成就新事。", calc: (yB, mB) => getOffsetBranch(mB, -2) },
    { name: "死气", type: "Month", description: "主死丧、病讼、死亡之惊。", calc: (yB, mB) => getOffsetBranch(mB, 4) },
    { name: "死神", type: "Month", description: "主死丧、伤残。", calc: (yB, mB) => getOffsetBranch(mB, 3) }, // +4 -1 = +3
    { name: "月破", type: "Month", description: "主破坏、离散、事体不成。", calc: (yB, mB) => getOffsetBranch(mB, 6) },
    { name: "天德", type: "Month", description: "主化凶为吉，贵人扶助。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["未", "申", "亥", "戌", "亥", "寅", "丑", "寅", "巳", "辰", "巳", "申"];
        return map[ord] || "";
    }},
    { name: "天诏", type: "Month", description: "主君命、升迁、诏书之喜。", calc: (yB, mB) => getOffsetBranch(mB, -3) },
    { name: "天医", type: "Month", description: "主治病。", calc: (yB, mB) => getOffsetBranch(mB, 2) },
    { name: "天马", type: "Month", description: "主迁动、诏命、出行。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const horses = ["午", "申", "戌", "子", "寅", "辰"];
        return horses[ord % 6];
    }},
    { name: "天财", type: "Month", description: "主求财、谋望。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const money = ["辰", "午", "申", "戌", "子", "寅"];
        return money[ord % 6];
    }},
    { name: "成神", type: "Month", description: "主谋望事成。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["巳", "申", "亥", "寅"];
        return map[ord % 4];
    }},
    { name: "皇恩", type: "Month", description: "主皇恩庇护、官职升迁。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["未", "酉", "亥", "丑", "卯", "巳"];
        return map[ord % 6];
    }},
    { name: "天解", type: "Month", description: "主官讼解脱、免罪、消灾。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["申", "申", "戌", "戌", "子", "子", "寅", "寅", "辰", "辰", "午", "午"];
        return map[ord];
    }},
    { name: "月厌", type: "Month", description: "主妨婚娶、诡怪、盗贼。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const idx = (11 - ord + 12) % 12;
        return DiZhiArray[idx];
    }},
    { name: "大煞", type: "Month", description: "主灾速、家长凶。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["午", "卯", "子", "酉"];
        return map[ord % 4];
    }},
    { name: "小煞", type: "Month", description: "主小儿灾。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["丑", "戌", "未", "辰"];
        return map[ord % 4];
    }},
    { name: "天鬼", type: "Month", description: "主兵亡、产死、疫气。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["酉", "午", "卯", "子"];
        return map[ord % 4];
    }},
    { name: "天刑", type: "Month", description: "主官讼、囚系。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["寅", "辰", "午", "申", "戌", "子"];
        return map[ord % 6];
    }},
    { name: "天狱", type: "Month", description: "主系役、牢狱。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["亥", "申", "巳", "寅"];
        return map[ord % 4];
    }},
    { name: "劫煞", type: "Month", description: "主劫掠、阻碍、灾病。", calc: (yB, mB) => {
        if (["申", "子", "辰"].includes(mB)) return "巳";
        if (["寅", "午", "戌"].includes(mB)) return "亥";
        if (["巳", "酉", "丑"].includes(mB)) return "寅";
        if (["亥", "卯", "未"].includes(mB)) return "申";
        return "";
    }},
    { name: "亡神", type: "Month", description: "主失物、病讼、死亡。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["巳", "寅", "亥", "申"];
        return map[ord % 4];
    }},
    { name: "血支", type: "Month", description: "主血光、手术。", calc: (yB, mB) => getOffsetBranch(mB, -1) },
    { name: "血忌", type: "Month", description: "主血光、流血。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB); // Yin=0, Mao=1...
        // 阳月(寅辰午申戌子)自丑起顺行? No, text: 正月丑，二月未...
        const map = ["丑", "未", "寅", "申", "卯", "酉", "辰", "戌", "巳", "亥", "午", "子"];
        return map[ord] || "";
    }},
    { name: "天贼", type: "Month", description: "主盗贼、遗失。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB) + 1; // 1-12
        if (ord % 2 !== 0) {
            // 单月从辰起顺行六阳 (辰午申戌子寅)
            const map = ["辰", "午", "申", "戌", "子", "寅"];
            return map[Math.floor(ord/2)];
        } else {
            // 双月从酉起顺行六阴 (酉亥丑卯巳未)
            const map = ["酉", "亥", "丑", "卯", "巳", "未"];
            return map[Math.floor(ord/2) - 1];
        }
    }},
    { name: "奸门", type: "Month", description: "主奸淫不正。", calc: (yB, mB) => {
        const ord = getMonthOrdinal(mB);
        if (ord === -1) return "";
        const map = ["申", "亥", "寅", "巳"];
        return map[ord % 4];
    }},
    
    // --- Day Sha (日煞) ---
    { name: "日德", type: "Day", description: "主吉庆、贵人。", calc: (yB, mB, dS) => riDe[dS as keyof typeof riDe] || "" },
    { name: "日禄", type: "Day", description: "主财禄、食禄。", calc: (yB, mB, dS) => riLu[dS as keyof typeof riLu] || "" },
    { name: "破碎", type: "Day", description: "主破败、损耗。", calc: (yB, mB, dS, dB) => PoSui[dB as keyof typeof PoSui] || "" },
];

export const getShenSha = (date: DateInfo): ShenSha => {
    // Parsing Bazi
    const baziArr = date.bazi.split(" ");
    const yearPillar = baziArr[0];
    const yearStem = yearPillar.substring(0, 1);
    const yearBranch = yearPillar.substring(1, 2);
    
    const monthPillar = baziArr[1];
    const monthBranch = monthPillar.substring(1, 2);
    
    const dayPillar = baziArr[2];
    const dayStem = dayPillar.substring(0, 1);
    const dayBranch = dayPillar.substring(1, 2);

    const result: ShenSha = [];

    for (const rule of rules) {
        const val = rule.calc(yearBranch, monthBranch, dayStem, dayBranch, yearStem);
        if (val) {
            result.push({
                name: rule.name,
                value: val,
                description: rule.description
            });
        }
    }
    
    return result;
};
