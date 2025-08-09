import { render } from "@testing-library/react";
import GuessedWords from "./GuessedWords";
import * as guessedWordsContext from "./contexts/guessedWordsContext";
import { GuessedWordType } from "./contexts/guessedWordsContext";
import React from "react";

jest.mock("./contexts/guessedWordsContext", () => {
  return {
    ...jest.requireActual("./contexts/guessedWordsContext"),
    useGuessedWords: jest.fn(),
  };
});

const setup = (guessedWords: GuessedWordType[] = []) => {
  const useGuessedWordsMock = guessedWordsContext.useGuessedWords as jest.Mock;
  useGuessedWordsMock.mockReturnValue([guessedWords, jest.fn()]);
  return render(<GuessedWords />);
};

describe("if there are no words guessed", () => {
  let container: HTMLElement;

  beforeEach(() => {
    ({ container } = setup([]));
  });

  test("renders without error", () => {
    const component = container.querySelector(
      '[data-test="component-guessed-words"]'
    );
    expect(component).toBeInTheDocument();
  });

  test("renders instructions to guess a word", () => {
    const component = container.querySelector(
      '[data-test="guess-instructions"]'
    );
    expect(component).toBeInTheDocument();
  });
});

describe("if there are words guessed", () => {
  let container: HTMLElement;

  const guessedWords = [
    { guessedWord: "train", letterMatchCount: 3 },
    { guessedWord: "agile", letterMatchCount: 1 },
    { guessedWord: "party", letterMatchCount: 5 },
  ];

  beforeEach(() => {
    ({ container } = setup(guessedWords));
  });

  test("renders without error", () => {
    const component = container.querySelector(
      '[data-test="component-guessed-words"]'
    );
    expect(component).toBeInTheDocument();
  });

  test('renders "guessed words" section', () => {
    const component = container.querySelector('[data-test="guessed-words"]');
    expect(component).toBeInTheDocument();
  });

  test("correct number of guessed words", () => {
    const component = container.querySelector('[data-test="guessed-word"]');
    expect(component).toBeInTheDocument();
  });
});

describe("languagePicker", () => {
  test("correctly renders guess instructions string in English by default", () => {
    const { container } = setup();
    const component = container.querySelector(
      '[data-test="guess-instructions"]'
    );
    expect(component?.textContent).toBe("Try to guess the secret word!");
  });

  test("correctly renders guess instructions string in emoji", () => {
    const mockUseContext = jest.fn().mockReturnValue("emoji");
    React.useContext = mockUseContext;
    const { container } = setup();
    const component = container.querySelector(
      '[data-test="guess-instructions"]'
    );
    expect(component?.textContent).toBe("🤔🤫🔤");
  });
});
