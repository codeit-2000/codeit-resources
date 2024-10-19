import { useEffect, useRef } from "react";
import useModal from "@src/hooks/useModal";
import MoveSeatConfirmModal from "./MoveSeatConfirmModal";

function ModalProvider() {
  const { modalState, closeModal } = useModal();
  const { type, modalProps } = modalState;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = "hidden";
      if (modalRef.current) {
        modalRef.current.focus();
      }
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

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    SpecificModal && (
      <div
        ref={modalRef}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20"
        onClick={handleClickOutside}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <div>
          <SpecificModal {...modalProps} />
        </div>
      </div>
    )
  );
}

export default ModalProvider;
