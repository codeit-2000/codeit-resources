import { generateClient } from "aws-amplify/data";

import type { Schema } from "./../../shared-backend/amplify/data/resource";

type Reservation = Schema["Reservation"]["type"];

const client = generateClient<Schema>();

export const createReservation = async (reservationData) => {
  return await client.mutations.createReservation(
    reservationData as Reservation,
  );
};

export const updateResourceName = async (reservationData) => {
  return await client.mutations.updateReservation(
    reservationData as Reservation,
  );
};

export const deleteReservation = async (id) => {
  return await client.mutations.deleteReservation({ id });
};

export const getReservation = async (id: string) => {
  return await client.models.Reservation.get({ id });
};

export const searchReservations = async (config) => {
  return await client.models.Reservation.list(config);
};
