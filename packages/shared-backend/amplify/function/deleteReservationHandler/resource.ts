import { defineFunction } from "@aws-amplify/backend";

export const deleteReservationHandler = defineFunction({
  name: "deleteReservationHandler",
  entry: "./handler.ts",
});
