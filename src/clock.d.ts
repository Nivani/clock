export function createClock(): Clock;

export interface Clock {
  now(): number;
  newDate(): Date;
  setTimeout(): Timeout;
  clearTimeout(t: Timeout): void;
  setInterval(): Interval;
  clearInterval(i: Interval): void;
}

export type Timeout = any;
export type Interval = any;
