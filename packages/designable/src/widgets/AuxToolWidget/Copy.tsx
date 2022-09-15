// import React from 'react'
import { useOperation, usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { Button } from 'element-ui'
import { TreeNode } from '@designable/core'
import { defineComponent } from 'vue-demi'
import { useStyle } from '../../shared'
import { composeExport } from '@formily/element/esm/__builtins__'

export interface ICopyProps {
  node: TreeNode
}

const CopyComponent = defineComponent({
  props: ['node'],
  setup(props: ICopyProps) {
    const operationRef = useOperation()
    const prefixRef = usePrefix('aux-copy')
    const style = useStyle()
    return () => {
      if (props.node === props.node.root) return null
      return (
        <Button
          class={prefixRef.value}
          style={style}
          type="primary"
          onClick={() => {
            operationRef.value.cloneNodes([props.node])
          }}
        >
          <IconWidget infer="Clone" />
        </Button>
      )
    }
  },
})

export const Copy = composeExport(CopyComponent, { displayName: 'Copy' })
