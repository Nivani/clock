import { describe, test, expect, vi } from "vitest";
import { createMockClock } from "./mock-clock.js";

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

  [undefined, "weird string that's not a date", {}, () => {}].forEach(
    (invalidArg) => {
      test(`create instance with invalid argument [${invalidArg}] throws an error`, () => {
        expect(() => createMockClock(invalidArg as any)).toThrowError(
          /invalid initial value/,
        );
      });
    },
  );

  test(".newDate() with parameter should behave like new Date() with the same parameter", () => {
    const clock = createMockClock("2023-12-05T10:25:00Z");
    const timestamp = "2024-01-25T11:30:00Z";
    expect(clock.newDate(timestamp)).toEqual(new Date(timestamp));
  });
});
