import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'

import CategoryPage from './components/category/CategoryPage'

import NotFoundPage from './pages/notFound/NotFoundPage'

import AdminManagerRoute from './components/routes/adminManagerRoute'
import Auth from './pages/auth/Auth'
import CartPage from './pages/cart/CartPage'
import Catalog from './pages/catalog/Catalog'
import Dashboard from './pages/dashboard/Dashboard'
import UpdateProduct from './pages/dashboard/products/updateProduct/UpdateProduct'
import FavouritesPage from './pages/favourites/FavouritesPage'
import Home from './pages/home/Home'
import MyOrders from './pages/myOrders/MyOrders'
import OrderPage from './pages/myOrders/orderPage/OrderPage'
import ProductPage from './pages/product/ProductPage'
import ThanksPage from './pages/thanks/ThanksPage'

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
				<Route element={<AdminManagerRoute />}>
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
