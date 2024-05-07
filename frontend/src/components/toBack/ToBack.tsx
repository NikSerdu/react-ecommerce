import { ButtonHTMLAttributes, FC } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
type TypeData = {} & ButtonHTMLAttributes<HTMLButtonElement>
const ToBack: FC<TypeData> = ({ className }) => {
	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	return (
		<button onClick={goBack} className={className}>
			<FaArrowLeft />
		</button>
	)
}

export default ToBack
