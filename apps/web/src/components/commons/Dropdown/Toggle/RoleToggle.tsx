import ArrowDown from "@repo/assets/icons/icon-arrow-down.svg?react";
import clsx from "clsx";

// 권한 드랍다운 토글
export default function RoleToggle({
  isOpen,
  toggleDropdown,
  renderText,
}: {
  isOpen: boolean;
  toggleDropdown: () => void;
  renderText: () => string;
}) {
  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className={clsx(
        "border-gray-100-opacity-20 rounded-8 text-16-400 hover:border-purple-70 flex h-40 w-96 items-center justify-between border px-16 py-7 hover:text-gray-100",
        {
          "border-purple-70 text-gray-100": isOpen,
          "text-gray-100-opacity-60": !isOpen,
        },
      )}
    >
      <span>{renderText()}</span>
      <ArrowDown
        className={clsx({
          "rotate-180": isOpen,
        })}
      />
    </button>
  );
}
