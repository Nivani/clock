import { describe, test, expect, vi } from "vitest";
import { createMockClock } from "src/mock-clock";

describe("MockClock", () => {
  describe("setInterval()", () => {
    test("runs callback every specified ms", () => {
      const clock = createMockClock("2023-04-30T22:00:00Z");

      const fn = vi.fn().mockName("callback");
      clock.setInterval(fn, 250);

      clock.add(249);

      expect(fn).not.toHaveBeenCalled();

      clock.add(2);

      expect(fn).toHaveBeenCalledTimes(1);

      clock.add(250);

      expect(fn).toHaveBeenCalledTimes(2);

      clock.add(1000);

      expect(fn).toHaveBeenCalledTimes(6);
    });

    test("runs callbacks in the correct order", () => {
      const clock = createMockClock("2023-04-08T23:00:00Z");

      let counter = 0;
      const fn1 = vi.fn()
        .mockName("callback 1")
        .mockImplementation(() => counter++);
      const fn2 = vi.fn()
        .mockName("callback 2")
        .mockImplementation(() => counter++);


      clock.setInterval(fn1, 400);

      clock.add(200);

      clock.setInterval(fn2, 250);

      clock.add(200);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(0);

      clock.add(50);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(1);

      clock.add(250);

      expect(fn1).toHaveBeenCalledTimes(1);
      expect(fn2).toHaveBeenCalledTimes(2);

      clock.add(250);

      expect(fn1).toHaveBeenCalledTimes(2);
      expect(fn2).toHaveBeenCalledTimes(3);
      expect(fn1.mock.results[1].value).toBeLessThan(fn2.mock.results[2].value);
    });
  });
});