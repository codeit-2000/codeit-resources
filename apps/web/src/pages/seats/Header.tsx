import Badge from "@src/components/commons/Badge";
import Tab from "@src/components/commons/Tab";
import clsx from "clsx";

const DATE_DATA = [
  { id: 0, day: "7월 28일" },
  { id: 1, day: "7월 29일" },
];

export default function Header() {
  return (
    <header className="pt-62 border-gray-100-opacity-20 min-w-700 border-b bg-white pl-16 md:min-w-[1240px] md:pl-64 md:pt-24">
      <h1 className="text-24-700 md:text-28-700">좌석 예약</h1>

      <Tab defaultIndex={DATE_DATA[0].id} className="gap-24 md:mt-24">
        {({ activeIndex, handleClick }) =>
          DATE_DATA.map(({ id, day }) => (
            <div key={id}>
              {id === 0 && <Badge variant="primary">오늘</Badge>}
              <button
                type="button"
                className={clsx("block", {
                  "border-purple-90 text-purple-90 border-b-2 pb-16 font-semibold":
                    id === activeIndex,
                  "pb-18": id !== activeIndex,
                })}
                onClick={() => handleClick(id)}
              >
                {day}
              </button>
            </div>
          ))
        }
      </Tab>
    </header>
  );
}
