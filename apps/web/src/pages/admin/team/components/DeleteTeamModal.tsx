import LoadingSpinner from "@repo/assets/gifs/loading-spinner.svg?react";
import IconAlert from "@repo/assets/icons/icon-modal-alert.svg?react";
import { deleteTeamData } from "@repo/lib/api/team";
import Button from "@src/components/commons/Button";
import useModal from "@src/hooks/useModal";
import useToast from "@src/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteTeamModalProps {
  teamId: string;
  teamName: string;
}

function DeleteTeamModal({ teamId, teamName }: DeleteTeamModalProps) {
  const { closeModal } = useModal();
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTeamData(teamId),
    onSuccess: (res) => {
      if (res.data) {
        success(`${res.data.name} 팀이 삭제되었습니다.`);
      } else {
        error("팀을 삭제하는데 실패하였습니다.");
      }
      queryClient.invalidateQueries({ queryKey: ["teamList"] });
    },
    onError: () => {
      error("팀을 삭제하는데 실패하였습니다.");
    },
    onSettled: () => {
      closeModal();
    },
  });

  const handleDeleteModal = () => {
    mutate();
  };

  return (
    <div className="rounded-16 w-370 h-213 flex flex-col items-center justify-between bg-white px-32 py-24">
      <IconAlert />
      <p className="text-17-500 text-gray-100">{teamName} 팀 삭제</p>
      <p className="text-gray-100-opacity-80 text-15-400">
        삭제된 팀은 다시 복구할 수 없습니다.
      </p>
      <div className="flex gap-20">
        <Button
          onClick={closeModal}
          variant="secondary"
          size="modal"
          width="w-86"
          height="h-40"
        >
          취소하기
        </Button>
        <Button
          onClick={handleDeleteModal}
          size="modal"
          width="w-86"
          height="h-40"
          disabled={isPending}
        >
          {isPending ? <LoadingSpinner height={27} width="100%" /> : "삭제하기"}
        </Button>
      </div>
    </div>
  );
}

export default DeleteTeamModal;
