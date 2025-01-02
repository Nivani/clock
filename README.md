[![Verify](https://github.com/Nivani/clock/actions/workflows/verify.yml/badge.svg)](https://github.com/Nivani/clock/actions/workflows/verify.yml)

`@nvnh/clock` is a small library without dependencies for mocking time in Javascript. It's inspired by [this clock package for Go](https://pkg.go.dev/github.com/facebookgo/clock).

The goal is to resemble Javascript's Date & Time interface as closely as possible, so you can easily replace it in your existing code:
* `Date.now()` becomes `clock.now()`
* `new Date()` becomes `clock.newDate()`
* etc...

Here's the complete interface:

```Typescript
export interface Clock {
  now(): number;
  newDate(): Date;
  newDate(value: number | string | Date): Date;
  setTimeout(handler: TimerHandler, timeout?: number, ...args: any[]): number;
  clearTimeout(id: number | undefined): void;
  setInterval(handler: TimerHandler, timeout?: number, ...args: any[]): number;
  clearInterval(id: number | undefined): void;
}
```

`@nvnh/clock` gives you complete control over time:

* Use `Clock` in your application for default behavior.
* Use `MockClock` in tests to have complete control over time.
* Replace `Clock` by `WarpClock` in your application to see how it behaves at a different point in time. You can time travel and speed up or slow down time. Useful for debugging time-related problems, eg. using your application around midnight, year changes, leap years or use of `setTimeout()` that would let you wait a long time.

# Getting started

## Installation

`npm install @nvnh/clock`

## Get the current date

```Javascript
// Import default clock instance
import clock from "@nvnh/clock";

// use it just like Javascript's Date
console.log(clock.newDate().toISOString()); // eg. 2025-07-12T15:15:21.376Z
// will have the same output as
console.log(new Date().toISOString()); // eg. 2025-07-12T15:15:21.376Z
```

## Using MockClock

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

## Using WarpClock

 Export a single clock instance to use in your whole application (eg. `clock.js`):

```Javascript
import clock from "@nvnh/clock";

export default clock;
```

When you need different time behavior in your application (eg. to debug a time-related bug), replace the real clock with a `WarpClock`:

```Javascript
// import clock from "@nvnh/clock";
import { createWarpClock } from "@nvnh/clock";

// export default clock;
export default createWarpClock({
  initial: "2024-12-31T23:59:30Z",
  speed: 4.0,
});
```

# Example

## Last week

The last week example implements a function with signature:

`lastWeek(): { from: Date, to: Date }`

Where:
* `from` is a Javascript date representing monday 00:00:00 of the previous week.
* `to` is a Javascript date representing sunday 23:59:59 of the previous week.

[The code is documented](./src/examples/last-week/last-week.ts) and shows how you can use `@nvnh/clock` in your own code.

# FAQ

## What if I'm using a date/time library like Luxon, Moment.js or date-fns?

The only code that needs to change is code that determines what time it is:

* In Luxon, `DateTime.now()` becomes `new DateTime(clock.now())`
* In Moment.js, `moment()` becomes `moment(clock.now())`
* date-fns doesn't determine the current time, so you only need to replace where Vanilla JS determines what time it is: `Date.now()` becomes `clock.now()`, `new Date()` becomes `clock.newDate()`.

## How do I use this with popular frontend frameworks like React, Vue.js or Angular?

The best way is to have a single `Clock` instance injected into your components by a dependency injection system.

In React you can use [Context](https://react.dev/learn/passing-data-deeply-with-context).

Vue.js has [Provide / Inject](https://vuejs.org/guide/components/provide-inject).

Angular has [dependency injection](https://angular.dev/guide/di/dependency-injection).

It should work with any dependency injection system you have in your project.
