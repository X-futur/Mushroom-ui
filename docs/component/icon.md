# Icon 图标

基于 SVG 的图标容器，支持自定义颜色、大小，并能与第三方图标库（如 `ionicons5`）无缝集成。

## 基础用法

可以直接设置 `color` 和 `size` 属性。

<!-- prettier-ignore-->
:::demo

```vue
<script setup lang="ts">
import { AddCircle, AlarmOutline, BoatOutline } from '@vicons/ionicons5'
</script>

<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <m-icon color="#409eff" size="30">
      <AddCircle />
    </m-icon>
    <m-icon color="#67c23a" size="40">
      <AlarmOutline />
    </m-icon>
    <m-icon color="#f56c6c" size="50">
      <BoatOutline />
    </m-icon>
  </div>
</template>
```

:::

## API

### Icon Props

| 参数    | 说明                 | 类型                | 默认值 |
| ------- | -------------------- | ------------------- | ------ |
| `color` | 图标颜色             | `string`            | -      |
| `size`  | 图标大小（单位：px） | `number` / `string` | -      |

```

```
