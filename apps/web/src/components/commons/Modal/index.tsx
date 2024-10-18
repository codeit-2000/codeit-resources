import { useEffect } from "react";
import useModal from "@src/hooks/useModal";
import MoveSeatConfirmModal from "./MoveSeatConfirmModal";

const ModalProvider = () => {
  const { modalState, closeModal } = useModal();
  const { type, modalProps } = modalState;

  useEffect(() => {
    // 모달이 열렸을 때, 오버레이 스크롤 블락
    if (type) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [type]);

  if (!type) return null;

  const modalComponents: Record<string, React.ElementType> = {
    moveSeatConfirm: MoveSeatConfirmModal,
  };

  const SpecificModal = modalComponents[type];

  // 모달 오버레이를 클릭했을 때 모달 종료
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {SpecificModal && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20"
          onClick={handleClickOutside}
        >
          <div>
            <SpecificModal {...modalProps} />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProvider;
