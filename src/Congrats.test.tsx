import { render } from "@testing-library/react";
import Congrats from "./Congrats";
import { SuccessProvider } from "./contexts/successContext";
import { LanguageProvider } from "./contexts/languageContext";

type setupProps = {
  success?: boolean;
  language?: string;
};

const setup = ({ success, language }: setupProps) => {
  language = language || "en";
  success = success || false;

  return render(
    <LanguageProvider value={language}>
      <SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </SuccessProvider>
    </LanguageProvider>
  );
};

let container: HTMLElement;

describe("language picker", () => {
  test("correctly renders congrats string in English by default", () => {
    ({ container } = setup({ success: true }));
    const component = container.querySelector('[data-test="congrats-message"]');
    expect(component?.textContent).toBe(
      "Congratulations! You guessed the word!"
    );
  });

  test("correctly renders congrats string in emoji", () => {
    ({ container } = setup({ success: true, language: "emoji" }));
    const component = container.querySelector('[data-test="congrats-message"]');
    expect(component?.textContent).toBe("🎯🎉");
  });
});

test("renders without error", () => {
  ({ container } = setup({ success: true, language: "emoji" }));
  const component = container.querySelector('[data-test="component-congrats"]');
  expect(component).toBeInTheDocument();
});

test("renders no text when `success` is false", () => {
  ({ container } = setup({ success: false }));
  const component = container.querySelector('[data-test="component-congrats"]');
  expect(component?.textContent).toBe("");
});

test("renders non-empty congrats message when `success` is true", () => {
  ({ container } = setup({ success: true }));
  const component = container.querySelector('[data-test="component-congrats"]');
  expect(component?.textContent).not.toBe("");
});
