import React from "react";
import { Redirect } from "expo-router";
import { useUser } from "../src/hooks/useUser";

export default function HomeRedirect() {
  const { user } = useUser();

  if (!user) return <Redirect href="/(auth)/login" />;

  return <Redirect href="/(drawer)" />;
}
