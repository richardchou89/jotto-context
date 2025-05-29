import { First } from "./First";
import { render, screen } from "@testing-library/react";

describe("First component", () => {
  test("renders without crashing", () => {
    render(<First />);
    const heading = screen.getByRole("heading", { name: /hello/i });
    expect(heading).toBeInTheDocument();
  });
});