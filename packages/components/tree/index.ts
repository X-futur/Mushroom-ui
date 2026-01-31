import _Tree from './src/tree.vue'
import withInstall from '../../utils/withInstall'

// 组件加上install方法之后导出
const Tree = withInstall(_Tree)
export default Tree

// 统一导出入口(类型接口等)
export * from './src/tree'

// 扩展Tree为vue的全局组件
declare module 'vue' {
  export interface GlobalComponents {
    MTree: typeof Tree
  }
}
