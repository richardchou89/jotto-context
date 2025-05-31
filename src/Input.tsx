import { useContext, useState } from "react";
import successContext from "./contexts/successContext";
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from "./helpers";

type InputProps = {
  secretWord: string;
}

const Input = ({ secretWord }: InputProps) => {
  const [success, setSuccess] = successContext.useSuccess();
  const [currentGuess, setCurrentGuess] = useState("");

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
      </form>
    </div>
  )
}

export default Input;