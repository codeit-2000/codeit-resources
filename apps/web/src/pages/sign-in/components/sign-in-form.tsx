/* eslint-disable no-alert */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "@repo/assets/gifs/loading-spinner.svg?react";
import { loginSchema } from "@repo/lib/zod-schema/user";
import Button from "@src/components/commons/Button";
import Input from "@src/components/commons/Input";
import { AuthError, signIn } from "aws-amplify/auth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignInInput = {
  email: string;
  password: string;
};

function SignInForm() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    setIsLoading(true);
    try {
      await signIn({
        username: data.email,
        password: data.password,
      });

      navigate("/dashboard");
    } catch (error: any) {
      if (error instanceof AuthError) {
        switch (error.name) {
          case "NotAuthorizedException":
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
            break;
          case "UserNotFoundException":
            alert("해당 사용자를 찾을 수 없습니다.");
            break;
          case "UserNotConfirmedException":
            alert("이메일 인증이 완료되지 않았습니다.");
            break;
          case "PasswordResetRequiredException":
            alert("비밀번호를 재설정해야 합니다.");
            break;
          case "TooManyFailedAttemptsException":
            alert(
              "로그인 시도가 너무 많아 계정이 잠겼습니다. 잠시 후 다시 시도해주세요.",
            );
            break;
          case "LimitExceededException":
            alert("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
            break;
          default:
            alert("로그인 중 알 수 없는 오류가 발생했습니다.");
            break;
        }
      } else {
        alert("로그인 중 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-372 flex w-full flex-col gap-24"
    >
      <fieldset className="flex flex-col gap-16">
        <legend className="sr-only">로그인 정보</legend>
        <Input
          register={register("email")}
          id="email"
          type="email"
          label="회사 메일"
          errorMessage={errors.email?.message}
        />
        <Input
          register={register("password")}
          id="password"
          type="password"
          label="비밀번호"
          errorMessage={errors.password?.message}
          autoComplete="current-password"
        />
      </fieldset>
      <Button type="submit" disabled={!isValid}>
        {isLoading ? <LoadingSpinner height={27} width="100%" /> : "로그인"}
      </Button>
    </form>
  );
}

export default SignInForm;
