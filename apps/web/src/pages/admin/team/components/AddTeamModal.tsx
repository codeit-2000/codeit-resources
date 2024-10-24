/* eslint-disable no-console */
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingSpinner from "@repo/assets/gifs/loading-spinner.svg?react";
import { createTeamData, getTeamByName } from "@repo/lib/api/team";
import { addTeamSchema } from "@repo/lib/zod-schema/team";
import Button from "@src/components/commons/Button";
import Input from "@src/components/commons/Input";
import useModal from "@src/hooks/useModal";
import useToast from "@src/hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

type AddTeamInput = {
  name: string;
};

function AddTeamModal() {
  const { closeModal } = useModal();
  const { success, error } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddTeamInput>({
    resolver: zodResolver(addTeamSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: AddTeamInput) => createTeamData(data),
  });

  const onSubmit: SubmitHandler<AddTeamInput> = async (data) => {
    try {
      if (await getTeamByName(data.name)) {
        error("이미 존재하는 팀 이름입니다.");
        return;
      }
      mutate(data, {
        onSuccess: (res) => {
          if (res.data) {
            success(`${res.data.name} 팀이 추가되었습니다.`);
          } else {
            error("팀을 추가하는데 실패하였습니다.");
          }
          queryClient.invalidateQueries({ queryKey: ["teamList"] });
        },
        onError: () => error("팀을 추가하는데 실패하였습니다."),
        onSettled: closeModal,
      });
    } catch {
      error("팀 이름 확인 중 문제가 발생했습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-16 w-370 flex flex-col items-center justify-between bg-white px-32 py-24"
    >
      <h2 className="text-17-500 text-gray-100">팀 추가</h2>
      <p className="text-gray-100-opacity-80 text-15-400">
        추가할 팀 이름을 입력해주세요.
      </p>
      <div className="my-20 flex w-full flex-col gap-8">
        <Input
          register={register("name")}
          label="팀 이름"
          id="teamName"
          errorMessage={errors.name?.message}
        />
      </div>
      <div className="flex justify-between gap-20">
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
          type="submit"
          size="modal"
          width="w-86"
          height="h-40"
          disabled={!isValid || isPending}
        >
          {isPending ? <LoadingSpinner height={27} width="100%" /> : "추가하기"}
        </Button>
      </div>
    </form>
  );
}

export default AddTeamModal;
