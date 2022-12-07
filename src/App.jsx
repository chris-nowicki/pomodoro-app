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
		font: { family: "kumbh", weight: 700 },
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
	const [matches, setMatches] = useState(false)
	const [storedProgress, setStoredProgress] = useState(1030)

	// assign variable to progress bar
	let progressBar = document.getElementsByTagName("circle")[0]

	// check media query for progress bar
	useEffect(() => {
		const media = window.matchMedia("(max-width: 561px)")
		if (media.matches !== matches) {
			setMatches(media.matches)
		}
		const listener = () => setMatches(media.matches)
		window.addEventListener("resize", listener)
		return () => window.removeEventListener("resize", listener)
	}, [matches])

	// checks for when countdown is over and resets the clock
	// auto changes mode to next mode based on settings
	// resets the timer action to start
	useEffect(() => {
		if (remainingTime.total <= 0) {
			clearInterval(countdown)
			setStoredProgress(1030)
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

		// reset progress bar

		progressBar.style.strokeDashoffset = 1030

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
		let progressIncrement
		if (!matches) {
			progressIncrement = 1030 / (settings[currentMode] * 60) // number of deg to increase progress bar by per each second
		} else {
			progressIncrement = 714 / (settings[currentMode] * 60) // number of deg to increase progress bar by per each second
		}
		progressBar.style.stroke = `var(--${settings.color})`
		let { total } = remainingTime // total time in seconds
		const endTime = Date.parse(Date()) + total * 1000 // gets the end time to countdown to
		let progress = storedProgress
		setCountdown(
			setInterval(function () {
				setRemainingTime(countdownTime(endTime))
				progress = progress - progressIncrement
				setStoredProgress(progress)
				progressBar.style.strokeDashoffset = progress
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
						<div className="circle relative flex items-center justify-center">
							{/* progress bar */}

							<svg>
								{!matches ? (
									<circle cx="174" cy="174" r="163" />
								) : (
									<circle cx="124" cy="124" r="114" />
								)}
							</svg>
							{/* end of progress circle */}

							{/* clock container */}
							<div className="clock-display z-10 flex w-full flex-col items-center">
								<div className="flex h-[132px] w-full items-center justify-center sm:ml-[38px] md:ml-[48px]">
									<h1
										id="js-minutes"
										className="flex w-[132px] justify-end"
									>
										{`${remainingTime.minutes}`.padStart(
											2,
											"0"
										)}
									</h1>
									<h1 id="js-colon" className="w-auto">
										:
									</h1>
									<h1 id="js-seconds" className="w-[180px]">
										{`${remainingTime.seconds}`.padStart(
											2,
											"0"
										)}
									</h1>
								</div>
								<div className="ml-4 flex w-full flex-row justify-center md:mt-[24px]">
									<button onClick={() => handleAction()}>
										<h3>{action}</h3>
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* settings icon */}
					<button onClick={() => setShowSettings(true)}>
						<img
							src={settingsIcon}
							className="sm:mt-[79px] md:mt-[63px]"
						/>
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
