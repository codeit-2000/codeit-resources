import Button from "@src/components/commons/Button";
import useModal from "@src/hooks/useModal";
import IconAlert from "@repo/assets/icons/icon-modal-alert.svg?react";

interface MoveSeatConfirmModalProps {
  onConfirm: () => void;
}

const MoveSeatConfirmModal = ({ onConfirm }: MoveSeatConfirmModalProps) => {
  const { closeModal } = useModal();

  return (
    <div className="rounded-16 w-370 h-213 flex flex-col items-center justify-between bg-white px-32 py-24">
      <IconAlert />
      <p className="text-17-500 text-gray-100">자리를 이동하시겠어요?</p>
      <p className="text-gray-100-opacity-80 text-15-400">
        기존의 자리는 취소되며, 선택한 자리가 예약됩니다.
      </p>
      <div className="flex gap-20">
        <Button
          onClick={closeModal}
          variant="secondary"
          size="modal"
          width="w-86"
          height="h-40"
        >
          취소하기
        </Button>
        <Button onClick={onConfirm} size="modal" width="w-86" height="h-40">
          이동하기
        </Button>
      </div>
    </div>
  );
};

export default MoveSeatConfirmModal;
