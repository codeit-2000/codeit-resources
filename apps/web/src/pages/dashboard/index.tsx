import { userAtom } from "@src/store/authUserAtom";
import { useAtomValue } from "jotai";

export default function Dashboard() {
  const user = useAtomValue(userAtom);

  return (
    <div>
      <h1>안녕하세요 {user?.username} 님!</h1>
    </div>
  );
}
