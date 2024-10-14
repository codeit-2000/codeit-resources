import { css } from "@emotion/react";
import Dashboard from "@src/pages/dashboard";
import Sidebar from "./Sidebar";
import { Routes, Route } from "react-router-dom";
import MeetingRooms from "@src/pages/meeting-rooms";
import Seats from "@src/pages/seats";
import Equipments from "@src/pages/equipments";

export default function Layout() {
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Sidebar />
      <div
        css={css`
          margin-left: 120px; /* 사이드바의 너비만큼 오른쪽으로 이동 */
          padding: 20px;
          width: calc(100% - 120px); /* 화면의 나머지 부분을 차지 */
        `}
      >
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
