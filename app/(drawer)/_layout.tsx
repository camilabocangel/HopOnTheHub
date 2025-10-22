import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { useThemeColors } from "../../src/hooks/useThemeColors";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props: any) => {
  const { colors } = useThemeColors();
  const pathname = usePathname();

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.drawerBackground }}
      contentContainerStyle={{ flex: 1 }}
    >
      <DrawerItem
        label={"Inicio"}
        onPress={() => {
          router.push("/");
        }}
        focused={pathname === "/"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.text}
        labelStyle={{ fontWeight: "600" }}
      />
      <DrawerItem
        label={"Perfil"}
        onPress={() => {
          router.push("/profile");
        }}
        focused={pathname === "/profile"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.text}
        labelStyle={{ fontWeight: "600" }}
      />
      <DrawerItem
        label={"Carreras"}
        onPress={() => {
          router.push("/careers");
        }}
        focused={pathname === "/careers"}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.text}
        labelStyle={{ fontWeight: "600" }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  const { colors } = useThemeColors();

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
          width: 280,
        },
        drawerContentStyle: {
          backgroundColor: colors.drawerBackground,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerActiveBackgroundColor: colors.muted + "40",
        drawerInactiveBackgroundColor: "transparent",
        drawerLabelStyle: {
          fontWeight: "600",
          fontSize: 16,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Inicio",
          title: "UPBHub",
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Perfil",
          title: "Perfil",
        }}
      />
      <Drawer.Screen
        name="careers"
        options={{
          drawerLabel: "Carreras",
          title: "Carreras"
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
