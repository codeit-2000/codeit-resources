import useIsMobile from "@src/hooks/useIsMobile";
import { createTimeSlots, getCurrentTime } from "@src/utils/createTime";

import ThirtyMinutesTimeBox from "./ThirtyMinutesTimeBox";

function TimeLine() {
  const testCurrentTime = "10:00"; // 테스트용 현재 시각
  const currentTime = getCurrentTime();

  const timeSlots = createTimeSlots().map((slot) => {
    // 10:00 ~ 10:30 예약 테스트
    const hasReservation = slot.time === "10:00";
    const reservation = hasReservation
      ? {
          startTime: "10:00",
          endTime: "10:30",
        }
      : undefined;

    return {
      ...slot,
      reservation,
      isCurrentTime: slot.time === currentTime,
      isTestCurrentTime: slot.time === testCurrentTime,
    };
  });

  const isMobile = useIsMobile();

  const timelineWidth = isMobile
    ? `${timeSlots.length * 48}px`
    : `${timeSlots.length * 72}px`;

  return (
    <div className="pl-30 no-scrollbar relative mb-[-1px] overflow-x-auto md:overflow-visible">
      <ul className="flex h-full" style={{ width: timelineWidth }}>
        {timeSlots.map((slot) => (
          <ThirtyMinutesTimeBox
            key={slot.time}
            isHalfHour={slot.isHalfHour}
            isCurrentTime={slot.isCurrentTime}
            isTestCurrentTime={slot.isTestCurrentTime}
            time={!slot.isHalfHour ? slot.time : undefined}
            reservation={slot.reservation}
          />
        ))}
      </ul>
    </div>
  );
}

export default TimeLine;
