import SeatButton from "./SeatButton";

/*
좌석표

A0, A1, A2, A3      | B0, B1, B2, B3, B4
------------------   ------------------
C0, C1, C2, C3, C4  | D0, D1, D2, D3, D4
C5, C6, C7, C8, C9  | D5, D6, D7, D8, D9
------------------   ------------------
E0, E1, E2, E3, E4  | F0, F1, F2, F3, F4
E5, E6, E7, E8, E9  | F5, F6, F7, F8, F9
------------------   ------------------
G0, G1, G2, G3, G4  | H0, H1, H2, H3, H4
G5, G6, G7, G8, G9  | H5, H6, H7, H8, H9
------------------   ------------------
I0, I1, I2, I3, I4  | J0, J1, J2, J3, J4

*/

const SEATING_CHART = {
  A: ["A0", "A1", "A2", "A3"],
  B: ["B0", "B1", "B2", "B3", "B4"],
  C: ["C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
  D: ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
  E: ["E0", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"],
  F: ["F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"],
  G: ["G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"],
  H: ["H0", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"],
  I: ["I0", "I1", "I2", "I3", "I4"],
  J: ["J0", "J1", "J2", "J3", "J4"],
};

export default function SeatGrid() {
  return (
    <div className="md:my-83 md:mx-118 mx-16 mt-28 grid w-[668px] auto-rows-auto grid-cols-2 gap-40 md:w-[1004px] xl:flex-shrink-0">
      <SeatBlock seats={SEATING_CHART.A} />
      <SeatBlock seats={SEATING_CHART.B} />
      <SeatBlock seats={SEATING_CHART.C} />
      <SeatBlock seats={SEATING_CHART.D} />
      <SeatBlock seats={SEATING_CHART.E} />
      <SeatBlock seats={SEATING_CHART.F} />
      <SeatBlock seats={SEATING_CHART.G} />
      <SeatBlock seats={SEATING_CHART.H} />
      <SeatBlock seats={SEATING_CHART.I} />
      <SeatBlock seats={SEATING_CHART.J} />
    </div>
  );
}

function SeatBlock({ seats }: { seats: string[] }) {
  return (
    <div className="w-324 md:w-482 flex flex-wrap gap-6 md:gap-8">
      {seats.map((seat) => (
        <SeatButton key={seat} type="enable" />
      ))}
    </div>
  );
}
