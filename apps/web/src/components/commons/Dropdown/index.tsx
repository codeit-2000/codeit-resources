import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import clsx from "clsx";
import ArrowDown from "@repo/assets/icons/icon-arrow-down.svg?react";
import OrderIcon from "@repo/assets/icons/icon-order.svg?react";
import CheckIcon from "@repo/assets/icons/icon-check.svg?react";

interface DropdownContextType {
  // 드랍다운의 open 여부를 나타내는 Boolean 상태
  isOpen: boolean;
  // 현재 선택된 값
  selectedValue: string;
  // 드랍다운을 열고 닫는 토글 함수
  toggleDropdown: () => void;
  // 드랍다운을 닫는 함수
  closeDropdown: () => void;
  // 선택된 값으로 값을 변경하는 함수
  selectItem: (value: string) => void;
  // 드랍다운의 종류를 나타내는 값 (role: 권한, order: 정렬, meetingRoom: 회의실 선택)
  variant: "role" | "order" | "meetingRoom";
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

// 드랍다운 최상위 컴포넌트
export default function Dropdown({
  children,
  selectedValue,
  onSelect,
  variant,
}: {
  children: React.ReactNode;
  selectedValue: string;
  onSelect: (value: string) => void;
  variant: "role" | "order" | "meetingRoom";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const selectItem = useCallback(
    (value: string) => {
      onSelect(value);
      closeDropdown();
    },
    [onSelect, closeDropdown],
  );

  const contextProviderValue = useMemo(
    () => ({
      isOpen,
      selectedValue,
      toggleDropdown,
      closeDropdown,
      selectItem,
      variant,
    }),
    [isOpen, selectedValue, toggleDropdown, closeDropdown, selectItem, variant],
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

function RoleToggle({
  isOpen,
  toggleDropdown,
  renderText,
}: {
  isOpen: boolean;
  toggleDropdown: () => void;
  renderText: () => string | React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className={clsx(
        "border-gray-100-opacity-20 rounded-8 text-16-400 hover:border-purple-70 h-40 w-96 border px-16 py-7 hover:text-gray-100",
        {
          "border-purple-70 text-gray-100": isOpen,
          "text-gray-100-opacity-60": !isOpen,
        },
      )}
    >
      <div className="flex items-center justify-between">
        <span>{renderText()}</span>
        <ArrowDown
          className={clsx({
            "rotate-180": isOpen,
          })}
        />
      </div>
    </button>
  );
}

function OrderToggle({
  isOpen,
  toggleDropdown,
  renderText,
}: {
  isOpen: boolean;
  toggleDropdown: () => void;
  renderText: () => string | React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className={`rounded-8 hover:bg-gray-15 px-6 py-4 ${isOpen && "bg-gray-15"}`}
    >
      <div className="flex items-center">
        <OrderIcon />
        <span className="text-12-500 text-gray-100-opacity-60 ml-3">
          {renderText()}
        </span>
      </div>
    </button>
  );
}

function MeetingRoomToggle({
  isOpen,
  toggleDropdown,
  renderText,
}: {
  isOpen: boolean;
  toggleDropdown: () => void;
  renderText: () => string | React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className={clsx(
        "border-gray-100-opacity-20 rounded-8 text-16 hover:border-purple-70 group relative w-full border px-20 py-14 text-left",
        {
          "border-purple-70": isOpen,
        },
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={clsx(
            "text-13 text-gray-100-opacity-80 group-hover:text-purple-70 absolute top-[-9px] bg-white px-4",
            {
              "text-purple-70": isOpen,
            },
          )}
        >
          회의실
        </span>
        <span
          className={clsx("text-16-400", {
            "text-gray-100-opacity-80 group-hover:text-gray-100": !isOpen,
            "text-gray-100": isOpen,
          })}
        >
          {renderText()}
        </span>
        <ArrowDown
          className={clsx("ml-8", {
            "rotate-180": isOpen,
          })}
        />
      </div>
    </button>
  );
}

function Toggle({
  children,
  // 박스 위에 label을 위한 프롭
}: {
  children: React.ReactNode;
}) {
  const { isOpen, toggleDropdown, selectedValue, variant } =
    useDropdownContext();

  const renderRoleText = (value: string) => {
    const roleOptions: { [key: string]: string } = {
      MEMBER: "멤버",
      ADMIN: "어드민",
    };
    return roleOptions[value] || value;
  };

  const renderOrderText = (value: string) => {
    const orderOptions: { [key: string]: string } = {
      latest: "최신순",
      alphabetical: "가나다순",
      oldest: "오래된순",
    };
    return orderOptions[value] || value;
  };

  const renderMeetingRoomText = (value: string) => {
    const roomOptions: { [key: string]: string } = {
      ROOM1: "회의실 1",
      ROOM2: "회의실 2",
      ROOM3: "회의실 3",
      ROOM4: "회의실 4",
    };
    return roomOptions[value] || value;
  };

  const renderText = () => {
    switch (variant) {
      case "role":
        return renderRoleText(selectedValue);
      case "order":
        return renderOrderText(selectedValue);
      case "meetingRoom":
        return renderMeetingRoomText(selectedValue);
      default:
        return children;
    }
  };

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
      default:
        return null;
    }
  };

  return renderButtonContent();
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const { isOpen, variant } = useDropdownContext();

  return isOpen ? (
    <div
      className={`bg-gray-5 rounded-8 border-gray-20 absolute z-50 mt-3 flex w-full flex-col gap-3 border p-8 ${variant === "order" && "right-0 w-96"} `}
    >
      {children}
    </div>
  ) : null;
}

function Item({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  const { selectItem, selectedValue, variant } = useDropdownContext();

  const isSelected = selectedValue === value;

  return (
    <div
      className={clsx("rounded-8 text-15-500 px-12 py-6 text-center", {
        "bg-purple-opacity-10 text-purple-80": isSelected,
        "text-gray-100-opacity-80 hover:bg-purple-opacity-5 hover:text-purple-80":
          !isSelected,
        "flex items-center justify-between": variant === "meetingRoom",
      })}
      onClick={() => selectItem(value)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && selectItem(value)
      }
      role="button"
      tabIndex={0}
    >
      {children}
      {isSelected && variant === "meetingRoom" ? <CheckIcon /> : null}
    </div>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
Dropdown.Item = Item;
