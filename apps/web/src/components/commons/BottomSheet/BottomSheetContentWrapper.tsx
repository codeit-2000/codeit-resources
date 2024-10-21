import { ReactNode } from "react";

interface BottomSheetContentWrapperProps {
  children: ReactNode;
}

function BottomSheetContentWrapper({
  children,
}: BottomSheetContentWrapperProps) {
  return (
    <div className="border-gray-20 absolute left-0 top-0 flex h-[100lvh] w-full flex-col items-center overflow-y-auto border bg-white shadow-lg">
      {children}
    </div>
  );
}

export default BottomSheetContentWrapper;
