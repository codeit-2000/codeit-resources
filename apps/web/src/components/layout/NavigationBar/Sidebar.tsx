import CodeitLogo from "@repo/assets/images/codeit.svg?react";
import CodeitTextLogo from "@repo/assets/images/codeit-resources.svg?react";
import navOptionList from "./NavOptionList";
import { Link, useLocation } from "react-router-dom";
import useDeviceSize from "@src/hooks/useDeviceSize";

const Sidebar = () => {
  const deviceSize = useDeviceSize();
  const isMobile = deviceSize === "mobile";
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`${isMobile ? "min-w-360 max-w-767 fixed bottom-0 w-full" : "w-200 h-[100vh]"} bg-[#333236] p-16`}
    >
      {!isMobile && (
        <Link to="/dashboard" className="flex items-center gap-8 pb-12">
          <CodeitLogo width={26} height={26} />
          <CodeitTextLogo />
        </Link>
      )}
      <ul
        className={`flex justify-evenly ${!isMobile && "flex-col gap-10 border-t border-white border-opacity-10 pt-12"} justify-evenly`}
      >
        {navOptionList.map((navOption) => {
          const active = isActive(navOption.path);
          return (
            <Link
              key={navOption.id}
              to={navOption.path}
              className={`flex hover:bg-[#FFFFFF0D] ${isMobile ? "hover:rounded-10 w-60 flex-col items-center py-8" : "hover:rounded-10 flex-row items-center gap-10 py-10 pl-16"}`}
            >
              <div>
                {navOption.imgSrc({ stroke: active ? "#FFFFFF" : "#888893" })}
              </div>
              <span
                className={`${isMobile ? "text-12-400" : "text-16-400"} ${active ? "text-white" : "text-[#FFFFFF99]"}`}
              >
                {navOption.text}
              </span>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
