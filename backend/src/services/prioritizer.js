function minutesUntil(date) {
  if (!date) return Infinity;
  return Math.round((new Date(date) - new Date()) / 60000);
}

function getTimeOfDayTagFromDate(d = new Date()) {
  const h = d.getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  return 'evening';
}

function scoreTask(task, userPrefs = {}) {
  const W = { deadline: 0.45, userPriority: 0.30, estimatedTime: 0.08, timeOfDay: 0.07, overdue: 0.10 };

  let minutes = minutesUntil(task.deadline);
  let deadlineScore;
  if (!isFinite(minutes)) deadlineScore = 0.0;
  else if (minutes < 0) deadlineScore = 1.0;
  else {
    const maxWindow = (userPrefs.deadlineWindowDays || 7) * 24 * 60;
    const frac = Math.min(minutes / maxWindow, 1);
    deadlineScore = 1 - 0.9 * frac;
  }

  const userPriorityScore = ((task.userPriority || 3) - 1) / 4;
  const est = Math.min(task.estimatedMinutes || 30, 240);
  const estScore = 1 - (est / 240) * 0.8;

  let currentTOD = userPrefs.currentTimeOfDay || getTimeOfDayTagFromDate();
  let timeOfDayScore = 0.5;
  if (task.timeOfDayPref && task.timeOfDayPref.length) {
    timeOfDayScore = task.timeOfDayPref.includes(currentTOD) ? 1.0 : 0.3;
  }

  const overdueBoost = minutes < 0 ? Math.min(1, Math.abs(minutes) / (24 * 60)) : 0;
  const raw = (
    W.deadline * deadlineScore +
    W.userPriority * userPriorityScore +
    W.estimatedTime * estScore +
    W.timeOfDay * timeOfDayScore +
    W.overdue * overdueBoost
  );

  // apply user quickTaskBias if provided
  const quickBias = userPrefs.quickTaskBias || 1.0;
  let biased = raw * (1 + (est < 30 ? 0.05 * quickBias : 0));
  return Math.round(Math.max(0, Math.min(1, biased)) * 100);
}

module.exports = { scoreTask, minutesUntil, getTimeOfDayTagFromDate };
