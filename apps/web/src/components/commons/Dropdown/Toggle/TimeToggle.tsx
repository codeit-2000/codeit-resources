import ArrowDown from "@repo/assets/icons/icon-arrow-down.svg?react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

// 시작 시간, 종료 시간 토글 드랍다운
export default function TimeToggle({
  label,
  isOpen,
  toggleDropdown,
  value,
  handleChange,
  isInput,
  isError = false,
  errorMessage = "",
}: {
  label: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  value: string;
  handleChange: (value: string) => void;
  isInput: boolean;
  isError?: boolean;
  errorMessage?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // isInput이 true일 때 input에 focus
    if (isInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInput]);

  return (
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className={clsx(
          "rounded-8 text-16 group relative flex w-full items-center justify-between px-20 py-14 text-left",
          "border",
          isError ? "border-[#D6173A]" : "border-gray-100-opacity-20",
          {
            "hover:border-purple-70": !isError,
          },
        )}
      >
        <span
          className={clsx(
            "text-13 left-15 absolute top-[-9px] bg-white px-4",
            isError
              ? "text-[#D6173A]"
              : "text-gray-100-opacity-80 group-hover:text-purple-70",
            {
              "text-purple-70": isOpen && !isError,
            },
          )}
        >
          {label}
        </span>
        <span
          className={clsx("text-16-400", {
            "text-gray-100-opacity-80 group-hover:text-gray-100": !isOpen,
            "text-gray-100": isOpen,
          })}
        >
          {isInput ? (
            <input
              ref={inputRef}
              className="h-full w-full focus:outline-none"
              type="text"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e.target.value)
              }
            />
          ) : (
            value || "시간을 입력해 주세요."
          )}
        </span>
        <ArrowDown
          className={clsx("ml-8", {
            "rotate-180": isOpen,
          })}
        />
      </button>
      {isError && errorMessage && (
        <p className="text-13 mt-2 text-[#D6173A]">{errorMessage}</p>
      )}
    </div>
  );
}
