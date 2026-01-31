import withInstall from '@x-future/utils/withInstall'
import _Virtual from './src/virtual.tsx'

const Virtual = withInstall(_Virtual)

export default Virtual

declare module 'vue' {
  export interface GlobalComponents {
    MVirtual: typeof Virtual
  }
}

export * from './src/virtual'
