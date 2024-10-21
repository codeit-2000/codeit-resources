import BottomSheet from "@src/components/commons/BottomSheet";
import BottomSheetOpenButton from "@src/components/commons/BottomSheet/BottomSheetOpenButton";
import { useState } from "react";

export default function MeetingRooms() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleBottomSheetOpen = () => setIsBottomSheetOpen(true);

  return (
    <div>
      <BottomSheetOpenButton handleBottomSheetOpen={handleBottomSheetOpen} />
      {isBottomSheetOpen && (
        <BottomSheet
          isBottomSheetOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      )}
      <h1>This is Meeting Rooms Reservation Page :)</h1>
    </div>
  );
}
