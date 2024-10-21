import { generateClient } from "aws-amplify/data";

import type { Schema } from "./../../shared-backend/amplify/data/resource";

const client = generateClient<Schema>();

// TODO: 팀이 새롭게 생성되어서 멤버 목록 관련된 API는 추후에 해보겠습니다.

type Role = Schema["User"]["type"]["role"];

type CreateUserParams = {
  id: string; // cognito에서 생성된 id값으로 진행합니다.
  username: string; // 유저 이름
  email: string; // 유저 이메일
  role: Role; // 유저 역할 ADMIN | MEMBER
  teams: [string]; // 소속 팀
  profileImage?: string; // 유저 프로필 이미지
};
/**
 * @description [유저 생성하기] - 관리자 페이지
 *
 * id, username, email, role, teams 모두 입력받아야 합니다.
 */
export const createUserData = async (param: CreateUserParams) => {
  return await client.models.User.create(param);
};

/**
 * @description [특정 유저 정보 가져오기]
 *
 * 해당 id값을 가진 유저 정보 가져오기
 * 내 정보, 다른 사람 정보 다 가져올 수 있음
 */
export const getUserData = async (id: string) => {
  return await client.models.User.get({ id });
};

type UpdateUserParams = {
  id: string; // 업데이트할 유저 ID
  role?: Role;
  username?: string;
  email?: string;
  profileImage?: string;
  teams?: [string];
};
/**
 * @description [유저 정보 수정하기]
 *
 * id는 필수
 * role, username, email, profileImage는 선택
 */
export const updateUserData = async (param: UpdateUserParams) => {
  return await client.models.User.update(param);
};

/**
 * @description [유저 삭제하기]
 */
export const deleteUserData = async (id: string) => {
  return await client.models.User.delete({ id });
};
