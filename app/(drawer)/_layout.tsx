import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { useThemeColors } from '../hooks/useThemeColors';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { router, usePathname } from 'expo-router';

const CustomDrawerContent = (props: any) => {
  const { colors } = useThemeColors();
  const pathname = usePathname();

  useEffect(() => {
    console.log("pathname:", pathname);
  });

  return (
    <DrawerContentScrollView 
      {...props}
      style={{ backgroundColor: colors.drawerBackground }}
    >
      <DrawerItem
        label={"Inicio"}
        onPress={() => {
          router.push('/');
        }}
        focused={pathname === '/'}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.muted}
      />
      <DrawerItem
        label={"Perfil"}
        onPress={() => {
          router.push('/profile');
        }}
        focused={pathname === '/profile'}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.muted}
      />
    </DrawerContentScrollView>
  );
};

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
      drawerContent={(props) => <CustomDrawerContent {...props} 
      />}
    />
  );
};

export default DrawerLayout;