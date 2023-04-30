export function createMockClock(initial) {
  let currentTime = new Date(initial).getTime();
  let timeouts = [];
  let idCounter = 0;

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
    setInterval(/*handler, ms, ...args*/) {
    },
    clearInterval(/*intervalId*/) {
    },
    set(/*date*/) {
    },
    add(ms) {
      currentTime = currentTime + ms;
      const remainingTimeouts = timeouts.filter(timeout => timeout.triggerTime > currentTime);
      timeouts.forEach(timeout => {
        if (!remainingTimeouts.includes(timeout)) {
          timeout.callback(...timeout.args);
        }
      });
      timeouts = remainingTimeouts;
    },
  };
}
