import { createClock } from "src/clock";
// import { createWarpClock } from "src/warp-clock";

// Export a single clock instance to use in your application
export default createClock();

// If you want to debug time-related problems, replace the default clock with a WarpClock
// export default createWarpClock({
//   initial: "2023-12-31T23:59:30Z",
//   speed: 4.0,
// });
