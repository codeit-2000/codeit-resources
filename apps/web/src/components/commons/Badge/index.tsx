import { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps extends ComponentProps<"span"> {
  /** 뱃지의 내용을 지정합니다. */
  children: ReactNode;
  /** 뱃지의 모양을 지정합니다. */
  variant: "primary" | "secondary";
}

const Badge = ({ children, variant = "primary" }: BadgeProps) => {
  const badgeStyle = clsx({
    "bg-pink-60 rounded-8 text-10-500 text-gray-0 px-4 pt-1 inline-block":
      variant === "primary",
    "rounded-32 border-gray-100-opacity-5 text-15-700 border bg-purple-5 px-12 py-6 text-purple-50":
      variant === "secondary",
  });

  return <span className={badgeStyle}>{children}</span>;
};

export default Badge;
