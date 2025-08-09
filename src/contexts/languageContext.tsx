import { createContext, useContext } from "react";

type LanguageProviderProps = {
  children: React.ReactNode;
  value: string;
};

const languageContext = createContext("en");

export const useLanguage = () => {
  const context = useContext(languageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};

export const LanguageProvider = ({
  children,
  value,
}: LanguageProviderProps) => {
  return (
    <languageContext.Provider value={value}>
      {children}
    </languageContext.Provider>
  );
};
