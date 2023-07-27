import defaultClock from "../clock";

const lastWeek = createLastWeek(defaultClock);

export default lastWeek;

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
