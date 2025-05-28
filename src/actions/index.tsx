import axios from 'axios';

export const getSecretWord = async (setSecretWord: Function) => {
  const response = await axios.get('http://localhost:3030')
  setSecretWord(response.data);
}
