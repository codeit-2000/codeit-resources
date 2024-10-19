import { useEffect, useRef, useState } from "react";
import useModal from "@src/hooks/useModal";
import MoveSeatConfirmModal from "./MoveSeatConfirmModal";

function ModalProvider() {
  const { modalState, closeModal } = useModal();
  const { type, modalProps } = modalState;
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = "hidden";
      setIsVisible(true);

      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 300);
    }
  }, [type]);

  if (!type && !isVisible) return null;

  const modalComponents: Record<string, React.ElementType> = {
    moveSeatConfirm: MoveSeatConfirmModal,
  };

  const SpecificModal = type ? modalComponents[type] : null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
      setTimeout(() => {
        closeModal();
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      setIsVisible(false);
      setTimeout(() => {
        closeModal();
      }, 300);
    }
  };

  return (
    SpecificModal && (
      <div
        ref={modalRef}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClickOutside}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <div
          className={`transform transition-transform duration-300 ${
            isVisible ? "scale-100" : "scale-95"
          }`}
        >
          <SpecificModal {...modalProps} />
        </div>
      </div>
    )
  );
}

export default ModalProvider;
