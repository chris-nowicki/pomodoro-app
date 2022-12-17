import { createContext, useState, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Types
import { TimerContextTypes } from '../ts/types'

export const TimerContext = createContext<TimerContextTypes>({
    resetKey: 0,
    setResetKey: () => null,
    mode: 'pomodoro',
    setMode: () => null,
    timeDuration: {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    },
    setTimeDuration: () => null,
    isPlaying: false,
    handleStartStop: () => null,
    handleComplete: () => null,
    showSettings: false,
    setShowSettings: () => null,
    handleReset: () => null,
})

export function TimerProvider({ children }: { children: JSX.Element }) {
    const [resetKey, setResetKey] = useState(0)
    const [mode, setMode] = useState('pomodoro')
    const [timeDuration, setTimeDuration] = useLocalStorage('timeDuration', {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
    })
    const [isPlaying, setIsPlaying] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const handleStartStop = () => setIsPlaying((prevState: any) => !prevState)
    const handleReset = () => setResetKey((resetKey: number) => resetKey + 1)
    const handleComplete = () => {
        handleReset(), setIsPlaying(false)
    }

    const value: TimerContextTypes = useMemo(
        () => ({
            resetKey,
            setResetKey,
            mode,
            setMode,
            timeDuration,
            setTimeDuration,
            isPlaying,
            handleStartStop,
            handleComplete,
            showSettings,
            setShowSettings,
            handleReset,
        }),
        [mode, timeDuration, resetKey, isPlaying, showSettings]
    )

    return (
        <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
    )
}
