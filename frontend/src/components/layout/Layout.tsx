import { FC, PropsWithChildren } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className='relative'>
			<Header />
			<hr></hr>
			<div
				className='pb-20 max-[768px]:mt-20'
				style={{
					minHeight: 'calc(100vh - 249px)'
				}}
			>
				{children}
			</div>
			<div className=''>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
