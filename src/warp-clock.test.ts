import { describe, expect, test } from "vitest";
import { createWarpClock } from "./warp-clock.js";
import timeout from "./timeout.js";

describe("WarpClock", () => {
  describe("setTimeout()", () => {
    test("warps time", async () => {
      const initialTime = new Date("2023-07-10T11:30:05Z").getTime();

      const warpClock = createWarpClock({
        initial: initialTime,
        speed: 3.0,
      });

      await timeout(200);

      expect(warpClock.now()).toBeCloseTo(initialTime + 600, -2);
      expect(warpClock.newDate().getTime()).toBeCloseTo(initialTime + 600, -2);
    });
  });

  test(".newDate() with parameter should behave like new Date() with the same parameter", () => {
    const clock = createWarpClock({ speed: 1.2 });
    const timestamp = "2024-01-25T11:30:00Z";
    expect(clock.newDate(timestamp)).toEqual(new Date(timestamp));
  });
});
