import { App, Component, Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin;

export default function withInstall<T extends Component>(component: T) {
  (component as SFCWithInstall<T>).install = function (app: App) {
    const { name } = component as unknown as { name: string };
    app.component(name, component);
  };
  return component as SFCWithInstall<T>;
}
