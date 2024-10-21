import Person from "@repo/assets/icons/icon-person.svg?react";
import Meeting from "@repo/assets/icons/icon-meeting.svg?react";
import Seats from "@repo/assets/icons/icon-seats.svg?react";
import Equipment from "@repo/assets/icons/icon-equipment.svg?react";

export interface NavOptionProps {
  id: string;
  imgSrc: ({ stroke }: { color: string }) => JSX.Element;
  text: string;
  path: string;
}

const NAV_OPTION_LIST: NavOptionProps[] = [
  {
    id: "dashboard",
    imgSrc: ({ stroke }) => <Person color={stroke} />,
    text: "대시보드",
    path: "/dashboard",
  },
  {
    id: "meeting-rooms",
    imgSrc: ({ stroke }) => <Meeting color={stroke} />,
    text: "회의실",
    path: "/meeting-rooms",
  },
  {
    id: "seats",
    imgSrc: ({ stroke }) => <Seats color={stroke} />,
    text: "좌석",
    path: "/seats",
  },
  {
    id: "equipments",
    imgSrc: ({ stroke }) => <Equipment color={stroke} />,
    text: "장비",
    path: "/equipments",
  },
  /** 
   * 어드민 role 추가되면 추가할 예정입니다
  {
    id: "admin-members",
    imgSrc: ({ stroke }) => <Person color={stroke} />,
    text: "멤버 관리",
    path: "/admin/members",
  },
  {
    id: "admin-meeting-rooms",
    imgSrc: ({ stroke }) => <Meeting color={stroke} />,
    text: "회의실 설정",
    path: "/admin/meeting-rooms",
  },
  {
    id: "admin-seats",
    imgSrc: ({ stroke }) => <Seats color={stroke} />,
    text: "좌석 설정",
    path: "/admin/seats",
  },
  {
    id: "admin-equipments",
    imgSrc: ({ stroke }) => <Equipment color={stroke} />,
    text: "장비 설정",
    path: "/admin/equipments",
  },
  */
];

export default NAV_OPTION_LIST;
