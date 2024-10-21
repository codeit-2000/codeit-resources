// import Arrow from "@repo/assets/icons/icon-double-right-arrow.svg";
// import Button from "@src/components/commons/Button";
// import { motion } from "framer-motion";
// interface DrawerProps {
//   isOpen: boolean;
//   onClose: () => void;
// }
// function Drawer({ isOpen, onClose }: DrawerProps) {
//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: isOpen ? 0 : "100%" }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-lg"
//     >
//       <div className="p-4">
//         <button type="button" onClick={onClose} className="mb-4">
//           <Arrow />
//         </button>
//         <Button className="w-full">예약하기</Button>
//       </div>
//     </motion.div>
//   );
// }
// export default Drawer;
// apps/web/src/components/commons/Drawer/index.tsx
// Import Arrow correctly or replace with an inline SVG
import Arrow from "@repo/assets/icons/icon-double-right-arrow.svg?react";
import Button from "@src/components/commons/Button";
import { motion } from "framer-motion";

interface DrawerProps {
  onClose: () => void;
}

function Drawer({ onClose }: DrawerProps) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 240, damping: 30 }}
      className="border-l-gray-40 fixed right-0 top-0 z-50 h-full w-1/3 border bg-white p-32 shadow-lg"
    >
      <div>
        <button type="button" onClick={onClose}>
          <Arrow />
        </button>

        <div className="fixed bottom-40 w-[90%]">
          <Button>예약하기</Button>
        </div>
      </div>
    </motion.div>
  );
}

export default Drawer;
