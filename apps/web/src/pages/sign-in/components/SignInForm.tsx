import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "@repo/assets/gifs/loading-spinner.svg?react";
import { LOGIN_ERROR_MESSAGES } from "@repo/constants/error-message/user";
import { loginSchema } from "@repo/lib/zod-schema/user";
import Button from "@src/components/commons/Button";
import Input from "@src/components/commons/Input";
import useToast from "@src/hooks/useToast";
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
  const { success, error } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    setIsLoading(true);
    try {
      await signIn({
        username: data.email,
        password: data.password,
      });
      success("로그인 되었습니다.");
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof AuthError) {
        const errorMessage =
          LOGIN_ERROR_MESSAGES[err.name] || LOGIN_ERROR_MESSAGES.UnknownError;

        error(errorMessage);

        if (err.name === "UserAlreadyAuthenticatedException") {
          navigate("/dashboard");
        }
      } else {
        error(LOGIN_ERROR_MESSAGES.UnknownError);
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
      <Button type="submit" disabled={!isValid || isLoading}>
        {isLoading ? <LoadingSpinner height={27} width="100%" /> : "로그인"}
      </Button>
    </form>
  );
}

export default SignInForm;
