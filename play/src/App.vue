<template>
  <m-icon :color="'#bfa'" :size="50">
    <AddCircle></AddCircle>
  </m-icon>

  <m-button
    size="large"
    type="danger"
    :round="true"
    @click="clickButton"
    @mousedown="mouseDown"
  >
    按钮
    <template #icon>
      <m-icon size="20">
        <AddCircle></AddCircle>
      </m-icon>
    </template>
  </m-button>

  <m-tree :data="data"></m-tree>
</template>

<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import Loading from '@x-future/components/internal-icon/Loading'
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

// 完成点击即触发（按下+抬起）
function clickButton() {
  console.log('you have clicked the button!')
}

// 完成按下即触发
const mouseDown = () => {
  console.log('your mouse is down!')
}
</script>

<style scoped></style>
