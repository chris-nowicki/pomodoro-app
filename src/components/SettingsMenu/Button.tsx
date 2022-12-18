import checkIcon from '../../assets/icon-check.svg'

// Styles
import styles from './Button.module.scss'

// Types
interface ButtonStyle {
    [key: string]: any
}

// hooks
import { useActive } from '../../hooks/useActive'

function Button({
    type,
    data,
    active,
    onClick,
}: {
    type: string
    data: string
    active: string
    onClick: any
}) {

    const fontStyle: ButtonStyle = {
        kumbh: styles.kumbh,
        roboto: styles.roboto,
        space: styles.space,
    }

    const colorStyle: ButtonStyle = {
        red: styles.red,
        blue: styles.blue,
        purple: styles.purple,
    }

    const isActive = useActive(data, active)

    return (
        <>
            {type == 'font' ? (
                <button
                    className={`${styles.fontButton} ${
                        isActive && styles.fontActive
                    } ${fontStyle[data]}`}
                    onClick={() => onClick(data)}
                >
                    Aa
                </button>
            ) : (
                <button
                    className={`${styles.colorButton} ${colorStyle[data]}`}
                    onClick={() => onClick(data)}
                >
                    {/* color button check mark */}
                    {type === 'color' && isActive && (
                        <img src={checkIcon} alt='selected' />
                    )}
                </button>
            )}
        </>
    )
}

export default Button
