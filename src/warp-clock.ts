import type { Clock } from "./clock.js";

export interface WarpClockOptions {
  speed?: number;
  initial?: number | string | Date;
}

export function createWarpClock({
  speed = 1.0,
  initial,
}: WarpClockOptions = {}): Clock {
  const startTime: number = Date.now();
  let initialTime: number;

  if (!initial) {
    initialTime = startTime;
  } else {
    initialTime =
      typeof initial === "number" ? initial : new Date(initial).getTime();
  }

  return {
    now(): number {
      return now();
    },
    newDate(value?: number | string | Date) {
      return value === undefined ? new Date(this.now()) : new Date(value);
    },
    setTimeout(handler: Function, timeout: number = 0, ...args: any[]): number {
      return setTimeout(handler, timeout / speed, ...args);
    },
    clearTimeout,
    setInterval(
      handler: Function,
      timeout: number = 0,
      ...args: any[]
    ): number {
      return setInterval(handler, timeout / speed, ...args);
    },
    clearInterval,
  };

  function now(): number {
    return initialTime + timeDiff();
  }

  function timeDiff(): number {
    return (Date.now() - startTime) * speed;
  }
}
