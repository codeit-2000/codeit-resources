import Header from "./Header";
import SeatGrid from "./SeatGrid";

export default function Seats() {
  return (
    <div className="bg-gray-5 h-screen overflow-x-auto">
      <Header />

      <div className="xl:flex xl:justify-center">
        <SeatGrid />
      </div>
    </div>
  );
}
