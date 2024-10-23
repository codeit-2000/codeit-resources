import clsx from "clsx";

import { ThirtyMinutesTimeBoxProps } from "./TimeLinetypes";

type TimeTextProps = Pick<
  ThirtyMinutesTimeBoxProps,
  "isHalfHour" | "isCurrentTime" | "time" | "isTestCurrentTime"
>;

/* 상단 시간 텍스트 */
export function TimeText({
  isHalfHour,
  isCurrentTime,
  isTestCurrentTime, // 현재 시간 테스트용 prop
  time,
}: TimeTextProps) {
  return (
    <div className="md:w-72">
      {!isHalfHour && time && (
        <span
          className={clsx(
            "text-12-700 md:text-14-700 ml-[-14px] md:ml-[-17px]",
            {
              "text-gray-50": !isTestCurrentTime,
              "text-black": isTestCurrentTime,
            },
          )}
        >
          {time}
        </span>
      )}
    </div>
  );
}
