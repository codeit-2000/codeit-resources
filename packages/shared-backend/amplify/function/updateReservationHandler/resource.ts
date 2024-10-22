import { defineFunction } from "@aws-amplify/backend";

export const updateReservationHandler = defineFunction({
  name: "updateReservationHandler",
  entry: "./handler.ts",
});
