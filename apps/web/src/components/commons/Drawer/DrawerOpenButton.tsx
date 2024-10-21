interface DrawerOpenButtonProps {
  handleDrawerOpen: () => void;
}

function DrawerOpenButton({ handleDrawerOpen }: DrawerOpenButtonProps) {
  return (
    <button
      type="button"
      onClick={handleDrawerOpen}
      className="rounded bg-purple-500 p-2 text-white"
    >
      드로어 열기
    </button>
  );
}

export default DrawerOpenButton;
