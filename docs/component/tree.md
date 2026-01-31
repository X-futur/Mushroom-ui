# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示。通过 `data` 属性传入数据，`label-field` 指定显示的字段。

::: demo

```vue
<template>
  <m-tree :data="data" label-field="label" key-field="key" />
</template>

<script setup>
const data = [
  {
    label: '节点 1',
    key: '1',
    children: [{ label: '节点 1-1', key: '1-1' }]
  },
  { label: '节点 2', key: '2' }
]
</script>
```

:::

---

## 已实现功能特性

根据当前源码实现，Tree 组件包含以下核心功能：

1. **虚拟滚动 (Virtual List)**：支持大数据量渲染，通过 `virtual-list` 及其相关组件实现高性能展示。
2. **异步加载 (Lazy Load)**：支持通过 `load` 函数动态获取子节点数据。
3. **多选功能 (Checkbox)**：通过 `show-checkbox` 开启复选框，支持选中状态管理。
4. **自定义节点内容**：支持使用插槽或 `render-label` 函数自定义节点渲染逻辑。
5. **默认展开与选中**：支持 `default-expanded-keys` 和 `default-checked-keys`。

---

## 功能展示与用法

### 1. 异步加载数据

当节点较多时，可以使用 `lazy` 模式。

::: demo

```vue
<template>
  <m-tree :data="data" :load="loadNodes" lazy />
</template>

<script setup>
const loadNodes = node => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { label: '子节点 A', key: Date.now() + 'A' },
        { label: '子节点 B', key: Date.now() + 'B' }
      ])
    }, 1000)
  })
}
</script>
```

:::

### 2. 节点禁用

通过数据中的 `disabled: true` 属性或配置 `disabled-field` 来禁用特定节点。

---

## API 参考

### Tree 属性 (Props)

| 参数                    | 说明                               | 类型       | 默认值       |
| ----------------------- | ---------------------------------- | ---------- | ------------ |
| `data`                  | 展示数据                           | `Array`    | `[]`         |
| `label-field`           | 指定节点标签为数据对象的某个属性值 | `string`   | `'label'`    |
| `key-field`             | 每个树节点用来作为唯一标识的属性   | `string`   | `'key'`      |
| `children-field`        | 指定子树为数据对象的某个属性值     | `string`   | `'children'` |
| `default-expanded-keys` | 默认展开的节点的 key 的数组        | `Array`    | `[]`         |
| `show-checkbox`         | 节点是否可被选择                   | `boolean`  | `false`      |
| `lazy`                  | 是否懒加载子节点                   | `boolean`  | `false`      |
| `load`                  | 加载子树数据的方法                 | `Function` | -            |

### Tree 插槽 (Slots)

| 插槽名    | 说明                                        |
| --------- | ------------------------------------------- |
| `default` | 自定义树节点的内容。参数为 `{ node, data }` |

---

## 源代码摘要

### 组件定义 (`packages/components/tree/index.ts`)

组件通过 `withInstall` 导出，支持全局注册。

```typescript
import { withInstall } from '@x-future/utils/withInstall'
import _Tree from './src/tree.vue'

export const MTree = withInstall(Tree)
export default MTree
```

### 核心逻辑摘要 (`packages/components/tree/src/tree.vue`)

组件内部使用了 `tree-node` 进行递归渲染或配合虚拟列表渲染。

```html
<template>
  <div :class="ns.b()">
    <m-virtual-list :items="flattenTree" :remain="8">
      <template #default="{ node }">
        <m-tree-node
          :node="node"
          :label-field="labelField"
          :key-field="keyField"
          ...
        />
      </template>
    </m-virtual-list>
  </div>
</template>
```
