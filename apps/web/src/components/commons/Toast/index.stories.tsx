import { Meta, StoryObj } from "@storybook/react";
import Toast from "./index";

import useToast from "@src/hooks/useToast";
import ToastProvider from "./ToastProvider";

const meta = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    type: "success",
  },
} as Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: "success",
    message: "자리 예약 성공!",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "자리 예약 실패!",
  },
};

export const TestToast: Story = {
  render: () => {
    const Toast = () => {
      const { success, error } = useToast();

      const handleSuccessClick = () => {
        success("자리 예약 성공!");
      };

      const handleErrorClick = () => {
        error("자리 예약 실패!");
      };

      return (
        <div className="flex gap-10">
          <ToastProvider />
          <button
            className="bg-green-70 text-white"
            onClick={handleSuccessClick}
          >
            성공 토스트 띄우기
          </button>
          <button className="bg-red-500 text-white" onClick={handleErrorClick}>
            에러 토스트 띄우기
          </button>
        </div>
      );
    };
    return <Toast />;
  },
};
