/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#fff7ed',
					100: '#ffedd5',
					200: '#fed7aa',
					300: '#fdba74',
					400: '#fb923c',
					500: '#f97316',
					600: '#ea580c',
					700: '#c2410c',
					800: '#9a3412',
					900: '#7c2d12',
				},
				accent: {
					light: '#a12828',
					dark: '#820000',
				},
				neobrutalist: {
					yellow: '#FFFF00',
					pink: '#FF00FF',
					cyan: '#00FFFF',
					green: '#00FF00',
					orange: '#FF8C00',
				}
			},
			fontFamily: {
				sans: ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
				mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
			},
			boxShadow: {
				'brutal': '6px 6px 0px 0px rgba(0,0,0,1)',
				'brutal-sm': '3px 3px 0px 0px rgba(0,0,0,1)',
				'brutal-lg': '10px 10px 0px 0px rgba(0,0,0,1)',
				'brutal-white': '6px 6px 0px 0px rgba(255,255,255,1)',
			},
			borderWidth: {
				'3': '3px',
				'5': '5px',
			}
		},
	},
	plugins: [],
}
