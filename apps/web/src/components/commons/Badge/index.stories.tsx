import type { Meta, StoryObj } from "@storybook/react";

import Badge from ".";

const meta = {
  title: "Web Components/Badge",
  component: Badge,
  tags: ["autodocs"],
} as Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const primaryBadge: Story = {
  args: {
    children: "안녕 난 뱃지",
  },
};

export const secondaryBadge: Story = {
  args: {
    children: "안녕 난 뱃지",
    variant: "secondary",
  },
};
