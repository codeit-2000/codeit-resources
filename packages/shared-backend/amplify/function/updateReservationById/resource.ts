import { defineFunction } from "@aws-amplify/backend";

export const updateReservationById = defineFunction({
  name: "updateReservationById",
  entry: "./handler.ts",
});
