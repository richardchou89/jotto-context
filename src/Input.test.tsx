import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Input from "./Input";
import languageContext from "./contexts/languageContext";
import successContext from "./contexts/successContext";
import guessedWordsContext from "./contexts/guessedWordsContext";

type InputProps = {
  language?: string;
  secretWord?: string;
  success?: boolean;
}

const setup = ({ language, secretWord, success }: InputProps) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  success = success || false;

  return render(
    <languageContext.Provider value={ language }>
      <successContext.SuccessProvider value={[ success, jest.fn() ]}>
        <guessedWordsContext.GuessedWordsProvider>
          <Input secretWord={ secretWord } />
        </guessedWordsContext.GuessedWordsProvider>
      </successContext.SuccessProvider>
    </languageContext.Provider>
  )
}

describe('render', () => {
  describe('success is false', () => {
    let container: HTMLElement;

    beforeEach(() => {
      ({ container } = setup({ success: false }))
    })

    test('Input renders without error', () => {
      const inputComponent = container.querySelector("[data-test='component-input']")
      expect(inputComponent).toBeInTheDocument()
    })

    test('input box displays', () => {
      const inputBox = container.querySelector("[data-test='input-box']")
      expect(inputBox).toBeInTheDocument()
    })

    test('submit button displays', () => {
      const submitButton = container.querySelector("[data-test='submit-button']")
      expect(submitButton).toBeInTheDocument()
    })
  })

  describe('success is true', () => {
    let container: HTMLElement;

    beforeEach(() => {
      ({ container } = setup({ success: true }))
    })

    test('Input renders without error', () => {
      const inputComponent = container.querySelector("[data-test='component-input']")
      expect(inputComponent).toBeInTheDocument()
    })

    test('input box does not display', () => {
      const inputBox = container.querySelector("[data-test='input-box']")
      expect(inputBox).not.toBeInTheDocument()
    })

    test('submit button does not display', () => {
      const submitButton = container.querySelector("[data-test='submit-button']")
      expect(submitButton).not.toBeInTheDocument()
    })
  })
})

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let container: HTMLElement;
  let originalUseState: typeof React.useState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear()
    originalUseState = React.useState
    React.useState = () => ["", mockSetCurrentGuess];
    ({ container } = setup({}))
  })

  afterEach(() => {
    React.useState = originalUseState
  })

  test('state updates with value of input box upon change', async () => {
    const inputBox = container.querySelector("[data-test='input-box']")

    const user = userEvent.setup()
    await user.type(inputBox!, 'train')
    expect(mockSetCurrentGuess).toHaveBeenCalledTimes(5);
    expect(mockSetCurrentGuess.mock.calls.map(call => call[0])).toEqual([
      't', 'r', 'a', 'i', 'n'
    ]);
  })
})

test('field is cleared upon submit button click', async () => {
  let container: HTMLElement;
  ({ container } = setup({}));
  const inputBox = container.querySelector("[data-test='input-box']");

  const user = userEvent.setup()
  await user.type(inputBox!, 'train')
  expect(inputBox).toHaveValue("train")

  const submitButton = container.querySelector("[data-test='submit-button']")
  await user.click(submitButton!);
  expect(inputBox).toHaveValue("")
})

describe('language picker', () => {
  let container: HTMLElement;

  test('correctly renders submit string in english', () => {
    ({ container } = setup({ language: 'en' }));
    const submitButton = container.querySelector("[data-test='submit-button']")
    expect(submitButton?.textContent).toBe("Submit")
  })

  test('correctly renders submit string in emoji', () => {
    ({ container } = setup({ language: 'emoji' }));
    const submitButton = container.querySelector("[data-test='submit-button']")
    expect(submitButton?.textContent).toBe("🚀")
  })
})
