import type { Clock } from "./clock.js";

export default createRealClock();

export function createRealClock(): Clock {
  return {
    now(): number {
      return Date.now();
    },
    newDate(value?: number | string | Date): Date {
      return value === undefined ? new Date() : new Date(value);
    },
    setTimeout(callback: Function, ms?: number, ...args: any[]): number {
      return setTimeout(callback, ms, ...args);
    },
    clearTimeout(id?: number): void {
      clearTimeout(id);
    },
    setInterval(handler: Function, ms?: number, ...args: any[]): number {
      return setInterval(handler, ms, ...args);
    },
    clearInterval(id?: number): void {
      clearInterval(id);
    },
  };
}
