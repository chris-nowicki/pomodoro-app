/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			sm: "300px",
			md: "562px",
			lg: "976px",
			xl: "1440px",
		},
		extend: {
			colors: {
				"app-red": "#F87070",
				"app-blue": "#70F3F8",
				"app-purple": "#D881F8",
			},
		},
	},
	plugins: [],
}
