import OrderIcon from "@repo/assets/icons/icon-order.svg?react";

// 멤버 정렬 드랍다운 토글
export default function OrderToggle({
  isOpen,
  toggleDropdown,
  renderText,
}: {
  isOpen: boolean;
  toggleDropdown: () => void;
  renderText: () => string;
}) {
  return (
    <button
      type="button"
      onClick={toggleDropdown}
      className={`rounded-8 hover:bg-gray-15 flex items-center text-nowrap px-6 py-4 ${isOpen && "bg-gray-15"}`}
    >
      <OrderIcon />
      <span className="text-12-500 text-gray-100-opacity-60 ml-3">
        {renderText()}
      </span>
    </button>
  );
}
