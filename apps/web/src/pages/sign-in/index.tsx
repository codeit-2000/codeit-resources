import CodeitTextLogo from "@repo/assets/images/codeit-resources.svg?react";
import CodeitLogo from "@repo/assets/images/codeit.svg?react";

import SignInForm from "./components/sign-in-form";

function SignIn() {
  return (
    <div className="mt-240 gap-33 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-24">
        <CodeitLogo width={78} height={78} />
        <CodeitTextLogo width={254} height={31} />
      </div>
      <SignInForm />
      {/** TODO: 비밀번호 찾기 기능 구현하기 */}
      <p className="text-14-400 cursor-pointer hover:underline">
        비밀번호 찾기
      </p>
    </div>
  );
}

export default SignIn;
