import ChevronLeft from "@repo/assets/icons/icon-chevron-left.svg?react";
import ChevronRight from "@repo/assets/icons/icon-chevron-right.svg?react";
import getDaysUntilEndOfMonth from "@repo/lib/utils/getDaysUntilEndOfMonth";
import Badge from "@src/components/commons/Badge";
import Tab from "@src/components/commons/Tab";
import clsx from "clsx";
import { useState } from "react";

interface DateState {
  year: number;
  month: number;
  days: Array<{ id: string; day: string; weekday: string }>;
}

function Header({ className }: { className?: string }) {
  const today = getDaysUntilEndOfMonth();
  const [date, setDate] = useState<DateState>(today);
  const { year, month, days } = date;

  const handlePrevButton = () => {
    setDate((prev) => {
      const prevDateYear = prev.month === 1 ? prev.year - 1 : prev.year;
      const prevDateMonth = prev.month === 1 ? 11 : prev.month - 2;
      if (prevDateMonth + 1 === today.month) return today;
      return getDaysUntilEndOfMonth(new Date(prevDateYear, prevDateMonth, 1));
    });
  };

  const handleNextButton = () => {
    setDate((prev) => {
      const nextDateYear = prev.month === 12 ? prev.year + 1 : prev.year;
      const nextDateMonth = prev.month === 12 ? 0 : prev.month;

      if (nextDateMonth + 1 === today.month) return today;
      return getDaysUntilEndOfMonth(new Date(nextDateYear, nextDateMonth, 1));
    });
  };

  return (
    <header className={className}>
      <div className="flex">
        {/* 타이틀 */}
        <h1 className="text-24-700 md:text-28-700 mb-16 mr-24 text-gray-100">
          회의실 예약
        </h1>
        <div>
          <button
            className={clsx(
              "text-14-500 disabled:cursor-not-allowed disabled:opacity-30",
            )}
            type="button"
            onClick={handlePrevButton}
            disabled={year === today.year && month === today.month}
          >
            <ChevronLeft />
          </button>
          <span className="text-28-700 mx-16 text-gray-100">{`${year}년 ${month}월`}</span>
          <button
            className="text-14-500"
            type="button"
            onClick={handleNextButton}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      {/* 탭 */}
      <Tab defaultIndex={0} className="border-gray-40 gap-24 border-b">
        {({ activeIndex, handleClick }) =>
          days.map(({ id, day, weekday }, index) => (
            <div key={id}>
              {index === 0 && year === today.year && month === today.month ? (
                <Badge variant="primary">오늘</Badge>
              ) : (
                <div className="h-24 w-1" />
              )}
              <button
                type="button"
                className={clsx("block", {
                  "border-b-2 border-violet-800 pb-6 font-semibold text-violet-800":
                    index === activeIndex,
                  "pb-8": index !== activeIndex,
                })}
                onClick={() => handleClick(index)}
              >
                {day}({weekday})
              </button>
            </div>
          ))
        }
      </Tab>
    </header>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Header className="px-64 pt-24" />
      <section className="bg-gray-5 min-h-screen px-64 py-24">
        {children}
      </section>
    </div>
  );
}

export default Layout;
