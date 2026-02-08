<template>
  <div :class="bem.b()">
    <!-- 循环取到每个元素并渲染 -->
    <m-virtual-list :items="flattenTree" :remain="5" :size="38">
      <template #default="{ node }">
        <m-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          @toggle="toggleExpand"
          :loadingKeys="loadingKeysRefs"
        >
        </m-tree-node>
      </template>
    </m-virtual-list>
  </div>

  <!-- 不使用虚拟列表 -->
  <!-- <div :class="bem.b()">
    <m-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      @toggle="toggleExpand"
      :loadingKeys="loadingKeysRefs"
    >
    </m-tree-node>
  </div> -->
</template>

<script lang="ts" setup>
import { computed, provide, ref, useSlots, watch } from 'vue'
import { Key, treeInjectKey, TreeNode, TreeOption, treeProps } from './tree'
import { createNamespace } from '@x-future/utils/create'
import MTreeNode from './treeNode.vue'
import MVirtualList from '@x-future/components/virtual-list'

defineOptions({
  name: 'MTree'
})

const bem = createNamespace('tree')

const props = defineProps(treeProps)
// props.data格式化之后放到tree中
const tree = ref<TreeNode[]>([])

// 创建用于访问树节点的函数，防止后端返回参数名称错误
// 定义工具集、方法库，实例化createOption之后，在调用具体方法的时候会传入node
function createOption(label: string, key: string, children: string) {
  return {
    getLabel(node: TreeOption) {
      return node[label] as string
    },
    getKey(node: TreeOption) {
      return node[key] as string
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[]
    }
  }
}

// 实例
const treeOption = createOption(
  props.labelField,
  props.keyField,
  props.childrenField
)

// 通过格式化数据创建数据格式标准的树
// 接口与分离，写成两层外部调用时不用考虑父节点，可以做一些只需要执行一次的操作（定义treeOption）
// 内层做具体处理
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  // 遍历数据，对用户输入的数据进行格式化，转为方便处理的数据结构
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOption.getChildren(node)
      const treeNode: TreeNode = {
        label: treeOption.getLabel(node),
        key: treeOption.getKey(node),
        children: [],
        // 空值运算符，左侧为空则执行右侧
        isLeaf: node.isLeaf ?? children.length == 0,
        // 强制转换为bool值
        disabled: !!node.disabled,
        level: parent ? parent.level + 1 : 0,
        rawNode: node
      }
      // 递归标准化节点的孩子
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }

  const result: TreeNode[] = traversal(data, parent)
  return result
}

// 定义集合收集需要展开的key
const expandedKeySet = ref(new Set(props.defaultExpandedKeys))

// 拍平树，利用栈实现深度优先拍平，一旦出栈，子节点全部入栈
// 是计算属性，会根据expandedKeySet变化重新计算
const flattenTree = computed(() => {
  // 需要拍平的数组，已展开的才需要拍平
  let expendedKeys = expandedKeySet.value
  // 拍平之后的结果
  let flattenNodes: TreeNode[] = []
  // 格式化之后的用户数据
  const nodes = tree.value || []
  const stack: TreeNode[] = []

  // 栈中逆序存放节点，保证出栈时顺序正确
  // 第一层
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }

  // 利用栈实现数组的DFS
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    flattenNodes.push(node)
    // 判断是否是需要展开的节点，需要展开再把子节点放入
    if (expendedKeys.has(node.key)) {
      const children = node.children
      if (children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push(node.children[i])
        }
      }
    }
  }
  return flattenNodes
})

function isExpanded(node: TreeNode): boolean {
  return expandedKeySet.value.has(node.key)
}

// 收折逻辑
function collapse(node: TreeNode) {
  expandedKeySet.value.delete(node.key)
}

// 展开逻辑
function expand(node: TreeNode) {
  expandedKeySet.value.add(node.key)
  // 这里可实现异步加载
}

// 存储已经在加载中的节点
const loadingKeysRefs = ref(new Set<Key>())

// 切换展开收起状态
function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeySet.value
  // 节点已展开且不在加载状态中
  if (expandKeys.has(node.key) && !loadingKeysRefs.value.has(node.key)) {
    collapse(node)
  } else {
    // 未展开执行展开逻辑
    expand(node)
  }
}

// 跨组件共享插槽内容
provide(treeInjectKey, {
  slots: useSlots()
})

watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
  },
  { immediate: true }
)
</script>

<style></style>
