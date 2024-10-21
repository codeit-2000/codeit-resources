import Scroll from "@repo/assets/icons/icon-drawer-bar.svg?react";
import Button from "@src/components/commons/Button";
import { AnimatePresence, PanInfo, motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

import BackgroundOverlay from "./BackgroundOverlay";

interface BottomSheetProps {
  isBottomSheetOpen: boolean;
  onClose: () => void;
  buttonText: string;
  children: ReactNode;
}

function BottomSheet({
  isBottomSheetOpen,
  onClose,
  buttonText,
  children,
}: BottomSheetProps) {
  const controls = useAnimation();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [BottomSheetPosition, setBottomSheetPosition] = useState("closed");
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setWindowHeight(window.innerHeight);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setBottomSheetPosition(e.matches ? "half" : "full");
    };

    if (mediaQuery.matches) {
      setBottomSheetPosition("half");
    } else {
      setBottomSheetPosition("full");
    }

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isBottomSheetOpen) {
      setIsClosing(false);
      controls.start(BottomSheetPosition);
    } else {
      controls.start("closed");
    }
  }, [isBottomSheetOpen, BottomSheetPosition, controls]);

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

    if (BottomSheetPosition === "full") {
      if (currentPosition > threshold || velocity > 500) {
        await controls.start("half");
        setBottomSheetPosition("half");
      } else {
        controls.start("full");
      }
    } else if (BottomSheetPosition === "half") {
      if (currentPosition < -threshold || velocity < -500) {
        await controls.start("full");
        setBottomSheetPosition("full");
      } else if (currentPosition > threshold || velocity > 500) {
        setIsClosing(true);
        await controls.start("closed");
        setBottomSheetPosition("closed");
        onClose();
      } else {
        controls.start("half");
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {isBottomSheetOpen && !isClosing && <BackgroundOverlay />}
      </AnimatePresence>
      <AnimatePresence>
        {(isBottomSheetOpen || isClosing) && (
          <motion.div
            className="rounded-t-16 border-gray-20 fixed bottom-0 left-0 right-0 flex flex-col items-center overflow-hidden border bg-white shadow-lg"
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
            {/* 스크롤 바 바텀시트 상단 고정 */}
            <Scroll className="mt-16" />
            {/* 버튼 안에 들어갈 요소들 받아서 렌더링 */}
            {children}
            {/* 버튼 바텀시트 하단 고정 */}
            <div className="fixed bottom-0 mb-32 h-48 w-[90%]">
              <Button onClick={onClose}>{buttonText}</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default BottomSheet;
