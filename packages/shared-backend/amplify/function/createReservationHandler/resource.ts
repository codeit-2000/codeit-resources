import { defineFunction } from "@aws-amplify/backend";

export const createReservationHandler = defineFunction({
  name: "createReservationHandler",
  entry: "./handler.ts",
});
