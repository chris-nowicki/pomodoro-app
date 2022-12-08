import React from "react"
import checkIcon from "../../assets/icon-check.svg"
import { useActive } from "../hooks/useActive"

function Button({
	data,
	buttonClassProps,
	fontClassProps,
	type,
	active,
	onClick,
}) {
	const isActive = useActive(data, active)
	let buttonClass
	let fontClass

	if (type === "font" && isActive) {
		buttonClass = `${buttonClassProps} fontButton-active`
		fontClass = `${fontClassProps} font-active`
	} else {
		buttonClass = `${buttonClassProps}`
		fontClass = `${fontClassProps}`
	}

	return (
		<button
			onClick={() => onClick()}
			className={`${buttonClass} flex flex-row items-center justify-center`}
		>
			{/* font button Aa text */}
			{type === "font" && <span className={`font ${fontClass}`}>Aa</span>}

			{/* color button checkmark */}
			{type === "color" && isActive && (
				<img src={checkIcon} alt="selected" />
			)}
		</button>
	)
}

export default Button
