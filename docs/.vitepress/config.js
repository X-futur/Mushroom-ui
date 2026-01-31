// docs/.vitepress/config.js
import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview
} from '@vitepress-demo-preview/plugin'

export default defineConfig({
  title: 'Mushroom-UI',
  description: 'Mushroom UI',
  markdown: {
    config(md) {
      // 注册 demo 预览插件
      md.use(containerPreview)
      md.use(componentPreview)
    },
    // 确保 markdown 代码块能够正确解析
    languages: ['js', 'ts', 'vue', 'jsx', 'tsx', 'json', 'markdown', 'yaml', 'bash', 'css', 'scss', 'html']
  },
  themeConfig: {
    lastUpdated: '最后更新时间',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '编辑此网站',
    repo: 'https://gitee.com/login',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present Yubin Zhang'
    },
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '/guide/' },
      { text: '组件', link: '/component/icon', activeMatch: '/component/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickStart' }
          ]
        }
      ],
      '/component/': [
        {
          text: '基础组件',
          items: [
            { text: 'Icon', link: '/component/icon' },
            { text: 'Button', link: '/component/button' },
            { text: 'Tree', link: '/component/tree' }
          ]
        }
      ]
    }
  }
})
