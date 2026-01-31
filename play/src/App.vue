<template>
  <m-icon :color="'#bfa'" :size="50">
    <AddCircle></AddCircle>
  </m-icon>
  <m-tree
    :data="data"
    :on-load="handleLoad"
    v-model:selected-keys="value"
    selectable
  ></m-tree>
  <m-button size="medium" type="danger" :round="true">
    按钮
    <template #icon>
      <m-icon size="20">
        <AddCircle></AddCircle>
      </m-icon>
    </template>
  </m-button>
</template>

<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import type { Key, TreeOption } from '@x-future/components/tree'
import { ref } from 'vue'

const data = ref(createData())
const value = ref<Key[]>([])
// 要展开的节点的key
const expandedKeys = ref(['40', '4030', '4031', '403020'])
function createData(level = 4, parentKey = ''): TreeOption[] {
  if (level <= 0) return []
  const arr = new Array(20 - level).fill(0)
  return arr.map((_, index) => {
    const key = parentKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel(level: number): string {
  if (level == 4) return '道生一'
  if (level == 3) return '一生二'
  if (level == 2) return '二生三'
  if (level == 1) return '三生万物'
  return ''
}

const handleLoad = (node: TreeOption) => {
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          lable: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}

function nextLabel(currentLabel?: string | number | undefined): string {
  if (!currentLabel) return '道生一'
  if (currentLabel == '道生一') return '一生二'
  if (currentLabel == '一生二') return '二生三'
  if (currentLabel == '二生三') return '三生万物'
  if (currentLabel == '三生万物') return '道生一'
  return ''
}
</script>

<style scoped></style>
