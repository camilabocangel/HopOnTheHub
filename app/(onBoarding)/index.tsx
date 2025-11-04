import React, { useCallback } from 'react';
import { Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import STEPS from '@/data/steps';

export default function OnboardingScreen() {
    const router = useRouter();
    const { expoPushToken, notification, sendPushNotification, scheduleLocalNotification } = usePushNotifications();
    
    const finish = useCallback(async () => {
        await AsyncStorage.setItem('hasSeenOnboarding', 'false');
        sendPushNotification("ExponentPushToken[XGyrG0LsDxkHn1XRmCJIte]");
        console.log('Onboarding finished, navigating to login...');

    }, [router]);

    return (
        <Onboarding
            pages={STEPS.map(s => ({
                backgroundColor: s.backgroundColor,
                image: s.image,
                title: s.title,
                subtitle: s.subtitle,
                titleStyles: { fontSize: 24, fontWeight: '700', color: '#111827', textAlign: 'center' },
                subTitleStyles: { fontSize: 16, color: '#4b5563', textAlign: 'center', lineHeight: 22 },
                imageContainerStyles: { paddingBottom: 24 },
            }))}

            skipLabel="Omitir"
            nextLabel="Siguiente"
            doneLabel="Empezar"

            bottomBarHighlight={false}
            containerStyles={{ flex: 1 }}
            controlStatusBar={false}
            DotComponent={({ selected }) => (
                <Text
                    style={{
                        width: selected ? 20 : 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: selected ? '#f9738f' : '#e5e7eb',
                        marginHorizontal: 4,
                    }}
                />
            )}

            onSkip={finish}
            onDone={finish}
        />
    );
}
