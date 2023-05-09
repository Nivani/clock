import { Clock } from "./clock";

export function createMockClock(initial: number | string | Date): MockClock;

export interface MockClock extends Clock {
  add(ms: number): void;
  goTo(date: number | string | Date): void;
}
