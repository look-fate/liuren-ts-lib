import { getLiuRenByDate } from "../src";

describe("LiuRen Tests", () => {
    it("should return the liuren by date", () => {
        const result = getLiuRenByDate(new Date());
        console.log("LiuRen Result:", result);
    });
});