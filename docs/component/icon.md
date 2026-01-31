# Icon 图标

推荐使用 xicons 作为图表库

```
pnpm install @vicons/ionicons5
```

## 使用图标

- 如果你想像用例一样直接在项目中使用图标，你需要全局注册组件

::: demo

```vue
<script setup lang="ts">
import { CashOutline } from '@vicons/ionicons5'
</script>

<template>
  <m-icon color="#bfc" size="40">
    <CashOutline />
  </m-icon>
  <m-icon color="skyblue" size="50">
    <CashOutline />
  </m-icon>
  <m-icon color="pink" size="60">
    <CashOutline />
  </m-icon>
</template>
```

:::

## API

Icon Props

| 名称  | 类型            | 默认值    | 说明 |
| ----- | --------------- | --------- | ---- |
| color | string          | undefined | 颜色 |
| size  | number\| string | undefined | 大小 |
