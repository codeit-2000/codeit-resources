import type { Schema } from "@repo/backend/amplify/data/resource";
import NavigationBar from "@src/components/layout/NavigationBar";
import { authAtom, userAtom } from "@src/store/authUserAtom";
import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/data";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const client = generateClient<Schema>();

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useAtom(authAtom);
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          const userResponse = await client.models.User.get({
            id: currentUser.userId,
          });
          const userData = userResponse?.data;

          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    getUser();
  }, [setUser, setIsAuthenticated]);

  if (isAuthenticated === false) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <>
      <NavigationBar />
      <main className="md:ml-200">
        <Outlet />
      </main>
    </>
  );
}
