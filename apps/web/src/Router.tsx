import Layout from "@src/components/layout";
import AuthTest from "@src/pages/auth-test";
import Dashboard from "@src/pages/dashboard";
import Equipments from "@src/pages/equipments";
import MeetingRooms from "@src/pages/meeting-rooms";
import Seats from "@src/pages/seats";
import { Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="meeting-rooms" element={<MeetingRooms />} />
        <Route path="seats" element={<Seats />} />
        <Route path="equipments" element={<Equipments />} />
      </Route>

      <Route path="/auth-test" element={<AuthTest />} />
    </Routes>
  );
}
