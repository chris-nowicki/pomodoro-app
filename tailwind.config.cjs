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
		extend: {},
	},
	plugins: [],
}
