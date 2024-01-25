export function createWarpClock({ speed = 1.0, initial } = {}) {
  const startTime = Date.now();

  if (!initial) {
    initial = startTime;
  }

  return {
    now() {
      return now();
    },
    newDate(...args) {
      return args.length <= 0 ? new Date(this.now()) : new Date(...args);
    },
    setTimeout(callback, ms) {
      return setTimeout(callback, ms / speed);
    },
    clearTimeout,
    setInterval(callback, ms) {
      return setInterval(callback, ms / speed);
    },
    clearInterval,
  };

  function now() {
    return initial + timeDiff();
  }

  function timeDiff() {
    return (Date.now() - startTime) * speed;
  }
}
