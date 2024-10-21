import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

const createReservationHandler = defineFunction({
  entry: "./createReservationHandler/handler.ts",
});

const updateReservationHandler = defineFunction({
  entry: "./updateReservationHandler/handler.ts",
});

const deleteReservationHandler = defineFunction({
  entry: "./deleteReservationHandler/handler.ts",
});

const schema = a.schema({
  // User Table
  User: a
    .model({
      id: a.id().required(),
      username: a.string().required(),
      email: a.string().required(),
      role: a.enum(["ADMIN", "MEMBER"]),
      team: a.string(),
      profileImage: a.url(),
    })
    .authorization((allow) => [allow.owner()])
    .secondaryIndexes((index) => [
      index("role"), // role에 따른 멤버들 리스트 보여줌 - 관리자 페이지
      // TODO: team으로 1차 정렬하고, username으로 2차 정렬
      // TODO: 최신순, 오래된순, 가나다순 정렬
    ]),

  // Resource Table
  Resource: a
    .model({
      resourceType: a.enum(["ROOM", "SEAT", "EQUIPMENT"]),
      resourceSubtype: a.string(),
      name: a.string().required(),
      description: a.string(),
      image: a.url(),
      reservations: a.hasMany("Reservation", "resourceId"),
    })
    .secondaryIndexes((index) => [index("resourceType")])
    // ex) resourceType 기준으로 쿼리
    // const { data, errors } = await client.models.Resource.listResourceByResourceType({
    //   resourceType: 'Seat',
    // });
    .authorization((allow) => [allow.owner()]),

  // Reservation Table
  ReservationStatus: a.enum(["CONFIRMED", "CANCELED", "PASSED"]),

  Reservation: a
    .model({
      title: a.string().required(),
      resourceId: a.id().required(), // 연결된 리소스 id
      resource: a.belongsTo("Resource", "resourceId"), // Resource 컬렉션(테이블)에서 [Reservation의 resourceId]를 사용해서 리소스를 연결
      date: a.date().required(), // DATE,SO 8601 확장 날짜 문자열 (형식: YYYY-MM-DD)
      startTime: a.time().required(), // TIME, ISO 8601 확장 시간 문자열 (형식: hh:mm:ss.sss)
      endTime: a.time().required(), // TIME, ISO 8601 확장 시간 문자열 (형식: hh:mm:ss.sss)
      status: a.ref("ReservationStatus").required(), // 예약 상태
      participants: a.string().array(), // 참여자 목록, 유저 id를 배열로 저장
    })
    .secondaryIndexes((index) => [
      //  ** 리소스 id 별 예약 데이터 index **
      //  await client.models.Reservation.listByResource({
      //   resourceId: 'RESOURCE_ID',
      //   date: {
      //     eq: "2024-10-15",
      //   }
      index("resourceId")
        .sortKeys(["date", "startTime", "status"])
        .queryField("listByResource"),
    ])
    //TODO participants에 속한 유저만 수정 가능하도록 수정
    .authorization((allow) => [allow.authenticated()]),

  // const { data, errors } = await client.queries.echo({
  //   content: 'hello world!!!'
  // });
  getReservationsByResource: a
    .query()
    .arguments({
      resourceId: a.id(),
      startTime: a.date(),
      endTime: a.date(),
    })
    .returns(a.ref("Reservation").array())
    .authorization((allow) => [allow.authenticated()]),

  // const { data, errors } = await client.mutations.likePost({
  //   postId: 'hello'
  // });

  createReservation: a
    .mutation()
    .arguments({
      title: a.string().required(),
      resourceId: a.id().required(),
      date: a.date().required(),
      startTime: a.time().required(),
      endTime: a.time().required(),
      participants: a.string().array(),
    })
    .returns(a.ref("Reservation"))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(createReservationHandler)),

  updateReservation: a
    .mutation()
    .arguments({
      id: a.id().required(),
      title: a.string().required(),
      resourceId: a.id().required(),
      date: a.date().required(),
      startTime: a.time().required(),
      endTime: a.time().required(),
      participants: a.string().array(),
    })
    .returns(a.ref("Reservation"))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(updateReservationHandler)),

  deleteReservation: a
    .mutation()
    .arguments({
      id: a.id().required(),
    })
    .returns(a.ref("Reservation"))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(deleteReservationHandler)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
