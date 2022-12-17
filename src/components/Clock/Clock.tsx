import { useContext } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ClockDisplay from './ClockDisplay'

// Context
import { StyleContext } from '../../contexts/StyleContext'
import { TimerContext } from '../../contexts/TimerContext'

// Styles
import styles from './Clock.module.css'

function Clock() {
    const { activeColor } = useContext(StyleContext)
    const { mode, timeDuration, isPlaying, resetKey, handleComplete } =
        useContext(TimerContext)

    const convertedTime: number = timeDuration[mode] * 60
    return (
        <main className={styles.clockContainer}>
            {/* desktop countdown timer */}
            <div className={styles.clockDesktop}>
                <CountdownCircleTimer
                    key={resetKey}
                    isPlaying={isPlaying}
                    duration={convertedTime}
                    colors={`#${activeColor}`}
                    trailColor='#161932'
                    rotation='counterclockwise'
                    size={339}
                    onComplete={() => {
                        handleComplete()
                    }}
                >
                    {({ remainingTime }) => (
                        <ClockDisplay remainingTime={remainingTime} />
                    )}
                </CountdownCircleTimer>
            </div>
            {/* mobile countdown timer */}
            <div className={styles.clockMobile}>
                <CountdownCircleTimer
                    key={resetKey}
                    isPlaying={isPlaying}
                    duration={convertedTime}
                    colors={`#${activeColor}`}
                    strokeWidth={8}
                    trailColor='#161932'
                    rotation='counterclockwise'
                    size={248.05}
                    onComplete={() => {
                        handleComplete()
                    }}
                >
                    {({ remainingTime }) => (
                        <ClockDisplay remainingTime={remainingTime} />
                    )}
                </CountdownCircleTimer>
            </div>
        </main>
    )
}

export default Clock
