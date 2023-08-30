/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#1788aa',

					secondary: '#c1496d',

					accent: '#e268d8',

					neutral: '#21212b',

					'base-100': '#ffffff',

					info: '#7fa6f5',

					success: '#22d889',

					warning: '#a08603',

					error: '#eb7166',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
