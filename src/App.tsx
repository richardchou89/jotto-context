import { useState } from 'react'
import './App.css'

type State = {
  secretWord: string;
  language: string;
}

type Action = {
  type: string;
  payload: string;
}

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload }
    case 'setLanguage':
      return { ...state, language: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    </>
  )
}

export default App
