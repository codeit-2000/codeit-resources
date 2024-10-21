import { AnimatePresence, PanInfo, motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

import BackgroundOverlay from "./BackgroundOverlay";
import DrawerContent from "./DrawerContent";
import DrawerContentWrapper from "./DrawerContentWrapper";

interface DrawerProps {
  isDrawerOpen: boolean;
  onClose: () => void;
}

function Drawer({ isDrawerOpen, onClose }: DrawerProps) {
  const controls = useAnimation();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [drawerPosition, setDrawerPosition] = useState("closed");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setWindowHeight(window.innerHeight);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setDrawerPosition(e.matches ? "half" : "full");
    };

    if (mediaQuery.matches) {
      setDrawerPosition("half");
    } else {
      setDrawerPosition("full");
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      setIsClosing(false);
      controls.start(drawerPosition);
    } else {
      controls.start("closed");
    }
  }, [isDrawerOpen, drawerPosition, controls]);

  const variants = {
    closed: {
      y: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    half: {
      y: "50%",
      transition: { type: "spring", stiffness: 250, damping: 30 },
    },
    full: { y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 50;
    const velocity = info.velocity.y;
    const currentPosition = info.point.y;

    if (drawerPosition === "full") {
      if (currentPosition > threshold || velocity > 500) {
        await controls.start("half");
        setDrawerPosition("half");
      } else {
        controls.start("full");
      }
    } else if (drawerPosition === "half") {
      if (currentPosition < -threshold || velocity < -500) {
        await controls.start("full");
        setDrawerPosition("full");
      } else if (currentPosition > threshold || velocity > 500) {
        setIsClosing(true);
        await controls.start("closed");
        setDrawerPosition("closed");
        onClose();
      } else {
        controls.start("half");
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isDrawerOpen && !isClosing && <BackgroundOverlay />}
      </AnimatePresence>
      <AnimatePresence>
        {(isDrawerOpen || isClosing) && (
          <motion.div
            className="rounded-t-16 fixed bottom-0 left-0 right-0 overflow-hidden bg-white shadow-lg"
            style={{ height: windowHeight }}
            drag="y"
            dragConstraints={{ top: 0, bottom: windowHeight * 0.5 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial="closed"
            exit="closed"
            variants={variants}
            onAnimationComplete={() => {
              if (isClosing) {
                setIsClosing(false);
                onClose();
              }
            }}
          >
            <DrawerContentWrapper>
              <DrawerContent onClose={() => setIsClosing(true)} />
            </DrawerContentWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Drawer;
