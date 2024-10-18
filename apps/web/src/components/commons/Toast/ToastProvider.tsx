import { toastAtom } from "@src/store/toastAtom";
import { useAtomValue } from "jotai";

import { createPortal } from "react-dom";

import Toast from "@src/components/commons/Toast";
import useIsMobile from "@src/hooks/useIsMobile";
import clsx from "clsx";

const ToastProvider = () => {
  const toast = useAtomValue(toastAtom);

  const isMobile = useIsMobile();

  const ToastPosition = clsx("fixed left-[50vw] -translate-x-1/2", {
    "bottom-128": isMobile,
    "top-24": !isMobile,
  });

  return createPortal(
    <div className={ToastPosition}>{toast && <Toast {...toast} />}</div>,
    document.body,
  );
};

export default ToastProvider;
