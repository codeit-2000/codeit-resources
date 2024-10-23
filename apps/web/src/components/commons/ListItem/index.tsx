import HamBurger from "@repo/assets/icons/icon-hamburger.svg?react";
import clsx from "clsx";
import { ReactNode } from "react";

import Right from "./components/Right";
import Title from "./components/title";

interface ListItemProps {
  children: ReactNode;
  /** 햄버거 아이콘과 글자 사이의 간격입니다 */
  gap?: string;
  /** 수정 모드 여부 입니다. */
  isEditMode?: boolean;
  /** 테마입니다. */
  variant?: "primary" | "secondary";
  /** 높이입니다. */
  height?: string;
}
/**
 * TODO: 테두리 색상 넣기
 */
function ListItem({
  children,
  gap = "gap-32",
  isEditMode = false,
  variant = "primary",
  height = "h-72",
}: ListItemProps) {
  return (
    <div
      className={clsx(
        "rounded-12 flex items-center border px-24 duration-300",
        gap,
        height,
        {
          "bg-gray-10": variant === "secondary",
        },
        {
          "border-gray-70 duration-300": isEditMode,
        },
      )}
    >
      <HamBurger />
      <div className="flex w-full items-center justify-between">{children}</div>
    </div>
  );
}

ListItem.Title = Title;
ListItem.Right = Right;

export default ListItem;
