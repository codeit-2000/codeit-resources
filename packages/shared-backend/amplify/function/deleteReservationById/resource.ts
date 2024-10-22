import { defineFunction } from "@aws-amplify/backend";

export const deleteReservationById = defineFunction({
  name: "deleteReservationById",
  entry: "./handler.ts",
});
