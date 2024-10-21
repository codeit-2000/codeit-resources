import Drawer from "@src/components/commons/Drawer";
import DrawerOpenButton from "@src/components/commons/Drawer/DrawerOpenButton";
import { useState } from "react";

export default function MeetingRooms() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setIsDrawerOpen(true);

  return (
    <div>
      <DrawerOpenButton handleDrawerOpen={handleDrawerOpen} />
      {isDrawerOpen && (
        <Drawer
          isDrawerOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
      <h1>This is Meeting Rooms Reservation Page :)</h1>
    </div>
  );
}
