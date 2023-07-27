import defaultClock from "../clock";

// export a lastWeek() function, injected with the default clock.
// This allows you to import lastWeek from "..../last-week" like you are used to
const lastWeek = createLastWeek(defaultClock);
export default lastWeek;

// Use a factory function as a simple dependency injection mechanism
// This allows you to write tests that verify the behavior at different points in time, see ./last-week.test.js
export function createLastWeek(clock) {
  return function lastWeek() {
    const currentDate = clock.newDate();
    const sevenDaysAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7, 0, 0, 0, 0);
    const from = startOfWeek(sevenDaysAgo);
    const to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 6, 23, 59, 59, 999);
    return { from, to };
  };
}

function startOfWeek(date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : -day + 1; // day 0 is Sunday
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff, 0, 0, 0, 0);
}
