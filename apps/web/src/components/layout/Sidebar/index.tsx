import { Link } from "react-router-dom";
import { css } from "@emotion/react";

export default function Sidebar() {
  return (
    <nav
      css={css`
        position: fixed;
        left: 0;
        top: 0;
        width: 100px;
        height: 100%;
        background-color: #f0f0f0;
        padding: 10px;
      `}
    >
      <ul>
        <Link to="/dashboard">
          <li>대시보드</li>
        </Link>
        <Link to="/meeting-rooms">
          <li>회의실</li>
        </Link>
        <Link to="/seats">
          <li>좌석</li>
        </Link>
        <Link to="/equipments">
          <li>장비</li>
        </Link>
      </ul>
    </nav>
  );
}
