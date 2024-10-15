import { ComponentProps, ReactNode } from "react";

// 아래처럼 주석 달면, 스토리북에도 반영이 됩니다.
interface ButtonProps extends ComponentProps<"button"> {
  /** 버튼의 내용을 지정합니다. */
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => (
  <button className="bg-red-300 p-2" type="button" {...props}>
    {children}
  </button>
);

export default Button;
