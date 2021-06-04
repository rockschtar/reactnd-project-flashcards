import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_KEY = 'UdacityFlashcards:Notification';

export function cancelNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function scheduleNotification() {

    AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((item) => {
        if (item === null) {
            Notifications.requestPermissionsAsync().then((notificationPermissionStatus) => {

                if (notificationPermissionStatus.status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync().then(() => {});

                    let trigger = new Date();
                    trigger.setDate(trigger.getDate() + 1);
                    trigger.setHours(18);
                    trigger.setMinutes(0);

                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'It\'s time to take a quiz',
                        },
                        trigger,
                    }).then(() => {});
                }
            });
        }

    });

}
