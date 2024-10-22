import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일은 필수 입력입니다.")
    .email("이메일 형식으로 작성해 주세요."),
  // .refine((email) => email.endsWith("@codeit.kr"), {
  //   message: "이메일 도메인은 @codeit.kr 이어야 합니다.",
  // }),
  password: z
    .string()
    .min(1, "비밀번호는 필수 입력입니다.")
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~^$*\s]/,
      "비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다.",
    )
    .regex(/[a-z]/, "비밀번호는 최소 1개 이상의 소문자를 포함해야 합니다.")
    .regex(/\d/, "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다."),
});

export { loginSchema };
