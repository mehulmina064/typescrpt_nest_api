import { CanPushNotificationOptions } from '@can/notification';

export const FIREBASE_CONFIG: CanPushNotificationOptions = {
  android: {
    credentials: require('./firebase-android.config.json'),
    // databaseUrl: 'https://housr-b66ea.firebaseio.com',
  },
};
