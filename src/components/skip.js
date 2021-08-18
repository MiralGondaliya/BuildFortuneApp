import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {LayoutGravity, PaddingStyle} from '../styles/globalStyles';
import {FONTS} from '../styles/fonts';
import {COLORS} from '../styles/colors';
import I18n from '../i18n/i18n';

const Skip = ({label, onPress, containerStyle}) => {
  //const {t} = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[LayoutGravity.center, containerStyle && containerStyle]}>
      <Text style={styles.selectedLanguage}>{label ?? I18n.t('skip')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectedLanguage: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'center',
    ...PaddingStyle.px16,
  },
});
export default Skip;
