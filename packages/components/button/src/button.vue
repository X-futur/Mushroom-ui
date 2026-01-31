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
      <MIcon size="20">
        <LoadingComponent v-if="loading"></LoadingComponent>
        <template v-else-if="slots.icon">
          <component :is="slots.icon" />
        </template>
      </MIcon>
    </template>
    <slot></slot>

    <template v-if="iconPlacement === 'right'">
      <MIcon size="20">
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

defineProps(buttonProps)
const emit = defineEmits(buttonEmits)
const bem = createNamespace('button')
const slots = useSlots()

function emitMousedown(e: MouseEvent) {
  emit('mousedown', e)
}

function emitClick(e: MouseEvent) {
  emit('click', e)
}
</script>
