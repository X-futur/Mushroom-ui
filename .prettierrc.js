module.exports = {
  singleQuote: true, // 使用单引号
  semi: false, // 不使用分号
  trailingComma: 'none', // 末尾不加逗号
  arrowParens: 'avoid', // 箭头函数单参数时省略括号
  endOfLine: 'auto', // 结尾换行自动

  // 不修复markdown
  overrides: [
    {
      files: '*.md',
      options: {
        // 禁止在 Markdown 中对内容进行细微的格式重排
        proseWrap: 'preserve',
        // 某些版本的 Prettier 可能会受此影响，确保设置为 false
        htmlWhitespaceSensitivity: 'ignore'
      }
    }
  ]
}
