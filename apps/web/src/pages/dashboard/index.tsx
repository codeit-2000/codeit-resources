import useToast from "@src/hooks/useToast";

export default function Dashboard() {
  const { success, error } = useToast();

  const handleSuccessClick = () => {
    success("자리 예약 성공!");
  };

  const handleErrorClick = () => {
    error("자리 예약 실패!");
  };

  return (
    <div>
      <button type="button" className="bg-purple-70 text-white" onClick={handleSuccessClick}>
        토스트 띄우기
      </button>
      <button type="button" className="bg-blue-70 text-white" onClick={handleErrorClick}>
        에러 토스트 띄우기
      </button>
      <h1>This is Dashboard Page :)</h1>
    </div>
  );
}
