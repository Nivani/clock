import { describe, test, afterEach, expect, vi } from "vitest";
import { createWarpClock } from "./warp-clock.js";
import timeout from "./timeout.js";

describe("WarpClock", () => {
  describe("setInterval()", () => {
    const intervalsToClear: number[] = [];

    afterEach(() => {
      intervalsToClear.forEach(clearInterval);
      intervalsToClear.splice(0, intervalsToClear.length);
    });

    test("runs callback every specified ms with speedup", async () => {
      const clock = createWarpClock({ speed: 3.0 });

      const fn = vi.fn().mockName("callback");
      const id = clock.setInterval(fn, 210);
      intervalsToClear.push(id);

      await timeout(50);

      expect(fn).not.toHaveBeenCalled();

      await timeout(30);

      expect(fn).toHaveBeenCalledTimes(1);

      await timeout(140);

      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  test("stops running callback when interval is cleared", async () => {
    const clock = createWarpClock({ speed: 3.0 });

    const fn = vi.fn().mockName("callback");
    const id = clock.setInterval(fn, 210);

    await timeout(80);

    expect(fn).toHaveBeenCalledTimes(1);

    await timeout(140);

    expect(fn).toHaveBeenCalledTimes(3);

    clock.clearInterval(id);

    expect(fn).toHaveBeenCalledTimes(3);

    await timeout(140);

    expect(fn).toHaveBeenCalledTimes(3);
  });
});
