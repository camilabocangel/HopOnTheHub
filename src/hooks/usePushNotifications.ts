import { useEffect, useRef, useState } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const receiveListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => { 
    (async () => {
      if (Device.osName === 'Android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    })();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log('Expo Push Token:', token);
      if (token) setExpoPushToken(token);
    });

    receiveListener.current = Notifications.addNotificationReceivedListener((n) => {
      setNotification(n);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((resp) => {
      console.log('Notification action:', resp.actionIdentifier, resp.notification.request.content.data);
    });

    return () => {
      receiveListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return {
    expoPushToken,
    notification,
    sendPushNotification,
    scheduleLocalNotification,
    scheduleEventReminder,
  };
}

async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  if (!Device.isDevice) {
    console.warn('Debes usar un dispositivo físico para push.');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.warn('Permisos de notificaciones denegados.');
    return;
  }

  const projectId =
    (Constants?.expoConfig?.extra as any)?.eas?.projectId ??
    (Constants as any)?.easConfig?.projectId;

  if (!projectId) {
    console.warn('Project ID no encontrado. Asegura EAS project vinculado.');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  return token;
}

export async function sendPushNotification(
  expoPushToken: string, 
  title: string, 
  body: string, 
  data?: any
) {
  console.log('Sending push notification to token:', expoPushToken);
  if (!expoPushToken) return;

  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: data || {},
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
    const result = await response.json();
    console.log('Notification sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}

export async function sendPushNotificationToMultiple(
  tokens: string[], 
  title: string, 
  body: string, 
  data?: any
) {
  const messages = tokens.map(token => ({
    to: token,
    sound: 'default',
    title,
    body,
    data: data || {},
  }));

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });
    
    const result = await response.json();
    console.log('Notifications sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending notifications:', error);
    throw error;
  }
}

export async function scheduleEventReminder(
  eventTitle: string,
  eventDate: Date,
  eventId: string
) {
  const reminderDate = new Date(eventDate.getTime() - 60 * 60 * 1000);
  
  if (reminderDate <= new Date()) {
    console.log('Event reminder date has already passed');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Recordatorio de Evento',
      body: `El evento "${eventTitle}" comienza en 1 hora`,
      sound: 'default',
      data: { 
        eventId,
        type: 'event_reminder',
        screen: 'event-details'
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
    },
  });
}

async function scheduleLocalNotification(
  title: string,
  body: string,
  data?: any
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: 'default',
      data: data || {},
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
}