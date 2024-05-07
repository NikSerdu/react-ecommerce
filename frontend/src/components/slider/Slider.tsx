import { FC } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
const Slider: FC = () => {
	return (
		<Carousel showThumbs={false} showStatus={false}>
			<div>
				<img src='images/slide.jpg' />
			</div>
			<div>
				<img src='images/slide.jpg' />
			</div>
			<div>
				<img src='images/slide.jpg' />
			</div>
		</Carousel>
	)
}

export default Slider
