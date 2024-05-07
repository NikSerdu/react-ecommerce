import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Auth from './components/auth/Auth'
import CartPage from './components/cart/CartPage'
import Catalog from './components/catalog/Catalog'
import CategoryPage from './components/category/CategoryPage'
import Dashboard from './components/dashboard/Dashboard'
import UpdateProduct from './components/dashboard/products/updateProduct/UpdateProduct'
import FavouritesPage from './components/favourites/FavouritesPage'
import Home from './components/home/Home'
import MyOrders from './components/myOrders/MyOrders'
import OrderPage from './components/myOrders/orderPage/OrderPage'
import NotFoundPage from './components/notFound/NotFoundPage'
import ProductPage from './components/product/ProductPage'
import AdminRoute from './components/routes/adminRoute'
import ThanksPage from './components/thanks/ThanksPage'

function App() {
	return (
		<>
			<Routes>
				<Route element={<Home />} path='/' />
				<Route element={<Auth />} path='/auth' />
				<Route path='/orders'>
					<Route element={<MyOrders />} path='' />
					<Route element={<OrderPage />} path=':orderId' />
				</Route>
				<Route
					element={<CategoryPage />}
					path='/products/:categoryName/:categoryId'
				/>
				<Route element={<ProductPage />} path='/product/:productId' />
				<Route element={<AdminRoute />}>
					<Route path='/dashboard' element={<Dashboard />} />
					<Route
						path='/dashboard/product/update/:productId'
						element={<UpdateProduct />}
					/>
				</Route>
				<Route path='/cart' element={<CartPage />} />
				<Route path='/favourites' element={<FavouritesPage />} />
				<Route path='/catalog' element={<Catalog />} />
				<Route path='/thanks' element={<ThanksPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<ToastContainer />
		</>
	)
}

export default App
