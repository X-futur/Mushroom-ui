<template>
  <div :class="bem.b()">
    <m-virtual-list :items="flattenTree" :remain="8" :size="38">
      <template #default="{ node }">
        <m-tree-node
          :key="node.key"
          :node="node"
          :expanded="isExpanded(node)"
          @toggle="toggleExpand"
          :loadingKeys="loadingKeysRefs"
          @select="handleSelect"
          :selectedKeys="selectedKeysRef"
        >
        </m-tree-node>
      </template>
    </m-virtual-list>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, useSlots, watch } from 'vue'
import {
  Key,
  treeEmits,
  treeInjectKey,
  TreeNode,
  TreeOption,
  treeProps
} from './tree'
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

// 通过格式化数据创建树
function createTree(data: TreeOption[], parent: TreeNode | null = null) {
  // 遍历数据，对用户输入的数据进行格式化，转为方便处理的数据结构
  function traversal(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      const children = treeOption.getChildren(node)
      const treeNode: TreeNode = {
        label: treeOption.getLabel(node),
        key: treeOption.getKey(node),
        children: [],
        isLeaf: node.isLeaf ?? children.length == 0,
        disabled: !!node.disabled,
        level: parent ? parent.level + 1 : 0,
        rawNode: node
      }
      if (children.length > 0) {
        treeNode.children = traversal(children, treeNode)
      }
      return treeNode
    })
  }

  const result: TreeNode[] = traversal(data, parent)
  return result
}

// 收集需要展开的key
const expandedKeySet = ref(new Set(props.defaultExpandedKeys))

// 拍平树，利用栈实现深度优先拍平，一旦出栈，子节点全部入栈
const flattenTree = computed(() => {
  // 需要拍平的数组
  let expendedKeys = expandedKeySet.value
  // 拍平之后的结果
  let flattenNodes: TreeNode[] = []
  // 用于处理的格式化之后的用户数据
  const nodes = tree.value || []
  const stack: TreeNode[] = []

  // 栈中逆序存放节点，保证出栈时顺序正确
  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }

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

function collapse(node: TreeNode) {
  expandedKeySet.value.delete(node.key)
}

function expand(node: TreeNode) {
  expandedKeySet.value.add(node.key)
  // 实现异步加载
  triggerLoading(node)
}

// 存储已经在加载中的节点
const loadingKeysRefs = ref(new Set<Key>())
function triggerLoading(node: TreeNode) {
  // 还没有子数据的父节点
  if (!node.children.length && !node.isLeaf) {
    const loadingKeys = loadingKeysRefs.value
    // 防抖控制，判断节点是否在加载中，已经在就不会多次发送请求
    if (!loadingKeys.has(node.key)) {
      loadingKeys.add(node.key)
      // 执行异步加载函数
      const onLoad = props.onLoad
      if (onLoad) {
        onLoad(node.rawNode).then(children => {
          node.rawNode.children = children
          node.children = createTree(children, node)
          loadingKeys.delete(node.key)
        })
      }
    }
  }
}

function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeySet.value
  if (expandKeys.has(node.key) && !loadingKeysRefs.value.has(node.key)) {
    collapse(node)
  } else {
    expand(node)
  }
}

const selectedKeysRef = ref<Key[]>([])
const emit = defineEmits(treeEmits)
function handleSelect(node: TreeNode) {
  let keys = Array.from(selectedKeysRef.value)
  // 如果不能选择，什么都不做
  if (!props.selectable) return
  // 单选模式
  if (!props.multiple) {
    // 选择的节点已经在了，清空数组，否则直接添加进去
    if (keys.includes(node.key)) keys = []
    else keys = [node.key]
  } else {
    // 多选模式，如果节点已经选中，则用过滤器过滤掉，否则添加节点进数组
    if (keys.includes(node.key)) keys = keys.filter(key => key !== node.key)
    else keys.push(node.key)
  }

  emit('update:selectedKeys', keys)
}

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
