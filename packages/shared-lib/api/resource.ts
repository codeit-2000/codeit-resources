import { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { Dispatch, SetStateAction, useEffect } from "react";

const client = generateClient<Schema>();

// Create

type CreateResourceParams = {
  resourceType: Schema["Resource"]["type"]["resourceType"];
  resourceSubtype?: string;
  name: string;
  description?: string;
  image?: string;
};

/**
 * @description Resource 생성 (관리자만 생성할 수 있습니다.)
 *
 * @example
 * ```tsx
 * const handleClick = async () => {
 *   await client.models.Resource.create({
 *     resourceType: "ROOM",
 *     resourceSubtype: "미팅룸",
 *     name: "미팅룸A",
 *   });
 * };
 * ```
 */

export const createResource = async (resourceData: CreateResourceParams) => {
  return await client.models.Resource.create(resourceData);
};

// Read

export const getResourceList = async ({
  resourceType,
  resourceSubtype,
}: {
  resourceType?: "ROOM" | "SEAT" | "EQUIPMENT";
  resourceSubtype?: string;
} = {}) => {
  // resourceSubtype이 정의되었지만 resourceType이 없는 경우 에러 처리
  if (resourceSubtype && !resourceType) {
    throw new Error("resourceSubtype을 사용할 경우 resourceType은 필수입니다.");
  }

  // 전체 목록을 가져오는 경우
  if (resourceType === undefined) return await client.models.Resource.list();

  // resourceType에 따른 목록을 가져오는 경우
  if (resourceType && resourceSubtype === undefined) {
    return await client.models.Resource.listResourceByTypeAndSubtype({
      resourceType,
    });
  }

  // resourceType과 resourceSubtype에 따른 목록을 가져오는 경우
  if (resourceType && resourceSubtype) {
    return await client.models.Resource.listResourceByTypeAndSubtype({
      resourceType,
      resourceSubtype: {
        eq: resourceSubtype,
      },
    });
  }
};

/**
 * @description 구독을 통한 실시간 업데이트 훅
 *
 * @example
 * ```tsx
 * const [resource, setResource] = useState<Array<Schema["Resource"]["type"]>>([]);
 *
 * useSubscribeResource(setResource);
 * ```
 */
export const useSubscribeResource = (
  setResource: Dispatch<SetStateAction<Array<Schema["Resource"]["type"]>>>,
) => {
  useEffect(() => {
    const subscription = client.models.Resource.observeQuery().subscribe({
      next: (data) => setResource([...data.items]),
    });

    return () => subscription.unsubscribe();
  }, [setResource]);
};

// Update

interface UpdateResourceNameParams {
  id: string;
  name: string;
}

/**
 * @description Resource의 이름을 업데이트하는 함수
 *
 * @example
 * ```tsx
 * const params = {
 *   id: "resourceId123", // 고유 ID
 *   name: "미팅룸1", // 업데이트할 이름
 * };
 *
 * await updateResourceName(params);
 * ```
 */

export const updateResourceName = async (params: UpdateResourceNameParams) => {
  return await client.models.Resource.update(params);
};

// Delete

/**
 *
 * @description Resource를 삭제하는 함수
 *
 * @example
 * ```tsx
 * const id = "resourceId123";
 * await deleteResource(id);
 * ```
 */

export const deleteResource = async (id: string) => {
  return await client.models.Resource.delete({ id });
};
