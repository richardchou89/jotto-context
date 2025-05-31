interface LanguageStrings {
  congrats: string;
  submit: string;
  guessPrompt: string;
  guessInputPlaceholder: string;
  guessColumnHeader: string;
  guessedWords: string;
  matchingLettersColumnHeader: string;
}

const languageStrings: Record<string, LanguageStrings> = {
  en: {
   congrats: 'Congratulations! You guessed the word!',
   submit: 'Submit',
   guessPrompt: 'Try to guess the secret word!',
   guessInputPlaceholder: 'enter guess',
   guessColumnHeader: 'Guessed Words',
   guessedWords: 'Guesses',
   matchingLettersColumnHeader: 'Matching Letters',
  },
  emoji: {
   congrats: '🎯🎉',
   submit: '🚀',
   guessPrompt: '🤔🤫🔤',
   guessInputPlaceholder: '⌨️🤔',
   guessedWords: '🤷‍🔤',
   guessColumnHeader: '🤷‍',
   matchingLettersColumnHeader: '✅',
  }
}

function getStringByLanguage(languageCode: string, stringKey: keyof LanguageStrings, strings=languageStrings) {
  if (!strings[languageCode] || !strings[languageCode][stringKey]) {
    console.warn(`Could not get string [${stringKey}] for [${languageCode}]`);

    // fall back to english
    return strings.en[stringKey];
  }

  return strings[languageCode][stringKey];
}

// for future mocking
export default {
  getStringByLanguage,
}
