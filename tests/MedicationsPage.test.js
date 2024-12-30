import { render, screen } from "@testing-library/react";
import React from "react";
import MedicationsPage from "../src/pages/MedicationsPage";

describe("MedicationsPage", () => {
  test("renders MedicationsTable", () => {
    render(<MedicationsPage />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});
