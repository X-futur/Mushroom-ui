// 用于整合组件,实现导出组件
import _Icon from './src/icon.vue'
import withInstall from '@x-future/utils/withInstall'

// 组件插件化导出
const Icon = withInstall(_Icon)
export default Icon

// 二次导出,统一导出入口,方便引用
// 导出类型接口等
export * from './src/icon'

// 使用vue时方便给提示
// 扩展全局组件类型声明
declare module 'vue' {
  export interface GlobalComponents {
    // 定义了模板中使用的标签名
    MIcon: typeof Icon
  }
}
