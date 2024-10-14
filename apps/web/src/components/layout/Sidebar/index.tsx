import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav>
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
