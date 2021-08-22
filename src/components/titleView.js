import React, {useEffect} from 'react';
import {
  I18nManager,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import I18n from '../i18n/i18n';
import {FONTS} from '../styles/fonts';

const TitleView = ({
  title,
  subTitle,
  small,
  containerStyle,
  onPressViewAll,
  actionText,
  reverseTitle = false,
}) => {
  //const {t} = useTranslation();
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      {reverseTitle ? (
        <Text
          style={[
            styles.subTitle,
            small && styles.titleSmall,
            {marginEnd: 8},
          ]}>
          {subTitle}
        </Text>
      ) : (
        <Text style={[styles.title, small && styles.titleSmall]}>{title}</Text>
      )}
      {reverseTitle ? (
        <Text style={[styles.title, small && styles.titleSmall]}>{title}</Text>
      ) : (
        <Text style={[styles.subTitle, small && styles.titleSmall]}>
          {subTitle}
        </Text>
      )}

      <View style={GlobalStyles.space} />
      {onPressViewAll && (
        <TouchableOpacity
          onPress={() => {
            onPressViewAll();
          }}>
          <Text style={styles.viewAllLabel}>
            {actionText ?? I18n.t('viewAll')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    ...ContainerStyles.containerRow,
    ...Gravity.center,
    ...LayoutGravity.center,
    ...LayoutGravity.center,
    ...PaddingStyle.px16,
  },
  title: {
    ...FontColor.colorBlack,
    fontSize: 26,
    fontFamily: FONTS.medium,
    lineHeight: 40,
    marginEnd: I18nManager.isRTL ? 8 : 0,
  },
  titleSmall: {
    fontSize: 20,
  },
  subTitle: {
    ...FontColor.colorBlack,
    fontSize: 26,
    fontFamily: FONTS.extra_light,
    marginStart: I18nManager.isRTL ? 0 : 8,
  },
  viewAllLabel: {
    ...FontColor.colorBlack,
    ...FontSize.fontLight14,
  },
});
export default TitleView;
