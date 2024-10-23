import useIsMobile from "@src/hooks/useIsMobile";
import clsx from "clsx";

import { ThirtyMinutesTimeBoxProps } from "../TimeLinetypes";
import { TimeText } from "../TimeText";

type TimeVerticalLineProps = Pick<
  ThirtyMinutesTimeBoxProps,
  "isHalfHour" | "isCurrentTime" | "isTestCurrentTime"
>;

/* 세로 구분선 */
export function TimeVerticalLine({
  isHalfHour,
  isCurrentTime,
  isTestCurrentTime,
}: TimeVerticalLineProps) {
  return (
    <div
      className={clsx(
        "z-10 w-1",
        isHalfHour ? "h-12" : "h-55",
        isTestCurrentTime ? "w-1 bg-black" : "bg-gray-200",
      )}
    />
  );
}

/* 예약된 시간 표시 바 */
export function ReservationBar() {
  return <div className="top-21 bg-purple-70 absolute h-12 w-full" />;
}

/* 하단 점선 */
export function BottomDottedBar() {
  return (
    <div className="border-gray-15 relative bottom-6 w-full border-b border-dotted" />
  );
}

function ThirtyMinutesTimeBox({
  isHalfHour = false,
  isCurrentTime = false,
  isTestCurrentTime = false,
  time,
  reservation,
}: ThirtyMinutesTimeBoxProps) {
  const isMobile = useIsMobile();
  const is24Hour = time === "24:00";

  return (
    <li className="flex w-48 flex-col justify-end gap-40">
      {/* 상단 시간 텍스트 */}
      {isMobile && (
        <TimeText
          isHalfHour={isHalfHour}
          isCurrentTime={isCurrentTime}
          isTestCurrentTime={isTestCurrentTime}
          time={time}
        />
      )}
      {/* 세로 구분선과 점선을 포함하는 30분 단위 박스 */}
      <div className="h-55 relative flex w-48 flex-col justify-end">
        {/* 24:00이 아닐 때만 호버 효과 적용 */}
        {!is24Hour && (
          <div className="absolute inset-0 left-1 cursor-pointer hover:bg-[#ede2f9] hover:shadow-[inset_0_0_0_1px_#e0c8fa]">
            {reservation && <ReservationBar />}
          </div>
        )}
        <TimeVerticalLine
          isHalfHour={isHalfHour}
          isCurrentTime={isCurrentTime}
          isTestCurrentTime={isTestCurrentTime}
        />
        {/* 24:00이 아닐 때만 점선 표시 */}
        {!is24Hour && <BottomDottedBar />}
      </div>
    </li>
  );
}

export default ThirtyMinutesTimeBox;
