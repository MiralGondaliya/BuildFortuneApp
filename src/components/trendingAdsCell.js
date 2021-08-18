import React from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../styles/colors';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
  Shadow,
} from '../styles/globalStyles';
import {FONTS} from '../styles/fonts';
import { currencyFormat, getCurrencyFromCountryId, percentageFormat } from "../const/utils";
import NavigationService from '../navigation/NavigationService';

const TrendingAdsCell = ({
  image,
  category,
  title,
  flag,
  location,
  businessForLabel,
  price,
  post_id,
  currencySymbol,
  investmentPercentage,
  countryId,
}) => {
  const handleOnDetailPress = () => {
    NavigationService.navigate('AdsDetail', {
      post_id: post_id,
      isMyAdsDetail: false,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleOnDetailPress()}>
      <Image source={{uri: image}} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={styles.txtCategoryAndItem}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.categoryDetailContainer}>
          <Image
            source={{uri: flag}}
            style={styles.flagIcon}
            resizeMode={'center'}
          />
          <Text style={styles.location}>{location}</Text>
        </View>
        <View style={GlobalStyles.space} />
        <View style={styles.categoryDetailContainer}>
          <Text style={styles.txtBusinessFor}>{businessForLabel}</Text>
          <View style={styles.space} />
          {price ? (
            <Text style={styles.price}>
              {currencyFormat(price, getCurrencyFromCountryId(countryId))}
            </Text>
          ) : null}
          {investmentPercentage ? (
            <Text style={styles.price}>
              {percentageFormat(investmentPercentage)}
            </Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow.dropShadow,
    ...MarginStyle.mx16,
    ...MarginStyle.mB24,
    ...ContainerStyles.containerRow,
  },
  image: {
    width: 112,
    height: 108,
  },
  price: {
    backgroundColor: COLORS.red,
    borderTopLeftRadius: I18nManager.isRTL ? 0 : 20,
    borderTopRightRadius: I18nManager.isRTL ? 20 : 0,
    ...PaddingStyle.px16,
    ...PaddingStyle.py8,
    ...FontSize.fontBold14,
    ...FontColor.colorWhite,
  },
  categoryDetailContainer: {
    ...ContainerStyles.containerRow,
    ...LayoutGravity.centerY,
  },
  txtCategoryAndItem: {
    fontSize: 9,
    fontFamily: FONTS.regular,
    ...FontColor.colorGrayLabel,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: COLORS.gray_lable,
    ...MarginStyle.mx8,
  },
  txtBusinessFor: {
    fontSize: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.red,
    minHeight: 17,
    textAlign: 'center',
    lineHeight: 15,
    paddingVertical: 2,
    ...PaddingStyle.px8,
    ...FontColor.colorRed,
  },
  title: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    lineHeight: 21,
  },
  flagIcon: {
    width: 23,
    height: 23,
  },
  location: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    ...FontColor.colorBlack,
    ...MarginStyle.mx8,
  },
  txtViewDetails: {
    ...FontColor.colorGrayLabel,
    ...FontSize.fontLight14,
    lineHeight: 20,
  },
  space: {
    flex: 1,
    height: 0,
  },
  detailContainer: {
    flex: 1,
    ...PaddingStyle.pL8,
  },
});

export default TrendingAdsCell;
