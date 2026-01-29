<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script lang="ts" setup>
import { createNamespace } from '@x-future/utils/create'
import { iconProps } from './icon'
import { computed } from 'vue'

const bem = createNamespace('icon')
const props = defineProps(iconProps)
const style = computed(() => {
  if (!props.size && !props.color) {
    return {}
  }
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})

defineOptions({
  name: 'MIcon'
})
</script>

<style lang="scss"></style>
