import { useAtom } from "jotai";
import modalAtom from "@src/store/modalAtom";

const useModal = () => {
  const [modalState, setModalState] = useAtom(modalAtom);

  const openModal = (
    modalType: "moveSeatConfirm" | string,
    modalProps: object,
  ) => {
    setModalState({
      modalType,
      modalProps,
    });
  };

  const closeModal = () => {
    setModalState({
      modalType: null,
      modalProps: {},
    });
  };

  return {
    modalState,
    openModal,
    closeModal,
  };
};

export default useModal;
