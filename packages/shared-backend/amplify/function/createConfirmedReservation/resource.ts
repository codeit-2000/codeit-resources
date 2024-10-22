import { defineFunction } from "@aws-amplify/backend";

export const createConfirmedReservation = defineFunction({
  name: "createConfirmedReservation",
  entry: "./handler.ts",
});
