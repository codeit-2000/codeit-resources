/**
 * 현재 시간을 "HH:MM" 형식으로 반환합니다.
 *
 * @returns 현재 시간 문자열 (예: "14:30")
 */
export function getCurrentTime(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // 두 자리 숫자 형식을 유지하기 위해 padStart 사용
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

/**
 * 00:00부터 24:00까지 지정된 간격으로 시간 슬록을 생성합니다.
 *
 * @param intervalMinutes - 시간 간격 (분 단위). 기본값은 30분입니다.
 * @returns "HH:MM" 형식의 시간 문자열 배열
 */
export function generateTimeSlots(intervalMinutes: number = 30): string[] {
  const slots: string[] = [];

  for (let hour = 0; hour <= 24; hour++) {
    for (let min = 0; min < 60; min += intervalMinutes) {
      // 24:00 외의 24:30, 24:60 등은 제외
      if (hour === 24 && min !== 0) continue;

      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMin = min.toString().padStart(2, "0");
      slots.push(`${formattedHour}:${formattedMin}`);
    }
  }

  return slots;
}

/**
 * 현재 시간부터 24:00까지의 시간 슬록을 필터링합니다.
 *
 * @param timeSlots - 전체 시간 슬록 배열 ("HH:MM" 형식)
 * @param currentTime - 현재 시간 ("HH:MM" 형식)
 * @returns 현재 시간 이후의 시간 슬록 배열
 */
export function getAvailableTimeSlots(
  timeSlots: string[],
  currentTime: string,
): string[] {
  // 현재 시간을 분 단위로 변환
  const [currentHour, currentMin] = currentTime.split(":").map(Number);
  const currentTotalMinutes = currentHour * 60 + currentMin;

  return timeSlots.filter((slot) => {
    const [slotHour, slotMin] = slot.split(":").map(Number);
    const slotTotalMinutes = slotHour * 60 + slotMin;
    return slotTotalMinutes >= currentTotalMinutes;
  });
}
