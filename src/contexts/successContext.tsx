import { createContext, useContext, useMemo, useState, Dispatch, ReactNode } from "react";

type SuccessProviderProps = {
  children: ReactNode;
  value?: [boolean, Dispatch<React.SetStateAction<boolean>>];
} & Omit<React.ComponentProps<typeof successContext.Provider>, 'value'>;

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

const SuccessProvider = ({ children, value: overrideValue, ...props }: SuccessProviderProps) => {
  const [success, setSuccess] = useState(false)

  const internalValue  = useMemo(() => [success, setSuccess], [success]) as [boolean, Dispatch<React.SetStateAction<boolean>>];

  const valueToUse = overrideValue ?? internalValue ;

  return <successContext.Provider value={valueToUse} {...props}>
    {children}
  </successContext.Provider>
}

export default { SuccessProvider, useSuccess }
