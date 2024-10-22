import Button from "@src/components/commons/Button";
import Drawer from "@src/components/commons/Drawer";
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

const meta = {
  title: "Components/Common/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "슬라이딩 효과가 있는 드로워 컴포넌트입니다. 오른쪽에서 왼쪽으로 열립니다.",
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

interface DrawerStoryProps {
  buttonText: string;
  children: ReactNode;
}

function DrawerStory({ buttonText, children }: DrawerStoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded bg-blue-500 px-16 py-8 text-white"
      >
        드로워 열기
      </button>
      <AnimatePresence>
        {isOpen && (
          <Drawer onClose={() => setIsOpen(false)} buttonText={buttonText}>
            {children}
            <div className="fixed bottom-40 w-[90%]">
              <Button>{buttonText}</Button>
            </div>
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
}

export const DefaultDrawer: Story = {
  args: {
    buttonText: "저장하기",
    onClose: () => {},
    children: null,
  },
  render: (args) => (
    <DrawerStory buttonText={args.buttonText}>
      <div className="items-start">
        <p className="mb-8">드로워에 들어갈 요소들</p>
      </div>
    </DrawerStory>
  ),
};
