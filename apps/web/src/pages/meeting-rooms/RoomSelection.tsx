import clsx from "clsx";
import { useState } from "react";

interface RoomSelectionProps {
  subType: string;
  roomList: string[];
}

export function RoomSelection({ subType, roomList }: RoomSelectionProps) {
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
                  "bg-purple-80 md:bg-gray-80 text-gray-0": activeRoom === room,
                  "text-gray-100-opacity-80 border-gray-100-opacity-10":
                    activeRoom !== room,
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
