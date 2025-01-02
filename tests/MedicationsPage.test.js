import { render, screen } from "@testing-library/react";
import React from "react";
import MedicationsPage from "../src/pages/MedicationsPage";
import { cleanup } from "@testing-library/react";

describe("MedicationsPage", () => {

  afterEach(() => {
    cleanup();
  });

  test("renders MedicationsTable", () => {
    render(<MedicationsPage />);
    const tableElement = screen.getByRole("grid");
    
    expect(tableElement).toBeInTheDocument();
  });
});
