import clsx from "clsx";

interface WithNameProps {
  type: "fixed";
  name: string;
}

interface WithoutNameProps {
  type: "enable" | "disabled";
  name?: never;
}
type Props = WithNameProps | WithoutNameProps;

export default function SeatButton({ type, name }: Props) {
  const classnames = clsx(
    "rounded-3 relative border-gray-100-opacity-20 md:w-90 px-10 h-36 w-60 border bg-white focus:bg-purple-50 hover:enabled:bg-purple-50 disabled:cursor-not-allowed md:h-48",
    {
      "bg-gray-100-opacity-5 overflow-hidden": type === "disabled",
      "bg-gray-100-opacity-10 text-gray-100-opacity-30 truncate":
        type === "fixed",
    },
  );

  return (
    <button
      type="button"
      disabled={type === "disabled" || type === "fixed"}
      className={classnames}
    >
      {type === "fixed" && name}
      {type === "disabled" && (
        <div className="absolute inset-0 h-1 w-[200%] origin-top-left rotate-[29.5deg] transform bg-gray-300 md:rotate-[27deg]" />
      )}
    </button>
  );
}
