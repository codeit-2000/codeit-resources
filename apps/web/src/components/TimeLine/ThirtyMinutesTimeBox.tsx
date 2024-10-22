import clsx from "clsx";

type TimeVerticalLineProps = Pick<
  ThirtyMinutesBoxProps,
  "isHalfHour" | "isCurrentTime"
>;

/* 세로 구분선 */
export function TimeVerticalLine({
  isHalfHour,
  isCurrentTime,
}: TimeVerticalLineProps) {
  return (
    <div
      className={clsx(
        "z-30 w-1",
        isHalfHour ? "h-12" : "h-55",
        isCurrentTime ? "w-1 bg-black" : "bg-gray-200",
      )}
    />
  );
}
/* 예약된 시간대 표시바 */
export function ReservationBar() {
  return <div className="top-21 bg-purple-70 absolute h-12 w-full" />;
}

/* 하단 점선 */
export function BottomDottedBar() {
  return (
    <div className="border-gray-15 relative bottom-6 w-full border-b border-dotted" />
  );
}

interface Reservation {
  startTime: string;
  endTime: string;
}

interface ThirtyMinutesBoxProps {
  isHalfHour?: boolean;
  isCurrentTime?: boolean;
  time?: string;
  reservation?: Reservation;
}

function ThirtyMinutesTimeBox({
  isHalfHour = false,
  isCurrentTime = false,
  time,
  reservation,
}: ThirtyMinutesBoxProps) {
  return (
    <li className="flex w-48 flex-col justify-end gap-40">
      {/* 시간 */}
      <div className="h-8">
        {!isHalfHour && time && (
          <span
            className={clsx("text-12-700 -ml-14", {
              "text-gray-50": !isCurrentTime,
              "text-black": isCurrentTime,
            })}
          >
            {time}
          </span>
        )}
      </div>

      {/* 세로 구분선과 점선을 포함하는 30분 단위 박스 */}
      <div className="h-55 hover:w-49 relative flex w-48 flex-col justify-end hover:border hover:border-[#e0c8fa] hover:bg-[#ede2f9]">
        {reservation && <ReservationBar />}
        <TimeVerticalLine
          isHalfHour={isHalfHour}
          isCurrentTime={isCurrentTime}
        />
        <BottomDottedBar />
      </div>
    </li>
  );
}

export default ThirtyMinutesTimeBox;
