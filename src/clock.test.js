import { describe, test, expect, vi } from "vitest";
import clock from "./clock";

describe("RealClock", () => {
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
});

async function waitMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
