import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("<Header />", () => {
  it("renders the header element", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeDefined();
  });

  it("renders the Moneybox logo image with correct src and alt", () => {
    render(<Header />);
    const logo = screen.getByRole("img", { name: /Moneybox Logo/i });
    expect(logo).toBeDefined();
    expect(logo.getAttribute("src")).toContain("/assets/mb-logo.svg");
    expect(logo.getAttribute("width")).toBe("320");
  });
});
