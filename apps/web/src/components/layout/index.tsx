import NavigationBar from "@src/components/layout/NavigationBar";
import { Outlet } from "react-router-dom";

export default function Layout() {

  return (
    <>
      <NavigationBar />
      <main className="md:ml-200">
        <Outlet />
      </main>
    </>
  );
}
