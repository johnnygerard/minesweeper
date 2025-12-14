/**
 * @see https://nextjs.org/docs/app/guides/testing/vitest
 */
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

const Component = () => <h1>Hello, Vitest!</h1>;

test("Vitest and RTL work correctly", () => {
  render(<Component />);
  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Hello, Vitest!",
  });

  expect(heading).toBeDefined();
});
