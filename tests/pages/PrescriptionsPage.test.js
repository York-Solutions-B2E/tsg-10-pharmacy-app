import { render, screen } from "@testing-library/react";
import React from "react";
import PrescriptionsPage from "../../src/pages/PrescriptionsPage";
import { cleanup } from "@testing-library/react";

describe("PrescriptionsPage Tests", () => {

  afterEach(() => {
    cleanup();
  });

  test("renders PrescriptionsPage", () => {
    render(<PrescriptionsPage />);
    const tableElement = screen.getByRole("grid");
    
    expect(tableElement).toBeInTheDocument();
  });
});
