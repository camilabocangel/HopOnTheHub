import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { useThemeColors } from '../hooks/useThemeColors';

const DrawerLayout = () => {
  const { colors } = useThemeColors();

  return (
    <Drawer
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        drawerContentStyle: { backgroundColor: colors.drawerBackground },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.muted,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: 'Inicio',
          drawerLabel: 'Inicio',
        }}
      />
      <Drawer.Screen
        name="events"
        options={{
          title: 'Eventos',
          drawerLabel: 'Eventos',
        }}
      />
      <Drawer.Screen
        name="announcements"
        options={{
          title: 'Anuncios',
          drawerLabel: 'Anuncios',
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: 'Info',
          drawerLabel: 'Info',
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Perfil',
          drawerLabel: 'Perfil',
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
