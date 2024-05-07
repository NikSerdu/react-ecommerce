import cn from 'clsx'
import {
	FC,
	HTMLAttributes,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'
import ScrollToTop from '../../scrollToTop/ScrollToTop'
import Button from '../button/Button'

type TypeData = {
	items: {
		id: number
		title: string
		content: ReactNode
	}[]
	orientation?: 'vertical' | 'horizontal'
	showButtons?: boolean
} & HTMLAttributes<HTMLDivElement>

const Tabs: FC<TypeData> = ({
	items,
	className,
	orientation = 'horizontal',
	showButtons = true
}) => {
	const [activeId, setActiveId] = useState<number>(1)
	const [left, setLeft] = useState<number>(0)
	const [top, setTop] = useState<number>(0)
	const [width, setWidth] = useState<number>(0)
	const [height, setHeight] = useState<number>(0)
	const tabsRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (tabsRef.current) {
			// Устанавливаем начальные значения при загрузке компонента
			const activeTab = tabsRef.current.children[activeId - 1] as HTMLElement
			setLeft(activeTab.offsetLeft)
			setTop(activeTab.offsetTop)
			setWidth(activeTab.offsetWidth)
			setHeight(activeTab.offsetHeight)
		}
	}, [activeId])
	return (
		<>
			<div
				className={cn('', {
					'flex gap-10': orientation === 'vertical'
				})}
			>
				<div>
					<div
						ref={tabsRef}
						className={cn(
							'flex  bg-primary/10 rounded-xl  relative',
							className,
							{
								'flex-col gap-3': orientation === 'vertical'
							}
						)}
					>
						{items.map(item => (
							<div
								key={item.id}
								className={cn(
									' px-14 py-3 h-full  rounded-xl hover:cursor-pointer text-center',

									{
										'text-white': item.id === activeId
									}
								)}
								onClick={() => setActiveId(item.id)}
							>
								{item.title}
							</div>
						))}
						<div
							className='bg-primary rounded-xl absolute bottom-0 -z-10 h-full transition-all duration-200'
							style={{
								left: `${left}px`,
								width: `${width}px`,
								height: `${height}px`,
								top: `${top}px`
							}}
						></div>
					</div>
				</div>
				<div className='w-full'>{items[activeId - 1].content}</div>
			</div>
			{showButtons && (
				<div className='flex mt-20 mb-10'>
					{activeId > 1 && (
						<Button
							text='Назад'
							onClick={() =>
								setActiveId(prev => {
									return prev - 1
								})
							}
							className='text-2xl mr-auto'
						/>
					)}
					{activeId < items.length && (
						<Button
							text='Далее'
							onClick={() =>
								setActiveId(prev => {
									return prev + 1
								})
							}
							className='text-2xl ml-auto'
						/>
					)}
				</div>
			)}
			<ScrollToTop trigger={activeId} />
		</>
	)
}

export default Tabs
