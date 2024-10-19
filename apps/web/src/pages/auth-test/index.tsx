import { useState } from "react";
import type { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { signIn, signOut, signUp } from "aws-amplify/auth";
import Button from "@src/components/commons/Button";
import { autoAuthUser } from "@src/utils/autoAuthUser";

const client = generateClient<Schema>();

const AuthTestPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [name, setName] = useState("");

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

  // 회원가입
  const handleSignUp = async () => {
    try {
      const result = await signUp({
        username: newEmail,
        password: "Test12345!",
      });
      console.log("회원가입 성공!", result);

      autoAuthUser("MEMBER", newEmail);

      alert("회원가입 성공!");
      client.models.User.create({
        id: result.userId,
        username: name,
        email: newEmail,
        role: "ADMIN",
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
        <h2 className="text-20-700">멤버 추가 하기</h2>
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
        <span>비밀번호는 Test12345! 입니다.</span>
        <Button width="w-120" onClick={handleSignUp}>
          멤버추가
        </Button>
      </div>
    </div>
  );
};

export default AuthTestPage;
