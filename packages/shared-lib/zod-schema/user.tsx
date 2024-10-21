import { z } from "zod";

// 비밀번호 유효성 정규식
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~^$*\s]/;
const lowercaseRegex = /[a-z]/;
const digitRegex = /\d/;

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
    .refine((password) => lowercaseRegex.test(password), {
      message: "비밀번호는 최소 1개 이상의 소문자를 포함해야 합니다.",
    })
    .refine((password) => digitRegex.test(password), {
      message: "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다.",
    })
    .refine((password) => specialCharRegex.test(password), {
      message: "비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다.",
    }),
});

export { loginSchema };
