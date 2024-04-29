type WordProps = {
    wordToGuess: string,
    guessedLetters: string[],
    reveal?: boolean
}

export function Word({ wordToGuess, guessedLetters, reveal=false}: WordProps) {

    return <div style={{display: "flex", gap: ".25rem", fontSize: "6rem", fontWeight: "bold", textTransform: "uppercase", fontFamily: "monospace"}}>
        {wordToGuess.split("").map((letter, index) => (
            <span style={{borderBottom: "1rem solid black"}} key={index}>
                <span style={{visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden", color: !guessedLetters.includes(letter) && reveal ? "red" : "darkgreen"}}>{letter}</span>
            </span>
        ))}
    </div>
}