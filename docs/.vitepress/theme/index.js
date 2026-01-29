import DefaultTheme from 'vitepress/theme'
import MIcon from '@x-future/components/icon'
import '@x-future/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(MIcon)
  }
}
