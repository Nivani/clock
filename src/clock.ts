export interface Clock {
  now(): number;
  newDate(): Date;
  newDate(value: number | string | Date): Date;
  setTimeout(handler: TimerHandler, timeout?: number, ...args: any[]): number;
  clearTimeout(id: number | undefined): void;
  setInterval(handler: TimerHandler, timeout?: number, ...args: any[]): number;
  clearInterval(id: number | undefined): void;
}
