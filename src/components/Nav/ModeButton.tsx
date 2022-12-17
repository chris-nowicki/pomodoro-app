import { useContext } from 'react'
import { useActive } from '../../hooks/useActive'

// Context
import { TimerContext } from '../../contexts/TimerContext'

// Types
import { ModeButtonProps } from '../../ts/types'

// Styles
import styles from './ModeButton.module.css'

function ModeButton({ name, data }: ModeButtonProps) {
    const { mode, setMode } = useContext(TimerContext)
    const isActive = useActive(data, mode)

    return (
        <>
            <button
                className={`${styles.button} ${isActive && styles.active}`}
                onClick={() => setMode(data)}
            >
                {name}
            </button>
        </>
    )
}

export default ModeButton
