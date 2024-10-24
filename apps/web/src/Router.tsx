import Layout from "@src/components/layout";
import AdminLayout from "@src/components/layout/adminLayout";
import AdminTeamPage from "@src/pages/admin/team";
import AuthTest from "@src/pages/auth-test";
import Dashboard from "@src/pages/dashboard";
import Equipments from "@src/pages/equipments";
import MeetingRooms from "@src/pages/meeting-rooms";
import Seats from "@src/pages/seats";
import SignIn from "@src/pages/sign-in";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="meeting-rooms" element={<MeetingRooms />} />
        <Route path="seats" element={<Seats />} />
        <Route path="equipments" element={<Equipments />} />
        {/** ADMIN 전용 페이지 */}
        <Route path="admin" element={<AdminLayout />}>
          <Route path="team" element={<AdminTeamPage />} />
        </Route>
      </Route>

      <Route path="/sign-in" element={<SignIn />} />

      {/** 테스트 페이지 */}
      <Route path="/auth-test" element={<AuthTest />} />
    </Routes>
  );
}
