<template>
  <button
    @mousedown="emitMousedown"
    @click="emitClick"
    :disabled="disabled || loading"
    :type="nativeType"
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled)
    ]"
  >
    <template v-if="iconPlacement === 'left'">
      <MIcon size="20" style="margin-right: 5px">
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else-if="slots.icon">
          <component :is="slots.icon" />
        </template>
      </MIcon>
    </template>

    <slot></slot>

    <template v-if="iconPlacement === 'right'">
      <MIcon size="20" style="margin-left: 5px">
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else-if="slots.icon">
          <component :is="slots.icon"></component>
        </template>
      </MIcon>
    </template>
  </button>
</template>

<script setup lang="ts">
import { createNamespace } from '@x-future/utils/create'
import { buttonEmits, buttonProps } from './button'
import { useSlots } from 'vue'
import LoadingComponent from '@x-future/components/internal-icon/Loading'

defineOptions({
  name: 'MButton',
  inheritAttrs: false
})

// 接收到父组件传递过来的属性
defineProps(buttonProps)

const emit = defineEmits(buttonEmits) // 校验事件逻辑
const bem = createNamespace('button')
const slots = useSlots()

// e浏览器产生的原生事件对象，包含鼠标点击位置等信息
function emitMousedown(e: MouseEvent) {
  emit('mousedown', e)
}

function emitClick(e: MouseEvent) {
  emit('click', e)
}
</script>
