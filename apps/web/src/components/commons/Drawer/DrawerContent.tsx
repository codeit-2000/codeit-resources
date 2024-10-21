import Scroll from "@repo/assets/icons/icon-drawer-bar.svg?react";
import Button from "@src/components/commons/Button";

interface DrawerContentProps {
  onClose: () => void;
}

function DrawerContent({ onClose }: DrawerContentProps) {
  return (
    <>
      <Scroll className="mt-16" />
      <div className="fixed bottom-0 mb-32 h-48 w-[90%]">
        <Button onClick={onClose}>저장하기</Button>
      </div>
    </>
  );
}

export default DrawerContent;
