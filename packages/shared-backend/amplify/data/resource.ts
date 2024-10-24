import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  // Team Table
  Team: a
    .model({
      name: a.string().required(),
      members: a.string().array(), // 해당 팀에 소속된 유저 id 목록
    })
    .authorization((allow) => [allow.groups(["ADMIN", "MEMBER"])]),

  // User Table
  User: a
    .model({
      id: a.id().required(),
      username: a.string().required(),
      email: a.string().required(),
      role: a.enum(["ADMIN", "MEMBER"]),
      teams: a.string().array(), // 소속된 팀 id 목록
      profileImage: a.url(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.groups(["ADMIN", "MEMBER"])])
    .secondaryIndexes((index) => [
      index("role").sortKeys(["username"]).queryField("listUsersByRoleName"),
      index("role").sortKeys(["createdAt"]).queryField("listUsersByRoleDate"),
    ]),

  ResourceType: a.enum(["ROOM", "SEAT", "EQUIPMENT"]),

  // Resource Table
  Resource: a
    .model({
      resourceType: a.ref("ResourceType"),
      resourceSubtype: a.string(),
      name: a.string().required(),
      description: a.string(),
      image: a.url(),
      reservations: a.hasMany("Reservation", "resourceId"),
    })
    .secondaryIndexes((index) => [
      index("resourceType")
        .sortKeys(["name"])
        .queryField("listResourceByTypeAndName"),
    ])
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.group("ADMIN"),
    ]),

  // Reservation Table
  ReservationStatus: a.enum([
    "CONFIRMED",
    "CANCELED",
    "PASSED",
    "FIXED",
    "DISABLED",
  ]),

  Reservation: a
    .model({
      title: a.string(),
      resourceId: a.id().required(), // 연결된 리소스 id
      resourceType: a.ref("ResourceType"),
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
    .authorization((allow) => [
      allow.authenticated().to(["read"]),
      allow.groups(["ADMIN", "MEMBER"]),
    ]),
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
