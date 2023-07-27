[![Verify](https://github.com/Nivani/clock/actions/workflows/verify.yml/badge.svg)](https://github.com/Nivani/clock/actions/workflows/verify.yml)

`@nvnh/clock` is a small library without dependencies for mocking time in Javascript. It's inspired by [this Go clock package](https://pkg.go.dev/github.com/facebookgo/clock).

It resembles Javascript's Date & Time interface as closely as possible, so you can easily replace it in your existing code. 

```Typescript
export interface Clock {
  now(): number;
  newDate(): Date;
  setTimeout(callback: () => void, ms: number): TimeoutID;
  clearTimeout(id: TimeoutID): void;
  setInterval(callback: () => void, ms: number): IntervalID;
  clearInterval(id: IntervalID): void;
}
```

`@nvnh/clock` gives you more control over time:

* Use `Clock` in your application for default behavior.
* Use `MockClock` in tests to have complete control over time.
* Replace `Clock` by `WarpClock` in your application to see how your application would behave at a different point in time. You can time travel and speed up or slow down time. Useful for debugging time-related problems, eg. using your application around midnight, year changes or leap years.

# Getting started

## Get the current date

```Javascript
import { createClock } from "@nvnh/clock/clock";

// Create a clock instance
const clock = createClock();
// use it just like Javascript's Date
console.log(clock.newDate().toISOString()); // eg. 2023-07-12T15:15:21.376Z
// will have the same output as
console.log(new Date().toISOString()); // eg. 2023-07-12T15:15:21.376Z
```

## Use MockClock

```Javascript
import { createMockClock } from "@nvnh/clock/mock-clock";

// Create a mock clock instance
const mockClock = createMockClock("2030-11-24T08:30:25Z");
// newDate() returns the initial date
console.log(mockClock.newDate().toISOString()) // 2030-11-24T08:30:25.000Z
// move time ahead by 2 seconds
mockClock.add(2000);
// newDate() returns the updated date & time
console.log(mockClock.newDate().toISOString()) // 2030-11-24T08:30:27.000Z
// move time ahead to the specified time
mockClock.goTo("2030-11-25T07:30:00Z");
// newDate() returns the new date & time
console.log(mockClock.newDate().toISOString()) // 2030-11-25T07:30:00.000Z
```
