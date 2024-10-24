import Codeit from "@repo/assets/images/codeit-inactive.svg?react";

function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-center">
      <Codeit className="w-78 h-78" />
      <h1 className="text-38-700 my-40 mb-8">
        해당 페이지가 없거나 접근할 수 없어요
      </h1>
      <p className="text-16-400">입력하신 주소가 맞는지 다시 확인 주세요</p>
    </div>
  );
}

export default NotFoundPage;
