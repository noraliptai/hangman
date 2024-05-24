type WordProps = {
    wordToGuess: string,
    guessedLetters: string[],
    reveal?: boolean,
    darkTheme?: boolean
}

export function Word({ wordToGuess, guessedLetters, reveal=false, darkTheme=false}: WordProps) {

    return <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: ".25rem",
        fontSize: "4rem",
        fontWeight: "bold",
        textTransform: "uppercase"}}>

        {wordToGuess.split(" ").map((word, index) => (
            <div style={{display: "flex", gap: ".25rem", margin: "0 .5rem"}} key={index}>
                {word.split("").map((letter, index) => (
                    <span style={{borderBottom: `5px solid ${darkTheme ? "#e0e0e0" : "#1d1d1d"}`}} key={index}>
                        <span style={{
                            visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                            color: !guessedLetters.includes(letter) && reveal ? "darkred" : darkTheme ? "lightblue" : "darkblue"
                            }}>{letter}
                        </span>
                    </span>              
                ))}
            </div>
        ))}

        {/* {wordToGuess.split("").map((letter, index) => (
            (letter === " ")
            ?
            <span style={{marginRight: "10px"}} key={index}></span>
            :
            <span style={{borderBottom: `5px solid ${darkTheme ? "#e0e0e0" : "#1d1d1d"}`}} key={index}>
                <span style={{
                    visibility: guessedLetters.includes(letter) || reveal ? "visible" : "hidden",
                    color: !guessedLetters.includes(letter) && reveal ? "darkred" : darkTheme ? "lightblue" : "darkblue"
                    }}>{letter}
                </span>
            </span>              
        ))} */}
    </div>
}