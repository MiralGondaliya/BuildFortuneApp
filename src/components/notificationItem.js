import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {
  ContainerStyles,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import {FONTS} from '../styles/fonts';
import {IMAGES} from '../assets/images';

const NotificationItem = ({image, message, time}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.container}>
      <Image
        source={IMAGES.noti_ph}
        style={styles.icon}
        resizeMode={'contain'}
      />
      <View style={{flex: 1}}>
        <Text style={styles.notificationTitle}>{message}</Text>
        {/*<Text style={styles.notificationTime}>{time}</Text>*/}
      </View>
      <Image
        style={styles.nextIcon}
        source={IMAGES.next_grey}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px16,
    ...MarginStyle.mT8,
  },
  icon: {
    height: 40,
    width: 40,
  },
  notificationTitle: {
    fontSize: 14,
    fontFamily: FONTS.extra_light,
    ...PaddingStyle.px16,
  },
  notificationTime: {
    fontSize: 8,
    fontFamily: FONTS.extra_light,
    ...PaddingStyle.px16,
  },
  nextIcon: {
    width: 10,
    height: 11,
    alignSelf: 'center',
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
});
export default NotificationItem;
