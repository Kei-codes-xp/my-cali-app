export function getTodayWorkout(plan: any[] = [], startDate?: string) {
  if (!plan || plan.length === 0) {
    return { dayIndex: 0, workout: null };
  }

  if (!startDate) {
    return { dayIndex: 0, workout: plan[0] };
  }

  const start = new Date(startDate);
  const today = new Date();

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
