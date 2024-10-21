import Arrow from "@repo/assets/icons/icon-double-right-arrow.svg?react";
import Button from "@src/components/commons/Button";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DrawerProps {
  onClose: () => void;
  children: ReactNode; // 드로워 안에 내용들 children으로 채워주기
}

function Drawer({ onClose, children }: DrawerProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 240, damping: 30 }}
      className="border-l-gray-40 fixed right-0 top-0 z-50 flex h-full w-1/3 flex-col border bg-white p-32 shadow-lg"
    >
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="absolute left-16 top-16"
          onClick={onClose}
        >
          <Arrow />
        </button>
        {children}
        <div className="fixed bottom-40 w-[90%]">
          <Button>예약하기</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default Drawer;
