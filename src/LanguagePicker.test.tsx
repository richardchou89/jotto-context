import LanguagePicker from "./LanguagePicker";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

const mockSetLanguage = jest.fn()

const setup = () => {
  return render(<LanguagePicker setLanguage={ mockSetLanguage } />)
}

let container: HTMLElement;

describe('LanguagePicker', () => {
  beforeEach(() => {
    ({ container } = setup());
  })

  test('renders without error', () => {
    const component = container.querySelector("[data-test='component-language-picker']");
    expect(component).toBeInTheDocument()
  });

  test('renders non-zero language icons', () => {
    const languageIcon = container.querySelector("[data-test='language-icon']");
    expect(languageIcon).toBeInTheDocument()
  });

  test('calls setLanguage prop upon click', async () => {
    const languageIcon = container.querySelector("[data-test='language-icon']");

    const user = userEvent.setup();
    await user.click(languageIcon!);
    expect(mockSetLanguage).toHaveBeenCalled()
  })
})
