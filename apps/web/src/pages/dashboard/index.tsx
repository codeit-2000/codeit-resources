import Dropdown from "@src/components/commons/Dropdown";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [role, setRole] = useState("MEMBER");
  const [orderBy, setOrderby] = useState("latest");
  const [meetingRoom, setMeetingRoom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startError, setStartError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [endError, setEndError] = useState({
    isError: false,
    errorMessage: "",
  });

  const validateTimeFormat = (time: string) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // "HH:mm" 형식 검증
    return timeRegex.test(time);
  };

  useEffect(() => {
    if (startTime && !validateTimeFormat(startTime)) {
      setStartError({
        isError: true,
        errorMessage: "시간 형식이 올바르지 않아요.",
      });
    } else {
      setStartError({ isError: false, errorMessage: "" });
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime && !validateTimeFormat(endTime)) {
      setEndError({
        isError: true,
        errorMessage: "시간 형식이 올바르지 않아요.",
      });
    } else {
      setEndError({ isError: false, errorMessage: "" });
    }
  }, [endTime]);

  return (
    <div>
      <h1>This is Dashboard Page :)</h1>

      <div className="flex gap-20">
        <Dropdown
          variant="role"
          value={role}
          onChange={(newValue) => setRole(newValue)}
        >
          <Dropdown.Toggle />
          <Dropdown.Wrapper>
            <Dropdown.Item itemValue="MEMBER">멤버</Dropdown.Item>
            <Dropdown.Item itemValue="ADMIN">어드민</Dropdown.Item>
          </Dropdown.Wrapper>
        </Dropdown>

        <Dropdown
          variant="order"
          value={orderBy}
          onChange={(newValue) => setOrderby(newValue)}
        >
          <Dropdown.Toggle />
          <Dropdown.Wrapper>
            <Dropdown.Item itemValue="latest">최신순</Dropdown.Item>
            <Dropdown.Item itemValue="alphabetical">가나다순</Dropdown.Item>
            <Dropdown.Item itemValue="oldest">오래된순</Dropdown.Item>
          </Dropdown.Wrapper>
        </Dropdown>

        <div className="w-320">
          <Dropdown
            variant="meetingRoom"
            value={meetingRoom}
            onChange={(newValue) => setMeetingRoom(newValue)}
          >
            <Dropdown.Toggle />
            <Dropdown.Wrapper>
              <Dropdown.Item itemValue="ROOM1">회의실 1</Dropdown.Item>
              <Dropdown.Item itemValue="ROOM2">회의실 2</Dropdown.Item>
              <Dropdown.Item itemValue="ROOM3">회의실 3</Dropdown.Item>
              <Dropdown.Item itemValue="ROOM4">회의실 4</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
      </div>
      <div className="mt-50 flex gap-20">
        <div className="w-200">
          <Dropdown
            variant="startTime"
            value={startTime}
            onChange={(value) => setStartTime(value)}
          >
            <Dropdown.Toggle
              isError={startError.isError}
              errorMessage={startError.errorMessage}
            />
            <Dropdown.Wrapper>
              <Dropdown.ManualItem>직접 입력</Dropdown.ManualItem>
              <Dropdown.Item itemValue="10:00">10:00</Dropdown.Item>
              <Dropdown.Item itemValue="11:00">11:00</Dropdown.Item>
              <Dropdown.Item itemValue="12:00">12:00</Dropdown.Item>
              <Dropdown.Item itemValue="13:00">13:00</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
        </div>

        <div className="w-200">
          <Dropdown
            variant="endTime"
            value={endTime}
            onChange={(value) => setEndTime(value)}
          >
            <Dropdown.Toggle
              isError={endError.isError}
              errorMessage={endError.errorMessage}
            />
            <Dropdown.Wrapper>
              <Dropdown.ManualItem>직접 입력</Dropdown.ManualItem>
              <Dropdown.Item itemValue="10:00">10:00</Dropdown.Item>
              <Dropdown.Item itemValue="11:00">11:00</Dropdown.Item>
              <Dropdown.Item itemValue="12:00">12:00</Dropdown.Item>
              <Dropdown.Item itemValue="13:00">13:00</Dropdown.Item>
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
