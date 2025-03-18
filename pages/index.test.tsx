import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";

describe("Home", () => {
  it("renders the welcome message", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello, Simple Task Manager"
    );
  });
});
