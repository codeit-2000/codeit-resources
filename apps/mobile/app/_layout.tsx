import { Stack } from "expo-router/stack";

export default function Layout() {
  // TODO: 수정 필요
  const isLogin = false;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="home" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
