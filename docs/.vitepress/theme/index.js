import DefaultTheme from 'vitepress/theme'
import MIcon from '@x-future/components/icon'
import MTree from '@x-future/components/tree'
import MButton from '@x-future/components/button'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import '@x-future/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 1. 注册预览插件容器 (必须)
    app.component('demo-preview', AntDesignContainer)

    // 2. 批量注册组件
    // 注意：app.use 会执行组件内部的 install 方法
    // 如果 install 内部注册的名字是 'MButton'，那么模板中必须用 <MButton> 或 <m-button>
    app.use(MIcon)
    app.use(MButton)
    app.use(MTree)

    // 3. 如果发现标签依然不识别，可以显式强制指定全小写名称
    app.component('m-button', MButton)
    app.component('m-icon', MIcon)
    app.component('m-tree', MTree)
  }
}
