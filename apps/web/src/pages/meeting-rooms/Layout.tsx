import ChevronLeft from "@repo/assets/icons/icon-chevron-left.svg?react";
import ChevronRight from "@repo/assets/icons/icon-chevron-right.svg?react";
import clsx from "clsx";
import { useState } from "react";

import ReservationForm from "./ReservationForm";

function Header({ className }: { className?: string }) {
  return (
    <header className={className}>
      <div className="flex">
        {/* 타이틀 */}
        <h1 className="text-24-700 md:text-28-700 mr-24 text-gray-100">
          회의실 예약
        </h1>
        {/* TODO 날짜 이동, 탭이랑 연동 후 기능 구현 */}
        <div>
          <button className="text-14-500" type="button">
            <ChevronLeft />
          </button>
          <span className="text-28-700 mx-16 text-gray-100">2024년 7월</span>
          <button className="text-14-500" type="button">
            <ChevronRight />
          </button>
        </div>
      </div>
      {/* 탭 */}
      {/* 추가 예정 */}
    </header>
  );
}

interface RoomSelectionProps {
  subType: string;
  roomList: string[];
}

function RoomSelection({ subType, roomList }: RoomSelectionProps) {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  const handleRoomClick = (room: string) => {
    setActiveRoom(room);
  };

  return (
    <>
      <h3 className="text-14-500 text-gray-100-opacity-50 mb-16">{subType}</h3>
      <ul className="flex gap-16 md:flex-col">
        {roomList.map((room) => (
          <li key={room}>
            <button
              type="button"
              onClick={() => handleRoomClick(room)}
              className={clsx(
                "text-16-500 rounded-8 md:min-w-128 md:h-59 flex h-48 min-w-80 cursor-pointer items-center justify-center border-[1px]",
                {
                  "bg-purple-80 md:bg-gray-80 text-gray-0": activeRoom === room, // 액티브 상태일 때
                  "text-gray-100-opacity-80 border-gray-100-opacity-10":
                    activeRoom !== room, // 비액티브 상태일 때
                },
              )}
            >
              {room}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

function Layout() {
  return (
    <div className="">
      <ReservationForm />
      <Header className="px-64 py-24" />
      <section className="bg-gray-5 min-h-screen px-64 py-24">
        <RoomSelection
          subType="미팅룸"
          roomList={["미팅룸 A", "미팅룸 B", "미팅룸 C"]}
        />
      </section>
    </div>
  );
}

function MobileLayout() {
  return (
    <div className="">
      <Header className="px-64 py-24" />
      <section className="bg-gray-5 min-h-screen px-64 py-24">
        <RoomSelection
          subType="미팅룸"
          roomList={["미팅룸 A", "미팅룸 B", "미팅룸 C"]}
        />
      </section>
    </div>
  );
}

export default Layout;
