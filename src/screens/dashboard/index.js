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
