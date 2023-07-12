import { Clock } from "./clock";

export interface WarpClockOptions {
  speed?: number,
  initial?: number | string | Date,
}

export function createWarpClock(options?: WarpClockOptions): Clock;
