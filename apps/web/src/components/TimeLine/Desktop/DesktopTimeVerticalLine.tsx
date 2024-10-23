import clsx from "clsx";

import { ThirtyMinutesTimeBoxProps } from "../TimeLinetypes";

type TimeVerticalLineProps = Pick<
  ThirtyMinutesTimeBoxProps,
  "isHalfHour" | "isCurrentTime" | "isTestCurrentTime"
>;

/* 세로 구분선 */
export function DesktopTimeVerticalLine({
  isTestCurrentTime,
}: TimeVerticalLineProps) {
  return (
    <div
      className={clsx(
        "z-10 h-full w-1",
        isTestCurrentTime ? "bg-black" : "bg-gray-200",
      )}
    />
  );
}
