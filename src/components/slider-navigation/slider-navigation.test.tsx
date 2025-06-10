import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SliderNavigation } from "./slider-navigation";

describe("SliderNavigation", () => {
  const label = "Test Label";

  it("renders the content", () => {
    render(
      <SliderNavigation
        label={label}
        onPrevClick={vi.fn()}
        onNextClick={vi.fn()}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Previous Category" })
    ).toHaveTextContent("<");
    expect(
      screen.getByRole("button", { name: "Next Category" })
    ).toHaveTextContent(">");
  });

  it("calls onPrevClick when previous button is clicked", async () => {
    const onPrevClick = vi.fn();
    render(
      <SliderNavigation
        label={label}
        onPrevClick={onPrevClick}
        onNextClick={vi.fn()}
      />
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Previous Category" })
    );
    expect(onPrevClick).toHaveBeenCalledTimes(1);
  });

  it("calls onNextClick when next button is clicked", async () => {
    const onNextClick = vi.fn();
    render(
      <SliderNavigation
        label={label}
        onPrevClick={vi.fn()}
        onNextClick={onNextClick}
      />
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Next Category" })
    );
    expect(onNextClick).toHaveBeenCalledTimes(1);
  });
});
