import Toast from "@src/components/commons/Toast";
import { toastAtom } from "@src/store/toastAtom";
import { useAtomValue } from "jotai";
import { createPortal } from "react-dom";

const ToastProvider = () => {
  const toast = useAtomValue(toastAtom);

  return createPortal(
    <div className="bottom-128 fixed left-[50vw] -translate-x-1/2 md:left-[60vw] md:top-24">
      {toast && <Toast {...toast} />}
    </div>,
    document.body,
  );
};

export default ToastProvider;
