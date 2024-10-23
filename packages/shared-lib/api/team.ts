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
 * @description [팀 목록 가져오기]
 */
export const getTeamListData = async () => {
  return client.models.Team.list();
};
