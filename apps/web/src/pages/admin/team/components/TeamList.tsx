import { getTeamListData } from "@repo/lib/api/team";
import { useQuery } from "@tanstack/react-query";

function TeamList() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["teamList"],
    queryFn: () => getTeamListData(),
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  if (data) {
    return <div>팀 목록</div>;
  }
}

export default TeamList;
