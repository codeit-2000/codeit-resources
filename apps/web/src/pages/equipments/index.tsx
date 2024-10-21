// import Drawer from "@src/components/commons/Drawer";
// import { useState } from "react";
// export default function Equipments() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const handleDrawerOpen = () => setIsDrawerOpen(true);
//   return (
//     <div>
// <button
//   type="button"
//   onClick={handleDrawerOpen}
//   className="rounded bg-purple-500 p-2 text-white"
// >
//   드로워 열기
// </button>
// {isDrawerOpen && (
//   <Drawer
//     isDrawerOpen={isDrawerOpen}
//     onClose={() => setIsDrawerOpen(false)}
//   />
//       )}
//       <h1>This is Equipments Reservation Page :)</h1>
//     </div>
//   );
// }
// import Drawer from "@src/components/commons/Drawer";
// import { useState } from "react";
// export default function Equipments() {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);
//   return (
//     <div className="p-4">
//       <button
//         type="button"
//         onClick={handleDrawerToggle}
//         className="rounded bg-purple-500 p-2 text-white"
//       >
//         드로워 열기
//       </button>
//       {isDrawerOpen && (
//         <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
//       )}
//     </div>
//   );
// }
// apps/web/src/pages/equipments/index.tsx
import Drawer from "@src/components/commons/Drawer";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Equipments() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="p-4">
      <button
        type="button"
        onClick={handleDrawerToggle}
        className="rounded bg-purple-500 p-2 text-white"
      >
        드로워 열기
      </button>
      <AnimatePresence>
        {isDrawerOpen && <Drawer onClose={() => setIsDrawerOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
