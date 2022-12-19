import { createContext, useMemo } from 'react'

// Types
import { StyleContextTypes } from '../ts/types'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Create Context
export const StyleContext = createContext<StyleContextTypes>({
    color: 'red',
    setColor: () => null,
    activeColor: 'F87070',
    font: `"Kumbh Sans", sans-serif`,
    setFont: () => null,
    activeFont: {
        family: `"Kumbh Sans", sans-serif`,
        weight: `700`,
        letterSpacing: `-5px`,
        marginLeft: `24px`,
    },
})

// Style Provider
export function StyleProvider({ children }: { children: JSX.Element }) {
    const [color, setColor] = useLocalStorage('color', 'red')
    const [font, setFont] = useLocalStorage('font', 'kumbh')

    const activeColor =
        color === 'red' ? 'F87070' : color === 'blue' ? '70F3F8' : 'D881F8'

    // prettier-ignore
    const activeFont =
        font === 'kumbh'
            ? {
                family: `"Kumbh Sans", sans-serif`,
                weight: `700`,
                letterSpacing: `-4px`,
                marginLeft: `160px`,
            }
            : font === 'roboto'
            ? {
                family: `"Roboto Slab", serif`,
                weight: `700`,
                letterSpacing: `0px`,
                marginLeft: `160px`,
            }
            : {
                family: `"Space Mono", monospace`,
                weight: `400`,
                letterSpacing: `-10px`,
                marginLeft: `155px`,
            }

    document.documentElement.style.setProperty(
        '--font-family',
        activeFont.family
    )
    document.documentElement.style.setProperty(
        '--font-weight',
        activeFont.weight
    )
    document.documentElement.style.setProperty(
        '--letter-spacing',
        activeFont.letterSpacing
    )
    document.documentElement.style.setProperty(
        '--margin-left',
        activeFont.marginLeft
    )
    document.documentElement.style.setProperty('--app-color', `#${activeColor}`)

    const value: StyleContextTypes = useMemo(
        () => ({ color, setColor, activeColor, font, setFont, activeFont }),

        [color, font]
    )

    return (
        <StyleContext.Provider value={value}>{children}</StyleContext.Provider>
    )
}
