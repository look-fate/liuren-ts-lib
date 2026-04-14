# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 [tyme4ts](https://github.com/6tail/tyme4ts) 的大六壬 TypeScript 库。所有日历计算（八字、节气、空亡等）均由 tyme4ts 提供。

## 常用命令

```bash
pnpm build          # 构建（esbuild ESM/CJS + tsc 类型声明）
pnpm dev            # TypeScript 监听模式
pnpm test           # 运行 Jest 测试
pnpm test -- --watch          # 监听模式测试
pnpm test -- tests/xxx.test.ts  # 运行单个测试文件
pnpm lint           # ESLint 检查
pnpm fix            # ESLint 自动修复
pnpm ts             # 使用 tsx 直接运行 src/index.ts
```

## 架构

### 数据流

```
Date/四柱 → DateInfo → 天地盘 → 四课 → 三传 → 遁干/建除/神煞/阴阳贵人
```

### 核心模块

- **`src/common/date.ts`** - 日期处理入口，将 Date 或四柱转换为 `DateInfo`（八字、空亡、月将、驿马等）
- **`src/liuren/`** - 大六壬核心模块
  - `tianDiPan.ts` - 天地盘排布（月将加时）
  - `siKe.ts` - 四课计算
  - `sanChuan.ts` - 三传推演（含课体判定，规则存于 `sanchuan.json`）
  - `dunGan.ts` - 遁干/初建/复建（五子元遁）
  - `jianChu.ts` - 十二建除
  - `shenSha.ts` - 神煞
  - `yinYangGuiRen.ts` - 阴阳贵人天将盘
- **`src/maps/`** - 静态映射数据（干支、五行、月将、神将、神煞规则等）

### 关键类型

- `DateInfo` - 日期信息载体，贯穿所有计算
- `TianDiPan` - 天地盘（地盘/天盘/天将的十二宫映射）
- `SiKe` / `SanChuan` - 四课与三传
- `LiuRenResult` - 最终排盘结果

## 构建说明

- 使用 `build.mjs`（esbuild）并行构建 ESM 和 CJS 格式
- 类型声明由 TypeScript 单独生成到 `dist/types/`
- `tyme4ts` 被设为外部依赖，不打包进产物
