import styles from "./Keyboard.module.css"

const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

type KeyboardProps = {
    activeLetters: string[],
    inactiveLetters: string[],
    disabled?: boolean,
    addGuessedLetters: (letter: string) => void
}

export function Keyboard({ activeLetters, inactiveLetters, disabled=false, addGuessedLetters}: KeyboardProps) {
    
    return <div style={{maxWidth: "800px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(50px, 0.5fr)", gap: ".5rem"}}>
        {keys.map(key => {
            const isActive = activeLetters.includes(key)
            const isInactive = inactiveLetters.includes(key)
            return (
                <button
                    onClick={() => addGuessedLetters(key)}
                    className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} disabled={isActive || isInactive || disabled}
                    key={key}
                >{key}</button>
            )
        })}
    </div>
}