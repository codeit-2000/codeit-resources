import type { Schema } from "@repo/backend/amplify/data/resource";
import { generateClient } from "aws-amplify/data";

type Reservation = Schema["Reservation"]["type"];

const client = generateClient<Schema>();

// export const createReservation = async (reservationData) => {
//   return await client.mutations.createConfirmedReservation(
//     reservationData as Reservation,
//   );
// };

// export const updateReservation = async (reservationData) => {
//   return await client.mutations.updateReservationById(
//     reservationData as Reservation,
//   );
// };

// export const deleteReservation = async (id) => {
//   return await client.mutations.deleteReservationById({ id });
// };

// export const getReservation = async (id: string) => {
//   return await client.models.Reservation.get({ id });
// };

// export const searchReservations = async (config) => {
//   return await client.models.Reservation.list(config);
// };

// Create a new confirmed reservation
export const createReservation = async (reservationData: Reservation) => {
  try {
    return await client.mutations.createConfirmedReservation({
      title: reservationData.title,
      resourceId: reservationData.resourceId,
      date: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      participants: reservationData.participants || [],
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw new Error("Failed to create reservation");
  }
};

// Update an existing reservation by ID
export const updateReservation = async (reservationData: Reservation) => {
  try {
    return await client.mutations.updateReservationById({
      id: reservationData.id,
      title: reservationData.title,
      resourceId: reservationData.resourceId,
      date: reservationData.date,
      startTime: reservationData.startTime,
      endTime: reservationData.endTime,
      participants: reservationData.participants || [],
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw new Error("Failed to update reservation");
  }
};

// Delete a reservation by ID
export const deleteReservation = async (id: string) => {
  try {
    return await client.mutations.deleteReservationById({ id });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw new Error("Failed to delete reservation");
  }
};

// Get a reservation by ID
export const getReservation = async (id: string) => {
  try {
    return await client.models.Reservation.get({ id });
  } catch (error) {
    console.error("Error fetching reservation:", error);
    throw new Error("Failed to fetch reservation");
  }
};

// Search for reservations based on resource and date
export const searchReservations = async (resourceId: string, date: string) => {
  try {
    const result = await client.models.Reservation.listByResource({
      resourceId,
      date: { eq: date },
    });
    return result;
  } catch (error) {
    console.error("Error searching reservations:", error);
    throw new Error("Failed to search reservations");
  }
};
