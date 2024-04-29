import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { Word } from "./components/Word"
import { Keyboard } from "./components/Keyboard"
import "./App.css"

const newWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {

  const [wordToGuess, setWordToGuess] = useState(newWord())
  
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const [darkTheme, setDarkTheme] = useState(false)

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetters = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetters(e.key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(newWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  return (
    <>
      <div style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        padding: "10px",
        alignItems: "center",
        backgroundColor: darkTheme ? "#1d1d1d" : "#e0e0e0"
      }}>
        <button onClick={() => setDarkTheme(theme => !theme)} style={{backgroundColor: "#e0e0e0", padding: "10px", borderRadius: "10px", cursor: "pointer"}}>Change theme</button>

        <div style={{fontSize: "1.5rem", textAlign: "center", fontFamily: "monospace", color: darkTheme ? "#e0e0e0" : "black"}}>{isWinner && "Congrats, you won!"} {isLoser && "Sadly you lost."} {(isWinner || isLoser) && <span style={{fontSize: "1rem"}}>Refresh page or press enter to play again</span>}</div>
        
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} darkTheme={darkTheme}/>
        
        <Word wordToGuess={wordToGuess} guessedLetters={guessedLetters} reveal={isLoser} darkTheme={darkTheme}/>
        
        <div style={{alignSelf: "stretch"}}>
          <Keyboard activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetters={addGuessedLetters} disabled={isWinner || isLoser}/>
        </div>
      </div>
    </>
  )
}

export default App
