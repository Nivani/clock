[![Verify](https://github.com/Nivani/clock/actions/workflows/verify.yml/badge.svg)](https://github.com/Nivani/clock/actions/workflows/verify.yml)

`@nvnh/clock` is a small library without dependencies for mocking time in Javascript. It's inspired by [this clock package for Go](https://pkg.go.dev/github.com/facebookgo/clock).

The goal is to resemble Javascript's Date & Time interface as closely as possible, so you can easily replace it in your existing code. 

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
* Replace `Clock` by `WarpClock` in your application to see how your application would behave at a different point in time. You can time travel and speed up or slow down time. Useful for debugging time-related problems, eg. using your application around midnight, year changes, leap years or use of `setTimeout()` that would let you wait a long time.

# Getting started

## Installation

`npm install @nvnh/clock`

## Get the current date

```Javascript
// Import default clock instance
import clock from "@nvnh/clock";

// use it just like Javascript's Date
console.log(clock.newDate().toISOString()); // eg. 2023-07-12T15:15:21.376Z
// will have the same output as
console.log(new Date().toISOString()); // eg. 2023-07-12T15:15:21.376Z
```

## Use MockClock

```Javascript
import { createMockClock } from "@nvnh/clock/mock";

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

# Example

## Last week

The last week example implements a function with signature:

`lastWeek(): { from: Date, to: Date }`

Where:
* `from` is a Javascript date representing monday 00:00:00 of the previous week.
* `to` is a Javascript date representing sunday 23:59:59 of the previous week.

[The code is documented](./examples/last-week/last-week.js) and shows how you can use `@nvnh/clock` in your own code.
