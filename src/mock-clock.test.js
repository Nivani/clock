import { describe, test, expect, vi } from "vitest";
import { createMockClock } from "src/mock-clock";

describe("MockClock", () => {
  describe("newDate(), now()", () => {
    test("returns the current time", () => {
      const startTime = "2023-07-12T11:12:13Z";
      const clock = createMockClock(startTime);

      expect(clock.newDate()).toEqual(new Date("2023-07-12T11:12:13Z"));
      expect(clock.now()).toEqual(1689160333000);

      clock.add(2345);

      expect(clock.newDate()).toEqual(new Date("2023-07-12T11:12:15.345Z"));
      expect(clock.now()).toEqual(1689160335345);
    });
  });

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
