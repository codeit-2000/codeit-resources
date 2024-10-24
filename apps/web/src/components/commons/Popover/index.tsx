import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { PopoverContextType } from "../Dropdown/dropdownTypes";

const PopoverContext = createContext<PopoverContextType | null>(null);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopoverContext must be used within PopoverProvider");
  }
  return context;
};

export default function Popover({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = useCallback(
    () => setIsOpen((prevState) => !prevState),
    [],
  );
  const closePopover = useCallback(() => setIsOpen(false), []);

  const contextValue = useMemo(
    () => ({ isOpen, togglePopover, closePopover }),
    [isOpen],
  );

  // 외부 클릭 시 팝오버 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        closePopover();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closePopover]);

  return (
    <PopoverContext.Provider value={contextValue}>
      <div ref={popoverRef} className="relative">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

// Toggle 컴포넌트
interface ToggleProps {
  icon: ReactNode;
  label?: string;
}

function Toggle({ icon, label }: ToggleProps) {
  const { togglePopover } = usePopoverContext();

  return (
    <button
      type="button"
      onClick={togglePopover}
      className="flex h-40 w-40 items-center justify-between rounded-full"
    >
      {label && <span className="mr-2">{label}</span>}
      {icon}
    </button>
  );
}

// Wrapper 컴포넌트
function Wrapper({ children }: { children: React.ReactNode }) {
  const { isOpen } = usePopoverContext();

  return isOpen ? (
    <div className="bg-gray-5 rounded-8 border-gray-20 shadow-dropdown-wrapper w-98 absolute z-50 mt-3 flex flex-col gap-3 border p-8">
      {children}
    </div>
  ) : null;
}

// Item 컴포넌트
interface ItemProps {
  label: string;
  onClick: () => void;
}

function Item({ label, onClick }: ItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-8 text-15-500 text-gray-100-opacity-80 hover:bg-purple-opacity-5 hover:text-purple-80 w-full px-12 py-6 text-center"
    >
      {label}
    </button>
  );
}

Popover.Toggle = Toggle;
Popover.Wrapper = Wrapper;
Popover.Item = Item;
