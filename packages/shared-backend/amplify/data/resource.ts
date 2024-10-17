import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  // User Table
  User: a
  .model({
    id: a.id().required(),
    username: a.string().required(),
    email: a.string().required(),
    role: a.enum(['ADMIN', 'MEMBER']),
    team: a.string(),
    profileImage: a.url(),
  })
  .authorization((allow) => [allow.owner()])
  .secondaryIndexes((index) => [
    index('role'), // role에 따른 멤버들 리스트 보여줌 - 관리자 페이지
    // TODO: team으로 1차 정렬하고, username으로 2차 정렬
    // TODO: 최신순, 오래된순, 가나다순 정렬
  ]),

  // Resource Table
  Resource: a
    .model({
      resourceId: a.id().required(),
      resourceType: a.enum(["Room", "Seat", "Equipment"]),
      resourceSubtype: a.string(),
      name: a.string().required(),
      description: a.string(),
      image: a.url(),
      reservations: a.hasMany("Reservation", "resourceId"),
    })
    .identifier(["resourceId"])
    .secondaryIndexes((index) => [index("resourceType")])
    // ex) resourceType 기준으로 쿼리
    // const { data, errors } = await client.models.Resource.listResourceByResourceType({
    //   resourceType: 'Seat',
    // });

    .authorization((allow) => [allow.owner()]),

  // Reservation Table
  Reservation: a.model({
    resourceId: a.id().required(),
    resource: a.belongsTo("Resource", "resourceId"), // 예약과 리소스의 관계
  }),
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
