import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MLoading',
  // render函数返回虚拟DOM
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        class="loading"
      >
        <path
          d="M512 896c-106 0-212-26.5-306-79.5-94-53-171-130-224-224-53-94-79.5-200-79.5-306s26.5-212 79.5-306c53-94 130-171 224-224 94-53 200-79.5 306-79.5s212 26.5 306 79.5c94 53 171 130 224 224 53 94 79.5 200 79.5 306s-26.5 212-79.5 306c-53 94-130 171-224 224-94 53-200 79.5-306 79.5z"
          fill="none"
          stroke="currentColor"
          stroke-width="60"
          stroke-linecap="round"
          stroke-dasharray="150 450"
        ></path>
      </svg>
    )
  }
})
