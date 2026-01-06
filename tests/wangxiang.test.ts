import { getWangXiangXiuQiu, getYueLingWuXing } from "../src/jinKouJue/index";

describe('WangXiangXiuQiu', () => {
  describe('getYueLingWuXing', () => {
    it('春季（寅卯）- 木旺', () => {
      expect(getYueLingWuXing("寅")).toBe("木");
      expect(getYueLingWuXing("卯")).toBe("木");
    });

    it('夏季（巳午）- 火旺', () => {
      expect(getYueLingWuXing("巳")).toBe("火");
      expect(getYueLingWuXing("午")).toBe("火");
    });

    it('秋季（申酉）- 金旺', () => {
      expect(getYueLingWuXing("申")).toBe("金");
      expect(getYueLingWuXing("酉")).toBe("金");
    });

    it('冬季（亥子）- 水旺', () => {
      expect(getYueLingWuXing("亥")).toBe("水");
      expect(getYueLingWuXing("子")).toBe("水");
    });

    it('四季（辰戌丑未）- 土旺', () => {
      expect(getYueLingWuXing("辰")).toBe("土");
      expect(getYueLingWuXing("戌")).toBe("土");
      expect(getYueLingWuXing("丑")).toBe("土");
      expect(getYueLingWuXing("未")).toBe("土");
    });
  });

  describe('getWangXiangXiuQiu', () => {
    it('春季（卯月）- 木旺火相土死金囚水休', () => {
      expect(getWangXiangXiuQiu("木", "卯")).toBe("旺");
      expect(getWangXiangXiuQiu("火", "卯")).toBe("相");
      expect(getWangXiangXiuQiu("土", "卯")).toBe("死");
      expect(getWangXiangXiuQiu("金", "卯")).toBe("囚");
      expect(getWangXiangXiuQiu("水", "卯")).toBe("休");
    });

    it('夏季（午月）- 火旺土相金死水囚木休', () => {
      expect(getWangXiangXiuQiu("火", "午")).toBe("旺");
      expect(getWangXiangXiuQiu("土", "午")).toBe("相");
      expect(getWangXiangXiuQiu("金", "午")).toBe("死");
      expect(getWangXiangXiuQiu("水", "午")).toBe("囚");
      expect(getWangXiangXiuQiu("木", "午")).toBe("休");
    });

    it('秋季（酉月）- 金旺水相木死火囚土休', () => {
      expect(getWangXiangXiuQiu("金", "酉")).toBe("旺");
      expect(getWangXiangXiuQiu("水", "酉")).toBe("相");
      expect(getWangXiangXiuQiu("木", "酉")).toBe("死");
      expect(getWangXiangXiuQiu("火", "酉")).toBe("囚");
      expect(getWangXiangXiuQiu("土", "酉")).toBe("休");
    });

    it('冬季（子月）- 水旺木相火死土囚金休', () => {
      expect(getWangXiangXiuQiu("水", "子")).toBe("旺");
      expect(getWangXiangXiuQiu("木", "子")).toBe("相");
      expect(getWangXiangXiuQiu("火", "子")).toBe("死");
      expect(getWangXiangXiuQiu("土", "子")).toBe("囚");
      expect(getWangXiangXiuQiu("金", "子")).toBe("休");
    });

    it('四季月（未月）- 土旺金相水死木囚火休', () => {
      expect(getWangXiangXiuQiu("土", "未")).toBe("旺");
      expect(getWangXiangXiuQiu("金", "未")).toBe("相");
      expect(getWangXiangXiuQiu("水", "未")).toBe("死");
      expect(getWangXiangXiuQiu("木", "未")).toBe("囚");
      expect(getWangXiangXiuQiu("火", "未")).toBe("休");
    });
  });
});
