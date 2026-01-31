// 定义树显示内容前面的三角箭头
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MSwitcher',
  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M14 8 L24 16 L14 24 Z" fill="currentColor"></path>
      </svg>
    )
  }
})
