// Basic
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

// Set key
export const NOTIFICATION_KEY = 'Flashcards:notifications'

// Helpers
function createNotification() {
  return {
    title: 'We are waiting for you!',
    body: "Hey man! don't forget to learn by flashcards today!",
    ios: {
      sound: true,
    },
    android: {
      priority: 'high',
      sound: true,
      sticky: false,
      vibrate: true,
    }
  }
}

// Methods
export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(22)
              tomorrow.setMinutes(40)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}