export const convertMinutes = (remainingTime: number): string => {
    const minutes = Math.floor(remainingTime / 60)

    return `${minutes}`.padStart(2, '0')
}

export const convertSeconds = (remainingTime: number): string => {
    const seconds = remainingTime % 60

    return `${seconds}`.padStart(2, '0')
}
