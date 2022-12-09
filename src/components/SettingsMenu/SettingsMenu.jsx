import React, { useState, useRef } from "react"
import Input from "./Input"
import Button from "./Button"

function SettingsMenu({
	settings,
	setSettings,
	setShowSettings,
	currentMode,
	countdown,
	updateRemainingTime,
}) {
	const [font, setFont] = useState(settings.font)
	const [color, setColor] = useState(settings.color)
	const pomodoro = useRef()
	const shortBreak = useRef()
	const longBreak = useRef()

	const handleApply = () => {
		// clear interval
		clearInterval(countdown)

		// change font family, font-weight, and color for app highlights
		const root = document.documentElement.style
		root.setProperty("--font-family", `${font.family}`)
		root.setProperty("--font-weight", font.weight)
		root.setProperty("--app-color", color)

		// update remaining time for clock display
		let mode
		switch (currentMode) {
			case "pomodoro":
				mode = Number(pomodoro.current.value)
				break
			case "shortBreak":
				mode = Number(shortBreak.current.value)
				break
			case "longBreak":
				mode = Number(longBreak.current.value)
				break
		}

		// update remaining time on the clock display for current selected mode
		updateRemainingTime(mode)

		// reset progress bar
		let progressBar = document.getElementsByTagName("circle")[0]
		progressBar.style.strokeDashoffset = 1030

		// update settings state
		setSettings({
			pomodoro: Number(pomodoro.current.value),
			shortBreak: Number(shortBreak.current.value),
			longBreak: Number(longBreak.current.value),
			font: font,
			color: color,
		})
	}

	return (
		<div className="absolute z-30 flex h-screen w-full flex-row items-center justify-center">
			<div className="settings-container relative flex flex-col items-center">
				{/* settings menu */}
				<div className="settings flex flex-col bg-white">
					{/* header */}
					<div className="sm: mt-[24px] flex w-full items-center justify-between border-b sm:pb-[28px] md:mt-[34px] md:pb-[24px]">
						<h2 className="ml-[40px] text-[#161932]">Settings</h2>
						<a onClick={() => setShowSettings(false)}>
							{/* close icon */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								className="mr-[38px]"
							>
								<path
									fill="#1E213F"
									fillRule="evenodd"
									d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"
									opacity=".5"
									className="close"
								/>
							</svg>
						</a>
					</div>

					{/* time settings */}
					<div className="mt-[24px] flex w-full flex-col md:ml-[40px] md:mb-[24px] md:h-[109px] md:w-[462px]">
						<h4 className="text-[#161932] sm:mb-[18px] sm:text-center md:mb-0">
							time (minutes)
						</h4>

						{/* minute input fields for pomodoro, short break, and long break*/}
						<div className="flex justify-between border-b pb-[24px] sm:flex-col sm:px-[24px] md:flex-row md:px-0">
							<Input
								id="pomodoro"
								name="pomodoro"
								ref={pomodoro}
								defaultValue={settings.pomodoro}
							/>
							<Input
								id="shortBreak"
								name={"short break"}
								ref={shortBreak}
								defaultValue={settings.shortBreak}
							/>
							<Input
								id="longBreak"
								name={"long break"}
								ref={longBreak}
								defaultValue={settings.longBreak}
							/>
						</div>
					</div>

					{/* font settings */}
					<div className="flex items-center border-b py-[24px] sm:flex-col md:ml-[40px] md:h-[109px] md:w-[462px] md:flex-row md:justify-between">
						<h4 className="text-[#161932] sm:mb-[18px] md:mb-0">
							FONT
						</h4>
						<div className="flex w-[152px] flex-row items-center justify-between">
							<Button
								data={`"Kumbh Sans", sans-serif`}
								buttonClassProps="fontButton"
								fontClassProps="kumbh-font"
								type="font"
								active={font.family}
								onClick={() =>
									setFont({
										family: `"Kumbh Sans", sans-serif`,
										weight: 700,
									})
								}
							/>
							<Button
								data={`"Roboto Slab", serif`}
								buttonClassProps="fontButton"
								fontClassProps="roboto-font"
								type="font"
								active={font.family}
								onClick={() =>
									setFont({
										family: `"Roboto Slab", serif`,
										weight: 700,
									})
								}
							/>
							<Button
								data={`"Space Mono", monospace`}
								buttonClassProps="fontButton"
								fontClassProps="space-font"
								type="font"
								active={font.family}
								onClick={() =>
									setFont({
										family: `"Space Mono", monospace`,
										weight: 400,
									})
								}
							/>
						</div>
					</div>
					{/* color settings */}
					<div className="flex items-center justify-between sm:flex-col sm:pt-[16px] md:ml-[40px] md:h-[109px] md:w-[462px] md:flex-row md:py-[24px]">
						<h4 className="text-[#161932] sm:pb-[18px]">color</h4>
						<div className="flex w-[152px] flex-row items-center justify-between">
							<Button
								data={`hsl(0, 91%, 71%)`}
								buttonClassProps="colorButton colorButton-red"
								type="color"
								active={color}
								onClick={() => setColor(`hsl(0, 91%, 71%)`)}
							/>
							<Button
								data={`hsl(182, 91%, 71%)`}
								buttonClassProps="colorButton colorButton-blue"
								type="color"
								active={color}
								onClick={() => setColor(`hsl(182, 91%, 71%)`)}
							/>
							<Button
								data={`hsl(284, 89%, 74%)`}
								buttonClassProps="colorButton colorButton-purple"
								type="color"
								active={color}
								onClick={() => setColor(`hsl(284, 89%, 74%)`)}
							/>
						</div>
					</div>
				</div>
				{/* apply button */}
				<button
					className="apply bottom-0"
					onClick={() => handleApply()}
				>
					<h3 className="">Apply</h3>
				</button>
			</div>
		</div>
	)
}

export default SettingsMenu
