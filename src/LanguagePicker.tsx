
type LanguagePickerProps = {
  setLanguage: (language: string) => void;
}

const LanguagePicker = ({ setLanguage }: LanguagePickerProps) => {
  const languages = [
    { code: 'en', symbol: 'en' },
    { code: 'emoji', symbol: '😊' }
  ]

  const languageIcons = languages.map(lang =>
    <span
      data-test="language-icon"
      key={lang.code}
      onClick={() => setLanguage(lang.code)}
    >
      {lang.symbol}
    </span>
  )

  return <div data-test="component-language-picker">
    { languageIcons }
  </div>
}

export default LanguagePicker;