import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  ContainerStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
} from '../styles/globalStyles';
import {FONTS} from '../styles/fonts';
import {COLORS} from '../styles/colors';

const EmptyView = ({icon, title, mini}) => {
  return (
    <View style={styles.container}>
      <Image
        source={icon}
        resizeMode={'contain'}
        style={mini ? styles.imageIconMini : styles.imageIcon}
      />
      <Text style={mini ? styles.txtTitleMini : styles.txtTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    ...ContainerStyles.container,
    ...LayoutGravity.center,
    ...Gravity.center,
    backgroundColor: COLORS.white,
  },
  imageIcon: {
    height: 120,
    width: 120,
  },
  imageIconMini: {
    height: 80,
    width: 80,
  },
  txtTitle: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    color: COLORS.gray_hint_light,
    ...MarginStyle.mT8,
  },
  txtTitleMini: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.gray_hint_light,
    ...MarginStyle.mT8,
  },
});

export default EmptyView;
