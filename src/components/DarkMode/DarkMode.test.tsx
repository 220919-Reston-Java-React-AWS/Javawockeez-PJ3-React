import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DarkMode from "./DarkMode";
import { unmountComponentAtNode } from "react-dom";

let container:any = null;

beforeEach(() => {
container = document.createElement("div");
document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders dark mode component", () => {
  render(<DarkMode />);

  // input has role of checkbox and we will find the element by that role
  const inputElement = screen.getByRole("checkbox") as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
});

// tests if dark is activated when toggled on
test("toggles dark mode", () => {
  render(<DarkMode />);
  const inputElement = screen.getByRole("checkbox") as HTMLInputElement;

  // can simulate a click on button
  expect(inputElement.checked).toEqual(false);
  fireEvent.click(inputElement);
  expect(inputElement.checked).toEqual(true);

  // checks that the attributes have the proper value after button click
  expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
});

// not affecting lines tested right now
test("default dark", () => {
  render(<DarkMode />);
  const inputElement = screen.getByRole("checkbox") as HTMLInputElement;
  expect(inputElement.defaultChecked).toBe(false);
});