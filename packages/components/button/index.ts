import withInstall from '@x-future/utils/withInstall'
import _Button from './src/button.vue'

// 组件加上install方法之后导出，作为全局组件
const Button = withInstall(_Button)
// 导出模块，方便按需使用，摇树优化提升性能
export default Button
// 导出组件的属性类型定义
export * from './src/button'

// 确保在模板中使用 <m-button> 时，IDE 能提供属性补全和类型检查
declare module 'vue' {
  export interface GlobalComponents {
    MButton: typeof Button
  }
}
