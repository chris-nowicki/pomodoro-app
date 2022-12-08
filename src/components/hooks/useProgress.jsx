export function useProgress(matches, settings, remainingTime, currentMode, countdown) {
	let progressIncrement
  
	if (!matches) {
		progressIncrement = 1030 / (settings[currentMode] * 60) // number of deg to increase progress bar by per each second
	} else {
		progressIncrement = 714 / (settings[currentMode] * 60) // number of deg to increase progress bar by per each second
	}

	return {
		storedProgress:
			1030 -
			(settings[currentMode] * 60 - remainingTime.total) *
				progressIncrement,
		progressIncrement,
	}
}
