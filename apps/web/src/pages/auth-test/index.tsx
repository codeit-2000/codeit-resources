import { useState } from "react";
import type { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { signIn, signOut, signUp, confirmSignUp } from "aws-amplify/auth";
import Button from "@src/components/commons/Button";

const client = generateClient<Schema>();

const AuthTestPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // 로그인
  const handleLogin = async () => {
    try {
      const user = await signIn({ username: email, password });
      console.log("로그인 성공", user);
      alert("로그인 성공");
    } catch (error: any) {
      console.error("로그인 실패", error);
      alert("로그인 실패" + error.message);
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    try {
      await signOut();
      alert("로그아웃 성공");
    } catch (error) {
      console.error("로그아웃 실패", error);
      alert("로그아웃 실패" + error);
    }
  };

  // 이메일 인증
  const handleConfirm = async () => {
    try {
      await confirmSignUp({
        username: newEmail,
        confirmationCode: code,
      });
      alert("인증 성공");
    } catch (error) {
      console.error("인증 실패", error);
      alert("인증 실패");
    }
  };

  // 회원가입
  const handleSignUp = async () => {
    try {
      const result = await signUp({
        username: newEmail,
        password: newPassword,
      });
      console.log("회원가입 성공! 이메일 인증해주세요", result);
      alert("회원가입 성공! 이메일 인증 해주세요");
      client.models.User.create({
        id: result.userId,
        username: name,
        email: email,
        role: "MEMBER",
        team: "개발팀",
      });
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="gap-30 flex flex-col">
      <div>
        <h2 className="text-20-700">로그인 하기</h2>
        <input
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button width="w-100" onClick={handleLogin}>
          로그인
        </Button>
        <Button width="w-120" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
      <div>
        <h2 className="text-20-700">회원가입 하기</h2>
        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="이메일"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          placeholder="비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button width="w-120" onClick={handleSignUp}>
          회원가입
        </Button>
      </div>
      <div>
        <h2 className="text-20-700">인증코드 입력</h2>
        <input
          placeholder="인증코드"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button width="w-100" onClick={handleConfirm}>
          인증
        </Button>
      </div>
    </div>
  );
};

export default AuthTestPage;
