export function useRemainingTime() {
	function countdownTime(endTime) {
		const currentTime = Date.parse(Date())
		const difference = endTime - currentTime

		const total = Number.parseInt(difference / 1000, 10)
		const minutes = Number.parseInt((total / 60) % 60, 10)
		const seconds = Number.parseInt(total % 60, 10)

    return {
      total,
      minutes,
      seconds
    }
	}

  function calculateTime(val) {
    return {
      total: val * 60,
      minutes: val,
      seconds: 0
    }
  }
  return {
    countdownTime,
    calculateTime
  }
}
