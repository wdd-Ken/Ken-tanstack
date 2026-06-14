import { createFileRoute } from '@tanstack/react-router'
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Plus } from 'lucide-react'
import { TodoItem } from '#/components/todolist'

export const Route = createFileRoute('/todolist/')({
  component: ToDoList,  
})

// function RouteComponent() {
//   return <div>Hello "/(pages)/todolist/"!</div>
// }

function ToDoList() {
	const [input, setInput] = useState('')
	const [list, setList] = useState<string[]>([])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)

	const handleClick = () => {
		if (!input.trim()) return

		setList(prev => [...prev, input])
		setInput('')
	}

	const handleDelete = (id: number) => {
		setList(prev => prev.filter((_, i) => i !== id))
	}

	return (
		<>
			<div className={cn(
				'p-7.5',
				'w-screen',
				'font-(family-name:--font-jost)',
			)}>
				<div className={cn(
					'mx-auto',
					'p-7.5',
					'relative',
					'flex',
					'flex-col',
					'gap-1.25',
					'w-150',
					'min-h-175',
					'rounded-[10px]',
					'shadow-xl',
					'overflow-hidden'
				)}>
					<div className={cn(
						'absolute',
						'left-0',
						'top-0',
						'w-full',
						'h-full',
						'-z-1',
						'opacity-80'
					)}>
            <div className={cn(
              'object-cover',
							'opacity-50'
            )}>
              <img src="/pic_01.jpg" alt="" />
            </div>
					</div>
					<div className={cn(
						'flex',
						'items-center',
						'justify-between',
						'gap-2.5',
						'min-h-15',
					)}>
						<input
							type="text"
							value={input}
							onChange={handleChange}
							placeholder="請輸入待辦事項"
							className={cn(
								'basis-full',
								'text-[18px]',
								'text-white',
								'border-0',
								'focus:outline-0'
							)}
						/>
						<div
							onClick={handleClick}
							className={cn(
								'w-7.5',
								'h-7.5',
								'flex',
								'justify-center',
								'items-center',
								'cursor-pointer',
								'bg-lime-600',
								'shrink-0',
								'rounded-[5px]'
							)}>
							<Plus className={cn(
								'h-5',
								'w-5',
								'text-lime-50'
							)} />
						</div>
					</div>
					{
						list.map((item, i) => (
							<TodoItem
								key={i}
								id={i}
								value={item}
								onDelete={handleDelete}
							/>
						))
					}
				</div>
			</div>
		</>
	)
}