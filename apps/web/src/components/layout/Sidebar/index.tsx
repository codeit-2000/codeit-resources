import { Link } from "react-router-dom";
import { css } from "@emotion/react";
import Logo from "@src/assets/icons/logo.svg?react";

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
      <Logo />
      <ul>
        <li>
          <Link to="/dashboard">대시보드</Link>
        </li>
        <li>
          <Link to="/meeting-rooms">회의실</Link>
        </li>
        <li>
          <Link to="/seats">좌석</Link>
        </li>
        <li>
          <Link to="/equipments">장비</Link>
        </li>
      </ul>
    </nav>
  );
}
