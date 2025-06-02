import axios from 'axios';

type InputProps = (secretWord: string) => void

export const getSecretWord = async (setSecretWord: InputProps) => {
  const response = await axios.get<string>('http://localhost:3030')
  setSecretWord(response.data);
}
