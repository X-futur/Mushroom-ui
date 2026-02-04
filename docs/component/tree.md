# Tree 树形控件

高效展示多层级的数据结构，内置**虚拟滚动**支持。

## 基础用法

::: demo

```vue
<template>
  <m-tree :data="treeData" />
</template>

<script setup>
const treeData = [
  {
    label: '道生一',
    key: '1',
    children: [
      {
        label: '一生二',
        key: '1-1',
        children: [{ label: '二生三', key: '1-1-1' }]
      }
    ]
  },
  { label: '三生万物', key: '2' }
]
</script>
```

:::

## 虚拟滚动渲染

Tree 组件默认集成了虚拟列表渲染，即使在万级节点下也能保持流畅。

::: demo

```vue
<template>
  <div style="height: 300px; border: 1px solid #eee;">
    <m-tree :data="largeData" />
  </div>
</template>

<script setup>
const createData = (level = 2, count = 20) => {
  const data = []
  for (let i = 0; i < count; i++) {
    const key = `${level}-${i}`
    data.push({
      label: `节点 ${key}`,
      key: key,
      children: level > 0 ? createData(level - 1, 5) : []
    })
  }
  return data
}
const largeData = createData()
</script>
```

:::

## API

### Tree Props

| 参数                    | 说明             | 类型           | 默认值       |
| ----------------------- | ---------------- | -------------- | ------------ |
| `data`                  | 数据源           | `TreeOption[]` | `[]`         |
| `label-field`           | 标签字段映射     | `string`       | `'label'`    |
| `key-field`             | 唯一标识字段映射 | `string`       | `'key'`      |
| `children-field`        | 子节点字段映射   | `string`       | `'children'` |
| `default-expanded-keys` | 默认展开的节点   | `Key[]`        | `[]`         |

### Tree Slots

| 插槽名    | 说明                              |
| --------- | --------------------------------- |
| `default` | 自定义节点内容。参数为 `{ node }` |
