import messaging, {
  firebase,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {DeviceHelper} from '../helper/DeviceHelper';
import {Storage} from '../core/Storage';
import {offerFactory} from '@/factory/OfferFactory';
import {navigate, Routes} from '@/navigation/AppNavigation';
import {logger} from '@/logger/Logger';

// TODO: once we have api, then place this enum over there in API file.
export const enum ModuleType {}

interface NotificationPayload {
  id: string; // processInstanceId
  moduleType: ModuleType;
  data: any;
}

const redirectionApiCall = async (id: number) => {
  const response = await offerFactory.offerApi({
    offer_id: id,
  });

  if (response.isSuccess) {
    console.log('response ==>>', response);
    navigate({
      screenName: Routes.OfferDetail,
    });
  }
};

/**
 * @param notificationPayload - notification payload which we will get from remote notification.
 */
export const handleNotificationRedirection = (
  notificationPayload: NotificationPayload,

  safeNavigate?: any,
): void => {
  const {moduleType, id} = notificationPayload;
  console.log('notificationPayload ==>>', notificationPayload);
  console.log('moduleType ==>>', moduleType);
  console.log('id ==>>', id);
  navigate({
    screenName: Routes.OfferDetail,
    params: {
      id: id,
    },
  });
  // redirectionApiCall(parseInt(id));
};
class PushNotificationHelper {
  init(safeNavigate: any): void {
    firebase.messaging().setAutoInitEnabled(true);
    this.configureNotification(safeNavigate);
    if (DeviceHelper.isIos()) {
      setTimeout(() => {
        this.setupIOSNotification();
        this.subscribe();
      }, 2000);
    }
    this.setUpNotification();
  }

  // eslint-disable-next-line
	createNotificationChanel(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
    if (!DeviceHelper.isIos()) {
      PushNotification.createChannel(
        {
          channelId: remoteMessage.messageId ?? '', // (required)
          channelName: `Custom channel - Counter: ${remoteMessage.messageId}`, // (required)
          channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        // eslint-disable-next-line
				(created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
  }

  // eslint-disable-next-line
	async setUpNotification() {
    const defaultAppMessaging = firebase.messaging();

    if (!defaultAppMessaging.isDeviceRegisteredForRemoteMessages) {
      await defaultAppMessaging.registerDeviceForRemoteMessages();
    }

    const token = await defaultAppMessaging.getToken();
    console.log('FCM_TOKEN', token);
    await Storage.setItemAsync(Storage.keys.fcmToken, token);

    //TODO:: Call api for update device token

    /* if (accountStore.isLogin) {
      profileFactory.getLoggedInProfile();
    }*/

    // eslint-disable-next-line
		messaging().onNotificationOpenedApp((remoteMessage) => {
      // Navigate to particular string
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // Navigate to particular string
        }
      });
  }

  // eslint-disable-next-line
	getDataOfMessageFromNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
    let data;
    if (remoteMessage.notification) {
      const {notification} = remoteMessage;
      data = {message: notification?.body, title: notification?.title};
    } else {
      data = remoteMessage.data;
      if (data?.data) {
        data = JSON.parse(data.data);
      }
    }
    return data;
  }

  fireLocalNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    const show = this.showNotification(remoteMessage);
    if (show) {
      const data = this.getDataOfMessageFromNotification(remoteMessage);
      PushNotification.localNotification({
        /* Android Only Properties */
        id: 123456,
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        priority: 'high', // (optional) set notification priority, default: high
        importance: 'high', // (optional) set notification importance, default: high
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
        smallIcon: 'ic_notification', // (optional) default:  "ic_notification" with fallback for "ic_launcher"
        bigLargeIcon: 'ic_launcher',
        /* iOS and Android properties */
        title: data?.title ?? '', // (optional)
        message: data?.message ?? '', // remoteMessage.data.message, // (required),
        channelId: remoteMessage?.messageId ?? '',
        bigPictureUrl: data?.image ?? '',
        userInfo: {data: remoteMessage.data},
        autoCancel: true,
        ignoreInForeground: false,
      });
    }
  }

  showNotification = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    const notificationData = remoteMessage?.data;
    const type = notificationData?.type;
    const arrayOfAllowrdNotification = [
      'notificationType1',
      'notificationType2',
    ];
    // TODO :: Make it false after every setup done
    return type ? arrayOfAllowrdNotification.includes(type) : true;
  };

  async setupIOSNotification() {
    firebase
      .messaging()
      .hasPermission()
      .then(enable => {
        if (enable) {
          this.requestForNotification();
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              this.requestForNotification();
            })
            // eslint-disable-next-line
						.catch((error) => {
              // TODO:: Show error if required.
            });
        }
      });
  }

  requestForNotification() {
    PushNotificationIOS.requestPermissions().then(permission => {
      if (permission.alert) {
        this.getFcmToken();
      }
    });
  }

  // eslint-disable-next-line
	getFcmToken() {
    try {
      firebase
        .messaging()
        .getToken()
        .then(async fcmToken => {
          if (fcmToken) {
            await Storage.setItemAsync(Storage.keys.fcmToken, fcmToken);

            //TODO:: Call api for update device token

            /* if (accountStore.isLogin) {
              profileFactory.getLoggedInProfile();
            }*/
          }
        });
    } catch (error) {
      console.error('getFcmToken', error);
    }
  }

  // eslint-disable-next-line
	subscribe() {
    // eslint-disable-next-line
		PushNotificationIOS.getInitialNotification().then((noti) => { });
    // eslint-disable-next-line
		PushNotificationIOS.addEventListener('notification', (noti) => { });
  }

  // eslint-disable-next-line
	configureNotification(safeNavigate: any) {
    PushNotification.configure({
      onNotification(notification) {
        setTimeout(() => {
          if (notification.userInteraction) {
            let data = notification?.data;
            if (data?.data) {
              data = data.data;
            }
            console.log('data ====>>>', data);
            const notificationPayload = {
              id: data.offer_id,
              moduleType: data.notificationScreenType,
              taskId: data?.taskId ?? '',
              requestId: data?.requestId ?? '',
              data: {},
            };
            handleNotificationRedirection(notificationPayload, safeNavigate);
          }
        }, 1000);
      },
    });
  }

  onMessageReceived(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    logger.info('remoteMessage', remoteMessage);
    this.createNotificationChanel(remoteMessage);
    this.fireLocalNotification(remoteMessage);
  }

  registerOnMessageListener() {
    return messaging().onMessage(async remoteMessage => {
      // @ts-ignore
      // console.log('remoteMessage ==> ', remoteMessage);
      this.onMessageReceived(remoteMessage);
    });
  }

  androidBackgroundHandler() {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // Update a users messages list using AsyncStorage
      this.createNotificationChanel(remoteMessage);
      this.fireLocalNotification(remoteMessage);
    });
  }
}

export const pushNotificationHelper = new PushNotificationHelper();
