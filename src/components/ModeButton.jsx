import React from "react"
import { useActive } from "./hooks/useActive"

function ModeButton({ name, data, active, onClick }) {
	const isActive = useActive(data, active)

	let buttonClass
	let buttonStyle

	if (isActive) {
		buttonClass = "button active"
	} else {
		buttonClass = "button"
	}

	return (
		<>
			<button
				className={buttonClass}
				onClick={() => onClick()}
			>
				{name}
			</button>
		</>
	)
}

export default ModeButton
