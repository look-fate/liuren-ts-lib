import { riDe, riLu, ShengQi, SiQi, PoSui } from "../maps/shensha";
import { DateInfo } from "./date";
import { ShenSha } from "../type";

export const getShenSha = (date: DateInfo): ShenSha => {
    const baziArr = date.bazi.split(" ");
    
    // Year Pillar is at index 0
    const yearPillar = baziArr[0];
    const yearBranch = yearPillar.substring(1, 2);

    // Day Pillar is at index 2
    const dayPillar = baziArr[2];
    const dayStem = dayPillar.substring(0, 1);
    const dayBranch = dayPillar.substring(1, 2);

    // Month Pillar is at index 1
    const monthPillar = baziArr[1];
    const monthBranch = monthPillar.substring(1, 2);

    // Get values from maps
    const riDeVal = riDe[dayStem as keyof typeof riDe] || "";
    const riLuVal = riLu[dayStem as keyof typeof riLu] || "";
    const shengQiVal = ShengQi[monthBranch as keyof typeof ShengQi] || "";
    const siQiVal = SiQi[monthBranch as keyof typeof SiQi] || "";
    const poSuiVal = PoSui[dayBranch as keyof typeof PoSui] || "";

    // Calculate SangMen and DiaoKe
    const branches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    const yearBranchIndex = branches.indexOf(yearBranch);
    
    // SangMen: TaiSui + 2
    const sangMenVal = branches[(yearBranchIndex + 2) % 12];
    
    // DiaoKe: TaiSui - 2 (or + 10)
    const diaoKeVal = branches[(yearBranchIndex + 10) % 12];

    return {
        riDe: riDeVal,
        riLu: riLuVal,
        shengQi: shengQiVal,
        siQi: siQiVal,
        poSui: poSuiVal,
        sangMen: sangMenVal,
        diaoKe: diaoKeVal
    };
}
