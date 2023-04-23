export function createMockClock(initial) {
  let currentTime = new Date(initial).getTime();
  let timeouts = [];
  return {
    now() {
      return currentTime;
    },
    newDate() {
      return new Date(currentTime);
    },
    setTimeout(callback, ms, ...args) {
      const triggerTime = currentTime + ms;
      const insertIndex = timeouts.findIndex(t => t.triggerTime > triggerTime);
      timeouts.splice(
        insertIndex > -1 ? insertIndex : timeouts.length,
        0,
        { triggerTime, callback, args },
      );
    },
    clearTimeout(t) {
    },
    setInterval(handler, ms, ...args) {
    },
    clearInterval(i) {
    },
    set(date) {

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
