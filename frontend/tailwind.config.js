const { nextui } = require('@nextui-org/theme')

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/components/tabs.js'
	],
	theme: {
		extend: {
			colors: {
				primary: '#363738',
				secondary: '#F5F5F5',
				secondary2: '#DB4444',
				red: '#DB4444'
			},
			boxShadow: {
				'3xl': '0px 0px 23px 0px rgba(0,0,0,0.10);'
			}
		}
	},
	darkMode: 'class',
	plugins: [nextui()]
}
