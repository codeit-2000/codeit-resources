import { atom } from "jotai";

interface ModalState {
  type: string | null;
  modalProps: any;
}

const modalAtom = atom<ModalState>({
  type: null,
  modalProps: {},
});

export default modalAtom;
