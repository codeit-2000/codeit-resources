import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    isDone: a.boolean(),
  }),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
});
