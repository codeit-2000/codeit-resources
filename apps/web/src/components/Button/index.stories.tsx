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
    variant: "primary",
    children: "기본 버튼",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "버튼",
  },
};

export const Disabled: Story = {
  args: {
    variant: "secondary",
    children: "버튼",
    disabled: true,
  },
};
