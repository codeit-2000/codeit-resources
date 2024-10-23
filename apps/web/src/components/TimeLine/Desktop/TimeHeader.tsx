import { createTimeSlots } from "@src/utils/createTime";

import { TimeText } from "../TimeText";

export function TimeHeader() {
  const testCurrentTime = "10:00";
  const timeSlots = createTimeSlots();

  return (
    <ul
      className="pb-19 flex items-center"
      style={{ width: `${timeSlots.length * 72}px` }}
    >
      {timeSlots.map((slot) => (
        <TimeText
          isHalfHour={slot.isHalfHour}
          isCurrentTime={false}
          isTestCurrentTime={slot.time === testCurrentTime}
          time={!slot.isHalfHour ? slot.time : undefined}
        />
      ))}
    </ul>
  );
}
