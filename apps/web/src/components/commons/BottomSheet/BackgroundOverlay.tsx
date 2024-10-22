import { motion } from "framer-motion";

function BackgroundOverlay() {
  return (
    <motion.div
      className="absolute left-0 top-0 h-[100dvh] w-full bg-black"
      initial="closed"
      animate="opened"
      exit="closed"
      variants={{
        opened: {
          backdropFilter: "blur(1px)",
          opacity: 0.7,
          transition: { duration: 0.3 },
        },
        closed: {
          backdropFilter: "blur(0px)",
          opacity: 0,
          transition: { duration: 0.3 },
        },
      }}
    />
  );
}

export default BackgroundOverlay;
