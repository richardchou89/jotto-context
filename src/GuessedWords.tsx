import { useContext } from "react"
import guessedWordsContext from "./contexts/guessedWordsContext"
import languageContext from "./contexts/languageContext"
import stringsModule from "./helpers/strings"

const GuessedWords = () => {
  const [guessedWords] = guessedWordsContext.useGuessedWords()
  const language = useContext(languageContext)

  const contents = () => {
    if (guessedWords.length === 0) {
      return <span data-test="guess-instructions">
        {stringsModule.getStringByLanguage(language, 'guessPrompt')}
      </span>
    } else {
      const guessedWordsRows = guessedWords.map((word, index) => {
        return <tr data-test="guessed-word" key={ index }>
          <td>{ word.guessedWord }</td>
          <td>{ word.letterMatchCount }</td>
        </tr>
      })

      return <div data-test="guessed-words">
        <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
            </tr>
          </thead>
          <tbody>
            { guessedWordsRows }
          </tbody>
        </table>
      </div>
    }
  }

  return <div data-test="component-guessed-words">
    { contents() }
  </div>
}

export default GuessedWords