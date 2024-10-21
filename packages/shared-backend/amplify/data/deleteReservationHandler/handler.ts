import { generateClient } from "aws-amplify/api";

import type { Schema } from "../resource";

const client = generateClient<Schema>();

const userID = "234";

export const handler: Schema["deleteReservation"]["functionHandler"] = async (
  event,
  context,
) => {
  console.log("이벤트", event);
  console.log("콘택스트", context);

  const { id } = event.arguments;

  // 1. 해당 예약 정보를 가져옴
  const { data: reservation } = await client.models.Reservation.get({
    id,
  });

  // 2. 참여자인지 확인
  const isParticipants =
    reservation &&
    reservation.participants &&
    reservation.participants.some(
      (participant) => (participant as string) === userID,
    );

  if (!isParticipants) {
    throw new Error("예약의 참여자만 수정/삭제가 가능합니다.");
  }

  // 3. 참여자면 업데이트
  const { data } = await client.models.Reservation.delete(event.arguments);

  return data;
};
