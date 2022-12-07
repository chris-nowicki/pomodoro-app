import React, { useState, useRef } from "react"
import closeIcon from "../../assets/icon-close.svg"
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

		// update settings state
		setSettings({
			pomodoro: Number(pomodoro.current.value),
			shortBreak: Number(shortBreak.current.value),
			longBreak: Number(longBreak.current.value),
			font: font,
			color: color,
		})

		// change body font family and font weight
		document.getElementsByTagName(
			"body"
		)[0].style.fontFamily = `var(--${font.family})`
		document.getElementById("js-minutes").style.fontWeight = font.weight
		document.getElementById("js-colon").style.fontWeight = font.weight
		document.getElementById("js-seconds").style.fontWeight = font.weight

		// change background colors for mode button and progress bar
		let activeColor = document.getElementsByClassName("active")[0].style
		activeColor.backgroundColor = `var(--${color})`

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
	}

	return (
		<div className="absolute z-30 flex h-screen w-full flex-row items-center justify-center">
			<div className="settings-container relative flex flex-col items-center">
				{/* settings menu */}
				<div className="settings flex flex-col bg-white">
					{/* header */}
					<div className="sm: mt-[24px] flex w-full items-center justify-between border-b sm:pb-[28px] md:mt-[34px] md:pb-[24px]">
						<h2 className="ml-[40px] text-[#161932]">Settings</h2>
						<button onClick={() => setShowSettings(false)}>
							<img
								src={closeIcon}
								alt="close menu"
								className="mr-[38px]"
							/>
						</button>
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
								buttonId="kumbh"
								buttonClassProps="fontButton"
								fontClassProps="kumbh-font"
								type="font"
								active={font.family}
								onClick={() =>
									setFont({ family: "kumbh", weight: 700 })
								}
							/>
							<Button
								buttonId="roboto"
								buttonClassProps="fontButton"
								fontClassProps="roboto-font"
								type="font"
								active={font.family}
								onClick={() =>
									setFont({ family: "roboto", weight: 700 })
								}
							/>
							<Button
								buttonId="space"
								buttonClassProps="fontButton"
								fontClassProps="space-font"
								type="font"
								active={font.family}
								onClick={() =>
									setFont({ family: "space", weight: 400 })
								}
							/>
						</div>
					</div>
					{/* color settings */}
					<div className="flex items-center justify-between sm:flex-col sm:pt-[16px] md:ml-[40px] md:h-[109px] md:w-[462px] md:flex-row md:py-[24px]">
						<h4 className="text-[#161932] sm:pb-[18px]">color</h4>
						<div className="flex w-[152px] flex-row items-center justify-between">
							<Button
								buttonId="red"
								buttonClassProps="colorButton colorButton-red"
								type="color"
								active={color}
								onClick={() => setColor("red")}
							/>
							<Button
								buttonId="blue"
								buttonClassProps="colorButton colorButton-blue"
								type="color"
								active={color}
								onClick={() => setColor("blue")}
							/>
							<Button
								buttonId="purple"
								buttonClassProps="colorButton colorButton-purple"
								type="color"
								active={color}
								onClick={() => setColor("purple")}
							/>
						</div>
					</div>
				</div>
				{/* apply button */}
				<button
					className="apply bottom-0"
					onClick={() => handleApply()}
				>
					<h3>Apply</h3>
				</button>
			</div>
		</div>
	)
}

export default SettingsMenu
