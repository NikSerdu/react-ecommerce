import { NextUIProvider } from '@nextui-org/system'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Layout from './components/layout/Layout.tsx'
import './index.css'
import AuthProvider from './providers/AuthProvider.tsx'
import { store } from './store/store.ts'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<Provider store={store}>
			<Layout>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<NextUIProvider>
							<App />
						</NextUIProvider>
					</AuthProvider>
				</QueryClientProvider>
			</Layout>
		</Provider>
	</BrowserRouter>
)
