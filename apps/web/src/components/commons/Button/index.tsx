import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// 아래처럼 주석 달면, 스토리북에도 반영이 됩니다.
interface ButtonProps extends ComponentProps<"button"> {
  /** 버튼의 내용을 지정합니다. */
  children: ReactNode;
  /** 버튼 태그의 type 속성을 지정합니다. */
  type?: "button" | "submit" | "reset";
  /** 버튼 스타일의 타입을 나타냅니다. */
  variant?: "primary" | "secondary";
  /** 버튼의 너비를 지정합니다. (ex: w-100) 지정하지 않으면 100%로 설정됩니다. */
  width?: string;
  /** 버튼의 높이를 지정합니다. (ex: h-100) 지정하지 않으면 100%로 설정됩니다. */
  height?: string;
  /** 버튼 비활성화 여부를 지정합니다. */
  disabled?: boolean;
}

const Button = ({
  children,
  type = "button",
  variant = "primary",
  width = "w-full",
  height = "h-full",
  disabled = false,
  ...buttonProps
}: ButtonProps) => {
  const buttonStyle = twMerge(
    clsx(
      "rounded-8 text-16-500 px-24 py-8 transition-all", // 기본 스타일
      width, // 너비 관련 클래스
      height, // 높이 관련 클래스
      {
        "bg-purple-70 text-gray-0 hover:bg-[#7200CC]": variant === "primary",
        "bg-gray-00-opacity-40 text-gray-100-opacity-80 border-gray-100-opacity-20 border hover:bg-gray-100-opacity-20 hover:text-[#333236]":
          variant === "secondary",
      },
      // disabled 스타일을 마지막에 적용
      disabled &&
        "bg-gray-100-opacity-10 text-gray-100-opacity-30 pointer-events-none border-none",
    ),
  );

  return (
    <button
      className={buttonStyle}
      style={{ width, height }}
      type={type}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
