import Person from "@repo/assets/icons/icon-person.svg?react";
import Meeting from "@repo/assets/icons/icon-meeting.svg?react";
import Seats from "@repo/assets/icons/icon-seats.svg?react";
import Equipment from "@repo/assets/icons/icon-equipment.svg?react";

export interface NavOptionProps {
  id: string;
  imgSrc: ({ stroke }: { stroke: string }) => JSX.Element;
  text: string;
  path: string;
}

const NAV_OPTION_LIST: NavOptionProps[] = [
  {
    id: "dashboard",
    imgSrc: ({ stroke }) => <Person stroke={stroke} />,
    text: "대시보드",
    path: "/dashboard",
  },
  {
    id: "meeting-rooms",
    imgSrc: ({ stroke }) => <Meeting stroke={stroke} />,
    text: "회의실",
    path: "/meeting-rooms",
  },
  {
    id: "seats",
    imgSrc: ({ stroke }) => <Seats stroke={stroke} />,
    text: "좌석",
    path: "/seats",
  },
  {
    id: "equipments",
    imgSrc: ({ stroke }) => <Equipment stroke={stroke} />,
    text: "장비",
    path: "/equipments",
  },
];

export default NAV_OPTION_LIST;
