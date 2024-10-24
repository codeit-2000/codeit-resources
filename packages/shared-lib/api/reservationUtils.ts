import { convertTimeToMinutes } from "../utils/timeUtils";
import {
  getReservationById,
  getReservationListByResourceId,
} from "./reservation";
import { Reservation } from "./utils";

export interface CheckParticipantData {
  reservationId: string;
  userId: string;
}

/**
 * 예약 데이터의 참여자 목록에 특정 유저가 있는지 확인합니다.
 *
 * @param {CheckParticipantData} data - 확인할 예약 데이터입니다. 예약 ID와 확인할 유저 ID를 포함합니다.
 * @param {string} data.reservationId - 확인할 예약의 ID입니다.
 * @param {string} data.userId - 확인할 유저의 ID입니다.
 * @returns {Promise<boolean>} - 예약을 찾을 수 없거나, 유저가 예약의 참여자가 아닐 경우 false를 반환합니다.
 */
export const checkParticipant = async (
  data: CheckParticipantData,
): Promise<boolean> => {
  const { reservationId, userId } = data;

  // 동일한 날짜에 대한 모든 예약을 가져옵니다.
  const { data: reservationToCheck } = await getReservationById(reservationId);

  if (!reservationToCheck) {
    throw new Error("에약을 찾을 수 없습니다.");
  }

  const isParticipant = reservationToCheck.participants?.includes(userId);

  if (!isParticipant) {
    return false;
  }

  return true;
};

export type ReservationCheckData = Pick<
  Reservation,
  "resourceId" | "date" | "startTime" | "endTime"
>;

/**
 * 새로운 예약이 기존 예약과 충돌하는지 확인합니다.
 *
 * @param reservationData - 충돌을 확인할 예약 데이터입니다.
 * @returns {Promise<boolean>} - 예약이 기존 예약과 충돌할 경우 false를 반환합니다.
 */
export const checkReservationConflict = async (
  reservationData: ReservationCheckData & { id?: string },
): Promise<boolean> => {
  const { resourceId, date, startTime, endTime } = reservationData;

  // 동일한 리소스 및 날짜에 대한 기존 예약을 가져옵니다.
  const { data: existingReservations } = await getReservationListByResourceId(
    resourceId,
    {
      date: { eq: date },
    },
  );

  // 새로운 예약 시간대를 분 단위로 변환합니다.
  const newStart = convertTimeToMinutes(startTime);
  const newEnd = convertTimeToMinutes(endTime);

  if (newStart === null || newEnd === null) {
    throw new Error("유효한 시간 형식을 입력해주세요 (HH:MM).");
  }

  if (newStart >= newEnd) {
    throw new Error("종료 시간은 시작 시간보다 늦어야 합니다.");
  }

  // 충돌 여부를 확인합니다.
  const isConflict = (existingReservations || []).some(
    (reservation: Reservation) => {
      if (!reservation) return false;

      const existingStart = convertTimeToMinutes(reservation.startTime);
      const existingEnd = convertTimeToMinutes(reservation.endTime);

      if (
        existingStart === null ||
        existingEnd === null ||
        reservationData?.id === reservation.id
      ) {
        return false; // 시간대가 유효하지 않거나 동일한 예약은 건너뜁니다.
      }

      // 시간대가 겹치는 조건
      return newStart < existingEnd && newEnd > existingStart;
    },
  );

  if (isConflict) {
    return false;
  }

  return true;
};
