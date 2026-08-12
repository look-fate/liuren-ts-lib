import { getDateByYueJiang, getLiuRenByDate, getLiuRenByYueJiang } from "../src";

describe("LiuRen Tests", () => {
    it("should return the liuren by date", () => {
        const result = getLiuRenByDate(new Date());
        console.log("LiuRen Result:", result);
    });

    it("应直接根据亥将未时和丁巳日构造日期信息", () => {
        const dateInfo = getDateByYueJiang("亥", "未", "丁巳");

        expect(dateInfo).toEqual({
            bazi: "-- -- 丁巳 丁未",
            date: "",
            kong: ["子", "丑"],
            yima: "亥",
            yuejiang: "亥",
            xun: "甲寅",
            dingma: "巳",
            tianma: "午"
        });
    });

    it("提供月令时应使用月令精确计算天马", () => {
        const dateInfo = getDateByYueJiang("亥", "未", "丁巳", "未");

        expect(dateInfo.tianma).toBe("辰");
    });

    it("应复用现有核心算法完成古籍案例排盘", () => {
        const result = getLiuRenByYueJiang("亥", "未", "丁巳");

        expect(result.dateInfo.bazi).toBe("-- -- 丁巳 丁未");
        expect(result.tianDiPan.tianPan.wei).toBe("亥");
        expect(result.siKe.ke1).toHaveLength(2);
        expect(result.sanChuan.chuChuan).toHaveLength(4);
        expect(result.sanChuan.zhongChuan).toHaveLength(4);
        expect(result.sanChuan.moChuan).toHaveLength(4);
    });

    it("日干支非法时应明确拒绝排盘", () => {
        expect(() => getDateByYueJiang("亥", "未", "丁午")).toThrow(RangeError);
    });
});
