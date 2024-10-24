import {
    ReservationCheckData,
    checkParticipant,
    checkReservationConflict,
  } from "./reservationUtils";
  import { Reservation, ResourceType, generateAmplifyClient } from "./utils";
  
  const client = generateAmplifyClient();
  
  export const getReservationById = async (id: string) => {
    return await client.models.Reservation.get({ id });
  };
  
  // amplify에 전달할 예약 생성 데이터 타입 (연결 필드 제외)
  type CreateReservation = Omit<Reservation, "resource">;
  
  export const createReservation = async (
    reservationData: Omit<CreateReservation, "status" | "resourceType">,
  ) => {
    // 리소스 타입 설정을 위한 get
    const { data: resource, errors } = await client.models.Resource.get({
      id: reservationData.resourceId,
    });
  
    if (errors) {
      throw new Error(errors[0].message);
    }
  
    // 충돌하는 예약이 있는지 확인
    if (!checkReservationConflict(reservationData)) {
      throw new Error("해당 시간에 이미 예약이 있습니다.");
    }
  
    const data = {
      ...reservationData,
      // 리소스 타입은 get함수로 가져와서 등록 (충돌 방지)
      resourceType: resource?.resourceType,
      // 예약 생성시 status는 CONFIRMED로 고정
      status: "CONFIRMED",
    };
  
    return await client.models.Reservation.create(data as CreateReservation);
  };
  
  export const updateReservation = async (
    // CreateReservation 전체를 옵셔널로 갖되,
    // 예약 충돌 확인에 필요한 데이터 필드와 id를 필수로 갖도록 설정
    reservationData: Partial<CreateReservation> &
      ReservationCheckData & {
        id: string;
      },
    userId?: string,
  ) => {
    // TODO user id 어떻게 가져올지..
    if (
      !checkParticipant({
        reservationId: reservationData?.id || "",
        userId: userId || "천권희",
        // c4d80dbc-50f1-70a3-d651-cca949d01276
      })
    ) {
      throw new Error("해당 예약의 참여자만 수정이 가능합니다.");
    }
  
    if (!checkReservationConflict(reservationData)) {
      throw new Error("해당 시간에 이미 예약이 있습니다.");
    }
  
    return await client.models.Reservation.update(reservationData);
  };
  
  export const cancelReservation = async (
    targetReservationData: CreateReservation,
  ) => {
    return await updateReservation({
      ...targetReservationData,
      status: "CANCELED",
    });
  };
  
  /**
   * 리소스 ID를 기준으로 예약 list를 가져옵니다.
   * date를 기준으로 필터링 또는 정렬이 가능합니다.
   * @param resourceId
   * @param filter - { status: { eq: "CONFIRMED" }, data: { eq: "2024-10-24"}}
   * @returns
   */
  export const getReservationListByResourceId = async (
    resourceId: string,
    filter: { [key: string]: any },
  ) => {
    const options: { [key: string]: any } = {
      filter: {
        ...filter,
      },
      sortDirection: "ASC",
    };
  
    return await client.models.Reservation.listByResourceIdAndDate(
      {
        resourceId,
      },
      options,
    );
  };
  
  /**
   * 리소스 Type를 기준으로 예약 list를 가져옵니다.
   * date를 기준으로 필터링 또는 정렬이 가능합니다.
   * @param resourceType
   * @param filter - { status: { eq: "CONFIRMED" }, data: { eq: "2024-10-24"}}
   * @returns
   */
  export const getReservationListByResourceType = async (
    resourceType: ResourceType,
    filter: { [key: string]: any },
  ) => {
    const options: { [key: string]: any } = {
      filter: {
        ...filter,
      },
      sortDirection: "ASC",
    };
  
    return await client.models.Reservation.listByResourceTypeAndDate(
      {
        resourceType,
      },
      options,
    );
  };
  