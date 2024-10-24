import { Schema } from "@repo/backend/amplify/data/resource";
import { userAtom } from "@src/store/authUserAtom";
import { generateClient } from "aws-amplify/data";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import EmptyReservation from "./components/EmptyReservation";
import ReservationCard from "./components/ReservationCard";

type Reservation = Schema["Reservation"]["type"];

const client = generateClient<Schema>();

export default function Dashboard() {
  const user = useAtomValue(userAtom);
  const [userReservations, setUserReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchUserReservation = async () => {
      try {
        const { data: reservations } = await client.models.Reservation.list({
          filter: { date: { eq: "2024-10-25" } },
        });
        setUserReservations(reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchUserReservation();
  }, []);

  return (
    <div className="bg-gray-5 px-16 py-40 md:p-80">
      <section className="mb-80 flex flex-col gap-16">
        <h1 className="text-28-700 text-gray-100">내 회의</h1>
        {/* line */}
        <span className="border-gray-100-opacity-10 h-1 w-full border-b-[1px]" />
        {userReservations?.map((reservation: Reservation) => (
          <ReservationCard reservation={reservation} />
        ))}
      </section>

      <section className="mb-80 flex flex-col gap-16">
        <h1 className="text-28-700 text-gray-100">내 좌석</h1>
        {/* line */}
        <span className="border-gray-100-opacity-10 h-1 w-full border-b-[1px]" />
        <EmptyReservation resourceType="SEAT" />{" "}
      </section>

      <p className="text-center">안녕하세요 {user?.username} 님!</p>
    </div>
  );
}
