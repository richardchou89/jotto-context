import { useReducer, useEffect } from "react";
import { getSecretWord } from "./actions";
import { SuccessProvider } from "./contexts/successContext";
import { GuessedWordsProvider } from "./contexts/guessedWordsContext";
import { LanguageProvider } from "./contexts/languageContext";
import Input from "./Input";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import "./App.css";
import LanguagePicker from "./LanguagePicker";

type State = {
  secretWord: string;
  language: string;
};

type Action = {
  type: string;
  payload: string;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    secretWord: "",
    language: "en",
  } as State);

  const setSecretWord = (secretWord: string) => {
    dispatch({ type: "setSecretWord", payload: secretWord });
  };
  const setLanguage = (language: string) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word...</p>
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <p>The secret word is {state.secretWord}</p>
      <LanguageProvider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <GuessedWordsProvider>
          <SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </SuccessProvider>
          <GuessedWords />
        </GuessedWordsProvider>
      </LanguageProvider>
    </div>
  );
};

export default App;
