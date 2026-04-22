function getDateInTimeZone(timeZone: string) {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  return new Date(`${year}-${month}-${day}`);
}

export function getTodayWorkout(
  plan: any[] = [],
  startDate?: string,
  timeZone = "Asia/Manila",
) {
  if (!plan || plan.length === 0) {
    return { dayIndex: 0, workout: null };
  }

  if (!startDate) {
    return { dayIndex: 0, workout: plan[0] };
  }

  const start = new Date(startDate);
  const today = getDateInTimeZone(timeZone);

  // 🔥 normalize both to midnight
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - start.getTime();

  if (isNaN(diffTime)) {
    return { dayIndex: 0, workout: plan[0] };
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const index = ((diffDays % plan.length) + plan.length) % plan.length;

  return {
    dayIndex: index,
    workout: plan[index],
  };
}
