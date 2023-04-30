export function createMockClock(initial) {
  let currentTime = new Date(initial).getTime();
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
      const insertIndex = timeouts.findIndex(t => t.triggerTime > triggerTime);
      timeouts.splice(
        insertIndex > -1 ? insertIndex : timeouts.length,
        0,
        { id, triggerTime, callback, args },
      );
    },
    clearTimeout(timeoutId) {
      timeouts = timeouts.filter(({ id }) => id === timeoutId)
    },
    setInterval(callback, ms, ...args) {
      const id = idCounter++;
      const nextTriggerTime = currentTime + ms;
      const interval = { id, nextTriggerTime, ms, callback, args };
      insertInterval(interval);
    },
    clearInterval(/*intervalId*/) {
    },
    add(ms) {
      currentTime = currentTime + ms;
      runTimeouts();
      runIntervals();
    },
  };

  function runTimeouts() {
    while (timeouts.length > 0 && timeouts[0].triggerTime <= currentTime) {
      const timeout = timeouts.shift();
      timeout.callback(...timeout.args);
    }
  }

  function runIntervals() {
    while (intervals.length > 0 && intervals[0].nextTriggerTime <= currentTime) {
      const interval = intervals.shift();
      interval.callback(...interval.args);
      interval.nextTriggerTime += interval.ms;
      insertInterval(interval);
    }
  }

  function insertInterval(interval) {
    const insertIndex = intervals.findIndex(({ nextTriggerTime }) => nextTriggerTime > interval.nextTriggerTime);
    intervals.splice(
      insertIndex > -1 ? insertIndex : intervals.length,
      0,
      interval,
    );
  }
}
