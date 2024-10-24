interface getDaysUntilEndOfMonthType {
  id: string;
  day: string;
  weekday: string;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

export default function getDaysUntilEndOfMonth(date: Date = new Date()) {
  // 한국 시간대 설정
  // const options = { timeZone: "Asia/Seoul" };
  // const now = new Date(new Date().toLocaleString("en-US", options));

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1

  // 해당 월의 마지막 날 구하기
  const lastDay = new Date(year, month, 0).getDate();

  const result: getDaysUntilEndOfMonthType[] = [];

  for (let day = date.getDate(); day <= lastDay; day++) {
    const currentDate = new Date(year, month - 1, day);
    const weekday = WEEKDAYS[currentDate.getDay()];

    result.push({
      id: `${year}-${month}-${day}`,
      day: `${day}일`,
      weekday: `${weekday}`,
    });
  }

  return {
    year,
    month,
    days: result,
  };
}
