import { createNamespace } from '@x-future/utils/create'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'm-virtual-list',
  props: {
    // 每个列表项的高度
    size: {
      type: Number,
      default: 48
    },
    // 视口内展示的节点数量
    remain: {
      type: Number,
      default: 8
    },
    // 所有的需要展示的原始数据（已拍平的数组）
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const bem = createNamespace('vl')
    // 视口容器
    const wrapperRef = ref<HTMLElement>()
    // 滚动条
    const barRef = ref<HTMLElement>()
    const state = reactive({
      // 当前可见区域的起始索引
      start: 0,
      // 当前可见区域的结束索引
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

    // 滚动的偏移量
    const offset = ref(0)

    const handleScroll = () => {
      // 获取已滚动的距离
      const scrollTop = wrapperRef.value!.scrollTop

      // 根据滚动距离计算当前应该从第几个数据开始看
      state.start = Math.floor(scrollTop / props.size)
      state.end = state.start + props.remain

      // 滚过去了多少个，修正滚过的绝对位置，不包括预渲染
      offset.value = state.start * props.size - props.size * prev.value
    }

    function initWrapper() {
      // 定义视口大小
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      // 用真实的数据撑开滚动条
      barRef.value!.style.height = props.items.length * props.size + 'px'
    }

    // 数据改变则刷新
    watch(
      () => props.items,
      () => {
        initWrapper()
      }
    )

    onMounted(() => {
      initWrapper()
    })

    // tsx返回渲染函数
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
            {/* 切片之后的数据，传回父组件插槽 */}
            {visibleData.value.map((node, idx) => slots.default!({ node }))}
          </div>
        </div>
      )
    }
  }
})
