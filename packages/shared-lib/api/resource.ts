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
 *     resourceType: "Room",
 *     resourceSubtype: "미팅룸",
 *     name: "미팅룸A",
 *   });
 * };
 * ```
 */

export const createResource = async (resourceData: CreateResourceParams) => {
  return await client.models.Resource.create(resourceData);
};

// Get

/**
 *
 * @description Resource 목록 가져오는 함수
 *
 * `resourceType`을 넣지 않으면 전체 목록을 가져오고,
 * `resourceType`을 넣으면 해당하는 목록을 가져옵니다.
 *
 * @example
 * ```tsx
 * const { data, error } = await getResourceList(); // 전체 목록을 가져옵니다.
 * const { data } = await getResourceList({ resourceType: "Room" }); // 회의실 목록을 가져옵니다.
 * ```
 */

export const getResourceList = async ({
  resourceType,
}: {
  resourceType?: "Room" | "Seat" | "Equipment";
} = {}) => {
  if (resourceType === undefined) return await client.models.Resource.list();

  return await client.models.Resource.listResourceByResourceType({
    resourceType,
  });
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
