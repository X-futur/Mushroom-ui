// 定义树显示内容前面的三角箭头
// 使用tsx更轻量化，易于维护
import { defineComponent } from 'vue'

// 定义名为 MSwitcher 的 Vue 组件
export default defineComponent({
  name: 'MSwitcher',
  // render函数返回虚拟DOM
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M14 8 L24 16 L14 24 Z" fill="currentColor"></path>
      </svg>
    )
  }
})
