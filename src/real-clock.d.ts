export default Clock;

export function createClock(): Clock;

export interface Clock {
  now(): number;
  newDate(): Date;
  setTimeout(callback: () => void, ms: number): TimeoutID;
  clearTimeout(id: TimeoutID): void;
  setInterval(callback: () => void, ms: number): IntervalID;
  clearInterval(id: IntervalID): void;
}

export type TimeoutID = number;
export type IntervalID = number;
