import { render } from '@testing-library/react';
import SuccessContext from './successContext'

const FunctionalComponent = () => {
  SuccessContext.useSuccess();
  return <div />
}

test('useSuccess throws error when not wrapped in SuccessProvider', () => {
  expect(() => render(<FunctionalComponent />)).toThrow(
    'useSuccess must be used within a SuccessProvider'
  )
})

test('useSuccess does not throw error when wrapped in SuccessProvider', () => {
  expect(() =>
    render(
      <SuccessContext.SuccessProvider>
        <FunctionalComponent />
      </SuccessContext.SuccessProvider>
    )
  ).not.toThrow();
})