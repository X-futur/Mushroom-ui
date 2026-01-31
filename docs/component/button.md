# Button 按钮

基础的按钮组件。

## 使用方法

::: demo

```vue
<template>
  <m-button type="primary">主要按钮</m-button>
  <m-button type="success" round>圆角按钮</m-button>
  <m-button size="small" loading>加载中</m-button>
</template>
```

:::

## API

### Button Props

| 名称          | 类型      | 默认值      | 说明                                                                                |
| ------------- | --------- | ----------- | ----------------------------------------------------------------------------------- |
| type          | `string`  | `''`        | 按钮类型，可选值：`primary` / `success` / `warning` / `danger` / `info` / `default` |
| size          | `string`  | `undefined` | 按钮尺寸，可选值：`small` / `medium` / `large`                                      |
| round         | `boolean` | `false`     | 是否为圆角按钮                                                                      |
| loading       | `boolean` | `false`     | 是否显示加载状态                                                                    |
| disabled      | `boolean` | `false`     | 是否禁用按钮                                                                        |
| nativeType    | `string`  | `'button'`  | 原生 type 属性，可选值：`button` / `submit` / `reset`                               |
| iconPlacement | `string`  | `'left'`    | 图标展示位置，可选值：`left` / `right`                                              |

### Button Events

| 事件名称  | 回调参数                  | 说明           |
| --------- | ------------------------- | -------------- |
| click     | `(e: MouseEvent) => void` | 点击按钮时触发 |
| mousedown | `(e: MouseEvent) => void` | 鼠标按下时触发 |
