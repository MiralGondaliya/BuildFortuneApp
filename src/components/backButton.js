import React from 'react';
import {I18nManager, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {IMAGES} from '../assets/images';
import {GlobalStyles} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';
import NavigationService from '../navigation/NavigationService';

const BackButton = ({onBackPress, light}) => {
  return (
    <TouchableOpacity
      onPress={() => (onBackPress ? onBackPress() : NavigationService.goBack())}
      style={GlobalStyles.navIconContainer}>
      <Image
        source={IMAGES.back_light}
        style={[
          styles.backImage,
          light && styles.backImageLight,
          {tintColor: light ? COLORS.white : COLORS.primary},
        ]}
        resizeMode={'center'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backImage: {
    ...GlobalStyles.navIcon,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  backImageLight: {
    tintColor: COLORS.white,
  },
});

export default BackButton;
