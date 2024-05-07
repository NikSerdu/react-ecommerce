import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
type TypeData = {
	className?: string
}
const Container: FC<PropsWithChildren<TypeData>> = ({
	children,
	className = ''
}) => {
	return (
		<div className={cn('max-w-[1170px] mx-auto max-[1200px]:px-5', className)}>
			{children}
		</div>
	)
}

export default Container
