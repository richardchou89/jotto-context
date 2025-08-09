import { useState } from "react";
import stringsModule from "./helpers/strings";
import { getLetterMatchCount } from "./helpers";
import { useLanguage } from "./contexts/languageContext";
import { useSuccess } from "./contexts/successContext";
import { useGuessedWords } from "./contexts/guessedWordsContext";

type InputProps = {
  secretWord: string;
};

const Input = ({ secretWord }: InputProps) => {
  const language = useLanguage();
  const [success, setSuccess] = useSuccess();
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessedWords, setGuessedWords] = useGuessedWords();

  if (success) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(
            "en",
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          onClick={(evt) => {
            evt.preventDefault();
            const letterMatchCount = getLetterMatchCount(
              currentGuess,
              secretWord
            );
            const newGuessedWords = [
              ...guessedWords,
              { guessedWord: currentGuess, letterMatchCount },
            ];
            setGuessedWords(newGuessedWords);

            if (currentGuess === secretWord) setSuccess(true);

            setCurrentGuess("");
          }}
          className="btn btn-primary mb-2"
        >
          {stringsModule.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

export default Input;
