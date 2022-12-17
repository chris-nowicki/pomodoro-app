import ModeButton from './ModeButton'
// Styles
import styles from './Nav.module.css'

function Nav() {
    const handleMode = () => {
        // placeholder
        console.log('clicked')
    }

    return (
        <nav className={styles.nav}>
            <ModeButton name='pomodoro' data='pomodoro' />
            <ModeButton
                name='short break'
                data='shortBreak'
            />
            <ModeButton name='long break' data='longBreak' />
        </nav>
    )
}

export default Nav
