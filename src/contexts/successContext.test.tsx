import { render } from "@testing-library/react";
import { SuccessProvider, useSuccess } from "./successContext";

const FunctionalComponent = () => {
  useSuccess();
  return <div />;
};

test("useSuccess throws error when not wrapped in SuccessProvider", () => {
  expect(() => render(<FunctionalComponent />)).toThrow(
    "useSuccess must be used within a SuccessProvider"
  );
});

test("useSuccess does not throw error when wrapped in SuccessProvider", () => {
  expect(() =>
    render(
      <SuccessProvider>
        <FunctionalComponent />
      </SuccessProvider>
    )
  ).not.toThrow();
});
