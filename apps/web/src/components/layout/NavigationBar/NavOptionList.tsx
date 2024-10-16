import Person from "@repo/assets/icons/icon-person.svg?react";
import Meeting from "@repo/assets/icons/icon-meeting.svg?react";
import Seats from "@repo/assets/icons/icon-seats.svg?react";
import Equipment from "@repo/assets/icons/icon-equipment.svg?react";

interface NavOptionListProps {
  id: number;
  imgSrc: ({ stroke }: { stroke: string }) => JSX.Element;
  text: string;
  path: string;
}

const navOptionList: NavOptionListProps[] = [
  {
    id: 1,
    imgSrc: ({ stroke }) => <Person stroke={stroke} />,
    text: "대시보드",
    path: "/dashboard",
  },
  {
    id: 2,
    imgSrc: ({ stroke }) => <Meeting stroke={stroke} />,
    text: "회의실",
    path: "/meeting-rooms",
  },
  {
    id: 3,
    imgSrc: ({ stroke }) => <Seats stroke={stroke} />,
    text: "좌석",
    path: "/seats",
  },
  {
    id: 4,
    imgSrc: ({ stroke }) => <Equipment stroke={stroke} />,
    text: "장비",
    path: "/equipments",
  },
];

export default navOptionList;
