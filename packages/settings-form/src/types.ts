import { Form } from '@formily/core'
import { VueComponent } from '@formily/vue'

export interface ISettingFormProps {
  uploadAction?: string
  components?: Record<string, VueComponent>
  effects?: (form: Form) => void
  scope?: any
  headers?: Record<string, string>
}
