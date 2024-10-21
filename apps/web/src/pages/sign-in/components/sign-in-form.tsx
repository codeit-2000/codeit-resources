import Button from "@src/components/commons/Button";
import Input from "@src/components/commons/Input";

const SignInForm = () => {
  return (
    <form className="w-372 flex flex-col gap-24">
      <fieldset className="flex flex-col gap-16">
        <legend className="sr-only">로그인 정보</legend>
        <Input id="email" type="email" label="회사 메일" />
        <Input id="password" type="password" label="비밀번호" />
      </fieldset>
      <Button>로그인</Button>
    </form>
  );
};

export default SignInForm;
