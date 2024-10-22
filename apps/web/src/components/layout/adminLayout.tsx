import { adminAtom } from "@src/store/authUserAtom";
import { useAtomValue } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const isAdmin = useAtomValue(adminAtom);

  if (isAdmin === false) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminLayout;
