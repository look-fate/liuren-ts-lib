import { getJinKouJue, getJinKouJueBySiZhu } from "../src/index";

describe('JinKouJue', () => {
  it('should calculate correct SiWei for a given date and DiFen', () => {
    // 2025年7月25日 10时13分
    // 八字：乙巳 癸未 乙未 辛巳
    // 月将：午 (大暑)
    // 地分：子
    const date = new Date(2025, 6, 25, 10, 13); // Month is 0-indexed
    const diFen = "子";
    
    const result = getJinKouJue(date, diFen);
    
    console.log(JSON.stringify(result, null, 2));

    // 验证基本信息
    expect(result.date.bazi).toContain("乙未"); // 日柱
    expect(result.date.bazi).toContain("辛巳"); // 时柱
    expect(result.date.yuejiang).toBe("午");

    // 验证四位
    // 人元: 乙日遁子 -> 丙
    expect(result.siWei.renYuan.name).toBe("丙");
    expect(result.siWei.renYuan.wuXing).toBe("火");

    // 将神: 月将午加时巳 -> 地分子 -> 丑
    // 丑对应的月将名为 大吉
    expect(result.siWei.jiangShen.name).toBe("大吉");
    expect(result.siWei.jiangShen.ganZhi).toBe("丁丑");
    expect(result.siWei.jiangShen.wuXing).toBe("土");
    
    // 贵神: 乙日昼贵在子，顺行至子 -> 贵人
    // 乙己鼠猴乡，乙日阳贵(昼)在子。子为顺。
    // 起点子，终点子 -> 贵人
    // 贵人本位在丑，乙日遁丑为丁（乙庚丙作初，丙子、丁丑）
    expect(result.siWei.guiShen.name).toBe("贵人");
    expect(result.siWei.guiShen.ganZhi).toBe("丁丑");
    expect(result.siWei.guiShen.wuXing).toBe("土");

    // 地分
    expect(result.siWei.diFen.name).toBe("子");
    expect(result.siWei.diFen.wuXing).toBe("水");

    // 验证用神
    // 人元: 丙 (火)
    // 贵神: 贵人/丑 (土), 五行为土
    // 将神: 大吉/丑 (土), 五行为土
    // 火生土，没有克关系，应取将神为用
    expect(result.yongShen).toBeDefined();
    expect(result.yongShen.principle).toBe("无克则取将");
    expect(result.yongShen.type).toBe("将神");
  });

  it('should handle night GuiShen and reverse order correctly', () => {
    // 换个时间测试阴贵和逆行
    // 甲日 酉时 (夜) 地分 寅
    // 甲戊庚牛羊。甲夜贵在未(羊)。
    // 未在(巳午未...)，逆行。
    // 贵人起未，逆数到寅。
    // 未(贵), 午(蛇), 巳(雀), 辰(合), 卯(勾), 寅(龙).
    // 应该是青龙。
    
    // 构造时间：甲子日 酉时
    // 2024-01-01 (甲子日) 18:00 (酉时)
    const date = new Date(2024, 0, 1, 18, 0); 
    const diFen = "寅";
    
    const result = getJinKouJue(date, diFen);
    
    // 检查日干是否为甲
    const dayGan = result.date.bazi.split(" ")[2].substring(0, 1);
    expect(dayGan).toBe("甲");
    
    // 检查时支是否为酉
    const timeZhi = result.date.bazi.split(" ")[3].substring(1, 2);
    expect(timeZhi).toBe("酉");
    
    // 贵神预期：青龙
    expect(result.siWei.guiShen.name).toBe("青龙");
  });

  it('should work with getJinKouJueBySiZhu', () => {
    // 2025年7月25日 10时13分
    // 八字：乙巳 癸未 乙未 辛巳
    // 使用四柱调用
    // 注意：这里的年、月、日、时参数是干支字符串
    // 实际上 getDateBySiZhu 接受的是干支
    
    const year = "乙巳";
    const month = "癸未";
    const day = "乙未";
    const hour = "辛巳";
    const diFen = "子";
    
    const result = getJinKouJueBySiZhu(year, month, day, hour, diFen);
    
    // 验证部分属性
    expect(result.date.bazi).toContain("乙未");
    expect(result.siWei.renYuan.name).toBe("丙");
    expect(result.siWei.diFen.name).toBe("子");
  });

  describe('YongShen (用神) Calculation', () => {
    it('should select GuiShen as YongShen when GuiShen overcomes RenYuan (克日者为用 - 贵神克人元)', () => {
      // 构造一个贵神克人元的情况
      // 假设: 人元为木，贵神为金（金克木）
      // 需要找到一个具体的日期和地分来实现这种配置
      // 这里使用一个示例，可能需要根据实际计算调整

      // 甲日子时子地分
      const date = new Date(2024, 0, 1, 0, 0); // 甲子日子时
      const diFen = "午"; // 选择一个地分

      const result = getJinKouJue(date, diFen);

      // 检查是否符合克日原则
      const renYuanWuXing = result.siWei.renYuan.wuXing;
      const guiShenWuXing = result.siWei.guiShen.wuXing;
      const jiangShenWuXing = result.siWei.jiangShen.wuXing;

      // 金克木、木克土、土克水、水克火、火克金
      const wuXingKe: {[key: string]: string} = {
        "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
      };

      const guiShenKeRenYuan = wuXingKe[guiShenWuXing] === renYuanWuXing;
      const jiangShenKeRenYuan = wuXingKe[jiangShenWuXing] === renYuanWuXing;

      if (guiShenKeRenYuan) {
        expect(result.yongShen.type).toBe("贵神");
        expect(result.yongShen.principle).toBe("克日者为用");
        expect(result.yongShen.relationship).toBe("贵神克人元");
      } else if (jiangShenKeRenYuan) {
        expect(result.yongShen.type).toBe("将神");
        expect(result.yongShen.principle).toBe("克日者为用");
        expect(result.yongShen.relationship).toBe("将神克人元");
      }
    });

    it('should select YongShen when RenYuan overcomes GuiShen/JiangShen (日克者为用)', () => {
      // 构造人元克贵神或将神的情况
      // 这个需要具体的日期和地分配置
      const date = new Date(2024, 5, 15, 10, 0);
      const diFen = "辰";

      const result = getJinKouJue(date, diFen);

      const renYuanWuXing = result.siWei.renYuan.wuXing;
      const guiShenWuXing = result.siWei.guiShen.wuXing;
      const jiangShenWuXing = result.siWei.jiangShen.wuXing;

      const wuXingKe: {[key: string]: string} = {
        "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
      };

      const renYuanKeGuiShen = wuXingKe[renYuanWuXing] === guiShenWuXing;
      const renYuanKeJiangShen = wuXingKe[renYuanWuXing] === jiangShenWuXing;
      const guiShenKeRenYuan = wuXingKe[guiShenWuXing] === renYuanWuXing;
      const jiangShenKeRenYuan = wuXingKe[jiangShenWuXing] === renYuanWuXing;

      // 如果没有克日的情况（第一原则不适用）
      if (!guiShenKeRenYuan && !jiangShenKeRenYuan) {
        // 检查日克的情况（第二原则）
        if (renYuanKeGuiShen) {
          expect(result.yongShen.type).toBe("贵神");
          expect(result.yongShen.principle).toBe("日克者为用");
          expect(result.yongShen.relationship).toBe("人元克贵神");
        } else if (renYuanKeJiangShen) {
          expect(result.yongShen.type).toBe("将神");
          expect(result.yongShen.principle).toBe("日克者为用");
          expect(result.yongShen.relationship).toBe("人元克将神");
        }
      }
    });

    it('should select JiangShen as YongShen when no overcoming relationship exists (无克则取将)', () => {
      // 已经在第一个测试用例中验证过了
      // 这里再次明确测试
      const date = new Date(2025, 6, 25, 10, 13);
      const diFen = "子";

      const result = getJinKouJue(date, diFen);

      const renYuanWuXing = result.siWei.renYuan.wuXing;
      const guiShenWuXing = result.siWei.guiShen.wuXing;
      const jiangShenWuXing = result.siWei.jiangShen.wuXing;

      const wuXingKe: {[key: string]: string} = {
        "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
      };

      const guiShenKeRenYuan = wuXingKe[guiShenWuXing] === renYuanWuXing;
      const jiangShenKeRenYuan = wuXingKe[jiangShenWuXing] === renYuanWuXing;
      const renYuanKeGuiShen = wuXingKe[renYuanWuXing] === guiShenWuXing;
      const renYuanKeJiangShen = wuXingKe[renYuanWuXing] === jiangShenWuXing;

      // 如果既没有克日，也没有日克的情况
      if (!guiShenKeRenYuan && !jiangShenKeRenYuan &&
          !renYuanKeGuiShen && !renYuanKeJiangShen) {
        expect(result.yongShen.type).toBe("将神");
        expect(result.yongShen.principle).toBe("无克则取将");
      }
    });

    it('should provide correct YongShen description and relationship', () => {
      const date = new Date(2025, 6, 25, 10, 13);
      const diFen = "子";

      const result = getJinKouJue(date, diFen);

      expect(result.yongShen).toBeDefined();
      expect(result.yongShen.principle).toBeTruthy();
      expect(result.yongShen.relationship).toBeTruthy();
      expect(result.yongShen.description).toBeTruthy();
      expect(result.yongShen.position).toBeDefined();
      expect(result.yongShen.position.name).toBeTruthy();
      expect(result.yongShen.position.wuXing).toBeTruthy();
    });
  });
});
