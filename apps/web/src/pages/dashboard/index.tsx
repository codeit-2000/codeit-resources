import Tab from "@src/components/commons/Tab";

export default function Dashboard() {
  return (
    <div>
      <h1>This is Dashboard Page :)</h1>

      <Tab className="gap-12 bg-red-500">
        {({ activeIndex, handleClick }) =>
          Array.from({ length: 30 }).map((_, index) => (
            <button
              type="button"
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={`${index === activeIndex ? "text-blue-50" : ""}`}
              onClick={() => handleClick(index)}
            >
              Item {index + 1}
            </button>
          ))
        }
      </Tab>
    </div>
  );
}
