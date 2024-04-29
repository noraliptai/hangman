import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { Word } from "./components/Word"
import { Keyboard } from "./components/Keyboard"

  const newWord = () => {
    return words[Math.floor(Math.random() * words.length)]
  }

function App() {

  const [wordToGuess, setWordToGuess] = useState(newWord())
  
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

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
        alignItems: "center"
      }}>
        <div style={{fontSize: "2rem", textAlign: "center"}}>{isWinner && "Congrats, you won! Refresh to try again"}{isLoser && "Sadly you lost. Refresh to try again"}</div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
        <Word wordToGuess={wordToGuess} guessedLetters={guessedLetters} reveal={isLoser} />
        <div style={{alignSelf: "stretch"}}>
          <Keyboard activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetters={addGuessedLetters} disabled={isWinner || isLoser} />
        </div>
      </div>
    </>
  )
}

export default App
