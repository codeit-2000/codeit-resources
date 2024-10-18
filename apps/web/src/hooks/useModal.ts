import { useAtom } from "jotai";
import modalAtom from "@src/store/modalAtom";

const useModal = () => {
  const [modalState, setModalState] = useAtom(modalAtom);

  const openModal = (
    type: "moveSeatConfirm" | string,
    modalProps: any = {},
  ) => {
    setModalState({
      type,
      modalProps,
    });
  };

  const closeModal = () => {
    setModalState({
      type: null,
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
