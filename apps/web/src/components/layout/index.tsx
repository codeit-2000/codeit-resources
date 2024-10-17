import Dashboard from "@src/pages/dashboard";
import { Routes, Route } from "react-router-dom";
import MeetingRooms from "@src/pages/meeting-rooms";
import Seats from "@src/pages/seats";
import Equipments from "@src/pages/equipments";
import NavigationBar from "@src/components/layout/NavigationBar";
import AuthTestPage from "@src/pages/auth-test";

export default function Layout() {
  return (
    <div>
      <NavigationBar />
      <div>
        <Routes>
          <Route path="/dashboard" index element={<Dashboard />} />
          <Route path="/meeting-rooms" element={<MeetingRooms />} />
          <Route path="/seats" element={<Seats />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/auth-test" element={<AuthTestPage />} />
        </Routes>
      </div>
    </div>
  );
}
