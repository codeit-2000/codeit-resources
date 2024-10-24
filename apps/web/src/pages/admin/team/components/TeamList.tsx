import IconAlert from "@repo/assets/icons/icon-modal-alert.svg?react";
import { getTeamListData } from "@repo/lib/api/team";
import ListItem from "@src/components/commons/ListItem";
import Skeleton from "@src/components/commons/Skeleton";
import useModal from "@src/hooks/useModal";
import { useQuery } from "@tanstack/react-query";

function TeamList() {
  const { openModal } = useModal();

  const { data, error, isLoading } = useQuery({
    queryKey: ["teamList"],
    queryFn: () => getTeamListData(),
    staleTime: 1 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="mt-40 flex flex-col gap-16 pb-80">
        {[1, 2, 3, 4, 5].map((item) => (
          <ListItem key={item}>
            <ListItem.Title>
              <Skeleton className="w-100 h-20 rounded" />
            </ListItem.Title>
          </ListItem>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-40 flex flex-col gap-16 pb-80">
        <div className="rounded-12 text-18-400 bg-gray-15 h-172 flex flex-col items-center justify-center gap-8 border">
          <IconAlert />
          <span>데이터를 불러오지 못했습니다.</span>
          <span>다시 시도하거나 관리자에게 문의하세요.</span>
        </div>
      </div>
    );
  }

  if (data) {
    return (
      <div className="pb-150 mt-40 flex flex-col gap-16 md:pb-80">
        {data.length ? (
          <>
            {data.map((item) => (
              <ListItem key={item.id} gap="gap-18 md:gap-32">
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Right>
                  <div className="flex cursor-pointer gap-8">
                    <button
                      type="button"
                      onClick={() => {
                        openModal("updateTeamModal", {
                          teamId: item.id,
                          teamName: item.name,
                        });
                      }}
                    >
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        openModal("deleteTeamModal", {
                          teamId: item.id,
                          teamName: item.name,
                        });
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </ListItem.Right>
              </ListItem>
            ))}
          </>
        ) : (
          <div className="rounded-12 text-18-400 bg-gray-15 h-172 flex flex-col items-center justify-center gap-8 border">
            <span>생성된 팀이 없습니다.</span>
            <span>
              상단에 있는 &quot;팀 추가&quot; 버튼을 눌러 팀을 생성해주세요!
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default TeamList;
