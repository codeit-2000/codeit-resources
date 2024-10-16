import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  // User Table

  // Resource Table
  Resource: a
    .model({
      resourceType: a.enum(["Room", "Seat", "Equipment"]),
      resourceSubtype: a.string(),
      name: a.string().required(),
      date: a.date().required(),
      participants: a.string().array(),

      // belongsTo
      // hasMany
      // SecondaryIndexes
    })
    .secondaryIndexes((index) => [index("resourceType")])
    // ex) resourceType 기준으로 쿼리
    // const { data, errors } = await client.models.Resource.listResourceByResourceType({
    //   resourceType: 'Seat',

    .authorization((allow) => [allow.owner()]),

  // Reservation Table
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
