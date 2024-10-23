import ThirtyMinutesTimeBox from "./ThirtyMinutesTimeBox";

function TimeLine() {
  // hour와 minute은 number 타입으로 받아서 문자열로 변환
  const formatDisplayTime = (hour: number, minute: number): string =>
    `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  // 테스트용 현재 시간 10:00 설정
  const testCurrentTime = "10:00";

  const timeSlots = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? 0 : 30; // 문자열 "00", "30" 대신 숫자 0, 30 사용
    const time = formatDisplayTime(hour, minute);

    // 10:00 ~ 10:30 예약 테스트
    const hasReservation = time === "10:00";
    const reservation = hasReservation
      ? {
          startTime: "10:00",
          endTime: "10:30",
        }
      : undefined;

    // 현재 시간과 비교
    const now = new Date();
    const currentTime = formatDisplayTime(now.getHours(), now.getMinutes());

    return {
      time,
      reservation,
      isHalfHour: index % 2 !== 0,
      isCurrentTime: time === currentTime,
      isTestCurrentTime: time === testCurrentTime, // 테스트용 현재 시간과 비교
    };
  });

  return (
    <div className="no-scrollbar relative overflow-x-auto">
      <ul
        className="pl-30 flex h-full"
        style={{ width: `${timeSlots.length * 192}px` }}
      >
        {timeSlots.map((slot) => (
          <ThirtyMinutesTimeBox
            key={slot.time}
            isHalfHour={slot.isHalfHour}
            isCurrentTime={slot.isCurrentTime}
            isTestCurrentTime={slot.isTestCurrentTime} // 테스트 현재 시간 prop
            time={!slot.isHalfHour ? slot.time : undefined}
            reservation={slot.reservation}
          />
        ))}
      </ul>
    </div>
  );
}

export default TimeLine;
