export function createWarpClock({ speed = 1.0, initial } = {}) {
  const startTime = Date.now();

  if (!initial) {
    initial = startTime;
  }

  return {
    now() {
      return now();
    },
    newDate() {
      return new Date(this.now());
    },
    setTimeout(callback, ms) {
      return setTimeout(callback, ms / speed);
    },
    clearTimeout,
    setInterval(/*callback, ms*/) {
      throw new Error("setInterval() has not been implemented yet");
    },
    clearInterval(/*id*/) {
      throw new Error("clearInterval() has not been implemented yet");
    },
  };

  function now() {
    return initial + timeDiff();
  }

  function timeDiff() {
    return (Date.now() - startTime) * speed;
  }
}
