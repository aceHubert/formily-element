import {
  isResourceHost,
  isResourceList,
  IResourceLike,
  IResource,
} from '@designable/core'
import { isFn } from '@designable/shared'
import { observer } from '@formily/reactive-vue'
import { usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'
import { TextWidget } from '../TextWidget'
import cls from 'classnames'
import './styles.less'
import { defineComponent, ref, unref } from 'vue-demi'

import type { VNode } from 'vue-demi'

export interface IResourceWidgetProps {
  title: VNode
  sources?: IResourceLike[]
  defaultExpand?: boolean
}

export const ResourceWidget = observer(
  defineComponent<IResourceWidgetProps>({
    props: {
      defaultExpand: { type: Boolean, default: true },
      sources: { type: Array, default: () => [] },
      title: String,
    },
    setup(props, { slots }) {
      const prefixRef = usePrefix('resource')
      const expand = ref(props.defaultExpand)

      const renderNode = (source: IResource) => {
        const prefix = unref(prefixRef)
        const { node, icon, title, thumb, span } = source

        return (
          <div
            class={prefix + '-item'}
            style={{ gridColumnStart: `span ${span || 1}` }}
            attrs={{ key: node.id, 'data-designer-source-id': node.id }}
          >
            {thumb && <img class={prefix + '-item-thumb'} src={thumb} />}
            {icon && (
              <IconWidget
                // @ts-ignore
                class={prefix + '-item-icon'}
                style={{ width: '150px', height: '40px' }}
                infer={icon}
              />
            )}
            <span class={prefix + '-item-text'}>
              <TextWidget>
                {title || node.children[0]?.getMessage('title')}
              </TextWidget>
            </span>
          </div>
        )
      }

      const sources = props.sources.reduce<IResource[]>((buf, source) => {
        if (isResourceList(source)) {
          return buf.concat(source)
        } else if (isResourceHost(source)) {
          return buf.concat(source.Resource)
        }
        return buf
      }, [])

      const remainItems =
        sources.reduce((length, source) => {
          return length + (source.span ?? 1)
        }, 0) % 3

      return () => {
        const prefix = unref(prefixRef)
        return (
          <div
            class={cls(prefix, {
              expand: expand.value,
            })}
          >
            <div
              class={prefix + '-header'}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                expand.value = !expand.value
              }}
            >
              <div class={prefix + '-header-expand'}>
                <IconWidget infer="Expand" size={'10px'} />
              </div>
              <div class={prefix + '-header-content'}>
                <TextWidget>{props.title}</TextWidget>
              </div>
            </div>
            <div class={prefix + '-content-wrapper'}>
              <div class={prefix + '-content'}>
                {sources.map(
                  isFn(slots.default)
                    ? (slots.default as (source: IResource) => any)
                    : renderNode
                )}
                {remainItems ? (
                  <div
                    class={prefix + '-item-remain'}
                    style={{ gridColumnStart: `span ${3 - remainItems}` }}
                  ></div>
                ) : null}
              </div>
            </div>
          </div>
        )
      }
    },
  })
)
