interface activeFont {
    [key: string]: string
}

export interface StyleContextTypes {
    color: string
    setColor: (color: string) => void
    activeColor: string
    font: string
    setFont: (font: string) => void
    activeFont: activeFont
}

export interface TimerDuration {
    [key: string]: number
}

export interface TimerContextTypes {
    resetKey: number
    setResetKey: (resetKey: number) => void
    mode: string
    setMode: (mode: string) => void
    timeDuration: TimerDuration
    setTimeDuration: (duration: any) => void
    isPlaying: boolean
    handleStartStop: () => void
    handleComplete: () => void
    showSettings: boolean
    setShowSettings: (showSettings: any) => void
    handleReset: () => void
}

export interface ModeButtonProps {
    name: string
    data: string
}
