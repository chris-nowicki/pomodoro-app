import React from "react"
import { useActive } from "./hooks/useActive"

function ModeButton({ name, data, color, active, onClick }) {
	const isActive = useActive(data, active)

	let buttonClass
	let buttonStyle

	if (isActive) {
		buttonClass = "button active"
		buttonStyle = { backgroundColor: `var(--${color})` }
	} else {
		buttonClass = "button"
		buttonStyle = {}
	}

	return (
		<>
			<button
				className={buttonClass}
				style={buttonStyle}
				onClick={() => onClick()}
			>
				{name}
			</button>
		</>
	)
}

export default ModeButton
