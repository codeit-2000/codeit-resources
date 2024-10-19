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
    size: "md",
  },
};

// 커스텀 프로필 이미지 스토리
export const CustomImage: Story = {
  args: {
    imageUrl:
      "https://us-tuna-sounds-images.voicemod.net/0ffbd88c-6c3c-45a7-9272-280811d98a8a-1712076812036.png",
    size: "lg",
  },
};

// 작은 사이즈 스토리
export const SmallSize: Story = {
  args: {
    size: "sm",
  },
};

// 큰 사이즈 스토리
export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};
