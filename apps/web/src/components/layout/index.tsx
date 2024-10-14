import Dashboard from "@src/pages/dashboard";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import MeetingRooms from "@src/pages/meeting-rooms";
import Seats from "@src/pages/seats";
import Equipments from "@src/pages/equipments";

export default function Layout() {
  return (
    <div>
      <Sidebar />
      <div>
        <Routes>
          <Route path="/dashboard" index element={<Dashboard />} />
          <Route path="/meeting-rooms" element={<MeetingRooms />} />
          <Route path="/seats" element={<Seats />} />
          <Route path="/equipments" element={<Equipments />} />
        </Routes>
      </div>
    </div>
  );
}
