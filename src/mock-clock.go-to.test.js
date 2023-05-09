import { describe, test, expect, vi } from "vitest";
import { createMockClock } from "src/mock-clock";

describe("MockClock", () => {
  describe("goTo()", () => {
    test("moves time to the specified date", () => {
      const clock = createMockClock("2023-04-30T22:00:00Z");

      const fn = vi.fn().mockName("callback");
      clock.setInterval(fn, 1000);

      clock.goTo("2023-04-30T22:00:10Z");

      expect(clock.newDate()).toEqual(new Date("2023-04-30T22:00:10Z"));
      expect(fn).toHaveBeenCalledTimes(10);
    });

    test("cannot go back in time", () => {
      const clock = createMockClock("2023-04-30T22:00:00Z");

      const fn = vi.fn().mockName("callback");
      clock.setInterval(fn, 1000);

      expect(() => clock.goTo("2023-04-30T21:00:00Z")).toThrow();
    });
  });
});
