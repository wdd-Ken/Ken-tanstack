import { cn } from '#/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/form/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  })

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
      const { name, value } = e.target

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      gender: e.target.checked ? '男' : '女'
    }))
  }

  useEffect(() => {
    console.log('formData',formData)
  }, [formData])
  
  return (
    <>
      <div className={cn(
        'p-8',
        'flex',
        'w-3xl',
        'm-auto',
        'mt-8',
        // 'absolute',
        // 'top-[50%]',
        // 'left-[50%]',
        // 'min-w-150',
        'bg-white',
        'text-black',
        'rounded-sm',
        // 'translate-[-50%]',
      )}>
        <form className={cn(
          'flex',
          'flex-col',
          'w-full',
          'gap-2.5'
        )}>
          <div>Name:</div>
          <input
            name="name"
            // value={formData.name}
            // onChange={handleChange}
            className={cn(
              'p-1',
              'border',
              'rounded-xs',
              'text-sm',
              'min-h-[34px]'
            )}
            defaultValue={'ffff'}
            />
          <div>Email:</div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cn(
              'p-1',
              'border',
              'rounded-xs',
              'text-sm',
              'min-h-[34px]'
            )}
            />
          <div>Phone:</div>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={cn(
              'p-1',
              'border',
              'rounded-xs',
              'text-sm',
              'min-h-[34px]'
            )}
          />
          <div>
            <input 
              type="checkbox" 
              id='male'
              checked={formData.gender === '男'}
              onChange={handleChangeCheckbox}
            />
            <label htmlFor="male">男性</label>
          </div>
          <div>
            <input type="checkbox" id='female'/>
            <label htmlFor="female">女性</label>
          </div>
          <div></div>
          <button 
            // type="submit"
            className={cn(
              'cursor-pointer',
            )} 
          >送出</button>
        </form>
      </div>
    </>
  )
}
