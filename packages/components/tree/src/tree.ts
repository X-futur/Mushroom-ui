import { InjectionKey, PropType, SetupContext } from 'vue'

// 定义类型
export type Key = string | number

// 用户拿到的原始数据类型
export interface TreeOption {
  label?: Key
  key?: Key
  children?: TreeOption[]
  isLeaf?: boolean
  disabled?: boolean
  [key: string]: unknown
}

export interface TreeNode extends Required<TreeOption> {
  level: number
  rawNode: TreeOption
  children: TreeNode[]
  isLeaf: boolean
}

// 定义属性配置
// <m-tree label-field="'name'" ... /> 可在标签中自定义属性名，防止后端传入数据格式紊乱
export const treeProps = {
  data: {
    type: Array as PropType<TreeOption[]>,
    default: () => []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  onLoad: Function as PropType<(node: TreeOption) => Promise<TreeOption[]>>,
  multiple: {
    type: Boolean,
    deault: false
  }
} as const

export const TreeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    required: true
  },
  loadingKeys: {
    type: Object as PropType<Set<Key>>
  }
} as const

export const TreeNodeEmits = {
  // 校验两个事件必须传TreeNode类型的参数
  toggle: (node: TreeNode) => node
}

export const treeNodeContentProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  }
} as const

export interface TreeContext {
  slots: SetupContext['slots']
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol()
