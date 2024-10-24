import { Meta, StoryObj } from "@storybook/react";

import Banner from ".";

const meta = {
  title: "Web Components/Banner",
  component: Banner,
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
} as Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
  },
};
