import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./actions");
import { getSecretWord as mockGetSecretWord } from "./actions";

// Typecast to Jest mock for TypeScript
const mockGetSecretWordTyped = mockGetSecretWord as jest.Mock;

describe.each([
  [null, true, false],
  ["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
  let originalUseReducer: typeof React.useReducer;

  beforeEach(() => {
    originalUseReducer = React.useReducer;
    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord: secretWord, language: "en" }, jest.fn()]);
    React.useReducer = mockUseReducer;
  });

  afterEach(() => {
    React.useReducer = originalUseReducer;
  });

  test(`renders loading spinner: ${loadingShows}`, () => {
    const { container } = render(<App />);
    const appComponent = container.querySelector('[data-test="spinner"]');

    if (loadingShows) {
      expect(appComponent).toBeInTheDocument();
    } else {
      expect(appComponent).not.toBeInTheDocument();
    }
  });

  test(`renders app: ${appShows}`, () => {
    const { container } = render(<App />);
    const appComponent = container.querySelector('[data-test="component-app"]');

    if (appShows) {
      expect(appComponent).toBeInTheDocument();
    } else {
      expect(appComponent).not.toBeInTheDocument();
    }
  });
});

describe("get secret word", () => {
  beforeEach(() => {
    mockGetSecretWordTyped.mockClear();
  });

  test("calls getSecretWord on mount", async () => {
    render(<App />);
    await waitFor(() => {
      expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
    });
  });

  test("does not call getSecretWord on update", async () => {
    const { rerender } = render(<App />);
    mockGetSecretWordTyped.mockClear();
    rerender(<App />);
    await waitFor(() => {
      expect(mockGetSecretWord).not.toHaveBeenCalled();
    });
  });
});
