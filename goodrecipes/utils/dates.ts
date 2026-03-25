export function getWeekYear(date = new Date()) {
  const tempDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  const dayNum = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);

  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));

  const weekNo = Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return {
    week: weekNo,
    year: tempDate.getUTCFullYear(),
  };
}

export function getWeeks(count = 5, startDate = new Date()) {
  const weeks = [];

  for (let i = 0; i < count; i++) {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + i * 7);
    const { week, year } = getWeekYear(nextDate);
    const { start, end, range } = getWeekRange(nextDate);

    weeks.push({ week, year, start, end, range });
  }

  return weeks;
}

const weeks = getWeeks();

export function getWeekRange(date: Date) {
  const tempDate = new Date(date);

  const day = tempDate.getDay() || 7;
  tempDate.setDate(tempDate.getDate() - day + 1);

  const start = new Date(tempDate);
  const end = new Date(tempDate);
  end.setDate(start.getDate() + 6);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };

  const startFormat = start.toLocaleDateString("en-US", options);
  const endFormat = end.toLocaleDateString("en-US", options);
  const range = `${startFormat} - ${endFormat}`;

  return { start, end, range };
}

console.log(weeks);
