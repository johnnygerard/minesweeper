import "@testing-library/jest-dom";
import Home from "@/app/page";
import { render, screen } from "@testing-library/react";

describe("Home page", () => {
  it("displays the correct number of mines in the easy mode", () => {
    render(<Home />);
    const mines = screen.getByText(/10/);

    expect(mines).toBeInTheDocument();
  });
});
