/* eslint-disable @typescript-eslint/no-empty-interface */
import Vue, { VNode } from 'vue'
import { ComponentRenderProxy } from 'vue-demi'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends ComponentRenderProxy {}
    // interface ElementAttributesProperty {
    //   $props: any; // specify the property name to use
    // }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
