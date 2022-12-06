import { useState, useEffect } from "react"
import "./App.css"
import settingsIcon from "./assets/icon-settings.svg"
import SettingsMenu from "./components/SettingsMenu/SettingsMenu"
import ModeButton from "./components/ModeButton"
import { useRemainingTime } from "./components/hooks/useRemainingTime"

function App() {
	const [settings, setSettings] = useState({
		pomodoro: 25,
		shortBreak: 5,
		longBreak: 15,
		font: "kumbh",
		color: "red",
	})
	const [showSettings, setShowSettings] = useState(false)
	const [currentMode, setCurrentMode] = useState("pomodoro")
	const { calculateTime, countdownTime } = useRemainingTime()
	const [remainingTime, setRemainingTime] = useState({
		total: settings.pomodoro * 60,
		minutes: settings.pomodoro,
		seconds: 0,
	})
	const [countdown, setCountdown] = useState(null)
	const [action, setAction] = useState("start")

	// assign variable to progress bar
	let progressBar = document.getElementById("progress")

	// checks for when countdown is over and resets the clock
	// auto changes mode to next mode based on settings
	// resets the timer action to start
	useEffect(() => {
		if (remainingTime.total <= 0) {
			clearInterval(countdown)
			if (currentMode === "pomodoro") {
				setCurrentMode("shortBreak")
				setRemainingTime(calculateTime(settings.shortBreak))
			} else {
				setCurrentMode("pomodoro")
				setRemainingTime(calculateTime(settings.pomodoro))
			}
			setAction("start")
		}
	}, [remainingTime.total])

	const updateMode = (data) => {
		// get the mode from the button selected
		let mode = data

		// clear interval on mode change
		clearInterval(countdown)

		// set timer action to start
		setAction("start")

		// update currentMode and
		setCurrentMode(mode)

		// reset progress bar to 0 deg
		progressBar.style.backgroundImage = `conic-gradient(#161932 ${0}deg, #161932 0deg)`

		// update time remaining
		setRemainingTime(calculateTime(settings[mode]))
	}

	// pause or start timer based on action selected in timer
	const handleAction = () => {
		if (action === "start") {
			setAction("pause")
			startTimer()
		} else {
			clearInterval(countdown)
			setAction("start")
		}
	}

	// starts the countdown timer and progress bar in the clock display
	function startTimer() {
		let progressValue = 360 / (settings[currentMode] * 60) // number of deg to increase progress bar by per each second
		let progress = 0 // number to store current progress in deg
		let { total } = remainingTime // total time in seconds
		const endTime = Date.parse(Date()) + total * 1000 // gets the end time to countdown to
		setCountdown(
			setInterval(function () {
				setRemainingTime(countdownTime(endTime))
				progress = progress + progressValue
				progressBar.style.backgroundImage = `conic-gradient(var(--${settings.color}) ${progress}deg, #161932 0deg)`
			}, 1000)
		)
	}

	return (
		<>
			<div className="flex flex-row justify-center">
				{/* pomodoro app container */}
				<div className="flex flex-col items-center">
					<span className="mt-12">pomodoro</span>
					{/* mode menu container */}
					<div className="modeMenu flex flex-row items-center justify-evenly">
						<ModeButton
							name="pomodoro"
							data="pomodoro"
							color={settings.color}
							active={currentMode}
							onClick={() => updateMode("pomodoro")}
						/>
						<ModeButton
							name="short break"
							data="shortBreak"
							color={settings.color}
							active={currentMode}
							onClick={() => updateMode("shortBreak")}
						/>
						<ModeButton
							name="long break"
							data="longBreak"
							color={settings.color}
							active={currentMode}
							onClick={() => updateMode("longBreak")}
						/>
					</div>

					{/* timer container */}
					<div className="timer-container flex flex-col items-center justify-center">
						{/* main circle */}
						<div className="circle flex items-center justify-center">
							{/* progress bar */}
							<div
								id="progress"
								className="progress-bar flex items-center justify-center"
							>
								{/* clock container */}
								<div className="clockContainer flex flex-col justify-center">
									<div className="flex flex-col items-center w-full">
										<div className="flex h-[132px] items-center w-full ml-[28px]">
											<h1
												id="js-minutes"
												className="w-[132px]"
											>
												{`${remainingTime.minutes}`.padStart(
													2,
													"0"
												)}
											</h1>
											<h1 className="w-auto">:</h1>
											<h1
												id="js-seconds"
												className="w-[170px]"
											>
												{`${remainingTime.seconds}`.padStart(
													2,
													"0"
												)}
											</h1>
										</div>
										<div className="flex flex-row w-full justify-center ml-4">
											<button
												onClick={() => handleAction()}
											>
												<h3 className="mt-[20px]">
													{action}
												</h3>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* settings icon */}
					<button onClick={() => setShowSettings(true)}>
						<img src={settingsIcon} className="mt-[63px]" />
					</button>
				</div>
				{showSettings && (
					<SettingsMenu
						settings={settings}
						setSettings={setSettings}
						setShowSettings={setShowSettings}
						currentMode={currentMode}
						countdown={countdown}
						updateRemainingTime={(mode) =>
							setRemainingTime(calculateTime(mode))
						}
					/>
				)}
			</div>
		</>
	)
}

export default App
