import { generateClient } from "aws-amplify/api";

import type { Schema } from "../../data/resource";

const client = generateClient<Schema>();

export const handler: Schema["createConfirmedReservation"]["functionHandler"] =
  async (event) => {
    const { resourceId, startTime, endTime } = event.arguments;

    // 입력값 검증
    if (!startTime || !endTime || new Date(startTime) >= new Date(endTime)) {
      throw new Error("유효한 시작 시간과 종료 시간을 입력해주세요.");
    }

    // 1. 예약이 겹치는지 확인하는 쿼리
    const { data: existingReservations } =
      await client.models.Reservation.listByResource({
        resourceId: resourceId,
        date: {
          eq: new Date().toISOString().split("T")[0],
        },
      });

    // 2. 충돌하는 예약이 있는지 확인
    const isConflict = (existingReservations || []).some((reservation) => {
      return (
        reservation &&
        new Date(startTime) < new Date(reservation.endTime) &&
        new Date(endTime) > new Date(reservation.startTime)
      );
    });

    if (isConflict) {
      throw new Error("해당 시간에 이미 예약이 있습니다.");
    }

    // 3. 충돌이 없으면 예약 생성
    const { data } = await client.models.Reservation.create({
      ...event.arguments,
      status: "CONFIRMED",
    });

    return data;
  };
