import Dropdown from "@src/components/commons/Dropdown";
import { useState } from "react";

export default function Dashboard() {
  const [role, setRole] = useState("MEMBER");
  const [orderBy, setOrderby] = useState("latest");
  const [meetingRoom, setMeetingRoom] = useState("ROOM1");

  return (
    <div>
      <h1>This is Dashboard Page :)</h1>

      <div className="flex gap-20">
        <Dropdown
          variant="role"
          selectedValue={role}
          onSelect={(value) => setRole(value)}
        >
          <Dropdown.Toggle>멤버</Dropdown.Toggle>
          <Dropdown.Wrapper>
            <Dropdown.Item value="MEMBER">멤버</Dropdown.Item>
            <Dropdown.Item value="ADMIN">어드민</Dropdown.Item>
          </Dropdown.Wrapper>
        </Dropdown>

        <Dropdown
          variant="order"
          selectedValue={orderBy}
          onSelect={(value) => setOrderby(value)}
        >
          <Dropdown.Toggle>최신순</Dropdown.Toggle>
          <Dropdown.Wrapper>
            <Dropdown.Item value="latest">최신순</Dropdown.Item>
            <Dropdown.Item value="alphabetical">가나다순</Dropdown.Item>
            <Dropdown.Item value="oldest">오래된순</Dropdown.Item>
          </Dropdown.Wrapper>
        </Dropdown>

        <div className="w-320">
          <Dropdown
            variant="meetingRoom"
            selectedValue={meetingRoom}
            onSelect={(value) => setMeetingRoom(value)}
          >
            <Dropdown.Toggle>회의실 선택</Dropdown.Toggle>
            <Dropdown.Wrapper>
              <Dropdown.Item value="ROOM1">회의실 1</Dropdown.Item>
              <Dropdown.Item value="ROOM2">회의실 2</Dropdown.Item>
              <Dropdown.Item value="ROOM3">회의실 3</Dropdown.Item>
              <Dropdown.Item value="ROOM4">회의실 4</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
