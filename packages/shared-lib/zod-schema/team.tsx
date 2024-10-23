import { z } from "zod";

const addTeamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "팀 이름은 필수값 입니다." })
    .max(15, { message: "팀 이름은 최대 15글자까지만 가능합니다." }),
});

export { addTeamSchema };
