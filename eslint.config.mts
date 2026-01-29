// eslint.config.mts
import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettierConfig from 'eslint-config-prettier' // 导入
import prettierPlugin from 'eslint-plugin-prettier' // 导入

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],

  {
    files: ['**/*.ts', '**/*.mts', '**/*.vue'],
    plugins: {
      prettier: prettierPlugin // 注册插件
    },
    rules: {
      // 启用 prettier 规则，如果代码格式不符合 prettier，eslint 会报错
      'prettier/prettier': 'error',

      // 你之前的 vue 规则
      'vue/multi-word-component-names': 'off'
      // ... 其他规则
    }
  },

  // 重点：最后放上 prettierConfig，它会覆盖并关闭所有冲突规则
  prettierConfig
)
