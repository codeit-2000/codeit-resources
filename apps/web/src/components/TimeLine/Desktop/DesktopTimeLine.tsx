import { createTimeSlots, getCurrentTime } from "@src/utils/createTime";

import DesktopTimeLineContent from "./DesktopTimeLineContent";

export default DesktopTimeLine;

function DesktopTimeLine() {
  const testCurrentTime = "10:00";
  const currentTime = getCurrentTime();

  const timeSlots = createTimeSlots().map((slot) => {
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

  return (
    <ul
      className="h-75 hover:bg-gray-10 hover:rounded-16 flex items-center hover:shadow-[inset_0_0_0_1px_#e5e5ea]"
      style={{ width: `${timeSlots.length * 72}px` }}
    >
      {timeSlots.map((slot) => (
        <div key={slot.time} className="relative w-72">
          <DesktopTimeLineContent
            isHalfHour={slot.isHalfHour}
            isCurrentTime={slot.isCurrentTime}
            isTestCurrentTime={slot.isTestCurrentTime}
            time={!slot.isHalfHour ? slot.time : undefined}
            reservation={slot.reservation}
          />
        </div>
      ))}
    </ul>
  );
}
