# Mushroom-ui

基于 Vue 3 + TypeScript 的轻量级组件库，采用 PNPM Monorepo 架构开发。

## 🌟 项目特性

- **技术栈**：Vue 3 + TypeScript + TSX。
- **管理工具**：使用 PNPM Workspace 管理多包（Monorepo）。
- **构建工具**：基于 Vite/Rolldown 驱动，支持高性能开发预览。
- **规范化**：内置 ESLint + Prettier + EditorConfig 代码规范控制。
- **文档系统**：基于 VitePress 的组件文档说明。
- **虚拟滚动**：Tree 等组件原生支持高性能虚拟列表渲染。

## 📂 目录结构

```text
vue3-component
├── docs/               # 组件库文档 (VitePress)
├── packages/           # 核心代码库
│   ├── components/     # 组件源码 (Button, Icon, Tree等)
│   ├── theme-chalk/    # 样式系统 (SCSS/BEM规范)
│   └── utils/          # 公共工具函数 (withInstall等)
├── play/               # 组件本地测试/演练场
├── pnpm-workspace.yaml # Monorepo 配置文件
└── package.json        # 项目根配置

```

## 🚀 快速开始

### 安装依赖

项目使用 PNPM，请确保已安装 [PNPM 10+](cite: 55)。

```bash
pnpm install

```

### 本地开发预览

启动 `play` 演练场进行组件调试：

```bash
pnpm run dev

```

### 运行文档

查看组件库文档说明：

```bash
pnpm run doc:dev

```

## 🛠 组件使用指南

### 已实现组件

- **Button 按钮**：支持多种尺寸、类型、圆角及加载状态。
- **Icon 图标**：基于 SVG 容器，支持离子图标集成。
- **Tree 树形控件**：支持多层级数据展示及大数据量虚拟滚动渲染。

### 示例代码

```vue
<template>
  <m-button type="primary" @click="handleClick">主要按钮</m-button>
  <m-tree :data="treeData" />
</template>

<script setup>
import { MButton, MTree } from '@x-future/components'
// ...逻辑代码
</script>
```

## 📦 打包与发布

1. **构建全量组件与样式**：

```bash
pnpm -w run build

```

2. **发布至 NPM**：

```bash
pnpm -r publish --access public

```

## 📜 开源协议

本项目采用 [ISC License](cite: 55) 开源协议。
