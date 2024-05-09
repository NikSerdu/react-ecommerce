import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { ProductService } from '../../services/product.service'
import Container from '../ui/container/Container'
import HomeSlider from './homeSlider/HomeSlider'
import Sidebar from './sidebar/Sidebar'
const Home: FC = () => {
	const { data: saleProducts } = useQuery({
		queryKey: ['get recently sales'],
		queryFn: () => ProductService.getRecentlySales()
	})

	const { data: newProducts } = useQuery({
		queryKey: ['get recently created'],
		queryFn: () => ProductService.getRecentlyCreated()
	})

	return (
		<Container>
			<div className='flex max-[906px]:flex-col-reverse'>
				<div className='pt-5 pb-5 min-[906px]:pr-20 border-r-2 border-primary/10 '>
					<Sidebar className='min-[906px]:w-[150px]' />
				</div>
				<div className='min-w-[80%] w-full p-5 mx-auto'>
					<Slider
						className=''
						arrows={false}
						autoplay={true}
						autoplaySpeed={3000}
					>
						<div>
							<img className='w-[950px]' src='images/slide.jpg' />
						</div>
						<div>
							<img className='w-[950px]' src='images/slide.jpg' />
						</div>
						<div>
							<img className='w-[950px]' src='images/slide.jpg' />
						</div>
					</Slider>
				</div>
			</div>

			{saleProducts && (
				<HomeSlider title='Распродажа' products={saleProducts} />
			)}
			{newProducts && <HomeSlider title='Новинки' products={newProducts} />}
		</Container>
	)
}

export default Home
