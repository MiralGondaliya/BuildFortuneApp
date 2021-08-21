import React, {useEffect, useState} from 'react';
import Screen from '../../components/screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home';
import Search from './search';
import {IMAGES} from '../../assets/images';
import CreateAdd from './createAdd';
import Notice from './notice';
import Profile from './profile';
import {COLORS} from '../../styles/colors';
import BottomNavigationTab from '../../components/bottomNavigationTab';
import {getNavigationParams} from '../../const/utils';
import I18n from '../../i18n/i18n';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import messaging, {firebase} from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Storage, {FCM_TOKEN} from '../../const/storage';
import {apiCall, updateDeviceToken} from '../../api';

PushNotification.configure({
  smallIcon: 'noti',
  color: COLORS.primary,
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
});

const Dashboard = ({route, navigation}) => {
  //const {t} = useTranslation();
  const [navigationDone, setNavigationDone] = useState(false);
  useEffect(() => {
    if (!navigationDone) {
      setNavigationDone(true);
      const createAdd = getNavigationParams(route.params, 'createAdd', false);
      if (createAdd) {
        navigation.navigate(I18n.t('createAdd'));
      }
    }
  }, []);

  useEffect(() => {
    firebase.messaging().setAutoInitEnabled(true);
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        setupIOSNotification();
        subscribe();
      }, 2000);
    } else {
      setUpNotification();
    }
  }, []);

  const setUpNotification = async () => {
    const defaultAppMessaging = firebase.messaging();
    const token = await defaultAppMessaging.getToken();
    console.log(token);
    apiCallUpdateDeviceToken(token);

    if (!defaultAppMessaging.isDeviceRegisteredForRemoteMessages) {
      await defaultAppMessaging.registerDeviceForRemoteMessages();
    }

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      //Navigate to particular string
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          //Navigate to particular string
        }
      });

    if (Platform.OS === 'android') {
      defaultAppMessaging.onMessage(async remoteMessage => {
        console.log(JSON.stringify(remoteMessage));
        console.log(remoteMessage.messageId);

        PushNotification.createChannel(
          {
            channelId: remoteMessage.messageId, // (required)
            channelName: `Custom channel - Counter: ${remoteMessage.messageId}`, // (required)
            channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );

        let data;
        console.log(remoteMessage.hasOwnProperty('notification'));
        if (remoteMessage.hasOwnProperty('notification')) {
          let notification = remoteMessage.notification;
          data = {message: notification.body, title: notification.title};
          console.log(data);
        } else {
          data = remoteMessage.data;
          if (data.hasOwnProperty('data')) {
            data = JSON.parse(data.data);
          }
        }

        PushNotification.localNotification({
          /* Android Only Properties */
          // id: "0", // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          priority: 'high', // (optional) set notification priority, default: high
          importance: 4, // (optional) set notification importance, default: high
          /* iOS and Android properties */
          title: data.title, // (optional)
          message: data.message, // remoteMessage.data.message, // (required),
          channelId: remoteMessage.messageId,
          bigPictureUrl: data.image,
          tag: data?.post_id,
          data: data ?? {},
          smallIcon: 'noti',
          color: COLORS.primary,
        });
      });
    }
  };

  const subscribe = () => {
    PushNotificationIOS.getInitialNotification().then(noti => {
      console.log(noti);
      if (noti) {
        console.log(noti);
      }
    });

    PushNotificationIOS.addEventListener('notification', noti => {
      console.log(noti);
      if (noti) {
      }
    });
  };

  const setupIOSNotification = async () => {
    if (firebase.messaging().isDeviceRegisteredForRemoteMessages) {
      await firebase.messaging().registerDeviceForRemoteMessages();
    }

    firebase
      .messaging()
      .hasPermission()
      .then(enable => {
        if (enable) {
          requestForNotification();
        } else {
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              requestForNotification();
            })
            .catch(error => {
              alert('Permission Denied', error);
            });
        }
      });
  };

  const requestForNotification = () => {
    PushNotificationIOS.requestPermissions().then(permission => {
      if (permission.alert) {
        getFcmToken();
      } else {
        console.log('Error');
      }
    });
  };

  const getFcmToken = () => {
    firebase
      .messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.debug('fcm token ==', fcmToken);
          apiCallUpdateDeviceToken(fcmToken);
        }
      });
  };

  const apiCallUpdateDeviceToken = token => {
    Storage.storeData(FCM_TOKEN, token);
    apiCall(
      updateDeviceToken(token),
      (data, message) => {
        console.log(data);
      },
      false,
    );
  };

  const Tab = createBottomTabNavigator();
  const tabBar = [
    {
      name: I18n.t('home'),
      content: Home,
      icon: IMAGES.home,
      icon_selected: IMAGES.home,
    },
    {
      name: I18n.t('search'),
      content: Search,
      icon: IMAGES.search,
      icon_selected: IMAGES.search,
    },
    {
      name: I18n.t('createAdd'),
      content: CreateAdd,
      icon: IMAGES.createAdd,
      icon_selected: IMAGES.createAdd,
    },
    {
      name: I18n.t('notice'),
      content: Notice,
      icon: IMAGES.notice,
      icon_selected: IMAGES.notice,
    },
    {
      name: I18n.t('account'),
      content: Profile,
      icon: IMAGES.profile,
      icon_selected: IMAGES.profile,
    },
  ];

  const tabs = navigation => {
    const renderTabIcon = (color, size, icon, name, focused) => {
      return (
        <BottomNavigationTab
          icon={icon}
          name={name}
          color={color}
          size={size}
          focused={focused}
          navigation={navigation}
        />
      );
    };

    return (
      <Tab.Navigator
        tabBarOptions={{
          allowFontScaling: true,
          showLabel: false,
          activeTintColor: COLORS.primary,
          style: {
            backgroundColor: COLORS.primary,
            elevation: 0,
            shadowColor: 'none',
            borderTopWidth: 0,
            height: Platform.OS === 'ios' ? 102 : 72,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 2,
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        {tabBar.map((element, index) => (
          <Tab.Screen
            key={index + ''}
            name={element.name}
            component={element.content}
            options={{
              tabBarIcon: ({color, size, focused}) =>
                renderTabIcon(color, size, element.icon, element.name, focused),
            }}
          />
        ))}
      </Tab.Navigator>
    );
  };
  return <Screen>{tabs(navigation)}</Screen>;
};

export default Dashboard;
