const MAX_INTERVAL_CALLBACKS = 10000;

export function createMockClock(initial) {
  let currentTime = new Date(initial).getTime();

  if (Number.isNaN(currentTime)) {
    throw new Error(`createMockClock() received invalid initial value: [${initial}]`)
  }

  let idCounter = 0;
  let timeouts = [];
  let intervals = [];

  return {
    now() {
      return currentTime;
    },
    newDate() {
      return new Date(currentTime);
    },
    setTimeout(callback, ms, ...args) {
      const id = idCounter++;
      const triggerTime = currentTime + ms;
      const insertIndex = timeouts.findIndex(
        (t) => t.triggerTime > triggerTime,
      );
      timeouts.splice(insertIndex > -1 ? insertIndex : timeouts.length, 0, {
        id,
        triggerTime,
        callback,
        args,
      });
      return id;
    },
    clearTimeout(timeoutId) {
      timeouts = timeouts.filter(({ id }) => id !== timeoutId);
    },
    setInterval(callback, ms, ...args) {
      const id = idCounter++;
      const nextTriggerTime = currentTime + ms;
      const interval = { id, nextTriggerTime, ms, callback, args };
      insertInterval(interval);
      return id;
    },
    clearInterval(intervalId) {
      intervals = intervals.filter(({ id }) => id !== intervalId);
    },
    add(ms) {
      if (ms < 0) {
        throw new Error("cannot move back in time");
      }

      currentTime = currentTime + ms;
      runTimeouts();
      runIntervals();
    },
    goTo(newDate) {
      const timeDiff = new Date(newDate).getTime() - currentTime;
      this.add(timeDiff);
    },
  };

  function runTimeouts() {
    while (timeouts.length > 0 && timeouts[0].triggerTime <= currentTime) {
      const timeout = timeouts.shift();
      timeout.callback(...timeout.args);
    }
  }

  function runIntervals() {
    let count = 0;
    while (
      intervals.length > 0 &&
      intervals[0].nextTriggerTime <= currentTime
    ) {
      const interval = intervals.shift();
      interval.callback(...interval.args);
      interval.nextTriggerTime += interval.ms;
      insertInterval(interval);

      count++;
      if (count >= MAX_INTERVAL_CALLBACKS) {
        throw new Error(
          `Stopped calling setInterval() callbacks at ${count}. Did you move time forward by too much?`,
        );
      }
    }
  }

  function insertInterval(interval) {
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
