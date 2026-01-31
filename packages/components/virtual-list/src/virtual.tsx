import { createNamespace } from '@x-future/utils/create'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'm-virtual-list',
  props: {
    size: {
      type: Number,
      default: 48
    },
    remain: {
      type: Number,
      default: 8
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const bem = createNamespace('vl')
    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()
    const state = reactive({
      start: 0,
      end: props.remain
    })

    // 计算上方需要预渲染的节点数量
    const prev = computed(() => {
      // 防止上方数据不够
      return Math.min(state.start, props.remain)
    })

    // 计算下方需要预渲染的节点数量
    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })

    // 包括上下方预渲染的数据，一共需要渲染的节点数量
    const visibleData = computed(() => {
      return props.items.slice(state.start - prev.value, state.end + next.value)
    })

    const offset = ref(0)

    const handleScroll = () => {
      const scrollTop = wrapperRef.value!.scrollTop

      state.start = Math.floor(scrollTop / props.size)
      state.end = state.start + props.remain
      // 滚过去了多少个，滚过的绝对位置
      offset.value = state.start * props.size - props.size * prev.value
    }

    function initWrapper() {
      // 定义视口大小
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      // 用真实的数据撑开滚动条
      barRef.value!.style.height = props.items.length * props.size + 'px'
    }

    watch(
      () => props.items,
      () => {
        initWrapper()
      }
    )

    onMounted(() => {
      initWrapper()
    })

    return () => {
      return (
        // 可视区
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          {/* 滚动条高度 */}
          <div class={bem.e('scroll-bar')} ref={barRef}></div>
          {/* 滚动列表，真正存放元素 */}
          <div
            class={bem.e('scroll-list')}
            style={{ transform: `translate3d(0, ${offset.value}px,0)` }}
          >
            {/* 切片之后的数据 */}
            {visibleData.value.map((node, idx) => slots.default!({ node }))}
          </div>
        </div>
      )
    }
  }
})
