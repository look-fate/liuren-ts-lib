# liuren-ts-lib

![NPM Version](https://img.shields.io/npm/v/liuren-ts-lib)
![License](https://img.shields.io/npm/l/liuren-ts-lib)
![size](https://img.shields.io/github/repo-size/let-fate/liuren-ts-lib)
![last commit](https://img.shields.io/github/last-commit/let-fate/liuren-ts-lib)

一个使用 TypeScript 编写的，基于 [tyme4ts](https://github.com/6tail/tyme4ts) 的六壬神课与金口诀 TypeScript 库。

## ✨ 特性

-   **大六壬排盘**：支持完整的大六壬排盘，包括天地盘、四课、三传、遁干、神煞等
-   **金口诀排盘**：支持金口诀起课，包括四位（人元、贵神、将神、地分）、用神、动爻、神煞等
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
// - tiandipan: 天地盘（地盘、天盘、天将）
// - siKe: 四课
// - sanChuan: 三传（初传、中传、末传、课体）
// - dunGan: 遁干
// - shenSha: 神煞列表
```

#### 使用四柱干支

```typescript
import { getLiuRenBySiZhu } from 'liuren-ts-lib';

// 直接使用四柱干支排盘
const result = getLiuRenBySiZhu('甲子', '丙寅', '戊辰', '庚午');

console.log(result);
```

### 金口诀排盘

#### 使用 Date 对象

```typescript
import { getJinKouJueByDate } from 'liuren-ts-lib';

// 地分为起课的关键要素，这里使用"子"作为示例
const diFen = '子';
const result = getJinKouJueByDate(new Date(), diFen);

console.log(result);
// 输出包含：
// - date: 日期信息
// - diFen: 地分
// - siWei: 四位（人元、贵神、将神、地分）
// - shenSha: 神煞列表
```

#### 使用四柱干支

```typescript
import { getJinKouJueBySiZhu } from 'liuren-ts-lib';

const diFen = '子';
const result = getJinKouJueBySiZhu('甲子', '丙寅', '戊辰', '庚午', diFen);

console.log(result);
```

### 虚岁流年计算

```typescript
import { getNianMing } from 'liuren-ts-lib';

// 计算流年，gender: 1 为男，2 为女
const birthDate = new Date('1990-01-01');
const gender = 1;

const result = getNianMing(birthDate, gender);

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
console.log(dateInfo.yueJiang); // 月将

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

#### `getJinKouJueByDate(time: Date, diFen: string): JinKouJueResult`

使用 Date 对象进行金口诀起课。

**参数**:
- `time`: Date - 需要起课的日期时间
- `diFen`: string - 地分（十二地支之一），如 "子"、"丑"等

**返回值**: `JinKouJueResult` - 包含完整的金口诀起课结果

#### `getJinKouJueBySiZhu(year: string, month: string, day: string, hour: string, diFen: string): JinKouJueResult`

使用四柱干支进行金口诀起课。

**参数**:
- `year`: string - 年柱干支
- `month`: string - 月柱干支
- `day`: string - 日柱干支
- `hour`: string - 时柱干支
- `diFen`: string - 地分（十二地支之一）

**返回值**: `JinKouJueResult` - 包含完整的金口诀起课结果

#### `getNianMing(time: Date, gender: number): LuNianResult`

计算虚岁流年。

**参数**:
- `time`: Date - 出生日期
- `gender`: number - 性别（1 为男，2 为女）

**返回值**: `LuNianResult` - 包含流年信息

#### 工具函数

##### `getDateByObj(time: Date): DateInfo`

将 Date 对象转换为包含八字、节气等信息的 DateInfo 对象。

##### `getDateBySiZhu(year: string, month: string, day: string, hour: string): DateInfo`

将四柱干支转换为 DateInfo 对象。

## 📖 类型定义

### LiuRenResult

大六壬排盘结果。

```typescript
interface LiuRenResult {
    dateInfo?: DateInfo;      // 日期信息
    tiandipan?: TianDiPan;    // 天地盘
    siKe?: SiKe;              // 四课
    sanChuan?: SanChuan;      // 三传
    dunGan?: ShiErGongEx;     // 遁干
    shenSha?: ShenSha;        // 神煞
}
```

### TianDiPan

天地盘，包含地盘、天盘和天将的十二宫分布。

```typescript
interface TianDiPan {
    "地盘": ShiErGong;  // 地盘十二宫
    "天盘": ShiErGong;  // 天盘十二宫
    "天将": ShiErGong;  // 天将十二宫
}
```

### SiKe

四课信息。

```typescript
interface SiKe {
    "一课": string[];  // 第一课
    "二课": string[];  // 第二课
    "三课": string[];  // 第三课
    "四课": string[];  // 第四课
}
```

### SanChuan

三传信息。

```typescript
interface SanChuan {
    "初传": string[];  // 初传
    "中传": string[];  // 中传
    "末传": string[];  // 末传
    "课体": string;    // 课体名称
}
```

### JinKouJueResult

金口诀起课结果。

```typescript
interface JinKouJueResult {
    date: DateInfo;           // 日期信息
    diFen: string;            // 地分
    siWei: SiWei;             // 四位（人元、贵神、将神、地分）
    shenSha: ShenShaInfo[];   // 神煞列表
}
```

### SiWei

金口诀四位信息。

```typescript
interface SiWei {
    renYuan: Position;    // 人元（干）
    guiShen: Position;    // 贵神（神）
    jiangShen: Position;  // 将神（将）
    diFen: Position;      // 地分（方）
}
```

### Position

位置信息，包含名称、干支、五行等。

```typescript
interface Position {
    name: string;              // 名称
    ganZhi: string;            // 对应的干支/地支
    wuXing: string;            // 五行
    wangXiangXiuQiu?: string;  // 旺相休囚死状态
}
```


### ShenShaInfo

神煞信息。

```typescript
interface ShenShaInfo {
    name: string;           // 神煞名称
    value: string;          // 触发神煞的干支
    position: string[];     // 所在位置
    description: string;    // 作用说明
    type: '吉' | '凶';     // 吉凶属性
}
```

## 🛠️ 开发

### 克隆仓库

```bash
git clone https://github.com/let-fate/liuren-ts-lib.git
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

# 单独构建
pnpm build:esm   # 构建 ESM 格式
pnpm build:cjs   # 构建 CJS 格式
pnpm build:types # 生成类型声明文件
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

## 📝 示例项目

查看 [examples](./examples) 目录获取更多使用示例（如果有的话）。

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
- [金口诀基础知识](https://baike.baidu.com/item/金口诀)

## 📜 脚本

-   `pnpm build`: 编译 TypeScript 代码。
-   `pnpm dev`: 监听文件变化并自动编译。
-   `pnpm test`: 运行测试。
-   `pnpm lint`: 检查代码风格。
-   `pnpm fix`: 自动修复代码风格问题。

## 📄 版权与协议

本仓库代码遵循 [Apache 2.0](https://github.com/let-fate/liuren-ts-lib/blob/main/LICENSE) 协议。

**本项目仅供个人学习和研究使用，严禁用于任何商业用途。**

---

由 [www.lookfate.com](https://www.lookfate.com/) 提供的 技术支持。 