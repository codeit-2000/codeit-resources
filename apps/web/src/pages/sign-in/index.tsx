import CodeitTextLogo from "@repo/assets/images/codeit-resources.svg?react";
import CodeitLogo from "@repo/assets/images/codeit.svg?react";
import { authAtom } from "@src/store/authUserAtom";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SignInForm from "./components/SignInForm";

function SignIn() {
  const isAuthenticated = useAtomValue(authAtom);

  const navigate = useNavigate();

  useEffect(() => {
    // 인증된 경우 dashboard 페이지로 리다이렉트
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="mt-240 gap-33 flex flex-col items-center justify-center px-8">
      <div className="flex flex-col items-center gap-24">
        <CodeitLogo width={78} height={78} aria-label="Codeit 로고" />
        <CodeitTextLogo
          width={254}
          height={31}
          aria-label="Codeit 텍스트 로고"
        />
      </div>
      <SignInForm />
      {/** TODO: 비밀번호 찾기 기능 구현하기 */}
      <p className="text-14-400 text-gray-80 cursor-pointer hover:text-gray-100">
        비밀번호 찾기
      </p>
    </div>
  );
}

export default SignIn;
