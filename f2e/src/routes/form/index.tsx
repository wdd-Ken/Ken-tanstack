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

  const goNext = () => {
    const currentStep = document.querySelector(
      `[data-step="${step}"]`
    )

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
          <div 
            data-step="1"
            style={{ display: step === 1 ? 'block' : 'none' }}
            className={cn(
              'flex',
              'flex-col',
              'w-full',
              'gap-2.5'
            )}
          >
            <div>Name:</div>
            <input
              name="name"
              defaultValue=''
              required
              className={cn(
                'p-1',
                'border',
                'rounded-xs',
                'text-sm',
                'min-h-8.5'
              )}
            />
            <div>Email:</div>
            <input
              name="email"
              defaultValue=''
              required
              className={cn(
                'p-1',
                'border',
                'rounded-xs',
                'text-sm',
                'min-h-8.5'
              )}
            />
            <div>Phone:</div>
            <input
              name="phone"
              defaultValue=''
              required
              className={cn(
                'p-1',
                'border',
                'rounded-xs',
                'text-sm',
                'min-h-8.5'
              )}
            />
            <label>
              <input 
                type="checkbox" 
                name='checkbox'
                value="checkbox1"
                defaultChecked={true}
                required
              />
              checkbox1
            </label>
            <label>
              <input 
                type="checkbox" 
                name='checkbox2'
                value="checkbox2"
                defaultChecked={false}
                required
              />
              checkbox2
            </label>
            <label>
              <input 
                type="checkbox" 
                name='checkbox3'
                value="checkbox3"
                defaultChecked={true}
                required
              />
              checkbox3
            </label>  
            <button onClick={goNext}>next</button>      
          </div>
          <div
            data-step="2"
            style={{ display: step === 2 ? 'block' : 'none' }}
            className={cn(
              'flex',
              'flex-col',
              'w-full',
              'gap-2.5'
            )}
          >
            <div>
              <label htmlFor={textareaId}>Content</label>
              <textarea 
                name="postContent" 
                id={textareaId}
                defaultValue='default content'
                required
                className={cn(
                  'border',
                )}
              />
            </div>
            <div>
              <label>
                選擇一個水果:
                <select 
                  name="水果" 
                  required
                  defaultValue="香蕉"
                >
                  <option value="蘋果">蘋果</option>
                  <option value="香蕉">香蕉</option>
                  <option value="橘子">橘子</option>
                </select>
              </label>
            </div>
            <button onClick={goPrev}>prev</button>
            <button onClick={goNext}>next</button>
          </div>
          <div
            data-step="3"
            style={{ display: step === 3 ? 'block' : 'none' }}
            className={cn(
              'flex',
              'flex-col',
              'w-full',
              'gap-2.5'
            )}
          >
            <label htmlFor='file'>Content</label>
            <input 
              type="file" 
              id='file' 
              onChange={handleChange}
              required
            />
            {preview && (
              <div className={cn(
                'w-80',
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
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                defaultChecked
                required
              />
              男
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
              />
              女
            </label>
            <button onClick={goPrev}>prev</button>
            <button 
              type="submit"
              className={cn(
                'cursor-pointer',
              )} 
            >送出</button>
          </div>
        </form>
      </div>
    </>
  )
}
