// import "@testing-library/jest-dom/extend-expect";

import { render, screen } from "@testing-library/react";
// import { render } from "@testing-library/react";
import React from "react";
import App from "../src/App";

describe("App", () => {
  test("renders Hello heading", () => {
    render(<App />);
    // const headingElement = ;
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
