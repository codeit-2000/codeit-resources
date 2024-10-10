import type { Meta, StoryObj } from "@storybook/react";

import Button from ".";

const meta = {
  title: "Web Components/Button",
  component: Button,
  tags: ["autodocs"],
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "기본 버튼",
  },
};
