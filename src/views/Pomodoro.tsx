import { useContext } from 'react'

// Components
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import Clock from '../components/Clock/Clock'
import Footer from '../components/Footer/Footer'
import SettingsMenu from '../components/SettingsMenu/SettingsMenu'

// Context
import { TimerContext } from '../contexts/TimerContext'

// Styles
import styles from './Pomodoro.module.scss'

function Pomodoro() {
    const { showSettings } = useContext(TimerContext)
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <Nav />
            <Clock />
            <Footer />
            {showSettings && <SettingsMenu />}
        </div>
    )
}

export default Pomodoro
