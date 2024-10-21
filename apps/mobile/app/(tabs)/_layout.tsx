import Equipment from "@repo/assets/icons/icon-equipment.svg";
import Meeting from "@repo/assets/icons/icon-meeting.svg";
import Person from "@repo/assets/icons/icon-person.svg";
import Seats from "@repo/assets/icons/icon-seats.svg";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: styles.tabs,
        tabBarItemStyle: styles.tab,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "대시보드",
          tabBarIcon: ({ color }) => (
            <Person width={20} height={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="meeting-rooms"
        options={{
          title: "회의실",
          tabBarIcon: ({ color }) => (
            <Meeting width={20} height={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="seats"
        options={{
          title: "좌석",
          tabBarIcon: ({ color }) => (
            <Seats width={20} height={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="equipments"
        options={{
          title: "장비",
          tabBarIcon: ({ color }) => (
            <Equipment width={20} height={20} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabs: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: "#333236",
  },
  tab: {
    gap: 12,
  },
});
