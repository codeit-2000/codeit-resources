import KebabIcon from "@repo/assets/icons/icon-kebab.svg?react";
import MembersSelectDropdown from "@src/components/commons/Dropdown/MultiSelectDropdown/MembersSelectDropdown";
import TeamsSelectDrodowon from "@src/components/commons/Dropdown/MultiSelectDropdown/TeamsSelectDropdown";
import { Member } from "@src/components/commons/Dropdown/dropdownTypes";
import Popover from "@src/components/commons/Popover";
import { useState } from "react";

const departments = [
  "Sales & Operations",
  "Product",
  "Content",
  "Learner Experience",
  "Marketing",
  "Finance",
  "Customer Support",
  "HR",
  "Legal",
];

const members: Member[] = [
  {
    id: 1,
    name: "김효준",
    departments: ["Product", "Content", "Marketing"],
    profileImage: null,
  },
  {
    id: 2,
    name: "손동욱",
    departments: ["Sales & Operations", "Product", "Finance"],
    profileImage: null,
  },
  {
    id: 3,
    name: "이민호",
    departments: ["Learner Experience", "Product", "Customer Support"],
    profileImage: null,
  },
  {
    id: 4,
    name: "박지성",
    departments: ["Content", "Learner Experience", "HR"],
    profileImage: null,
  },
  {
    id: 5,
    name: "전지현",
    departments: ["Sales & Operations", "Legal", "Finance"],
    profileImage: null,
  },
  {
    id: 6,
    name: "유재석",
    departments: ["Marketing", "HR", "Customer Support"],
    profileImage: null,
  },
  {
    id: 7,
    name: "강호동",
    departments: ["Finance", "Legal", "Sales & Operations"],
    profileImage: null,
  },
  {
    id: 8,
    name: "이광수",
    departments: ["Product", "Learner Experience", "Customer Support"],
    profileImage: null,
  },
];

export default function Dashboard() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  // 선택된 팀을 추가하는 함수
  const handleSelect = (team: string) => {
    setSelectedTeams((prev) => [...prev, team]);
  };

  // 선택된 팀을 제거하는 함수
  const handleRemove = (team: string) => {
    setSelectedTeams((prev) => prev.filter((t) => t !== team));
  };

  // 멤버 선택 함수
  const handleMemberSelect = (member: Member) => {
    setSelectedMembers((prev) => [...prev, member]);
  };

  // 멤버 제거 함수
  const handleMemberRemove = (member: Member) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== member.id));
  };

  const handleEdit = () => {
    console.log("이름 편집 클릭");
  };

  const handleDelete = () => {
    console.log("삭제 클릭");
  };

  return (
    <div>
      <h1>This is Dashboard Page :)</h1>
      <div className="w-340">
        <TeamsSelectDrodowon
          selectedTeams={selectedTeams}
          onSelect={handleSelect}
          onRemove={handleRemove}
          departmentList={departments}
        />
      </div>

      <div className="mt-50 w-340">
        <MembersSelectDropdown
          selectedMembers={selectedMembers}
          onSelect={handleMemberSelect}
          onRemove={handleMemberRemove}
          allMembers={members}
        />
      </div>
      <div className="p-6">
        <Popover>
          <Popover.Toggle
            icon={
              <KebabIcon className="hover:bg-gray-100-opacity-5 h-40 w-40 rounded-full p-8" />
            }
          />
          <Popover.Wrapper>
            <Popover.Item label="이름 편집" onClick={handleEdit} />
            <Popover.Item label="삭제" onClick={handleDelete} />
          </Popover.Wrapper>
        </Popover>
      </div>
    </div>
  );
}
