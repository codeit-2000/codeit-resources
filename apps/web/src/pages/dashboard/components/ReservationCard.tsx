import type { Schema } from "@repo/backend/amplify/data/resource";
import Badge from "@src/components/commons/Badge";
import Button from "@src/components/commons/Button";

type Reservation = Schema["Reservation"]["type"];

function ReservationCard({ reservation }: { reservation: Reservation }) {
  if (!reservation?.startTime)
    return (
      // 좌석인 경우, 시간이 없음
      <div className="w-275 h-172">
        <h3>{reservation?.resource.name}</h3>
        <p>{reservation?.date}</p>
      </div>
    );

  return (
    <div className="w-275 h-172 border-gray-100-opacity-10 rounded-8 relative border-[1px] p-32">
      {/* 진행중이면 
          
        */}
      <div className="absolute right-8 top-4">
        <Badge variant="primary">진행 중</Badge>
      </div>
      <h3 className="text-20-700 text-gray-100-opacity-80 mb-8">
        {reservation?.title}
      </h3>
      <p className="text-14-500 text-gray-100-opacity-80 mb-12">
        {reservation?.startTime} ~ {reservation?.endTime}
      </p>
      <Badge variant="secondary">
        {reservation?.resource.name || "녹음실 1"}
      </Badge>
      <div className="absolute bottom-16 right-16">
        <Button size="small" variant="secondary">
          회의 종료
        </Button>
      </div>
    </div>
  );
}

export default ReservationCard;
