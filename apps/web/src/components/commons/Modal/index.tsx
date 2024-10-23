import useModal from "@src/hooks/useModal";
import AddTeamModal from "@src/pages/admin/team/components/AddTeamModal";
import { useEffect, useRef, useState } from "react";

import MoveSeatConfirmModal from "./MoveSeatConfirmModal";

function ModalProvider() {
  const { modalState, closeModal } = useModal();
  const { modalType, modalProps } = modalState;
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleBodyOverflow = (hidden: boolean) => {
      document.body.style.overflow = hidden ? "hidden" : "auto";
    };

    if (modalType) {
      toggleBodyOverflow(true);
      setIsVisible(true);
      modalRef.current?.focus();
    } else {
      setIsVisible(false);
    }

    return () => toggleBodyOverflow(false);
  }, [modalType]);

  if (!modalType && !isVisible) return null;

  const modalComponents: Record<string, React.ElementType> = {
    moveSeatConfirm: MoveSeatConfirmModal,
    addTeamModal: AddTeamModal,
  };

  const SpecificModal = modalType ? modalComponents[modalType] : null;

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleTransitionEnd = () => {
    if (!isVisible) {
      closeModal();
    }
  };

  const modalClasses = `fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20 transition-opacity duration-300 ${
    isVisible ? "opacity-100" : "opacity-0"
  }`;

  const contentClasses = `transform transition-transform duration-300 ${
    isVisible ? "scale-100" : "scale-95"
  }`;

  return (
    SpecificModal && (
      <div
        ref={modalRef}
        className={modalClasses}
        onClick={handleClickOutside}
        onKeyDown={handleKeyDown}
        onTransitionEnd={handleTransitionEnd}
        tabIndex={0}
        role="button"
      >
        <div className={contentClasses}>
          <SpecificModal {...modalProps} />
        </div>
      </div>
    )
  );
}

export default ModalProvider;
