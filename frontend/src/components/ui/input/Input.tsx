import cn from 'clsx'
import { FC, InputHTMLAttributes, forwardRef } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...rest }, ref) => {
		return (
			<input
				type='text'
				{...rest}
				ref={ref}
				className={cn(
					'outline-none border-b border-primary px-2 py-1 placeholder:text-xs',
					className
				)}
			/>
		)
	}
)

export default Input
