[![Verify](https://github.com/Nivani/clock/actions/workflows/verify.yml/badge.svg)](https://github.com/Nivani/clock/actions/workflows/verify.yml)

Clock is a small library without dependencies for mocking time in Javascript. It's inspired by [this Go clock package](https://pkg.go.dev/github.com/facebookgo/clock).

It's very much like Javascript's Date & Time interface, so you can simply find and replace it in your existing code. The difference is that `Clock` gives you more control over time. 

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

Use `MockClock` in tests to have complete control over time or `WarpClock` in your application to time travel and speed up or slow down time (`WarpClock` is not implemented yet).
