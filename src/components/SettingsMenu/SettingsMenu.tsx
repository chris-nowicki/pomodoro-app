import { useContext, useState, useRef, MutableRefObject } from 'react'

// Components
import Input from './Input'
import Button from './Button'

// Styles
import styles from './SettingsMenu.module.scss'

// Context
import { StyleContext } from '../../contexts/StyleContext'
import { TimerContext } from '../../contexts/TimerContext'

function SettingsMenu() {
    const { setShowSettings, timeDuration, setTimeDuration } =
        useContext(TimerContext)
    const { font, setFont, color, setColor } = useContext(StyleContext)
    const [updatedSettings, setUpdatedSettings] = useState({
        timeDuration: timeDuration,
        font: font,
        color: color,
    })

    const pomodoro = useRef() as MutableRefObject<HTMLInputElement>
    const shortBreak = useRef() as MutableRefObject<HTMLInputElement>
    const longBreak = useRef() as MutableRefObject<HTMLInputElement>

    const handleFontChange = (data: string) => {
        setUpdatedSettings({ ...updatedSettings, font: data })
    }
    const handleColorChange = (data: string) => {
        setUpdatedSettings({ ...updatedSettings, color: data })
    }

    const handleApplySettings = () => {
        console.log(pomodoro)
        setTimeDuration({
            pomodoro: Number(pomodoro.current.value),
            shortBreak: Number(shortBreak.current.value),
            longBreak: Number(longBreak.current.value),
        })
        setFont(updatedSettings.font)
        setColor(updatedSettings.color)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {/* settings menu */}
                <div className={styles.settingsMenu}>
                    {/* header */}
                    <div className={styles.header}>
                        <span>Settings</span>
                        <button
                            onClick={() =>
                                setShowSettings((prevState: any) => !prevState)
                            }
                        >
                            {/* close icon */}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='14'
                                height='14'
                            >
                                <path
                                    fill='#1E213F'
                                    fillRule='evenodd'
                                    d='M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z'
                                    opacity='.5'
                                    className={styles.close}
                                />
                            </svg>
                        </button>
                    </div>
                    {/* time settings */}
                    <div className={styles.timeSettings}>
                        <span>TIME (MINUTES)</span>
                        <div className={styles.timeInput}>
                            <Input
                                id='pomodoro'
                                name='pomodoro'
                                value={timeDuration['pomodoro']}
                                ref={pomodoro}
                            />
                            <Input
                                id='shortBreak'
                                name='short break'
                                value={timeDuration['shortBreak']}
                                ref={shortBreak}
                            />
                            <Input
                                id='longBreak'
                                name='long break'
                                value={timeDuration['longBreak']}
                                ref={longBreak}
                            />
                        </div>
                    </div>
                    {/* font settings */}
                    <div className={styles.fontSettings}>
                        <span>FONT</span>
                        <div className={styles.fontButtons}>
                            <Button
                                type='font'
                                data='kumbh'
                                active={updatedSettings.font}
                                onClick={(data: string) =>
                                    handleFontChange(data)
                                }
                            />
                            <Button
                                type='font'
                                data='roboto'
                                active={updatedSettings.font}
                                onClick={(data: string) =>
                                    handleFontChange(data)
                                }
                            />
                            <Button
                                type='font'
                                data='space'
                                active={updatedSettings.font}
                                onClick={(data: string) =>
                                    handleFontChange(data)
                                }
                            />
                        </div>
                    </div>
                    {/* color settings */}
                    <div className={styles.colorSettings}>
                        <span>COLOR</span>
                        <div className={styles.fontButtons}>
                            <Button
                                type='color'
                                data='red'
                                active={updatedSettings.color}
                                onClick={(data: string) =>
                                    handleColorChange(data)
                                }
                            />
                            <Button
                                type='color'
                                data='blue'
                                active={updatedSettings.color}
                                onClick={(data: string) =>
                                    handleColorChange(data)
                                }
                            />
                            <Button
                                type='color'
                                data='purple'
                                active={updatedSettings.color}
                                onClick={(data: string) =>
                                    handleColorChange(data)
                                }
                            />
                        </div>
                    </div>
                </div>
                <button
                    className={styles.apply}
                    onClick={() => handleApplySettings()}
                >
                    Apply
                </button>
            </div>
        </div>
    )
}

export default SettingsMenu
