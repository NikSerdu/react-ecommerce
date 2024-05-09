import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/uploads': {
				target: 'http://192.168.0.63:3000',
				changeOrigin: true,
				headers: {
					'ngrok-skip-browser-warning': '123'
				}
			}
		}
	}
})
