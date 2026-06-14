import { cn } from "@/lib/utils"
import { Minus } from 'lucide-react'
interface TodoItemProps {
	value: string,
	id: number,
	onDelete: (id: number) => void
}

export const TodoItem = ({
	value,
	id,
	onDelete
}: TodoItemProps) => {
	return (
		<div className={cn(
			'min-h-[40px]',
			'text-[18px]',
			'flex',
			'items-center',
			'gap-[10px]',
			'text-white'
		)}>
			<div className={cn(
				'shrink-[0]',
			)}>
				{id + 1}.
			</div>
			<div className={cn(
				'basis-full',
			)}>
				{value}
			</div>
			<div
				onClick={() => onDelete(id)}
				className={cn(
					'w-[30px]',
					'h-[30px]',
					'flex',
					'justify-center',
					'items-center',
					'cursor-pointer',
					'bg-red-600',
					'shrink-[0]',
					'rounded-[5px]'
				)}>
				<Minus className={cn(
					'h-[20px]',
					'w-[20px]',
					'text-lime-50'
				)} />
				<div className={cn(
					'',
					'',
					'',
					'',
					''
				)}></div>
			</div>
		</div>
	)
}