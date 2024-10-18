import Dashboard from "@src/pages/dashboard";
import { Routes, Route } from "react-router-dom";
import MeetingRooms from "@src/pages/meeting-rooms";
import Seats from "@src/pages/seats";
import Equipments from "@src/pages/equipments";
import Layout from "./components/layout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="meeting-rooms" element={<MeetingRooms />} />
        <Route path="seats" element={<Seats />} />
        <Route path="equipments" element={<Equipments />} />
      </Route>

      {/* <Route path="/login" element={<Login />} />  */}
    </Routes>
  );
}
