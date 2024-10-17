import { ComponentProps, ReactNode } from "react";

interface BadgeProps extends ComponentProps<"span"> {
  /** 뱃지의 내용을 지정합니다. */
  children: ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="bg-pink-60 rounded-8 text-10 text-gray-0 h-15 iline-block px-4 pb-1 pt-2 font-medium">
      {children}
    </span>
  );
};

export default Badge;
