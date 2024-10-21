
import type { Schema } from "./../../shared-backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

type Reservation = Schema["Reservation"]["type"];

const client = generateClient<Schema>();

export const createReservation = async (reservationData) => {
    return await client.models.Reservation.create(reservationData as Reservation)
};

export const getReservation = async (id: string) => {
    return await client.models.Reservation.get({ id })
};

export const searchReservations = async (config) => {
    return await client.models.Reservation.list(config)
};
