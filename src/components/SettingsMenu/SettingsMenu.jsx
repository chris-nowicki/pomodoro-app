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

		// change body font
		let body = document.getElementsByTagName("BODY")[0].style
		body.fontFamily = `var(--${font})`

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

		// reset progress bar to 0 degrees
		let progressBar = document.getElementById("progress")
		progressBar.style.backgroundImage = `conic-gradient(#161932 ${0}deg, #161932 0deg)`
	}

	return (
		<div className="absolute flex flex-row justify-center items-center h-screen w-full">
			<div className="relative flex flex-col w-[540px] h-[490px] items-center">
				{/* settings menu */}
				<div className="settings flex flex-col w-full h-[464px] bg-white">
					{/* header */}
					<div className="flex w-full items-center justify-between mt-[34px] pb-[24px] border-b">
						<h2 className="text-[#161932] ml-[40px]">Settings</h2>
						<button onClick={() => setShowSettings(false)}>
							<img
								src={closeIcon}
								alt="close menu"
								className="mr-[38px]"
							/>
						</button>
					</div>

					{/* time settings */}
					<div className="flex flex-col w-[462px] h-[109px] mt-[24px] ml-[40px] mb-[24px]">
						<h4 className="text-[#161932]">time (minutes)</h4>

						{/* minute input fields for pomodoro, short break, and long break*/}
						<div className="flex flex-row justify-between pb-[24px] border-b">
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
					<div className="flex flex-row items-center justify-between w-[462px] h-[109px] ml-[40px] py-[24px] border-b">
						<h4 className="text-[#161932]">FONT</h4>
						<div className="flex flex-row items-center justify-between w-[152px]">
							<Button
								buttonId="kumbh"
								buttonClassProps="fontButton"
								fontClassProps="kumbh-font"
								type="font"
								active={font}
								onClick={() => setFont("kumbh")}
							/>
							<Button
								buttonId="roboto"
								buttonClassProps="fontButton"
								fontClassProps="roboto-font"
								type="font"
								active={font}
								onClick={() => setFont("roboto")}
							/>
							<Button
								buttonId="space"
								buttonClassProps="fontButton"
								fontClassProps="space-font"
								type="font"
								active={font}
								onClick={() => setFont("space")}
							/>
						</div>
					</div>
					{/* color settings */}
					<div className="flex flex-row items-center justify-between w-[462px] h-[109px] ml-[40px] py-[24px]">
						<h4 className="text-[#161932]">color</h4>
						<div className="flex flex-row items-center justify-between w-[152px]">
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
