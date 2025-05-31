import { createContext, useContext, useMemo, useState } from "react";

const successContext = createContext<
  (boolean | React.Dispatch<React.SetStateAction<boolean>>)[] | null
>(null);

const useSuccess = () => {
  const context = useContext(successContext);

  if (!context) {
    throw new Error("useSuccess must be used within a SuccessProvider");
  }

  return context;
}

const SuccessProvider = ({ children }: { children: React.ReactNode }) => {
  const [success, setSuccess] = useState(false)

  const value = useMemo(() => [success, setSuccess], [success]);

  return <successContext.Provider value={value}>
    {children}
  </successContext.Provider>
}

export default { SuccessProvider, useSuccess }
