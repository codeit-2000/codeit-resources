import CodeitLogo from "@repo/assets/images/codeit.svg?react";
import CodeitTextLogo from "@repo/assets/images/codeit-resources.svg?react";
import { Link, NavLink } from "react-router-dom";
import useDeviceSize from "@src/hooks/useDeviceSize";
import NAV_OPTION_LIST, { NavOptionProps } from "./NavOptionList";

interface NavBarOptionProps {
  navOption: NavOptionProps;
  isMobile: boolean;
}

function NavBarOption({ navOption, isMobile }: NavBarOptionProps) {
  return (
    <NavLink
      key={navOption.id}
      to={navOption.path}
      className={`flex hover:bg-[#FFFFFF0D] ${isMobile ? "hover:rounded-10 w-60 flex-col items-center py-8" : "hover:rounded-10 flex-row items-center gap-10 py-10 pl-16"}`}
    >
      {({ isActive }) => (
        <>
          {navOption.imgSrc({ stroke: isActive ? "#FFFFFF" : "#888893" })}
          <span
            className={`${isMobile ? "text-12-400" : "text-16-400"} ${isActive ? "text-white" : "text-[#FFFFFF99]"}`}
          >
            {navOption.text}
          </span>
        </>
      )}
    </NavLink>
  );
}

function Sidebar() {
  const deviceSize = useDeviceSize();
  const isMobile = deviceSize === "mobile";

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
        className={`flex justify-evenly ${!isMobile && "flex-col gap-10 border-t border-white border-opacity-10 pt-12"}`}
      >
        {NAV_OPTION_LIST.map((navOption) => (
          <NavBarOption
            key={navOption.id}
            navOption={navOption}
            isMobile={isMobile}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
