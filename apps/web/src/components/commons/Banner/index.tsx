import BannerIcon from "@repo/assets/icons/icon-modal-alert.svg?react";
import clsx from "clsx";
import { ReactNode } from "react";

import Button from "../Button";

interface RadioGroupProps {
  /** 그룹 전체에 추가적인 CSS 클래스를 적용합니다. */
  className?: string;
  /** 그룹에 포함될 라디오 항목들을 나타냅니다. */
  children: ReactNode;
}

/**
 * RadioGroup 컴포넌트
 * 여러 라디오 버튼으로 구성된 그룹을 나타내며, 하나의 옵션만 선택할 수 있도록 합니다.
 */
function Banner() {
  return (
    <div className="flex w-screen items-center bg-purple-100 px-24 py-16">
      <BannerIcon className="h-20 w-20" />
      <span className="text-gray-0 text-14-500 ml-8">
        Codeit Resource를 모바일 환경에서 사용하고 싶다면, 앱을 다운받아 이용해
        주세요.
      </span>
      <div className="ml-auto">
        <Button
          variant="secondary"
          size="modal"
          style={{ border: "1px solid white", color: "white" }}
        >
          앱 다운로드
        </Button>
      </div>
    </div>
  );
}

export default Banner;

// className="bg-gray-0"
