import { describe, test, expect } from "vitest";
import { createMockClock } from "mock";
import { createLastWeek } from "./last-week";

describe("lastWeek()", () => {
  [
    {
      description: "in the middle of a month",
      date: new Date(2023, 6, 27, 9, 35, 20, 0),
      expectedResult: {
        from: new Date(2023, 6, 17, 0, 0, 0, 0),
        to: new Date(2023, 6, 23, 23, 59, 59, 999),
      },
    },
    {
      description: "on a sunday",
      date: new Date(2023, 6, 23, 9, 35, 20, 0),
      expectedResult: {
        from: new Date(2023, 6, 10, 0, 0, 0, 0),
        to: new Date(2023, 6, 16, 23, 59, 59, 999),
      },
    },
    {
      description: "change of month",
      date: new Date(2023, 6, 3, 9, 35, 20, 0),
      expectedResult: {
        from: new Date(2023, 5, 26, 0, 0, 0, 0),
        to: new Date(2023, 6, 2, 23, 59, 59, 999),
      },
    },
    {
      description: "change of year",
      date: new Date(2023, 0, 2, 9, 35, 20, 0),
      expectedResult: {
        from: new Date(2022, 11, 26, 0, 0, 0, 0),
        to: new Date(2023, 0, 1, 23, 59, 59, 999),
      },
    },
    {
      description: "February -> March in leap year",
      date: new Date(2024, 2, 6, 9, 35, 20, 0),
      expectedResult: {
        from: new Date(2024, 1, 26, 0, 0, 0, 0),
        to: new Date(2024, 2, 3, 23, 59, 59, 999),
      },
    },
  ].forEach(({ description, date, expectedResult }) => {
    test(description, () => {
      const clock = createMockClock(date);
      const lastWeek = createLastWeek(clock);
      expect(lastWeek()).toEqual(expectedResult);
    });
  });
});
