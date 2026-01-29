// 通过js实现bem规范,生成[类名]
// block 代码块  element 元素   modifier 修饰符   state 状态
// m-button
// m-button__element
// m-button__element--disabled
// is-checked  is-enabled

// :class = [bem.b()]

// 拼接名字字符串,拼接block/element/modifier
function _bem(
  prefixName: string,
  blockSuffix: string,
  element: String,
  modifier: String
) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`
  }
  if (element) {
    prefixName += `__${element}`
  }
  if (modifier) {
    prefixName += `--${modifier}`
  }
  return prefixName
}

// 拼接字符串方法二次封装
function createBEM(prefixName: string) {
  // b即为拼接block
  const b = (blockSuffix: string = '') => _bem(prefixName, blockSuffix, '', '')
  // e即为拼接element
  const e = (element: string) =>
    element ? _bem(prefixName, '', element, '') : ''
  // m即为拼接modifier
  const m = (modifier: string) =>
    modifier ? _bem(prefixName, '', '', modifier) : ''

  const be = (blockSuffix: string, element: string) =>
    blockSuffix && element ? _bem(prefixName, blockSuffix, element, '') : ''

  const bm = (blockSuffix: string, modifier: string) =>
    blockSuffix && modifier ? _bem(prefixName, blockSuffix, '', modifier) : ''

  const em = (element: string, modifier: string) =>
    modifier && element ? _bem(prefixName, '', element, modifier) : ''

  const bem = (blockSuffix: string, element: string, modifier: string) =>
    blockSuffix && element && modifier
      ? _bem(prefixName, blockSuffix, element, modifier)
      : ''

  const is = (name: string, state: string | boolean) =>
    state ? `is-${name}` : ''
  // 返回一个对象,包含b/e两个方法
  return { b, e, m, be, bm, em, bem, is }
}

// 创建命名空间,包含完整的前缀,以及拼接各种后缀的方法
export function createNamespace(name: string) {
  const prefixName = `m-${name}`
  return createBEM(prefixName)
}
