import "@testing-library/jest-dom";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryCard } from "./category-card";
import type { Product } from "@/types";

vi.mock("./category-card.module.css", () => ({
  default: {
    contentHidden: "contentHidden",
  },
}));

vi.mock("../category-card-content/category-card-content", () => ({
  // @ts-expect-error mocking the component
  CategoryCardContent: ({ products, classname }) => (
    <div data-testid="category-card-content" className={classname}>
      {products.map((p: Product) => (
        <span key={p.id}>{p.name}</span>
      ))}
    </div>
  ),
}));

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Product 1",
    icon: "icon-1.svg",
    description: "Description 1",
  },
  {
    id: "2",
    name: "Product 2",
    icon: "icon-2.svg",
    description: "Description 2",
  },
];

describe("CategoryCard", () => {
  it("renders the label", () => {
    render(
      <CategoryCard label="Test Label" products={mockProducts} expanded />
    );
    expect(screen.getByText("Test Label")).toBeVisible();
  });

  it("hides the content when not expanded", () => {
    render(
      <CategoryCard label="Test" products={mockProducts} expanded={false} />
    );
    const content = screen.getByTestId("category-card-content");
    expect(content.classList).toContain("contentHidden");
  });

  it("renders products in CategoryCardContent when expanded", () => {
    render(<CategoryCard label="Test" products={mockProducts} expanded />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });
});
