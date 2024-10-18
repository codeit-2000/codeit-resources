import CodeitLogo from "@repo/assets/images/codeit.svg?react";
import CodeitTextLogo from "@repo/assets/images/codeit-resources.svg?react";
import NAV_OPTION_LIST, { NavOptionProps } from "./NavOptionList";
import { Link, NavLink } from "react-router-dom";

interface NavBarOptionProps {
  navOption: NavOptionProps;
}

const NavBarOption = ({ navOption }: NavBarOptionProps) => {
  return (
    <NavLink
      key={navOption.id}
      to={navOption.path}
      className="hover:rounded-10 flex w-full flex-col items-center py-8 hover:bg-[#FFFFFF0D] md:w-auto md:flex-row md:gap-10 md:py-10 md:pl-16"
    >
      {({ isActive }) => (
        <>
          {navOption.imgSrc({ stroke: isActive ? "#FFFFFF" : "#888893" })}
          <span
            className={`text-12-400 md:text-16-400 ${isActive ? "text-white" : "text-[#FFFFFF99]"}`}
          >
            {navOption.text}
          </span>
        </>
      )}
    </NavLink>
  );
};

const NavigationBar = () => {
  return (
    <nav className="fixed bottom-0 w-full min-w-[360px] max-w-[767px] bg-[#333236] p-16 md:bottom-auto md:h-[100vh] md:w-[200px] md:min-w-0 md:max-w-none">
      <Link to="/dashboard" className="hidden items-center gap-8 pb-12 md:flex">
        <CodeitLogo width={26} height={26} />
        <CodeitTextLogo />
      </Link>
      <ul className="flex justify-evenly md:flex-col md:gap-10 md:border-t md:border-white md:border-opacity-10 md:pt-12">
        {NAV_OPTION_LIST.map((navOption) => (
          <NavBarOption key={navOption.id} navOption={navOption} />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
