import { useContext, useState, Dispatch, SetStateAction } from "react";
import successContext from "./contexts/successContext";
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from "./helpers";
import languageContext from "./contexts/languageContext";
import guessedWordsContext from "./contexts/guessedWordsContext";
import { GuessedWordType } from "./contexts/guessedWordsContext";

type InputProps = {
  secretWord: string;
}

const Input = ({ secretWord }: InputProps) => {
  const language = useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess() as [boolean, Dispatch<SetStateAction<boolean>>];
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords() as [GuessedWordType[], Dispatch<SetStateAction<GuessedWordType[]>>];

  if (success) {
    return <div data-test="component-input" />
  }

  return (
    <div data-test='component-input'>
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage('en', 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={(evt) => {
            evt.preventDefault();
            const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
            const newGuessedWords = [
              ...guessedWords,
              { guessedWord: currentGuess, letterMatchCount }
            ]
            setGuessedWords(newGuessedWords)

            console.log(`guessedWords`, guessedWords)

            if (currentGuess === secretWord) setSuccess(true)

            setCurrentGuess("")
          }}
          className="btn btn-primary mb-2"
        >
          { stringsModule.getStringByLanguage(language, 'submit') }
        </button>
      </form>
    </div>
  )
}

export default Input;