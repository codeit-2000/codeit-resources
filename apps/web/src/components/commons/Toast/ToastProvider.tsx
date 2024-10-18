import { toastAtom } from "@src/store/toastAtom";
import { useAtomValue } from "jotai";

import { createPortal } from "react-dom";

import Toast from "@src/components/commons/Toast";

const ToastProvider = () => {
  const toast = useAtomValue(toastAtom);

  return createPortal(
    <div className={`bottom-128 fixed left-[50vw] -translate-x-1/2`}>
      {toast && <Toast {...toast} />}
    </div>,
    document.body,
  );
};

export default ToastProvider;
