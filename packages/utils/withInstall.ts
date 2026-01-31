import { App, Component, Plugin } from 'vue'

// 定义泛型类型，T表示组件类型
export type SFCWithInstall<T> = T & Plugin

export default function withInstall<T extends Component>(component: T) {
  // 给组件对象手动挂载一个 install 函数
  ;(component as SFCWithInstall<T>).install = function (app: App) {
    // 解构name
    const { name } = component as unknown as { name: string }
    // 将该组件以自身的名字注册到全局组件中
    app.component(name, component)
  }
  // 返回添加install方法处理后的对象
  return component as SFCWithInstall<T>
}
