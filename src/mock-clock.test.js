import { describe, test, expect, vi } from "vitest";
import { createMockClock } from "src/mock-clock";

describe("MockClock", () => {
  describe("setTimeout()", () => {
    test("runs callback once after clock is advanced for specified time", () => {
      const clock = createMockClock("2023-04-08T23:00:00Z");

      const fn = vi.fn().mockName("callback");
      clock.setTimeout(fn, 250);

      clock.add(249);

      expect(fn).not.toHaveBeenCalled();

      clock.add(2);

      expect(fn).toHaveBeenCalledTimes(1);

      clock.add(1000);

      expect(fn).toHaveBeenCalledTimes(1);
    });
  });
});