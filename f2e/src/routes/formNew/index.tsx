import { stepTrans, transition } from '#/animation'
import StepNavigation from '#/components/button'
import { templateData } from '#/datas'
import { cn } from '#/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/formNew/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [preview, setPreview] = useState('')
  const [result, setResult] = useState<any>(null)
  const [isSubmit, setIsSubmit] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)

  const currentStepData = templateData[step - 1]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target
    const { name } = target

    let value: string | boolean

    if (target instanceof HTMLInputElement && target.type === 'checkbox') value = target.checked
    else value = target.value

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))

    const file = target instanceof HTMLInputElement ? target.files?.[0] : undefined

    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  const checkboxHandleChange = (
    checked: boolean,
    checkbox: any,
    groupName: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [groupName]: prev[groupName].map((item: any) =>
        item.name === checkbox.name
          ? {
            ...item,
            value: checked
              ? checkbox.checkedValue
              : checkbox.uncheckedValue,
          }
          : item
      ),
    }))
  }

  const goNext = () => {
    const currentStep = stepRef.current

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

  const goPrev = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const fd = new FormData()

    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        fd.append(key, JSON.stringify(value))
      } else {
        fd.append(key, String(value))
      }
    })

    // const obj = Object.fromEntries(fd)
    setResult(formData)
    setIsSubmit(true)
  }

  const renderResultValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-col gap-1">
          {value.map((item, i) => (
            <div key={i} className="pl-2 border-l">
              {typeof item === 'object'
                ? Object.entries(item)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(' | ')
                : String(item)}
            </div>
          ))}
        </div>
      )
    }

    if (value && typeof value === 'object') {
      return (
        <div className="pl-2 border-l">
          {Object.entries(value)
            .map(([k, v]) => `${k}: ${v}`)
            .join(' | ')}
        </div>
      )
    }

    return <span>{String(value)}</span>
  }

  // 拖曳-進入區域事件
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDragging(true)
  }

  // 拖曳-拖曳離開區域事件
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDragging(false)
  }

  const renderField = (field: any) => {
    switch (field.type) {
      case 'input':
        return (
          <div
            key={field.id}
            className={cn(
              'flex',
              'items-center'
            )}
          >
            <div className={cn(
              'min-w-25',
            )}>
              {field.content}
            </div>
            <input
              name={field.name}
              value={formData[field.name] ?? ''}
              required={field.required}
              className={cn(
                'p-1',
                'border',
                'rounded-xs',
                'text-sm',
                'min-h-8.5',
                'w-full'
              )}
              onChange={handleChange}
            />
          </div>
        )
      case 'textarea':
        return (
          <div
            key={field.id}
          >
            <label
              className={cn(
                'flex',
              )}
            >
              <div className={cn(
                'min-w-25',
              )}>
                {field.content}
              </div>
              <textarea
                name={field.name}
                value={formData[field.name] ?? ''}
                required={field.required}
                className={cn(
                  'border',
                  'w-full',
                )}
                onChange={handleChange}
              />
            </label>
          </div>
        )
      case 'select':
        return (
          <div
            key={field.id}
          >
            <label>
              {field.content}
              <select
                name={field.name}
                value={formData[field.name] ?? ''}
                required={field.required}
                onChange={handleChange}
              >
                <option value="">choose one</option>
                {
                  field.options?.map((option: any, i: any) => {
                    return (
                      <option key={i} value={option.value}>{option.text}</option>
                    )
                  })
                }
              </select>
            </label>
          </div>
        )
      case 'radio':
        return (
          <div
            key={field.id}
            className={cn(
              'mt-8',
              'flex',
              'gap-2.5',
            )}
          >
            <div>{field.content}</div>
            {
              field.options?.map((radio: any, i: any) => (
                <label
                  key={i}
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={radio.value}
                    checked={formData[field.name] === radio.value}
                    required={field.required}
                    onChange={handleChange}
                  />
                  {radio.content}
                </label>
              ))
            }
          </div>
        )
      case 'checkbox-group':
        return (
          <div
            key={field.id}
            className={cn(
              'flex',
              'gap-2.5'
            )}
          >
            <div
              className={cn(
                'min-w-22.5',
              )}
            >
              {field.content}
            </div>
            {
              field.options?.map((checkbox: any) => (
                <label
                  key={checkbox.id}
                >
                  <input
                    type="checkbox"
                    name={checkbox.name}
                    checked={
                      formData[field.name]
                        ?.find((item: any) => item.name === checkbox.name)
                        ?.value === checkbox.checkedValue
                    }
                    required={field.required}
                    onChange={(e) =>
                      checkboxHandleChange(
                        e.target.checked,
                        checkbox,
                        field.name
                      )
                    }
                  />
                  {checkbox.content}
                </label>
              ))
            }
          </div>
        )
      case 'file':
        return (
          <div
            key={field.id}
            className={cn(
              'flex',
              'flex-col',
              'gap-3.5',
              'w-full',
              'h-100',
            )}>
            <div>Upload file</div>
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={cn(
                'relative',
                'flex',
                'items-center',
                'justify-center',
                'w-full',
                'h-100',
                'border-2',
                'rounded-2xl',
                isDragging ? "border-blue-500 bg-blue-50" : 'border-black-500',
              )}
            >
              <input
                type="file"
                id='file'
                onChange={handleChange}
                name={field.name}
                required
                className={cn(
                  'w-full',
                  'h-full',
                  'opacity-0',
                  'cursor-pointer',
                )}
              />
              {preview && (
                <div className={cn(
                  'p-10',
                  'absolute',
                  'w-full',
                  'h-full'
                )}>
                  <img
                    src={preview}
                    alt=""
                    className={cn(
                      'w-full',
                      'h-full',
                      'object-contain',
                    )} />
                </div>
              )}
            </div>
          </div>
        )
    }
  }

  useEffect(() => {
    const initialData: Record<string, any> = {}

    templateData.forEach(step => {
      step.fields.forEach(field => {
        if (field.type === 'checkbox-group') {
          const name = typeof field.name === 'string' ? field.name : undefined
          if (!name) return

          initialData[name] = field.options.map((option: any) => ({
            name: option.name,
            value: option.defaultChecked
              ? option.checkedValue
              : option.uncheckedValue,
          }))
        }
      })
    })

    setFormData(initialData)
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className={cn(
          'p-8',
          'ml-auto',
          'mr-auto',
          'mt-8',
          'flex',
          'items-center',
          'flex-col',
          'gap-7.5',
          'w-3xl',
          'min-h-150',
          'bg-white',
          'text-black',
          'rounded-sm',
        )}>
        {
          !isSubmit && (
            <div className={cn(
              'text-2xl',
              'font-semibold'
            )}>
              步驟: {step}
            </div>
          )
        }
        {!isSubmit && <form
          onSubmit={handleSubmit}
          className={cn(
            'flex-1',
            'flex',
            'flex-col',
            'w-full',
            'gap-7.5'
          )}
        >
          <div
            ref={stepRef}
            className={cn(
              'flex',
              'flex-col',
              'flex-1',
              'w-full',
              'gap-2.5'
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={stepTrans}
                className={cn(
                  'flex',
                  'flex-col',
                  'flex-1',
                  'w-full',
                  'gap-2.5',
                )}
              >
                {currentStepData?.fields.map(field => renderField(field))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={cn(
            'flex',
            'items-center',
            'justify-center',
            'gap-2.5',
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <StepNavigation
                  currentStep={step}
                  totalSteps={templateData.length}
                  onPrev={goPrev}
                  onNext={goNext}
                  />
              </motion.div>
            </AnimatePresence>
          </div>
        </form>
        }
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result}
              initial={{ opacity: 0, y: 40, display: 'none' }}
              animate={{ opacity: 1, y: 0, display: 'flex' }}
              exit={{ opacity: 0, y: 40 }}
              transition={stepTrans}
            >
              <div className={cn(
                'flex',
                'flex-col',
                'flex-1',
                'w-full',
                'gap-2.5',
              )}>
                <div className={cn(
                  'mt-5',
                  'pt-5',
                )}>
                  <h2
                    className={cn(
                      'mb-3',
                      'text-lg',
                      'font-bold',
                    )}>表單結果</h2>
                  {
                    Object.entries(result).map(([key, value]) => (
                      <div key={key} className={cn(
                        'py-2',
                        'flex',
                        'gap-3',
                        'border-b',
                      )}>
                        <div className={cn(
                          'w-40',
                          'font-medium',
                        )}>{key}</div>
                        <div className={cn(
                          'flex-1',
                        )}>
                          {renderResultValue(value)}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
