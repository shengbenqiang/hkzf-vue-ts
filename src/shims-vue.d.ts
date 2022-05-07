/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'BMapGL' {
  import type BMapGL from "@types/bmapgl"
  export default BMapGL
}