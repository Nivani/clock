export function createClock() {
  return {
    now() {
      return Date.now();
    },
    newDate() {
      return new Date(this.now());
    },
    setTimeout(callback, ms, ...args) {
      return setTimeout(callback, ms, ...args);
    },
    clearTimeout(t) {
      clearTimeout(t);
    },
    setInterval(handler, ms, ...args) {
      return setInterval(handler, ms, ...args);
    },
    clearInterval(i) {
      clearInterval(i);
    },
  };
}
