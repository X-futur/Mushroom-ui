// 用于整合组件,实现导出组件
import _Icon from './src/icon.vue'
import withInstall from '@x-future/utils/withInstall'

// 组件加上install方法之后导出，作为全局组件
const Icon = withInstall(_Icon)
// 导出模块，方便按需使用，摇树优化提升性能
export default Icon

// 导出组件的属性类型定义
export * from './src/icon'

// 确保在模板中使用 <m-icon> 时，IDE 能提供属性补全和类型检查
// 扩展全局组件类型声明
declare module 'vue' {
  export interface GlobalComponents {
    // 定义了模板中使用的标签名
    MIcon: typeof Icon
  }
}
