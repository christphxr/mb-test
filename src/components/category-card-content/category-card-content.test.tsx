import React from "react";
import { render, screen } from "@testing-library/react";
import { CategoryCardContent } from "./category-card-content";
import { expect, describe, it } from "vitest";

const mockProducts = [
  {
    id: "1",
    name: "Product One",
    icon: "icon-one",
    description: "Description for product one.",
  },
  {
    id: "2",
    name: "Product Two",
    icon: "icon-two",
    description: "Description for product two.",
  },
];

describe("CategoryCardContent", () => {
  it("renders  each product", () => {
    render(<CategoryCardContent products={mockProducts} />);
    const detailsElements = screen.getAllByRole("group");
    expect(detailsElements).toHaveLength(mockProducts.length);
    expect(screen.getByText("Product One")).toBeInTheDocument();
    expect(screen.getByText("Product Two")).toBeInTheDocument();
  });

  it("renders product descriptions", () => {
    render(<CategoryCardContent products={mockProducts} />);
    expect(
      screen.getByText("Description for product one.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Description for product two.")
    ).toBeInTheDocument();
  });

  it("renders product icons with correct src and alt", () => {
    render(<CategoryCardContent products={mockProducts} />);
    expect(screen.getByAltText("Product One icon")).toHaveAttribute(
      "src",
      "assets/icon-one.svg"
    );
    expect(screen.getByAltText("Product Two icon")).toHaveAttribute(
      "src",
      "assets/icon-two.svg"
    );
  });

  it("renders nothing if products is empty", () => {
    const { container } = render(<CategoryCardContent products={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
