import CodeitTextLogo from "@repo/assets/images/codeit-resources.svg?react";
import CodeitLogo from "@repo/assets/images/codeit.svg?react";
import { Link, NavLink } from "react-router-dom";

import NAV_OPTION_LIST, { NavOptionProps } from "./NavOptionList";

interface NavBarOptionProps {
  navOption: NavOptionProps;
}

function NavBarOption({ navOption }: NavBarOptionProps) {
  return (
    <NavLink
      key={navOption.id}
      to={navOption.path}
      className="hover:rounded-10 hover:bg-gray-00-opacity-5 flex w-full flex-col items-center py-8 md:w-auto md:flex-row md:gap-10 md:py-10 md:pl-16"
    >
      {({ isActive }) => (
        <>
          {navOption.imgSrc({ color: isActive ? "#FFFFFF" : "#888893" })}
          <span
            className={`text-12-400 md:text-16-400 ${isActive ? "text-white" : "text-gray-00-opacity-60"}`}
          >
            {navOption.text}
          </span>
        </>
      )}
    </NavLink>
  );
}

function NavigationBar() {
  return (
    <nav className="fixed bottom-0 z-20 w-full min-w-[360px] max-w-[767px] bg-gray-100 p-16 md:bottom-auto md:h-screen md:w-[200px] md:min-w-0 md:max-w-none">
      <Link to="/dashboard" className="hidden items-center gap-8 pb-12 md:flex">
        <CodeitLogo width={26} height={26} />
        <CodeitTextLogo color="#fff" />
      </Link>
      <ul className="flex justify-evenly md:flex-col md:gap-10 md:border-t md:border-white md:border-opacity-10 md:pt-12">
        {NAV_OPTION_LIST.map((navOption) => (
          <NavBarOption key={navOption.id} navOption={navOption} />
        ))}
      </ul>
    </nav>
  );
}

export default NavigationBar;
