import { SetStateAction } from "react"

type HeaderProps = {
    newWord: (category: string) => string,
    category: string,
    darkTheme: boolean,
    setDarkTheme: React.Dispatch<SetStateAction<boolean>>,
    setCategory: React.Dispatch<SetStateAction<string>>,
    setGuessedLetters: React.Dispatch<SetStateAction<string[]>>,
    setWordToGuess: React.Dispatch<SetStateAction<string>>,
    setDifficulty: React.Dispatch<SetStateAction<string>>
}

export function Header ({newWord, category, darkTheme, setDarkTheme, setGuessedLetters, setWordToGuess, setCategory, setDifficulty}: HeaderProps) {
    return <div style={{
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
}