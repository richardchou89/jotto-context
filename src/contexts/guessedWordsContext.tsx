import {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  ReactNode,
} from "react";

export type GuessedWordType = {
  guessedWord: string;
  letterMatchCount: number;
};

type GuessedWordsProviderProps = {
  children: ReactNode;
  value?: [
    GuessedWordType[],
    Dispatch<React.SetStateAction<GuessedWordType[]>>
  ];
} & Omit<React.ComponentProps<typeof guessedWordsContext.Provider>, "value">;

const guessedWordsContext = createContext<
  [GuessedWordType[], Dispatch<React.SetStateAction<GuessedWordType[]>>] | null
>(null);

export const useGuessedWords = () => {
  const context = useContext(guessedWordsContext);

  if (!context) {
    throw new Error(
      "useGuessedWords must be used within a GuessedWordsProvider"
    );
  }

  return context;
};

export const GuessedWordsProvider = ({
  children,
  value: overrideValue,
  ...props
}: GuessedWordsProviderProps) => {
  const [guessedWords, setGuessedWords] = useState<GuessedWordType[]>([]);

  const internalValue = useMemo(
    () => [guessedWords, setGuessedWords],
    [guessedWords]
  ) as [GuessedWordType[], Dispatch<React.SetStateAction<GuessedWordType[]>>];

  const valueToUse = overrideValue ?? internalValue;

  return (
    <guessedWordsContext.Provider value={valueToUse} {...props}>
      {children}
    </guessedWordsContext.Provider>
  );
};
