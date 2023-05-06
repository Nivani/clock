import { Clock } from "./clock";

export function createMockClock(initial: number | string | Date): MockClock;

export interface MockClock extends Clock {
  add(ms: number);
}
