import React from 'react'

// Styles
import styles from './Input.module.scss'

// Types
interface InputProps {
    name: string
    id: string
    value: number
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <div className={styles.timeInputWrapper}>
        <label>{props.name}</label>
        <div className={styles.timeInput}>
            <input
                type='number'
                id={props.id}
                ref={ref}
                name={props.name}
                defaultValue={props.value}
            />
            <div className={styles.timeInputButtons}>
                <button
                    onClick={() => {
                        const input = document.getElementById(
                            props.id
                        ) as HTMLInputElement
                        input.stepUp()
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='7'
                        className={styles.upArrow}
                    >
                        <path className={styles.stroke} d='M1 6l6-4 6 4' />
                    </svg>
                </button>
                <button
                    onClick={() => {
                        const input = document.getElementById(
                            props.id
                        ) as HTMLInputElement
                        input.stepDown()
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='14'
                        height='7'
                    >
                        <path className={styles.stroke} d='M1 1l6 4 6-4' />
                    </svg>
                </button>
            </div>
        </div>
    </div>
))

export default Input
