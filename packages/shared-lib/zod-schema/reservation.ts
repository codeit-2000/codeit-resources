import { z } from "zod";

import { isEndTimeAfterStartTime } from "../utils/timeUtils";

// TODO 에러메세지 수정
const reservationSchema = z
  .object({
    title: z.string().min(1, "미팅 제목을 입력해주세요"),
    resourceId: z.string().min(1, "선택해주세요"),
    startTime: z
      .string()
      .min(1, "시작 시간은 필수 입력입니다.")
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "유효한 시간 형식이어야 합니다 (HH:MM)",
      ),

    endTime: z
      .string()
      .min(1, "종료 시간은 필수 입력입니다.")
      .regex(
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "유효한 시간 형식이어야 합니다 (HH:MM)",
      ),

    // TODO 스키마 수정
    // participants: z
    //   .array(z.string())
    //   .min(1, "참여자는 최소 1명 이상이어야 합니다.")
    //   .max(10, "참여자는 최대 10명까지 가능합니다."),
  })
  .refine(
    (data) => {
      const { startTime, endTime } = data;

      if (startTime && endTime) {
        return isEndTimeAfterStartTime(startTime, endTime);
      }
      return true;
    },
    {
      message: "종료 시간은 시작 시간보다 늦어야 합니다.",
      path: ["startTime", "endTime"],
    },
  );

export { reservationSchema };
