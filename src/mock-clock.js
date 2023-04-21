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
      timeouts.push({
        triggerTime: currentTime + ms,
        callback,
        args,
      });
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
