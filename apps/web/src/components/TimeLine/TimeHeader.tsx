import { createTimeSlots } from "@src/utils/createTime";

import { TimeText } from "./TimeText";

export function TimeHeader() {
  const testCurrentTime = "10:00";
  const timeSlots = createTimeSlots();

  return (
    <ul
      className="pl-30 pb-19 flex"
      style={{ width: `${timeSlots.length * 72}px` }}
    >
      {timeSlots.map((slot) => (
        <div key={slot.time} className="relative flex w-72 justify-start">
          <TimeText
            isHalfHour={slot.isHalfHour}
            isCurrentTime={false}
            isTestCurrentTime={slot.time === testCurrentTime}
            time={!slot.isHalfHour ? slot.time : undefined}
          />
        </div>
      ))}
    </ul>
  );
}
