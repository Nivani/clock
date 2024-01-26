export default createRealClock();

export function createRealClock() {
  return {
    now() {
      return Date.now();
    },
    newDate(...args) {
      return args.length <= 0 ? new Date() : new Date(...args);
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
