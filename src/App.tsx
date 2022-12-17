// Context
import { StyleProvider } from './contexts/StyleContext'
import { TimerProvider } from './contexts/TimerContext'

// Components
import Pomodoro from './views/Pomodoro'

function App() {
    return (
        <StyleProvider>
            <TimerProvider>
                <Pomodoro />
            </TimerProvider>
        </StyleProvider>
    )
}

export default App
