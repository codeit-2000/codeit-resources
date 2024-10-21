/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode, useRef, useState } from "react";

import useTabDrag from "./useTabDrag";

interface Props {
  children: (props: {
    activeIndex: number;
    handleClick: (id: number) => void;
  }) => ReactNode;
  defaultIndex?: number;
  className?: string;
}

export default function Tab({ children, defaultIndex, className }: Props) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex || 0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleMouseDown, handleMouseMove, handleMouseUpOrLeave } =
    useTabDrag(containerRef);

  const onClick = (id: number) => {
    setActiveIndex(id);
  };

  return (
    <div
      ref={containerRef}
      className={`no-scrollbar flex w-full select-none overflow-x-scroll whitespace-nowrap ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {children({ activeIndex, handleClick: onClick })}
    </div>
  );
}
