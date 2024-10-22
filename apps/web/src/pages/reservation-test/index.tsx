// 작성한 서비스 파일 import
import type { Schema } from "@repo/backend/amplify/data/resource";
import {
  createReservation,
  deleteReservation,
  getReservation,
  updateReservation,
} from "@repo/lib/api/reservation";
import React, { useState } from "react";

type Reservation = Schema["Reservation"]["type"];

function ReservationForm() {
  // 예약 정보 상태 관리
  const [reservationId, setReservationId] = useState("");
  const [title, setTitle] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState("");

  const handleCreateReservation = async () => {
    try {
      const result = await createReservation({
        title,
        resourceId,
        date,
        startTime,
        endTime,
        participants: participants.split(","),
      } as Reservation);
      console.log("Reservation created:", result);
      alert("Reservation created successfully");
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const handleUpdateReservation = async () => {
    try {
      const result = await updateReservation({
        id: reservationId,
        title,
        resourceId,
        date,
        startTime,
        endTime,
        participants: participants.split(","),
      } as Reservation);
      console.log("Reservation updated:", result);
      alert("Reservation updated successfully");
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDeleteReservation = async () => {
    try {
      await deleteReservation(reservationId);
      console.log("Reservation deleted");
      alert("Reservation deleted successfully");
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleGetReservation = async () => {
    try {
      const result = await getReservation(reservationId);
      console.log("Fetched reservation:", result);
    } catch (error) {
      console.error("Error fetching reservation:", error);
    }
  };

  return (
    <div>
      <h1>Reservation Management</h1>

      {/* 예약 생성/수정 폼 */}
      <div>
        <h2>Create/Update Reservation</h2>
        <input
          type="text"
          placeholder="Reservation ID (for update/delete)"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Resource ID"
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          placeholder="Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          placeholder="End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Participants (comma-separated)"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
        <button type="submit" onClick={handleCreateReservation}>
          Create Reservation
        </button>
        <button type="submit" onClick={handleUpdateReservation}>
          Update Reservation
        </button>
      </div>

      {/* 예약 삭제 */}
      <div>
        <h2>Delete Reservation</h2>
        <input
          type="text"
          placeholder="Reservation ID"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
        />
        <button type="submit" onClick={handleDeleteReservation}>
          Delete Reservation
        </button>
      </div>

      {/* 예약 가져오기 */}
      <div>
        <h2>Get Reservation</h2>
        <input
          type="text"
          placeholder="Reservation ID"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
        />
        <button type="submit" onClick={handleGetReservation}>
          Get Reservation
        </button>
      </div>

      {/* 예약 검색 */}
      {/* <div>
        <h2>Search Reservations</h2>
        <input
          type="text"
          placeholder="Resource ID"
          value={searchResourceId}
          onChange={(e) => setSearchResourceId(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <button type="submit"  onClick={handleSearchReservations}>Search Reservations</button>
        <ul>
          {searchResults.map((reservation) => (
            <li key={reservation.id}>
              {reservation.title} - {reservation.resourceId} -{" "}
              {reservation.date}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default ReservationForm;
