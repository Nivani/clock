export interface Clock {
  now(): number;
  newDate(): Date;
  newDate(value: number | string | Date): Date;
  setTimeout(handler: Function, timeout?: number, ...args: any[]): number;
  clearTimeout(id: number | undefined): void;
  setInterval(handler: Function, timeout?: number, ...args: any[]): number;
  clearInterval(id: number | undefined): void;
}
