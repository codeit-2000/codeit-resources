import Button from "@src/components/commons/Button";
import useModal from "@src/hooks/useModal";

import TeamList from "./components/TeamList";

function AdminTeamPage() {
  const { openModal } = useModal();

  return (
    <div className="bg-gray-5 md:px-88 lg:px-118 px-58 h-screen pt-80">
      <div className="flex items-center justify-between">
        <h1 className="text-24-700 md:text-28-700 text-gray-100">팀 관리</h1>
        <Button
          onClick={() => {
            openModal("addTeamModal");
          }}
          variant="secondary"
          width="w-110"
          height="h-42"
        >
          + 팀 추가
        </Button>
      </div>
      <TeamList />
    </div>
  );
}

export default AdminTeamPage;
