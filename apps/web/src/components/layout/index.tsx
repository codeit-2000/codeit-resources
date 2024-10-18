import NavigationBar from "@src/components/layout/NavigationBar";
import useIsMobile from "@src/hooks/useIsMobile";
import { Outlet } from "react-router-dom";


export default function Layout() {
  const isMobile = useIsMobile();

  return (
    <>
      <NavigationBar />
      <main className="md:ml-200">
        <Outlet />
      </main>
    </>
  );
}
