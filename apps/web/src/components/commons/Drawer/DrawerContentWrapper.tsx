import { ReactNode } from "react";

interface DrawerContentWrapperProps {
  children: ReactNode;
}

function DrawerContentWrapper({ children }: DrawerContentWrapperProps) {
  return (
    <div className="border-gray-20 absolute left-0 top-0 flex h-[100lvh] w-full flex-col items-center overflow-y-auto border bg-white shadow-lg">
      {children}
    </div>
  );
}

export default DrawerContentWrapper;
