import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { getData } from "./page";

vi.mock("@/components/home-content/home-content", () => ({
  default: ({ data }: { data: any }) => (
    <div data-testid="home-content">{JSON.stringify(data)}</div>
  ),
}));

describe("getData", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("returns data when fetch is successful", async () => {
    const mockData = { categories: [{ id: 1, name: "Test" }] };
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockData }),
    });

    const data = await getData();
    expect(data).toEqual(mockData);
  });

  it("returns null and logs error when fetch fails", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error("Network error"));

    const data = await getData();
    expect(data).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      "Failed to fetch categories:",
      expect.any(Error)
    );
    errorSpy.mockRestore();
  });
});

describe.todo("Home", () => {
  // TODO Home tests
});
