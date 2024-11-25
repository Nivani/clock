import { describe, test, expect, vi } from "vitest";
import clock from "./real-clock.js";

describe("RealClock", () => {
  test(".newDate() returns the current date", () => {
    const diff = Math.abs(clock.newDate().getTime() - new Date().getTime());
    expect(diff).toBeLessThan(5);
  });

  test(".setTimeout() forwards parameters", async () => {
    const fn = vi.fn().mockName("callback");
    clock.setTimeout(fn, 20, "param1", 2);
    await waitMs(30);

    expect(fn).toHaveBeenCalledWith("param1", 2);
  });

  test(".setInterval() forwards parameters", async () => {
    const fn = vi.fn().mockName("callback");
    const intervalId = clock.setInterval(fn, 20, "param1", 2);
    await waitMs(30);
    clock.clearInterval(intervalId);

    expect(fn).toHaveBeenCalledWith("param1", 2);
  });

  test(".newDate() with parameter should behave like new Date() with the same parameter", () => {
    const timestamp = "2024-01-25T11:30:00Z";
    expect(clock.newDate(timestamp)).toEqual(new Date(timestamp));
  });
});

async function waitMs(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
