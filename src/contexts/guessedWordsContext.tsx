import { createContext, useContext, useMemo, useState, Dispatch, ReactNode } from "react";

type GuessedWordType = {
  guessedWord: string;
  letterMatchCount: number;
}

const guessedWordsContext = createContext<
  [GuessedWordType[], Dispatch<React.SetStateAction<GuessedWordType[]>>] | null
>(null);

const useGuessedWords = () => {
  const context = useContext(guessedWordsContext);

  if (!context) {
    throw new Error("useGuessedWords must be used within a GuessedWordsProvider");
  }

  return context;
}

const GuessedWordsProvider = ({ children }: { children: ReactNode }) => {
  const [guessedWords, setGuessedWords] = useState<GuessedWordType[]>([])

  const value = useMemo(() => [guessedWords, setGuessedWords], [guessedWords]) as [GuessedWordType[], Dispatch<React.SetStateAction<GuessedWordType[]>>];

  return <guessedWordsContext.Provider value={value}>
    {children}
  </guessedWordsContext.Provider>
}

export default { GuessedWordsProvider, useGuessedWords }
