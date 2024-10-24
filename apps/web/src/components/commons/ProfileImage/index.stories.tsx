import type { StoryObj } from "@storybook/react";

import ProfileImage from ".";

const meta = {
  title: "Web Components/ProfileImage",
  component: ProfileImage,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    imageUrl: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 프로필 이미지 스토리
export const Default: Story = {
  args: {
    userId: "1",
    size: "md",
  },
};

// 작은 사이즈 스토리
export const SmallSize: Story = {
  args: {
    userId: "2",
    size: "sm",
  },
};

// 큰 사이즈 스토리
export const LargeSize: Story = {
  args: {
    userId: "3",
    size: "lg",
  },
};
