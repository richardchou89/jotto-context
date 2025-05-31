import { createContext, useContext, useMemo, useState } from "react";

export type GuessedWordType = {
  guessedWord: string;
  letterMatchCount: number;
}

const guessedWordsContext = createContext<
  (GuessedWordType[] | React.Dispatch<React.SetStateAction<GuessedWordType[]>>)[] | null
>(null);

const useGuessedWords = () => {
  const context = useContext(guessedWordsContext);

  if (!context) {
    throw new Error("useGuessedWords must be used within a GuessedWordsProvider");
  }

  return context;
}

const GuessedWordsProvider = ({ children }: { children: React.ReactNode }) => {
  const [guessedWords, setGuessedWords] = useState<GuessedWordType[]>([])

  const value = useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);

  return <guessedWordsContext.Provider value={value}>
    {children}
  </guessedWordsContext.Provider>
}

export default { GuessedWordsProvider, useGuessedWords }
