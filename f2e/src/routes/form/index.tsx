import { cn } from '#/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { stepTrans, transition } from '#/animation'
import StepNavigation from '#/components/button'
import type { Field } from '#/types'
import { templateData } from '#/datas'

export const Route = createFileRoute('/form/')({
  component: RouteComponent,
})

type FormValue = string | boolean | File | null

function RouteComponent() {
  // const [preview, setPreview] = useState('')
  const [step, setStep] = useState(1)
  const [savedData, setSavedData] = useState<Record<string, FormValue>>({})
  const [savedFile, setSavedFile] = useState<File | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const stepRef = useRef<HTMLDivElement>(null)

  const currentStepData = templateData[step - 1]

  useEffect(() => {
    console.log('savedData',savedData);
    
  }, [savedData])

  const saveCurrentStep = () => {
    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)

    const currentData: Record<string, FormValue> = {}

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string') {
        currentData[key] = value
      }
    }

    const checkboxes = form.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    )

    checkboxes.forEach((el) => {
      if (!el.name) return
      currentData[el.name] = el.checked
    })
    
    setSavedData(prev => ({
      ...prev,
      ...currentData
    }))
  }

  const renderField = (field: Field, id: string | undefined) => {
    switch (field.type) {
      case 'input': 
        return (
          <div key={id}
            className={cn(
              'flex',
              'items-center'
          )}>
            <div className={cn(
              'min-w-25',
            )}>
              {field.content}
            </div>
            <input
              name={field.name}
              defaultValue={
                typeof savedData[field.name!] === 'string'
                  ? savedData[field.name!] as string
                  : field.defaultValue
              }
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
          <div key={id}>
            <label>
              <input 
                type="checkbox" 
                name={field.name}
                defaultChecked={
                  typeof savedData[field.name!] === 'boolean'
                    ? savedData[field.name!] as boolean
                    : field.defaultChecked
                }
                required={field.required}
              />
              {field.content}
            </label>
          </div>
        )
      case 'textarea': 
        return (
          <div 
            key={id}
            className={cn(
              'flex',
              'gap-2.5',
          )}>
            <label>{field.content}
              <textarea 
                name={field.name}
                id={field.id}
                defaultValue={
                  typeof savedData[field.name!] === 'string'
                    ? savedData[field.name!] as string
                    : field.defaultValue
                }
                required={field.required}
                className={cn(
                  'border',
                )}
              />
            </label>
          </div>
        )
      case 'select':
        return (
          <div
            key={id}
            >
            <label>
              選擇一個水果:
              <select 
                name={field.name}
                required={field.required}
                defaultValue={
                  typeof savedData[field.name!] === 'string'
                    ? savedData[field.name!] as string
                    : field.defaultValue
                }
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
      case 'radio':
        return (
          <div 
            key={id}
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
                    defaultChecked={
                      savedData[field.name!] === radio.value
                        ? true
                        : radio.defaultChecked
                    }
                    required
                    />
                  {radio.content}
                </label>
              ))
            }
          </div>
        )
      case 'file': 
        return (
          <div 
            key={id}
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
                    )}/>
                </div>
              )}
          </div>
        )
    }
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

    saveCurrentStep()
    setStep(prev => prev + 1)
  }
  
  const goPrev = () => {
    saveCurrentStep()
    setStep(prev => prev - 1)
  }

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0]

  //   if (!file) return
  //   console.log(file)
  //   setPreview(URL.createObjectURL(file))
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    saveCurrentStep()

    console.log(formRef.current)
  }

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
        <div className={cn(
          'text-2xl',
          'font-semibold'
        )}>
          步驟: {step}
        </div>
        <form 
          onSubmit={handleSubmit}
          className={cn(
            'flex-1',
            'flex',
            'flex-col',
            'w-full',
            'gap-7.5'
          )}
          ref={formRef}
        > 
          <div
            ref={stepRef}
            data-step={currentStepData.step}
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
                {currentStepData.fields.map(field => renderField(field, field.id))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className={cn(
            'flex',
            'items-center',
            'justify-center',
            'gap-2.5',
          )}>
            <StepNavigation 
              currentStep={step}
              totalSteps={templateData.length}
              onPrev={goPrev}
              onNext={goNext}
            />
          </div>
        </form>
      </motion.div>
    </>
  )
}
