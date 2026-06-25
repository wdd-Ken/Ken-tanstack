type BaseField = {
  name?: string
  content?: string
  id?: string
  required?: boolean
}

type InputField = BaseField & {
  type: 'input'
  defaultValue?: string
}

type CheckboxField = BaseField & {
  type: 'checkbox'
  defaultChecked?: boolean
}

type TextareaField = BaseField & {
  type: 'textarea'
  defaultValue?: string,
  id?: string
}

type SelectField = BaseField & {
  type: 'select'
  defaultValue?: string,
  id?: string,
  options: {
    text: string
    value: string
  }[]
}

type FileField = BaseField & {
  type: 'file'
  id?: string
}

type RadioField = BaseField & {
  type: 'radio'
  options: {
    content: string
    value: string
    defaultChecked?: boolean
  }[]
}

export type Field =
  | InputField
  | TextareaField
  | SelectField
  | FileField
  | CheckboxField
  | RadioField

export type Step = {
  step: number
  fields: Field[]
}
