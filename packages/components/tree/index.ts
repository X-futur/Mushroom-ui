import _Tree from './src/tree.vue'
import withInstall from '../../utils/withInstall'

// 组件加上install方法之后导出，作为全局组件
const Tree = withInstall(_Tree)
// 导出模块，方便按需使用，摇树优化提升性能
export default Tree

// 导出组件的属性类型定义
export * from './src/tree'

// 扩展Tree为vue的全局组件
// 确保在模板中使用 <m-tree> 时，IDE 能提供属性补全和类型检查
declare module 'vue' {
  export interface GlobalComponents {
    MTree: typeof Tree
  }
}
