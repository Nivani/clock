import type { Clock } from "./clock.js";

const MAX_INTERVAL_CALLBACKS = 10000;

interface Timeout {
  id: number;
  triggerTime: number;
  handler: Function;
  args: any[];
}

interface Interval {
  id: number;
  timeout: number;
  nextTriggerTime: number;
  handler: Function;
  args: any[];
}

export interface MockClock extends Clock {
  add(ms: number): void;
  goTo(newDate: number | string | Date): void;
}

export function createMockClock(initial: number | string | Date): MockClock {
  let currentTime = new Date(initial).getTime();

  if (Number.isNaN(currentTime)) {
    throw new Error(
      `createMockClock() received invalid initial value: [${initial}]`,
    );
  }

  let idCounter = 0;
  let timeouts: Timeout[] = [];
  let intervals: Interval[] = [];

  return {
    now(): number {
      return currentTime;
    },
    newDate(value: number | string | Date = currentTime): Date {
      return new Date(value);
    },
    setTimeout(handler: Function, timeout: number = 0, ...args: any[]): number {
      (timeouts as any).abc = (this as any).abc;
      const id = idCounter++;
      const triggerTime = currentTime + timeout;
      const insertIndex = timeouts.findIndex(
        (t) => t.triggerTime > triggerTime,
      );
      timeouts.splice(insertIndex > -1 ? insertIndex : timeouts.length, 0, {
        id,
        triggerTime,
        handler,
        args,
      });
      return id;
    },
    clearTimeout(timeoutId: number): void {
      timeouts = timeouts.filter(({ id }) => id !== timeoutId);
    },
    setInterval(
      handler: Function,
      timeout: number = 0,
      ...args: any[]
    ): number {
      const id = idCounter++;
      const nextTriggerTime = currentTime + timeout;
      const interval: Interval = {
        id,
        nextTriggerTime,
        timeout,
        handler,
        args,
      };
      insertInterval(interval);
      return id;
    },
    clearInterval(id: number | undefined): void {
      intervals = intervals.filter(({ id: iid }) => iid !== id);
    },
    add(ms: number): void {
      if (ms < 0) {
        throw new Error("cannot move back in time");
      }

      currentTime = currentTime + ms;
      runTimeouts();
      runIntervals();
    },
    goTo(newDate: number | string | Date): void {
      const timeDiff = new Date(newDate).getTime() - currentTime;
      this.add(timeDiff);
    },
  };

  function runTimeouts() {
    while (
      timeouts.length > 0 &&
      timeouts[0] &&
      timeouts[0].triggerTime <= currentTime
    ) {
      const timeout = timeouts.shift() as Timeout;
      timeout.handler(...timeout.args);
    }
  }

  function runIntervals(): void {
    let count = 0;
    while (
      intervals.length > 0 &&
      intervals[0] &&
      intervals[0].nextTriggerTime <= currentTime
    ) {
      const interval = intervals.shift() as Interval;
      interval.handler(...interval.args);
      interval.nextTriggerTime += interval.timeout;
      insertInterval(interval);

      count++;
      if (count >= MAX_INTERVAL_CALLBACKS) {
        throw new Error(
          `Stopped calling setInterval() callbacks at ${count}. Did you move time forward by too much?`,
        );
      }
    }
  }

  function insertInterval(interval: Interval): void {
    const insertIndex = intervals.findIndex(
      ({ nextTriggerTime }) => nextTriggerTime > interval.nextTriggerTime,
    );
    intervals.splice(
      insertIndex > -1 ? insertIndex : intervals.length,
      0,
      interval,
    );
  }
}
