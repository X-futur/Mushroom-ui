<template>
  <!-- 外层div负责状态控制，整行的背景样式 -->
  <div :class="[bem.b(), bem.is('disabled', node.disabled)]">
    <!-- 内层div负责节点缩进样式 -->
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: `${node.level * 16}px` }"
    >
      <span
        @click="handleExpand"
        :class="[
          bem.e('expand-icon'),
          bem.is('leaf', node.isLeaf),
          { expanded: expanded && !node.isLeaf }
        ]"
      >
        <m-icon size="25" color="grey">
          <Switcher v-if="isLoading == false"></Switcher>
          <Loading v-else></Loading>
        </m-icon>
      </span>
      <span :class="bem.e('label')">
        <m-tree-node-content :node="node"></m-tree-node-content>
      </span>
    </div>
  </div>
</template>

<script setup>
import MTreeNodeContent from './tree-node-content'
import Switcher from '@x-future/components/internal-icon/Switcher'
import Loading from '@x-future/components/internal-icon/Loading'
import { TreeNodeProps, TreeNodeEmits } from './tree'
import { createNamespace } from '@x-future/utils/create'
import MIcon from '@x-future/components/icon'
import { computed } from 'vue'

defineOptions({
  name: 'MTreeNode'
})

const props = defineProps(TreeNodeProps)
const emit = defineEmits(TreeNodeEmits)
const bem = createNamespace('tree-node')

const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node.key)
})

// 点击折叠与否，传递信号给父组件，父组件进行操作
function handleExpand() {
  emit('toggle', props.node)
}
</script>
