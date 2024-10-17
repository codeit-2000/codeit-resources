import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  // User Table

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
