import { it, describe, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SliderContent } from "./slider-content";

const mockSetActiveIndex = vi.fn();

const TestItem = ({
  expanded,
  label,
}: {
  expanded: boolean;
  label: string;
}) => (
  <div data-testid="test-item" data-expanded={expanded}>
    {label}
  </div>
);

describe("SliderContent", () => {
  const items = [
    <TestItem key="1" label="Item 1" expanded={false} />,
    <TestItem key="2" label="Item 2" expanded={false} />,
    <TestItem key="3" label="Item 3" expanded={false} />,
  ];

  beforeEach(() => {
    mockSetActiveIndex.mockClear();
  });

  it("renders all items", () => {
    render(
      <SliderContent
        activeIndex={0}
        setActiveIndex={mockSetActiveIndex}
        items={items}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("sets expanded prop only for the active item", () => {
    render(
      <SliderContent
        activeIndex={1}
        setActiveIndex={mockSetActiveIndex}
        items={items}
      />
    );
    const renderedItems = screen.getAllByTestId("test-item");
    expect(renderedItems[0]).toHaveAttribute("data-expanded", "false");
    expect(renderedItems[1]).toHaveAttribute("data-expanded", "true");
    expect(renderedItems[2]).toHaveAttribute("data-expanded", "false");
  });

  it("calls setActiveIndex on click", async () => {
    render(
      <SliderContent
        activeIndex={0}
        setActiveIndex={mockSetActiveIndex}
        items={items}
      />
    );
    const listItems = screen.getAllByRole("listitem");
    await userEvent.click(listItems[2]);
    expect(mockSetActiveIndex).toHaveBeenCalledWith(2);
  });
});
