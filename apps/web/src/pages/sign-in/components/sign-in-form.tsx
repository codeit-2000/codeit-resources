import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@repo/lib/zod-schema/user";
import Button from "@src/components/commons/Button";
import Input from "@src/components/commons/Input";
import { SubmitHandler, useForm } from "react-hook-form";

type SignInInput = {
  email: string;
  password: string;
};

function SignInForm() {
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
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-372 flex flex-col gap-24"
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
        />
      </fieldset>
      <Button type="submit" disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
}

export default SignInForm;
