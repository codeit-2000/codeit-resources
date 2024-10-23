import CheckIcon from "@repo/assets/icons/icon-check.svg?react";
import {
  ORDER_OPTIONS,
  ROLE_OPTIONS,
} from "@repo/constants/constants/dropdownConstants";
import clsx from "clsx";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MeetingRoomToggle from "./Toggle/MeetingRoomToggle";
import OrderToggle from "./Toggle/OrderToggle";
import RoleToggle from "./Toggle/RoleToggle";
import TimeToggle from "./Toggle/TimeToggle";

interface DropdownContextType {
  // 드랍다운의 open 여부를 나타내는 Boolean 상태
  isOpen: boolean;
  // 현재 값
  value: string;
  // 드랍다운을 열고 닫는 토글 함수
  toggleDropdown: () => void;
  // 드랍다운을 닫는 함수
  closeDropdown: () => void;
  // 값을 변경하는 함수
  handleChange: (value: string) => void;
  // 드랍다운의 종류를 나타내는 값 (role: 권한, order: 정렬, meetingRoom: 회의실 선택)
  variant: "role" | "order" | "meetingRoom" | "startTime" | "endTime";
  // 시간 입력 시 input으로 입력 받을 지를 나타내는 값
  isInput: boolean;
  // 시간 입력 시 input으로 입력 받을 지를 나타내는 값을 변경하는 함수
  setIsInput: React.Dispatch<React.SetStateAction<boolean>>;
}

// 드롭다운 하위 컴포넌트들이 데이터를 전달 받기 위한 Context
const DropdownContext = createContext<DropdownContextType | null>(null);

const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      "useDropdownContext must be used within a DropdownProvider",
    );
  }
  return context;
};

interface DropdownProps {
  /** Dropdown 안에 들어가는 자식 컴포넌트들입니다. */
  children: React.ReactNode;
  /** 현재 선택된 값입니다. */
  value: string;
  /** Dropdown 값이 변경될 때 호출되는 함수입니다. */
  onChange: (value: string) => void;
  /** Dropdown의 타입을 지정합니다. role, order, meetingRoom, startTime, endTime 중 하나를 선택할 수 있습니다. */
  variant: "role" | "order" | "meetingRoom" | "startTime" | "endTime";
}

// 드랍다운 최상위 컴포넌트
export default function Dropdown({
  children,
  value,
  onChange,
  variant,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const handleChange = useCallback(
    (newValue: string) => {
      onChange(newValue);
      closeDropdown();
    },
    [onChange, closeDropdown],
  );

  const contextProviderValue = useMemo(
    () => ({
      isOpen,
      value,
      toggleDropdown,
      closeDropdown,
      handleChange,
      variant,
      isInput,
      setIsInput,
    }),
    [isOpen, value, variant, isInput],
  );

  // 드랍다운 외부를 클릭했을 때 드랍다운이 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  // ESC 키 누를 시 드랍다운이 닫힘
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDropdown]);

  return (
    // 하위 컴포넌트들이 데이터를 공급받기 위해 Provider로 감싸기
    <DropdownContext.Provider value={contextProviderValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// 드랍다운을 Open하는 Toggle
function Toggle({
  isError = false,
  errorMessage = "",
}: {
  isError?: boolean;
  errorMessage?: string;
}) {
  const { isOpen, toggleDropdown, value, handleChange, variant, isInput } =
    useDropdownContext();

  const renderText = () => {
    if (variant === "role") {
      return ROLE_OPTIONS[value as keyof typeof ROLE_OPTIONS] || value;
    }
    if (variant === "order") {
      return ORDER_OPTIONS[value as keyof typeof ORDER_OPTIONS] || value;
    }
    return value;
  };

  // variant에 따른 Toggle 렌더링
  const renderButtonContent = () => {
    switch (variant) {
      case "role":
        return (
          <RoleToggle
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            renderText={renderText}
          />
        );
      case "order":
        return (
          <OrderToggle
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            renderText={renderText}
          />
        );
      case "meetingRoom":
        return (
          <MeetingRoomToggle
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            renderText={renderText}
          />
        );
      case "startTime":
        return (
          <TimeToggle
            label="시작 시간"
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            value={value}
            handleChange={handleChange}
            isInput={isInput}
            isError={isError}
            errorMessage={errorMessage}
          />
        );
      case "endTime":
        return (
          <TimeToggle
            label="종료 시간"
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            value={value}
            handleChange={handleChange}
            isInput={isInput}
            isError={isError}
            errorMessage={errorMessage}
          />
        );
      default:
        return null;
    }
  };

  return renderButtonContent();
}

// 드랍다운 Item들을 감싸는 Wrapper
function Wrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, variant } = useDropdownContext();

  return isOpen ? (
    <div
      className={clsx(
        "bg-gray-5 rounded-8 border-gray-20 absolute z-50 mt-3 flex flex-col gap-3 border p-8",
        {
          "right-0 w-96": variant === "order",
          "w-full": variant !== "order",
        },
      )}
    >
      {children}
    </div>
  ) : null;
}

// 클릭 시 value가 변경되는 드랍다운 Item
function Item({ itemValue, label }: { itemValue: string; label?: string }) {
  const { handleChange, value, variant, setIsInput } = useDropdownContext();

  const isSelected = value === itemValue;

  const handleClick = () => {
    handleChange(itemValue);
    setIsInput(false);
  };

  return (
    <div
      className={clsx("rounded-8 text-15-500 px-12 py-6 text-center", {
        "bg-purple-opacity-10 text-purple-80": isSelected,
        "text-gray-100-opacity-80 hover:bg-purple-opacity-5 hover:text-purple-80":
          !isSelected,
        "flex items-center justify-between":
          variant === "meetingRoom" ||
          variant === "startTime" ||
          variant === "endTime",
      })}
      onClick={handleClick}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && handleChange(itemValue)
      }
      role="button"
      tabIndex={0}
    >
      {label || itemValue}
      {isSelected &&
      (variant === "meetingRoom" ||
        variant === "startTime" ||
        variant === "endTime") ? (
        <CheckIcon className="mb-2" />
      ) : null}
    </div>
  );
}

// 직접 입력 아이템: 클릭 시 토글이 input으로 바뀜
function ManualItem({ children }: { children: React.ReactNode }) {
  const { setIsInput, handleChange, value, isInput } = useDropdownContext();

  const handleClick = () => {
    handleChange("");
    setIsInput(true); // 직접 입력을 클릭하면 입력 모드로 전환
  };

  const isSelected = isInput && value === ""; // isInput이 true이고 value가 비어 있을 때 선택된 상태로 간주

  return (
    <button
      type="button"
      className={clsx(
        "rounded-8 text-15-500 text-gray-100-opacity-80 flex items-center justify-between px-12 py-6 text-left",
        {
          "bg-purple-opacity-10 text-purple-80": isSelected,
          "hover:bg-purple-opacity-5 hover:text-purple-80": !isSelected,
        },
      )}
      onClick={handleClick}
      tabIndex={0}
    >
      {children}
      {isSelected && <CheckIcon className="mb-2" />}
    </button>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
Dropdown.Item = Item;
Dropdown.ManualItem = ManualItem;
