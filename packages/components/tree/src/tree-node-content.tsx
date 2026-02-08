// 树节点的“内容渲染器”，决定每个节点最终展示的 UI 效果
import { defineComponent, inject } from 'vue'
import { treeInjectKey, treeNodeContentProps } from './tree'

export default defineComponent({
  name: 'MTreeNodeContent',
  props: treeNodeContentProps,
  // 组合式API入口
  setup(props) {
    // 从祖先组件获取共享的上下文（插槽信息）
    const treeContext = inject(treeInjectKey)
    const node = props.node
    // 返回组件的渲染函数，每当响应式数据变化时，该函数会重新执行。
    // 决定树节点使用什么内容，优先使用插槽，其次显示内容
    return () => {
      return treeContext?.slots.default
        ? treeContext?.slots.default({ node: node })
        : node.label
    }
  }
})
