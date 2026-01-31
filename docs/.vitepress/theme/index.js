import DefaultTheme from 'vitepress/theme'
import MIcon from '@x-future/components/icon'
import MTree from '@x-future/components/tree'
import MButton from '@x-future/components/button'
import MVirtualList from '@x-future/components/virtual-list'
import MTreeNode from '@x-future/components/tree/src/treeNode.vue'
import '@x-future/theme-chalk/src/index.scss'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import '../../../packages/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(MTree)
    app.use(MIcon)
    app.use(MButton)
    app.use(MVirtualList)
    app.component('demo-preview', AntDesignContainer)
    // 确保组件名称使用 kebab-case 格式
    app.component('m-tree', MTree)
    app.component('m-icon', MIcon)
    app.component('m-button', MButton)
    app.component('m-virtual-list', MVirtualList)
    app.component('m-tree-node', MTreeNode)
  }
}
