import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav>
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
