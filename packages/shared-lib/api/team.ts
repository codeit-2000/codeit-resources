import { generateClient } from "aws-amplify/data";

import type { Schema } from "./../../shared-backend/amplify/data/resource";

const client = generateClient<Schema>();

type CreateTeamParams = {
  name: string;
};
/**
 * @description [팀 생성하기]
 *
 * name 값만 입력 받습니다.
 */
export const createTeamData = async (param: CreateTeamParams) => {
  return client.models.Team.create(param);
};

/**
 * @description [팀 이름 중복 확인]
 */
export const getTeamByName = async (name: string) => {
  const result = await client.models.Team.list({
    filter: { name: { eq: name } },
  });
  return result.data.length > 0;
};

/**
 * @description [팀 목록 가져오기]
 *
 * 최근 데이터가 상위에
 */
export const getTeamListData = async () => {
  const teamList = await client.models.Team.list();
  return teamList.data.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

/**
 * @description [팀 삭제하기]
 */
export const deleteTeamData = async (id: string) => {
  return client.models.Team.delete({ id });
};

/**
 * @description [팀 이름 수정하기]
 */
export const updateTeamName = async (id: string, name: string) => {
  return client.models.Team.update({ id, name });
};
