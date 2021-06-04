import * as Notifications from 'expo-notifications';

export function scheduleNotification() {

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
