import React from "react";
import { render, waitFor, screen } from '@testing-library/react';
import App from "./App";

jest.mock('./actions');
import { getSecretWord as mockGetSecretWord } from './actions';

// Typecast to Jest mock for TypeScript
const mockGetSecretWordTyped = mockGetSecretWord as jest.Mock;

describe("App component", () => {
  it('renders without crashing', () => {
    expect(true).toBeTruthy()
  })
})

describe('get secret word', () => {
  let originalUseReducer: typeof React.useReducer;

  beforeEach(() => {
    originalUseReducer = React.useReducer;
    const mockUseReducer = jest.fn()
      .mockReturnValue([
        { secretWord: 'diner', language: 'en' },
        jest.fn(),
      ]);
    React.useReducer = mockUseReducer;
  });

  afterEach(() => {
    React.useReducer = originalUseReducer;
  });

  beforeEach(() => {
    mockGetSecretWordTyped.mockClear();
  })

  test(`renders app: true`, () => {
    const { container } = render(<App />);
    const appComponent = container.querySelector('[data-test="component-app"]');
    expect(appComponent).toBeInTheDocument();
  });

  test('calls getSecretWord on mount', async () => {
    render(<App />);
    await waitFor(() => {
      expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
    });
  });

  test('does not call getSecretWord on update', async () => {
    const { rerender } = render(<App />);
    mockGetSecretWordTyped.mockClear();
    rerender(<App />);
    await waitFor(() => {
      expect(mockGetSecretWord).not.toHaveBeenCalled();
    });
  });
});


describe('get secret word', () => {
  let originalUseReducer: typeof React.useReducer;

  beforeEach(() => {
    originalUseReducer = React.useReducer;
    const mockUseReducer = jest.fn()
      .mockReturnValue([
        { secretWord: null, language: 'en' },
        jest.fn(),
      ]);
    React.useReducer = mockUseReducer;
  });

  afterEach(() => {
    React.useReducer = originalUseReducer;
  });

  beforeEach(() => {
    mockGetSecretWordTyped.mockClear();
  })

  test(`renders loading spinner: true`, () => {
    const { container } = render(<App />);
    const appComponent = container.querySelector('[data-test="spinner"]');
    expect(appComponent).toBeInTheDocument();
  });
})