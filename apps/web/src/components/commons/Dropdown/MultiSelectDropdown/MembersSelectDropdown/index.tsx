import ArrowDown from "@repo/assets/icons/icon-arrow-down.svg?react";
import CheckedBox from "@repo/assets/icons/icon-checkbox-active.svg?react";
import UnCheckedBox from "@repo/assets/icons/icon-checkbox.svg?react";
import SearchIcon from "@repo/assets/icons/icon-search.svg?react";
import Badge from "@src/components/commons/Badge";
import ProfileImage from "@src/components/commons/ProfileImage";
import clsx from "clsx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Member,
  MemberItemProps,
  MembersSelectDropdownContextType,
  MembersSelectDropdownProps,
} from "../../dropdownTypes";

const MembersSelectDropdownContext =
  createContext<MembersSelectDropdownContextType | null>(null);

const useMembersSelectDropdownContextType = () => {
  const context = useContext(MembersSelectDropdownContext);
  if (!context) {
    throw new Error(
      "useMultiSelectDropdownContext must be used within a Provider",
    );
  }

  return context;
};

export default function MembersSelectDropdown({
  selectedMembers,
  onSelect,
  onRemove,
  allMembers,
}: MembersSelectDropdownProps) {
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
      selectedMembers,
      toggleDropdown,
      closeDropdown,
      onSelect,
      onRemove,
    }),
    [isDropdownOpen, selectedMembers],
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
    <MembersSelectDropdownContext.Provider value={contextProviderValue}>
      <div ref={dropdownRef} className="relative">
        <Toggle />
        <SearchWrapper allMembers={allMembers} />
      </div>
    </MembersSelectDropdownContext.Provider>
  );
}

function Toggle() {
  const { isDropdownOpen, toggleDropdown, selectedMembers } =
    useMembersSelectDropdownContextType();

  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className="rounded-8 text-16 text-leftborder-gray-100-opacity-20 hover:border-purple-70 group relative flex h-56 w-full items-center justify-between border px-20 py-14"
    >
      <span className="text-13 left-15 text-gray-100-opacity-80 group-hover:text-purple-70 absolute top-[-9px] bg-white px-4">
        참여자
      </span>
      <span
        className={clsx("text-16-400 min-w-0 flex-grow", {
          "text-gray-100-opacity-80 group-hover:text-gray-100": !isDropdownOpen,
          "text-gray-100": isDropdownOpen,
        })}
      >
        <div className="flex max-h-40 max-w-full gap-2 overflow-x-auto">
          {selectedMembers.length > 0 ? (
            selectedMembers.map((member) => (
              <Badge key={member.id} variant="secondarySmall">
                {member.name}
              </Badge>
            ))
          ) : (
            <span className="text-gray-100-opacity-50">
              참여자를 선택해 주세요.
            </span>
          )}
        </div>
      </span>
      <ArrowDown
        className={clsx("ml-8 w-12 flex-shrink-0", {
          "rotate-180": isDropdownOpen,
        })}
      />
    </button>
  );
}

function SearchWrapper({ allMembers }: { allMembers: Member[] }) {
  const { isDropdownOpen, selectedMembers, onSelect, onRemove } =
    useMembersSelectDropdownContextType(); // 컨텍스트 사용

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
          key={member.id}
          member={member}
          isSelected={selectedMembers.some(
            (selectedMember) => selectedMember.name === member.name,
          )}
          onSelect={onSelect}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function MemberItem({
  member,
  isSelected,
  onSelect,
  onRemove,
}: MemberItemProps) {
  const handleClick = () => {
    if (isSelected) {
      onRemove(member); // 선택 해제
    } else {
      onSelect(member); // 선택
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
        <CheckedBox className="mr-5 w-16 flex-shrink-0" />
      ) : (
        <UnCheckedBox className="mr-5 w-16 flex-shrink-0" />
      )}

      <div className="flex-shrink-0">
        <ProfileImage size="sm" />
      </div>
      <span className="mt-2 flex-shrink-0">{member.name}</span>
      <div className="flex-grow overflow-x-auto">
        <div className="flex gap-3">
          {member.departments.map((dept) => (
            <Badge key={dept} variant="secondarySmall">
              {dept}
            </Badge>
          ))}
        </div>
      </div>
    </button>
  );
}
