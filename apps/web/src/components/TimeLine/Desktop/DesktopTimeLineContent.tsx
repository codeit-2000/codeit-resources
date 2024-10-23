import clsx from "clsx";

import { ThirtyMinutesTimeBoxProps } from "../TimeLinetypes";
import { DesktopTimeVerticalLine } from "./DesktopTimeVerticalLine";

/* 30분 단위 짧은 세로 구분선 */
function TimeVerticalShortLine({
  isTestCurrentTime,
}: {
  isTestCurrentTime: boolean | undefined;
}) {
  return (
    <div
      className={clsx(
        "absolute bottom-14 h-12 w-1",
        isTestCurrentTime ? "h-full bg-black" : "bg-gray-200",
      )}
    />
  );
}

/* 예약된 시간 표시 바 */
export function ReservationBar() {
  return <div className="bg-purple-70 absolute bottom-32 h-12 w-full" />;
}

/* 하단 점선 */
export function BottomDottedBar() {
  return (
    <div className="border-gray-15 absolute bottom-20 w-full border-b border-dotted" />
  );
}

function DesktopTimeLineContent({
  isHalfHour = false,
  isCurrentTime = false,
  isTestCurrentTime = false,
  time,
  reservation,
}: ThirtyMinutesTimeBoxProps) {
  const is24Hour = time === "24:00";

  return (
    <li
      className={clsx(
        "h-75 relative w-72",
        // 맨 뒤에 24:00시 이후 박스에는 호버 방지
        !is24Hour &&
          "cursor-pointer hover:bg-[#ede2f9] hover:shadow-[inset_0_0_0_1px_#e0c8fa]",
      )}
    >
      {!isHalfHour && (
        <div className="absolute left-0 top-0 h-full">
          <DesktopTimeVerticalLine isTestCurrentTime={isTestCurrentTime} />
        </div>
      )}
      <div>
        {isHalfHour && (
          <TimeVerticalShortLine isTestCurrentTime={isTestCurrentTime} />
        )}
        {!is24Hour && <BottomDottedBar />}
      </div>
      {reservation && <ReservationBar />}
    </li>
  );
}

export default DesktopTimeLineContent;
