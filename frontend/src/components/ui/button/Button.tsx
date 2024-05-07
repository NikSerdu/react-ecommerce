import cn from 'clsx'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

type TypeData = {
	text: string
	textColor?: string
	variant?: 'fill' | 'outline'
	icon?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<TypeData> = ({
	text,
	textColor = 'text-white',
	variant = 'fill',
	className,
	icon = <></>,
	...rest
}) => {
	return (
		<button
			{...rest}
			className={cn(
				'px-6 py-3 rounded-md text-sm  transition-all duration-150 flex items-center gap-2 hover:bg-opacity-90 border-2 justify-center ',
				textColor,
				className,
				{
					'bg-transparent': variant === 'outline'
				}
			)}
		>
			{icon} {text}
		</button>
	)
}

export default Button
