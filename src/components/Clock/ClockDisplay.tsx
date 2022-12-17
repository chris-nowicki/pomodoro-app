import { useContext } from 'react'
import { convertMinutes, convertSeconds } from '../../utils/timeConversion'
import { TimerContext } from '../../contexts/TimerContext'

// Styles
import styles from './ClockDisplay.module.css'

function ClockDisplay({ remainingTime }: { remainingTime: number }) {
    const { isPlaying, handleStartStop, handleReset } = useContext(TimerContext)
    
    return (
        <div className={styles.clockDisplay}>
            <div className={styles.time}>
                <span className={styles.minutes}>
                    {convertMinutes(remainingTime)}
                </span>
                :
                <span className={styles.seconds}>
                    {convertSeconds(remainingTime)}
                </span>
            </div>
            <button className={`${styles.button} ${styles.startStop}`} onClick={handleStartStop}>
                {isPlaying ? 'PAUSE' : 'START'}
            </button>
            <button className={`${styles.button} ${styles.reset}`} onClick={handleReset}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='32px'
                    height='32px'
                    viewBox='0 0 512 512'
                >
                    <title>Refresh</title>
                    <path
                        d='M320 146s24.36-12-64-12a160 160 0 10160 160'
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeMiterlimit='10'
                        strokeWidth='32'
                    />
                    <path
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='32'
                        d='M256 58l80 80-80 80'
                    />
                </svg>
            </button>
        </div>
    )
}

export default ClockDisplay
