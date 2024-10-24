import Button from "@src/components/commons/Button";
import { Link } from "react-router-dom";

const MAP = {
  ROOM: {
    desc: "오늘 예정된 미팅이 없어요.",
    buttonText: "미팅 잡기",
    to: "/meeting-rooms",
  },
  SEAT: {
    desc: "오늘 예약된 좌석이 없어요.",
    buttonText: "좌석 예약하기",
    to: "/seats",
  },
  EQUIPMENT: {
    desc: "대여 예정인 장비가 없어요.",
    buttonText: "장비 대여 신청하기",
    to: "/equipments",
  },
};

function EmptyReservation({
  resourceType,
}: {
  resourceType: "ROOM" | "SEAT" | "EQUIPMENT";
}) {
  return (
    <div className="h-160 rounded-16 bg-gray-15 flex w-full flex-col items-center justify-center gap-16">
      <p className="text-18-400 text-gray-100-opacity-80">
        {MAP[resourceType].desc}
      </p>
      <Link to={MAP[resourceType].to}>
        <Button variant="secondary">{MAP[resourceType].buttonText}</Button>
      </Link>
    </div>
  );
}

export default EmptyReservation;
