import TeamsSelectDropdown from "@src/components/commons/Dropdown/MultiSelectDropdown/TeamsSelectDropdown";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof TeamsSelectDropdown> = {
  title: "Web Components/Dropdown/TeamsSelectDropdown",
  component: TeamsSelectDropdown,
  tags: ["autodocs"],
} as Meta<typeof TeamsSelectDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  render: () => {
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

    const handleSelect = (team: string) => {
      setSelectedTeams((prev) => [...prev, team]);
    };

    const handleRemove = (team: string) => {
      setSelectedTeams((prev) => prev.filter((t) => t !== team));
    };

    return (
      <div className="w-340">
        <TeamsSelectDropdown
          selectedTeams={selectedTeams}
          onSelect={handleSelect}
          onRemove={handleRemove}
          departmentList={departments}
        />
      </div>
    );
  },
};
