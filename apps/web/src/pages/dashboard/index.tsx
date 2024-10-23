import MultiSelectDropdown from "@src/components/commons/Dropdown/MultiSelectDropdown";
import { useState } from "react";

const members = [
  {
    name: "김효준",
    departments: ["Product", "Content"],
  },
  {
    name: "손동욱",
    departments: ["Sales & Operations", "Product"],
  },
  {
    name: "이민호",
    departments: ["Learner Experience", "Product"],
  },
  {
    name: "박지성",
    departments: ["Content", "Learner Experience"],
  },
  {
    name: "전지현",
    departments: ["Sales & Operations", "Admin"],
  },
];

export default function Dashboard() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  // 선택된 팀을 추가하는 함수
  const handleSelect = (team: string) => {
    setSelectedTeams((prev) => [...prev, team]);
  };

  // 선택된 팀을 제거하는 함수
  const handleRemove = (team: string) => {
    setSelectedTeams((prev) => prev.filter((t) => t !== team));
  };

  const handleMemberSelect = (member: string) => {
    setSelectedMembers((prev) => [...prev, member]);
  };

  // 멤버 선택 해제 시 호출
  const handleMemberRemove = (member: string) => {
    setSelectedMembers((prev) => prev.filter((m) => m !== member));
  };

  return (
    <div>
      <h1>This is Dashboard Page :)</h1>
      <div className="w-340">
        <MultiSelectDropdown
          selectedValues={selectedTeams}
          onSelect={handleSelect}
          onRemove={handleRemove}
        >
          <MultiSelectDropdown.Toggle label="팀" />
          <MultiSelectDropdown.Wrapper>
            <MultiSelectDropdown.TeamItem itemValue="Sales & Operations" />
            <MultiSelectDropdown.TeamItem itemValue="Product" />
            <MultiSelectDropdown.TeamItem itemValue="Content" />
            <MultiSelectDropdown.TeamItem itemValue="Learner Experience" />
          </MultiSelectDropdown.Wrapper>
        </MultiSelectDropdown>
      </div>

      <div className="mt-50 w-340">
        <MultiSelectDropdown
          selectedValues={selectedMembers}
          onSelect={handleMemberSelect}
          onRemove={handleMemberRemove}
        >
          <MultiSelectDropdown.Toggle label="참여자" />
          <MultiSelectDropdown.SearchWrapper allMembers={members} />
        </MultiSelectDropdown>
      </div>
    </div>
  );
}
