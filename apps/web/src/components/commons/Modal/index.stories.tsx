import type { Meta, StoryObj } from "@storybook/react";
import Modal from ".";
import Button from "@src/components/commons/Button";
import useModal from "@src/hooks/useModal";

const meta = {
  title: "Web Components/Modal",
  components: Modal,
  tags: ["autodocs"],
} as Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MoveSeatConfirmModal: Story = {
  render: () => {
    const { openModal } = useModal();

    return (
      <div>
        <Button
          width="w-200"
          onClick={() => {
            openModal("moveSeatConfirm", {
              onConfirm: () => {
                console.log("모달 확인 버튼 클릭됨");
              },
            });
          }}
        >
          모달 열기
        </Button>
        <Modal />
      </div>
    );
  },
};
