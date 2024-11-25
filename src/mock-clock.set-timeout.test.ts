import { describe, test, expect, vi } from "vitest";
import { createMockClock } from "./mock-clock.js";

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

    test("runs callbacks in the correct order", () => {
      const clock = createMockClock("2023-04-08T23:00:00Z");

      let counter = 0;
      const fn1 = vi
        .fn()
        .mockName("callback 1")
        .mockImplementation(() => counter++);
      clock.setTimeout(fn1, 300);
      const fn2 = vi
        .fn()
        .mockName("callback 2")
        .mockImplementation(() => counter++);
      clock.setTimeout(fn2, 250);

      clock.add(500);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);
      expect(fn2.mock.results[0]?.value).toBeLessThan(
        fn1.mock.results[0]?.value,
      );
    });

    test("doesn't run callback when timeout is cleared", () => {
      const clock = createMockClock("2023-04-30T22:00:00Z");

      const fn1 = vi.fn().mockName("callback 1");
      const id1 = clock.setTimeout(fn1, 250);
      const fn2 = vi.fn().mockName("callback 2");
      clock.setTimeout(fn2, 250);

      clock.add(200);
      clock.clearTimeout(id1);
      clock.add(100);

      expect(fn1).not.toHaveBeenCalled();
      expect(fn2).toHaveBeenCalled();
    });
  });
});
