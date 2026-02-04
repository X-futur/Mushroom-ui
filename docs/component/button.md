# Button 按钮

基础的按钮组件，用于触发特定操作。

## 基础用法

通过 `type` 定义按钮样式，`round` 定义圆角。

::: demo

```vue
<template>
  <div style="display: flex; gap: 10px; align-items: center;">
    <m-button>默认按钮</m-button>
    <m-button type="primary">主要按钮</m-button>
    <m-button type="success" round>成功按钮</m-button>
    <m-button type="danger">危险按钮</m-button>
  </div>
</template>
```

:::

## 尺寸与加载状态

支持多种尺寸，并内置了加载动画。

::: demo

```vue
<template>
  <div style="display: flex; gap: 10px; align-items: center;">
    <m-button size="small">小型按钮</m-button>
    <m-button size="large" type="warning">大型按钮</m-button>
    <m-button type="primary" loading>加载中</m-button>
    <m-button type="info" disabled>禁用按钮</m-button>
  </div>
</template>
```

:::

## API

### Button Props

| 参数             | 说明                  | 类型                                                              | 默认值   |
| ---------------- | --------------------- | ----------------------------------------------------------------- | -------- |
| `type`           | 类型                  | `primary` / `success` / `warning` / `danger` / `info` / `default` | `''`     |
| `size`           | 尺寸                  | `tiny` / `small` / `medium` / `large`                             | `medium` |
| `round`          | 是否为圆角            | `boolean`                                                         | `false`  |
| `loading`        | 是否显示加载中        | `boolean`                                                         | `false`  |
| `disabled`       | 是否禁用              | `boolean`                                                         | `false`  |
| `native-type`    | 原生 button type 属性 | `button` / `submit` / `reset`                                     | `button` |
| `icon-placement` | 图标位置              | `left` / `right`                                                  | `left`   |

### Button Events

| 事件名      | 说明           | 回调参数          |
| ----------- | -------------- | ----------------- |
| `click`     | 点击按钮时触发 | `(e: MouseEvent)` |
| `mousedown` | 鼠标按下时触发 | `(e: MouseEvent)` |
