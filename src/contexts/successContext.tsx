import { createContext, useContext, useMemo, useState, Dispatch, ReactNode } from "react";

const successContext = createContext<
  [boolean, Dispatch<React.SetStateAction<boolean>>] | null
>(null);

const useSuccess = () => {
  const context = useContext(successContext);

  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider");
  }

  return context;
}

const SuccessProvider = ({ children }: { children: ReactNode }) => {
  const [success, setSuccess] = useState(false)

  const value = useMemo(() => [success, setSuccess], [success]) as [boolean, Dispatch<React.SetStateAction<boolean>>];

  return <successContext.Provider value={value}>
    {children}
  </successContext.Provider>
}

export default { SuccessProvider, useSuccess }
