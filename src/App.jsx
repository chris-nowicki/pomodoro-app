import { useState, useEffect } from "react"
import "./App.css"
import SettingsMenu from "./components/SettingsMenu/SettingsMenu"
import ModeButton from "./components/ModeButton"
import { useRemainingTime } from "./components/hooks/useRemainingTime"
import { useProgress } from "./components/hooks/useProgress"

function App() {
	const [settings, setSettings] = useState({
		pomodoro: 25,
		shortBreak: 5,
		longBreak: 15,
		font: { family: `"Kumbh Sans", sans-serif`, weight: 700 },
		color: `hsl(0, 91%, 71%)`,
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
	const { storedProgress, progressIncrement } = useProgress(
		matches,
		settings,
		remainingTime,
		currentMode
	)

	// check media query for progress bar
	useEffect(() => {
		const media = window.matchMedia("(max-width: 561px)")
		let progressBar = document.getElementsByTagName("circle")[0]
		if (media.matches !== matches) {
			setMatches(media.matches)
		} else {
		}
		const listener = () => {
			setMatches(media.matches)
			clearInterval(countdown)
			setAction("start")
			progressBar.style.strokeDashoffset = storedProgress
		}
		window.addEventListener("resize", listener)
		return () => window.removeEventListener("resize", listener)
	}, [matches])

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

		// reset progress bar
		let progressBar = document.getElementsByTagName("circle")[0]
		progressBar.style.strokeDashoffset = 1030

		// update time remaining
		setRemainingTime(calculateTime(settings[mode]))
	}

	const stopTimer = () => {
		clearInterval(countdown)
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
		let progressBar = document.getElementsByTagName("circle")[0]
		progressBar.style.stroke = `var(--${settings.color})`
		const { total } = remainingTime // total time in seconds
		const endTime = Date.parse(Date()) + total * 1000 // gets the end time to countdown to
		let progress = storedProgress
		setCountdown(
			setInterval(function () {
				setRemainingTime(countdownTime(endTime))
				progress = progress - progressIncrement
				progressBar.style.strokeDashoffset = progress
			}, 1000)
		)
	}

	return (
		<>
			<div className="flex flex-row justify-center">
				{/* pomodoro app container */}
				<main className="flex flex-col items-center">
					<span className="mt-12">pomodoro</span>
					{/* mode menu container */}
					<div className="modeMenu z-20 flex flex-row items-center justify-evenly">
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
									<button
										id="action-button"
										onClick={() => handleAction()}
									>
										{action}
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* settings icon */}
					<button
						onClick={() => setShowSettings(true)}
						className="settings-button"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							className="sm:mt-[79px] md:mt-[63px]"
						>
							<path
								fill="#D7E0FF"
								d="M26.965 17.682l-2.927-2.317c.055-.448.097-.903.097-1.365 0-.462-.042-.917-.097-1.365l2.934-2.317a.702.702 0 00.167-.896l-2.775-4.851a.683.683 0 00-.847-.301l-3.454 1.407a10.506 10.506 0 00-2.345-1.379l-.52-3.71A.716.716 0 0016.503 0h-5.55a.703.703 0 00-.687.588l-.52 3.71c-.847.357-1.63.819-2.345 1.379L3.947 4.27a.691.691 0 00-.847.301L.325 9.422a.705.705 0 00.167.896l2.927 2.317c-.055.448-.097.903-.097 1.365 0 .462.042.917.097 1.365L.492 17.682a.702.702 0 00-.167.896L3.1 23.429a.683.683 0 00.847.301L7.4 22.323a10.506 10.506 0 002.345 1.379l.52 3.71c.056.329.34.588.687.588h5.55a.703.703 0 00.687-.588l.52-3.71c.847-.357 1.631-.819 2.346-1.379l3.454 1.407c.313.119.673 0 .847-.301l2.775-4.851a.705.705 0 00-.167-.896zM13.73 18.9c-2.685 0-4.857-2.191-4.857-4.9 0-2.709 2.172-4.9 4.857-4.9 2.684 0 4.856 2.191 4.856 4.9 0 2.71-2.172 4.9-4.856 4.9z"
								opacity=".5"
								className="settings-icon"
							/>
						</svg>
					</button>
				</main>
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
