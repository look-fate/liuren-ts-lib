# liuren-ts-lib

![NPM Version](https://img.shields.io/npm/v/liuren-ts-lib)
![License](https://img.shields.io/npm/l/liuren-ts-lib)
![size](https://img.shields.io/github/repo-size/look-fate/liuren-ts-lib)
![last commit](https://img.shields.io/github/last-commit/look-fate/liuren-ts-lib)

一个使用 TypeScript 编写的，基于 [tyme4ts](https://github.com/6tail/tyme4ts) 的大六壬 TypeScript 库。

## ✨ 特性

-   **大六壬排盘**：支持完整的大六壬排盘，包括天地盘、四课、三传、遁干、神煞等
-   **虚岁流年**：根据出生日期和性别计算流年
-   **完整的 TypeScript 支持**：提供完整的类型定义
-   **日期转换工具**：支持公历日期和四柱干支之间的转换
-   **灵活的 API**：支持多种输入方式（Date 对象或四柱干支）

## 📦 安装

```bash
# 使用 npm
npm install liuren-ts-lib

# 使用 yarn
yarn add liuren-ts-lib

# 使用 pnpm
pnpm add liuren-ts-lib
```

## 🔨 使用

### 大六壬排盘

#### 使用 Date 对象

```typescript
import { getLiuRenByDate } from 'liuren-ts-lib';

// 使用当前时间排盘
const result = getLiuRenByDate(new Date());

console.log(result);
// 输出包含：
// - dateInfo: 日期信息（八字、节气等）
// - tianDiPan: 天地盘（diPan, tianPan, tianJiang）
// - siKe: 四课（ke1, ke2, ke3, ke4）
// - sanChuan: 三传（chuChuan, zhongChuan, moChuan, keTi）
// - dunGan/chuJian/fuJian/jianChu: 各种遁干
// - shenSha: 神煞列表
// - yinYangGuiRen: 阴阳贵人天将盘
```

#### 使用四柱干支

```typescript
import { getLiuRenBySiZhu } from 'liuren-ts-lib';

// 直接使用四柱干支排盘
const result = getLiuRenBySiZhu('甲子', '丙寅', '戊辰', '庚午');

console.log(result);
```

### 虚岁流年计算

```typescript
import { getNianMing } from 'liuren-ts-lib';

// 计算流年
const birthDate = new Date('1990-01-01');

const result = getNianMing(birthDate, "男"); // 或 "女"

console.log(result);
// 输出包含：
// - year: 出生年份干支
// - gender: 性别（"男" 或 "女"）
// - luNian: 当前流年干支
```

### 日期工具函数

```typescript
import { getDateByObj, getDateBySiZhu } from 'liuren-ts-lib';

// 从 Date 对象获取日期信息
const dateInfo = getDateByObj(new Date());
console.log(dateInfo.bazi); // 八字
console.log(dateInfo.yuejiang); // 月将

// 从四柱干支获取日期信息
const dateInfo2 = getDateBySiZhu('甲子', '丙寅', '戊辰', '庚午');
console.log(dateInfo2.bazi); // 八字
```

## 📚 API 文档

### 主要函数

#### `getLiuRenByDate(time: Date): LiuRenResult`

使用 Date 对象进行大六壬排盘。

**参数**:
- `time`: Date - 需要排盘的日期时间

**返回值**: `LiuRenResult` - 包含完整的六壬排盘结果

#### `getLiuRenBySiZhu(year: string, month: string, day: string, hour: string): LiuRenResult`

使用四柱干支进行大六壬排盘。

**参数**:
- `year`: string - 年柱干支，如 "甲子"
- `month`: string - 月柱干支，如 "丙寅"
- `day`: string - 日柱干支，如 "戊辰"
- `hour`: string - 时柱干支，如 "庚午"

**返回值**: `LiuRenResult` - 包含完整的六壬排盘结果

#### `getNianMing(birthDate: Date, gender: Gender): LuNianResult`

计算虚岁流年。

**参数**:
- `birthDate`: Date - 出生日期
- `gender`: Gender - 性别（`"男"` 或 `"女"`）

**返回值**: `LuNianResult` - 包含流年信息

#### 工具函数

##### `getDateByObj(time: Date): DateInfo`

将 Date 对象转换为包含八字、节气等信息的 DateInfo 对象。

##### `getDateBySiZhu(year: string, month: string, day: string, hour: string): DateInfo`

将四柱干支转换为 DateInfo 对象。

## 📖 类型定义

### ShiErGong

十二宫类型，使用拼音键名。

```typescript
interface ShiErGong {
    zi: string;    // 子
    chou: string;  // 丑
    yin: string;   // 寅
    mao: string;   // 卯
    chen: string;  // 辰
    si: string;    // 巳
    wu: string;    // 午
    wei: string;   // 未
    shen: string;  // 申
    you: string;   // 酉
    xu: string;    // 戌
    hai: string;   // 亥
}
```

### LiuRenResult

大六壬排盘结果。

```typescript
interface LiuRenResult {
    dateInfo: DateInfo;           // 日期信息
    tianDiPan: TianDiPan;         // 天地盘
    siKe: SiKe;                   // 四课
    sanChuan: SanChuan;           // 三传
    dunGan: ShiErGong;            // 遁干
    chuJian: ShiErGong;           // 初建（日干五子元遁）
    fuJian: ShiErGong;            // 复建（时干五子元遁）
    jianChu: ShiErGong;           // 十二建除
    shenSha: ShenSha;             // 神煞
    yinYangGuiRen: YinYangGuiRen; // 阴阳贵人天将盘
}
```

### TianDiPan

天地盘，包含地盘、天盘和天将的十二宫分布。

```typescript
interface TianDiPan {
    diPan: ShiErGong;      // 地盘十二宫
    tianPan: ShiErGong;    // 天盘十二宫
    tianJiang: ShiErGong;  // 天将十二宫
}
```

### SiKe

四课信息。

```typescript
interface SiKe {
    ke1: string[];  // 一课
    ke2: string[];  // 二课
    ke3: string[];  // 三课
    ke4: string[];  // 四课
}
```

### SanChuan

三传信息。

```typescript
interface SanChuan {
    chuChuan: string[];   // 初传
    zhongChuan: string[]; // 中传
    moChuan: string[];    // 末传
    keTi: string;         // 课体名称
}
```

### YinYangGuiRen

阴阳贵人天将盘。

```typescript
interface YinYangGuiRen {
    yangGuiRen: ShiErGong;  // 阳贵人天将
    yinGuiRen: ShiErGong;   // 阴贵人天将
}
```

### 辅助工具

提供中文地支与拼音之间的转换：

```typescript
import { DiZhiToPinyin, PinyinToDiZhi } from 'liuren-ts-lib';

DiZhiToPinyin["子"]  // => "zi"
PinyinToDiZhi["zi"]  // => "子"
```

## 🛠️ 开发

### 克隆仓库

```bash
git clone https://github.com/look-fate/liuren-ts-lib.git
cd liuren-ts-lib
```

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 监听文件变化并自动编译
pnpm dev
```

### 构建

```bash
# 构建所有格式（ESM、CJS、Types）
pnpm build
```

### 测试

```bash
pnpm test
```

### 代码检查

```bash
# 检查代码风格
pnpm lint

# 自动修复代码风格问题
pnpm fix
```

## 🤝 贡献

欢迎贡献代码、报告问题或提出新功能建议！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📝 相关资源

- [tyme4ts](https://github.com/6tail/tyme4ts) - 强大的日历工具库
- [六壬基础知识](https://baike.baidu.com/item/大六壬)

## 📄 版权与协议

本仓库代码遵循 [Apache 2.0](https://github.com/look-fate/liuren-ts-lib/blob/main/LICENSE) 协议。

**本项目仅供个人学习和研究使用，严禁用于任何商业用途。**

---

由 [www.lookfate.com](https://www.lookfate.com/) 提供的 技术支持。 