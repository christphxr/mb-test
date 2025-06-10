import { render, screen } from "@testing-library/react";
import Home, { getCategoryCards } from "./home-content";
// import { SliderNavigation } from "@/components/slider-navigation/slider-navigation";
// import { SliderContent } from "@/components/slider-content/slider-content";
import data from "@/data.json";
import type { CategoryApiResponse } from "@/types";
import { vi, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/category-card/category-card", () => ({
  CategoryCard: ({ label }: { label: string }) => (
    <div data-testid="category-card">{label}</div>
  ),
}));

vi.mock("@/components/slider-navigation/slider-navigation", () => ({
  SliderNavigation: ({ label, onNextClick, onPrevClick }: any) => (
    <div>
      <span>{label}</span>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={onPrevClick}>Prev</button>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={onNextClick}>Next</button>
    </div>
  ),
}));

vi.mock("@/components/slider-content/slider-content", () => ({
  SliderContent: ({ items, activeIndex }: any) => (
    <div data-testid="slider-content">{items[activeIndex]}</div>
  ),
}));

describe("getCategoryCards", () => {
  it("returns a CategoryCard for each category in data", () => {
    const mockData: CategoryApiResponse = {
      savings: { label: "Savings", products: [] },
      isa: { label: "ISA", products: [] },
    };
    const cards = getCategoryCards(mockData);
    expect(cards).toHaveLength(2);
    expect(cards[0].props.label).toBe("Savings");
    expect(cards[1].props.label).toBe("ISA");
  });
});

describe("Home", () => {
  it("renders SliderNavigation and SliderContent", () => {
    render(<Home data={data} />);
    expect(screen.getByText("Explore Accounts")).toBeInTheDocument();
    expect(screen.getByTestId("slider-content")).toBeInTheDocument();
  });

  it("shows the first category card by default", () => {
    render(<Home data={data} />);
    const firstCategory = Object.keys(data)[0] as keyof typeof data;
    expect(screen.getByText(data[firstCategory].label)).toBeInTheDocument();
  });

  it("navigates to next and previous category cards", async () => {
    render(<Home data={data} />);
    const categories = Object.keys(data);
    await userEvent.click(screen.getByText("Next"));
    expect(
      screen.getByText(data[categories[1 % categories.length]].label)
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText("Prev"));
    expect(screen.getByText(data[categories[0]].label)).toBeInTheDocument();
  });

  it("wraps around when navigating beyond last and first items", async () => {
    render(<Home data={data} />);
    const categories = Object.keys(data);
    await userEvent.click(screen.getByText("Prev"));
    expect(
      screen.getByText(data[categories[categories.length - 1]].label)
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText("Next"));
    expect(screen.getByText(data[categories[0]].label)).toBeInTheDocument();
  });
});
