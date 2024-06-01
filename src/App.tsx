import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { Word } from "./components/Word"
import { Keyboard } from "./components/Keyboard"
import "./App.css"


function App() {
  
  const newWord = (category: string) => {
    return words[parseInt(category)][Math.floor(Math.random() * words[parseInt(category)].length)].toLowerCase()
  }

  const [category, setCategory] = useState("0")
  const [wordToGuess, setWordToGuess] = useState(newWord(category))
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [darkTheme, setDarkTheme] = useState(true)
  const [difficulty, setDifficulty] = useState("easy")
  
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = difficulty === "hard" ? incorrectLetters.length >= 6 : difficulty === "medium" ? incorrectLetters.length >= 8 : incorrectLetters.length >= 10
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter) || letter === " ")

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
      setWordToGuess(newWord(category))
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [category])

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-evenly",
        minHeight: "100vh",
        backgroundColor: darkTheme ? "#1d1d1d" : "#f9f9f9"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center", gap: "20px"}}>
          
          <button
            onClick={() => setDarkTheme(theme => !theme)}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer"
              }}>{darkTheme ? "Light mode" : "Dark mode"}</button>
          
          <button
            onClick={() => {
              setGuessedLetters([])
              setWordToGuess(newWord(category))
            }}
            style={{
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer"
              }}>New word</button>
                        
          <select
            id="category"
            defaultValue="Choose category"
            style={{
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer"}}
            onChange={(e) => {
              setCategory(e.target.value)
              setGuessedLetters([])
              setWordToGuess(newWord(e.target.value))
            }}>
            <option disabled>Choose category</option>
            <option value="0">General</option>
            <option value="1">Animals</option>
            <option value="2">Countries</option>
            <option value="3">Food</option>
            <option value="4">Movies</option>
            <option value="5">Famous people</option>
          </select>

          <select
            id="difficulty"
            defaultValue="Choose difficulty"
            style={{
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer"}}
            onChange={(e) => {
              setDifficulty(e.target.value)
              setGuessedLetters([])
              setWordToGuess(newWord(category))
            }}>
            <option disabled>Choose difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

        </div>

        <div style={{
          fontSize: "1.5rem",
          textAlign: "center",
          fontFamily: "monospace",
          color: darkTheme ? "#e0e0e0" : "black"
          }}>
          {isWinner && "Congrats, you won!"}
          {isLoser && "Sadly you lost."}
          <br></br>
          {(isWinner || isLoser) && <span style={{fontSize: "1rem"}}>Refresh page or press enter to play again</span>}
        </div>
        
        <HangmanDrawing numberOfGuesses={incorrectLetters.length} darkTheme={darkTheme} difficulty={difficulty}/>
        
        <Word wordToGuess={wordToGuess} guessedLetters={guessedLetters} reveal={isLoser} darkTheme={darkTheme}/>
        
        <div style={{alignSelf: "stretch"}}>
          <Keyboard activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetters={addGuessedLetters} disabled={isWinner || isLoser}/>
        </div>
      </div>
    </>
  )
}

export default App
