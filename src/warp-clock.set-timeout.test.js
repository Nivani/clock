import { describe, test, expect, vi } from "vitest";
import { createWarpClock } from "./warp-clock";
import timeout from "./timeout";

describe("WarpClock", () => {
  describe("setTimeout()", () => {
    test("runs callback once", async () => {
      const clock = createWarpClock({ speed: 3.0 });

      const fn = vi.fn().mockName("callback");
      clock.setTimeout(fn, 210);

      await timeout(50);

      expect(fn).not.toHaveBeenCalled();

      await timeout(20);

      expect(fn).toHaveBeenCalledTimes(1);

      await timeout(210);

      expect(fn).toHaveBeenCalledTimes(1);
    });

    test("doesn't run callback when timeout is cleared", async () => {
      const clock = createWarpClock({ speed: 3.0 });

      const fn = vi.fn().mockName("callback");
      const id = clock.setTimeout(fn, 210);

      await timeout(50);
      clock.clearTimeout(id);

      expect(fn).not.toHaveBeenCalled();

      await timeout(20);

      expect(fn).not.toHaveBeenCalled();
    });
  });
});
