import { render } from '@testing-library/react';
import GuessedWordsContext from './guessedWordsContext'

const FunctionalComponent = () => {
  GuessedWordsContext.useGuessedWords();
  return <div />
}

test('useGuessedWords throws error when not wrapped in GuessedWordsProvider', () => {
  expect(() => render(<FunctionalComponent />)).toThrow(
    'useGuessedWords must be used within a GuessedWordsProvider'
  )
})

test('useGuessedWords does not throw error when wrapped in GuessedWordsProvider', () => {
  expect(() =>
    render(
      <GuessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </GuessedWordsContext.GuessedWordsProvider>
    )
  ).not.toThrow();
})