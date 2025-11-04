import { useEffect } from 'react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useUser } from '@/hooks/useUser';

export const NotificationInitializer = () => {
  const { expoPushToken } = usePushNotifications();
  const { user } = useUser();

  useEffect(() => {
    const initializeNotifications = async () => {
      if (expoPushToken && user?.id) {
        try {
          console.log('Token de notificaciones guardado para usuario:', user.id);
        } catch (error) {
          console.error('Error guardando token de notificaciones:', error);
        }
      }
    };

    initializeNotifications();
  }, [expoPushToken, user?.id]);

  return null; 
};