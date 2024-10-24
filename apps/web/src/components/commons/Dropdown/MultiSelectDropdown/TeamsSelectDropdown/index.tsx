import ArrowDown from "@repo/assets/icons/icon-arrow-down.svg?react";
import CheckedBox from "@repo/assets/icons/icon-checkbox-active.svg?react";
import UnCheckedBox from "@repo/assets/icons/icon-checkbox.svg?react";
import Badge from "@src/components/commons/Badge";
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

import {
  TeamsSelectDropdownContextType,
  TeamsSelectDropdownProps,
} from "../../dropdownTypes";

const TeamsSelectDropdownContext =
  createContext<TeamsSelectDropdownContextType | null>(null);

const useTeamsSelectDropdownContext = () => {
  const context = useContext(TeamsSelectDropdownContext);
  if (!context) {
    throw new Error(
      "useMultiSelectDropdownContext must be used within a Provider",
    );
  }

  return context;
};

export default function TeamsSelectDropdown({
  selectedTeams,
  onSelect,
  onRemove,
  departmentList,
}: TeamsSelectDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(
    () => setIsDropdownOpen((prevState) => !prevState),
    [],
  );
  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

  const contextProviderValue = useMemo(
    () => ({
      isDropdownOpen,
      selectedTeams,
      toggleDropdown,
      closeDropdown,
      onSelect,
      onRemove,
    }),
    [isDropdownOpen, selectedTeams],
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
    if (isDropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDropdownOpen, closeDropdown]);

  return (
    <TeamsSelectDropdownContext.Provider value={contextProviderValue}>
      <div ref={dropdownRef} className="relative">
        <Toggle />
        <Wrapper>
          {departmentList.map((department) => (
            <TeamItem key={department} team={department} />
          ))}
        </Wrapper>
      </div>
    </TeamsSelectDropdownContext.Provider>
  );
}

function Toggle() {
  const { isDropdownOpen, toggleDropdown, selectedTeams } =
    useTeamsSelectDropdownContext();

  const maxDisplayCount = 2;

  const displayedValues = selectedTeams.slice(0, maxDisplayCount);
  const remainingCount = selectedTeams.length - maxDisplayCount;

  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className="rounded-8 text-16 text-leftborder-gray-100-opacity-20 hover:border-purple-70 group relative flex w-full items-center justify-between border px-20 py-14"
    >
      <span className="text-13 left-15 text-gray-100-opacity-80 group-hover:text-purple-70 absolute top-[-9px] bg-white px-4">
        팀
      </span>
      <span
        className={clsx("text-16-400", {
          "text-gray-100-opacity-80 group-hover:text-gray-100": !isDropdownOpen,
          "text-gray-100": isDropdownOpen,
        })}
      >
        <div className="flex gap-2">
          {displayedValues.map((value) => (
            <Badge key={value} variant="secondarySmall">
              {value}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge variant="secondarySmall">외 {remainingCount}개</Badge>
          )}
        </div>
      </span>
      <ArrowDown
        className={clsx("ml-8", {
          "rotate-180": isDropdownOpen,
        })}
      />
    </button>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  const { isDropdownOpen } = useTeamsSelectDropdownContext();

  return isDropdownOpen ? (
    <div className="bg-gray-5 rounded-8 border-gray-20 max-h-168 shadow-dropdown-wrapper absolute z-50 mt-3 flex w-full flex-col gap-3 overflow-y-auto border p-8">
      {children}
    </div>
  ) : null;
}

function TeamItem({ team }: { team: string }) {
  const { onSelect, onRemove, selectedTeams } = useTeamsSelectDropdownContext();

  const isSelected = selectedTeams.includes(team);

  const handleClick = () => {
    if (isSelected) {
      onRemove(team); // 선택 해제
    } else {
      onSelect(team); // 선택
    }
  };

  return (
    <button
      type="button"
      className={clsx("rounded-8 text-15-500 flex items-center px-12 py-6", {
        "bg-purple-opacity-10 text-purple-80": isSelected,
        "text-gray-100-opacity-80 hover:bg-purple-opacity-5 hover:text-purple-80":
          !isSelected,
      })}
      onClick={handleClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
    >
      {isSelected ? (
        <CheckedBox className="mr-5" />
      ) : (
        <UnCheckedBox className="mr-5" />
      )}
      {team}
    </button>
  );
}
