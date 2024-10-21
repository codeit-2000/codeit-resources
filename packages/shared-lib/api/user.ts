import { generateClient } from "aws-amplify/data";

import type { Schema } from "./../../shared-backend/amplify/data/resource";

const client = generateClient<Schema>();

type Role = Schema["User"]["type"]["role"];

type CreateUserParams = {
  id: string; // cognito에서 생성된 id값으로 진행합니다.
  username: string; // 유저 이름
  email: string; // 유저 이메일
  role: Role; // 유저 역할 ADMIN | MEMBER
  team: string; // 소속 팀
  profileImage?: string; // 유저 프로필 이미지
};
/**
 * @description [유저 생성하기] - 관리자 페이지
 * TODO: 관리자만 생성 가능하도록 수정
 *
 * id, username, email, role, team 모두 입력받아야 합니다.
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

type Order = "recent" | "username" | "past";
/**
 * @description [유저 목록 가져오기] - 관리자 페이지
 * orderBy는 필수값 입니다.
 * "recent" | "username" | "past"
 *
 * role은 선택값 입니다.
 * "MEMBER" | "ADMIN"
 */
export const getUserListData = async (orderBy: Order, role?: Role) => {
  if (role) {
    switch (orderBy) {
      case "username":
        return await client.models.User.listUsersByRoleName(
          { role },
          { sortDirection: "ASC" },
        );
      case "recent":
        return await client.models.User.listUsersByRoleDate(
          { role },
          { sortDirection: "ASC" },
        );
      case "past":
        return await client.models.User.listUsersByRoleDate(
          { role },
          { sortDirection: "DESC" },
        );
      default:
        throw new Error("데이터를 가져오는데 실패하였습니다.");
    }
  } else {
    const list = await client.models.User.list();

    switch (orderBy) {
      case "username":
        return list.data.sort((a, b) => a.username.localeCompare(b.username));
      case "recent":
        return list.data.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case "past":
        return list.data.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });
      default:
        throw new Error("데이터를 가져오는데 실패하였습니다.");
    }
  }
};

/**
 * @description [참여할 유저 목록 가져오기] - 회의실 예약 페이지
 *
 * team으로 1차 정렬, username으로 2차 정렬
 */
export const getParticipatingUsers = async () => {
  const list = await client.models.User.list();

  return list.data.sort((a, b) => {
    const teamComparison = (a.team ?? "").localeCompare(b.team ?? "");
    return teamComparison === 0
      ? a.username.localeCompare(b.username)
      : teamComparison;
  });
};

type UpdateUserParams = {
  id: string; // 업데이트할 유저 ID
  role?: Role;
  username?: string;
  email?: string;
  profileImage?: string;
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
