import KebabIcon from "@repo/assets/icons/icon-kebab.svg?react";
import Popover from "@src/components/commons/Popover";
import { Meta, StoryObj } from "@storybook/react";

// Storybook Meta 설정
const meta: Meta<typeof Popover> = {
  title: "Web Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  subcomponents: {
    Toggle: Popover.Toggle,
    Wrapper: Popover.Wrapper,
    Item: Popover.Item,
  },
} as Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPopover: Story = {
  render: () => {
    const handleEdit = () => {
      console.log("이름 편집 클릭");
    };

    const handleDelete = () => {
      console.log("삭제 클릭");
    };

    return (
      <div className="ml-100 w-100">
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
    );
  },
};
