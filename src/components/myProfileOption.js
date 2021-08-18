import React from 'react';
import { I18nManager, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {ContainerStyles, PaddingStyle} from '../styles/globalStyles';
import {FONTS} from '../styles/fonts';
import {IMAGES} from '../assets/images';

const MyProfileOptions = ({tittle, description, onPress}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      activeOpacity={0.7}
      style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.tittle}>{tittle}</Text>
        <Text style={styles.description}>{description}</Text>
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
  },
  tittle: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  description: {
    fontSize: 14,
    fontFamily: FONTS.extra_light,
    opacity: 0.5,
  },
  nextIcon: {
    width: 10,
    height: 11,
    alignSelf: 'center',
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
});

export default MyProfileOptions;
