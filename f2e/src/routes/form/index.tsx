import { cn } from '#/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useId, useRef } from 'react'
import { useState } from 'react'

export const Route = createFileRoute('/form/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [preview, setPreview] = useState('')
  const [step, setStep] = useState(1)
  const textareaId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  // typescript型別
  type BaseField = {
    name?: string
    content?: string
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

  type Field =
    | InputField
    | TextareaField
    | SelectField
    | FileField
    | CheckboxField
    | RadioField

  type Step = {
    step: number
    fields: Field[]
  }

  // 資料
  const stepData: Step[] = [
    {
      step: 1,
      fields: [
        {
          type: 'input',
          name: 'name',
          content: 'Name:',
          required: true,
        },
        {
          type: 'input',
          name: 'email',
          content: 'Email:',
          required: true,
        },
        {
          type: 'input',
          name: 'phone',
          content: 'Phone:',
          required: true,
        },
        {
          type: 'checkbox',
          name: 'checkbox1',
          content: 'checkbox1',
          defaultChecked: true,
          required: true,
        },
        {
          type: 'checkbox',
          name: 'checkbox2',
          content: 'checkbox2',
          defaultChecked: true,
          required: true,
        },
        {
          type: 'checkbox',
          name: 'checkbox3',
          content: 'checkbox3',
          defaultChecked: true,
          required: true,
        },
      ],
    },
    {
      step: 2,
      fields: [
        {
          type: 'textarea',
          name: 'postContent',
          content: 'Content',
          defaultValue: '',
          required: true,
          id: '',
        },
        {
          type: 'select',
          name: 'fruits',
          content: 'choose a fruit',
          defaultValue: '香蕉',
          options: [
            { value: 'banana', text: 'banana', },
            { value: 'apple', text: 'apple', },
            { value: 'orange', text: 'orange', },
          ],
          required: true,
        },
      ],
    },
    {
      step: 3,
      fields: [
        {
          type: 'file',
          content: 'File',
          id: '',
          required: true,
        },
        {
          type: 'radio',
          content: 'Gender',
          name: 'gender',
          options: [
            { content: '男', value: 'male', defaultChecked: false },
            { content: '女', value: 'female' },
          ],
          required: true,
        }
      ],
    },
    {
      step: 4,
      fields: [
        {
          type: 'input',
          name: 'name',
          content: 'Name:',
          required: true,
        },
        {
          type: 'textarea',
          name: 'postContent',
          content: 'demo',
          defaultValue: '',
          required: true,
          id: '',
        },
      ],
    },
  ]  

  const goNext = () => {
    const currentStep = stepRefs.current[step - 1]

    const fields = currentStep?.querySelectorAll(
      'input, textarea, select'
    ) as NodeListOf<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > | undefined

    const isValid = [...fields ?? []].every(field =>
      field.checkValidity()
    )

    if (!isValid) {
      const invalidField = currentStep?.querySelector(
        ':invalid'
      ) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null

      invalidField?.reportValidity()

      return
    }

    setStep(prev => prev + 1)
  }
  
  const goPrev = () => setStep(prev => prev - 1)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return
    console.log(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (e: {
    target: HTMLFormElement | undefined ; 
    preventDefault: () => void 
  }) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson)
  }
  
  return (
    <>
      <div className={cn(
        'p-8',
        'flex',
        'w-3xl',
        'm-auto',
        'mt-8',
        'bg-white',
        'text-black',
        'rounded-sm',
      )}>
        <form 
          onSubmit={handleSubmit}
          className={cn(
            'flex',
            'flex-col',
            'w-full',
            'gap-2.5'
          )}
          ref={formRef}
        >
          {
            stepData?.map((stepf, i) => {
              return (
                <div
                  key={i}
                  data-step={stepf.step}
                  ref={el => {
                    stepRefs.current[i] = el
                  }}
                  className={cn(
                    step === stepf.step ? 'flex' : 'hidden',
                    'flex-col',
                    'w-full',
                    'gap-2.5'
                  )}
                >
                  {
                    stepf.fields.map((field, i) => {
                      switch (field.type) {
                        case 'input': 
                          return (
                            <div key={i}>
                              <div>{field.content}</div>
                              <input
                                name={field.name}
                                defaultValue={field.defaultValue}
                                required={field.required}
                                className={cn(
                                  'p-1',
                                  'border',
                                  'rounded-xs',
                                  'text-sm',
                                  'min-h-8.5',
                                  'w-full'
                                )}
                              />
                            </div>
                          )
                        case 'checkbox':
                          return (
                            <div key={i}>
                              <label>
                                <input 
                                  type="checkbox" 
                                  name={field.name}
                                  defaultChecked={field.defaultChecked}
                                  required={field.required}
                                />
                                {field.content}
                              </label>
                            </div>
                          )
                        case 'textarea': 
                          return (
                            <div 
                              key={i}
                              className={cn(
                                'flex',
                                'gap-2.5',
                            )}>
                              <label htmlFor={textareaId}>{field.content}</label>
                              <textarea 
                                name={field.name}
                                id={field.id}
                                defaultValue={field.defaultValue}
                                required={field.required}
                                className={cn(
                                  'border',
                                )}
                              />
                            </div>
                          )
                        case 'select':
                          return (
                            <div
                              key={i}
                              >
                              <label>
                                選擇一個水果:
                                <select 
                                  name={field.name}
                                  required={field.required}
                                  defaultValue={field.defaultValue}
                                >
                                  {
                                    field.options?.map((option, i) => {
                                      return (
                                        <option key={i} value={option.value}>{option.text}</option>
                                      )
                                    })
                                  }
                                </select>
                              </label>
                            </div>
                          )
                        case 'file': 
                          return (
                            <div 
                              key={i}
                              className={cn(
                                'flex',
                                'gap-3.5'
                            )}>
                              <label htmlFor='file'>File</label>
                              <input 
                                type="file" 
                                id='file' 
                                onChange={handleChange}
                                required
                                className={cn(
                                  'w-fit',
                                )}
                              />
                              {preview && (
                                <div className={cn(
                                  'mt-5',
                                  'w-25',
                                )}>
                                  <img
                                    src={preview}
                                    alt=""
                                    className={cn(
                                      'w-full',
                                      'h-full',
                                      'object-contain',
                                    )}
                                  />
                                </div>
                              )}
                            </div>
                          )
                        case 'radio':
                          return (
                            <div 
                              key={i}
                              className={cn(
                                'mt-8',
                                'flex',
                                'gap-2.5',
                            )}>
                              <div>{field.content}</div>
                              {
                                field.options?.map((radio, i) => (
                                  <label
                                    key={i}
                                  >
                                    <input
                                      type="radio"
                                      name={field.name}
                                      value={radio.value}
                                      defaultChecked={radio.defaultChecked}
                                      required
                                    />
                                    {radio.content}
                                  </label>
                                ))
                              }
                            </div>
                          )
                      }
                    })
                  }
                </div>
              )
            })
          }
          <div className={cn(
            'mt-7.5',
            'flex',
            'items-center',
            'gap-2.5',
          )}>
            <button 
              type="button"
              onClick={goPrev}
              className={cn(
                'p-2.5',
                'bg-gray-500',
                'text-white',
                'flex',
                'items-center',
                'justify-center',
                'rounded-md',
                'cursor-pointer',
                'min-w-50',
                step === 1 ? 'hidden' : 'block'
              )}
            >
              Prev
            </button>      
            <button 
              type="button"
              onClick={goNext}
              className={cn(
                'p-2.5',
                'bg-blue-600',
                'text-white',
                'flex',
                'items-center',
                'justify-center',
                'rounded-md',
                'cursor-pointer',
                'min-w-50',
                step === stepData.length ? 'hidden' : 'block'
              )}
            >
              next
            </button>
            <button 
              type="submit"
              className={cn(
                'p-2.5',
                'bg-lime-500',
                'text-white',
                'flex',
                'items-center',
                'justify-center',
                'rounded-md',
                'cursor-pointer',
                'min-w-50',
                step === stepData.length ? 'block' : 'hidden'
              )}
            >
              submit
            </button>        
          </div>
        </form>
      </div>
    </>
  )
}
