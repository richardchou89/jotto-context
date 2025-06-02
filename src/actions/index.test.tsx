import axios from "axios";
import { getSecretWord } from ".";

describe('getSecretWord', () => {
  const secretWord = 'fish'
  const mockSetSecretWord = jest.fn()

  test('should call service to get secret word', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValueOnce({
      data: secretWord
    })

    await getSecretWord(mockSetSecretWord)

    expect(axiosGetSpy).toHaveBeenCalledTimes(1)
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord)
  })
})
