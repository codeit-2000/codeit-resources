import ArrowDown from "@repo/assets/icons/icon-arrow-down.svg?react";
import CheckedBox from "@repo/assets/icons/icon-checkbox-active.svg?react";
import UnCheckedBox from "@repo/assets/icons/icon-checkbox.svg?react";
import SearchIcon from "@repo/assets/icons/icon-search.svg?react";
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

import Badge from "../../Badge";
import ProfileImage from "../../ProfileImage";

interface MultiSelectDropdownContextType {
  isDropdownOpen: boolean;
  selectedValues: string[];
  toggleDropdown: () => void;
  closeDropdown: () => void;
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelectDropdownContext =
  createContext<MultiSelectDropdownContextType | null>(null);

const useMultiSelectDropdownContext = () => {
  const context = useContext(MultiSelectDropdownContext);
  if (!context) {
    throw new Error(
      "useMultiSelectDropdownContext must be used within a Provider",
    );
  }

  return context;
};

interface MultiSelectDropdownProps {
  children: React.ReactNode;
  selectedValues: string[];
  onSelect: (value: string) => void;
  onRemove: (value: string) => void;
}
export default function MultiSelectDropdown({
  children,
  selectedValues,
  onSelect,
  onRemove,
}: MultiSelectDropdownProps) {
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
      selectedValues,
      toggleDropdown,
      closeDropdown,
      onSelect,
      onRemove,
    }),
    [isDropdownOpen, selectedValues],
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
    <MultiSelectDropdownContext.Provider value={contextProviderValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </MultiSelectDropdownContext.Provider>
  );
}

function Toggle({ label }: { label: string }) {
  const { isDropdownOpen, toggleDropdown, selectedValues } =
    useMultiSelectDropdownContext();

  // 표시할 최대 항목 수
  const maxDisplayCount = 2;

  // 표시할 값과 나머지 항목 계산
  const displayedValues = selectedValues.slice(0, maxDisplayCount);
  const remainingCount = selectedValues.length - maxDisplayCount;

  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className="rounded-8 text-16 text-leftborder-gray-100-opacity-20 hover:border-purple-70 group relative flex w-full items-center justify-between border px-20 py-14"
    >
      <span className="text-13 left-15 text-gray-100-opacity-80 group-hover:text-purple-70 absolute top-[-9px] bg-white px-4">
        {label}
      </span>
      <span
        className={clsx("text-16-400", {
          "text-gray-100-opacity-80 group-hover:text-gray-100": !isDropdownOpen,
          "text-gray-100": isDropdownOpen,
        })}
      >
        <div className="flex gap-2">
          {/* 선택된 값 표시 */}
          {displayedValues.map((value) => (
            <Badge key={value} variant="secondarySmall">
              {value}
            </Badge>
          ))}
          {/* 남은 항목이 있을 경우 "외 N명" 표시 */}
          {remainingCount > 0 && (
            <Badge variant="secondarySmall">외 {remainingCount}명</Badge>
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
  const { isDropdownOpen } = useMultiSelectDropdownContext();

  return isDropdownOpen ? (
    <div className="bg-gray-5 rounded-8 border-gray-20 max-h-168 shadow-dropdown-wrapper absolute z-50 mt-3 flex w-full flex-col gap-3 overflow-y-auto border p-8">
      {children}
    </div>
  ) : null;
}

function TeamItem({ itemValue }: { itemValue: string }) {
  const { onSelect, onRemove, selectedValues } =
    useMultiSelectDropdownContext();

  const isSelected = selectedValues.includes(itemValue);

  const handleClick = () => {
    if (isSelected) {
      onRemove(itemValue); // 선택 해제
    } else {
      onSelect(itemValue); // 선택
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
      {itemValue}
    </button>
  );
}

function SearchWrapper({
  allMembers,
}: {
  allMembers: { name: string; departments: string[] }[];
}) {
  const { isDropdownOpen, selectedValues, onSelect, onRemove } =
    useMultiSelectDropdownContext(); // 컨텍스트 사용

  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태

  // 검색어에 맞게 멤버 필터링
  const filteredMembers = allMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.departments.some((dept) =>
        dept.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  // isDropdownOpen이 false면 null 반환
  if (!isDropdownOpen) {
    return null;
  }

  return (
    <div className="bg-gray-5 rounded-8 border-gray-20 max-h-168 shadow-dropdown-wrapper absolute z-50 mt-3 flex w-full flex-col gap-3 overflow-y-auto border p-8">
      <div className="relative">
        <SearchIcon className="absolute left-10 top-12" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-gray-30 bg-gray-10 text-16-400 rounded-8 pl-30 mb-2 h-40 w-full border pr-2"
          placeholder="이름 및 부서로 검색"
        />
      </div>

      {/* 필터링된 멤버 목록을 렌더링 */}
      {filteredMembers.map((member) => (
        <MemberItem
          key={member.name}
          itemValue={member.name}
          departments={member.departments}
          isSelected={selectedValues.includes(member.name)}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

interface MemberItemProps {
  itemValue: string;
  departments: string[];
  isSelected: boolean;
  onSelect: (member: string) => void;
  onRemove: (member: string) => void;
}

function MemberItem({
  itemValue,
  departments,
  isSelected,
  onSelect,
  onRemove,
}: MemberItemProps) {
  const handleClick = () => {
    if (isSelected) {
      onRemove(itemValue); // 선택 해제
    } else {
      onSelect(itemValue); // 선택
    }
  };

  return (
    <button
      type="button"
      className={clsx(
        "rounded-8 text-15-500 flex items-center gap-5 px-12 py-6",
        {
          "bg-purple-opacity-10 text-purple-80": isSelected,
          "text-gray-100-opacity-80 hover:bg-purple-opacity-5 hover:text-purple-80":
            !isSelected,
        },
      )}
      onClick={handleClick}
    >
      {isSelected ? (
        <CheckedBox className="mr-5" />
      ) : (
        <UnCheckedBox className="mr-5" />
      )}
      <div className="flex items-center gap-5">
        <ProfileImage size="sm" />
        <span className="mt-2">{itemValue}</span>
        {departments.map((dept) => (
          <Badge key={dept} variant="secondarySmall">
            {dept}
          </Badge>
        ))}
      </div>
    </button>
  );
}

MultiSelectDropdown.Toggle = Toggle;
MultiSelectDropdown.Wrapper = Wrapper;
MultiSelectDropdown.SearchWrapper = SearchWrapper;
MultiSelectDropdown.TeamItem = TeamItem;
