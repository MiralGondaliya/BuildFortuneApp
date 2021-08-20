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
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
  Shadow,
} from '../styles/globalStyles';
import {FONTS} from '../styles/fonts';
import I18n from '../i18n/i18n';
import NavigationService from '../navigation/NavigationService';
import {
  currencyFormat,
  getCurrencyFromCountryId,
  percentageFormat,
} from '../const/utils';

const TopAdsCell = ({
  image,
  price,
  category,
  product,
  businessForLabel,
  title,
  flag,
  location,
  post_id,
  isMyAdsDetail,
  postStatus,
  investmentPercentage,
  currencySymbol,
  countryName,
  countryId,
}) => {
  //const {t} = useTranslation();

  const handleOnDetailPress = () => {
    NavigationService.navigate('AdsDetail', {
      post_id: post_id,
      isMyAdsDetail: isMyAdsDetail ?? false,
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        if (isMyAdsDetail) {
          NavigationService.navigate('EditAdd', {post_id: post_id});
        } else {
          handleOnDetailPress();
        }
      }}
      style={styles.container}>
      <View style={styles.containerShadow}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode={'cover'}
          />
          {price ? (
            <View style={styles.priceView}>
              <Text style={styles.price}>
                {currencyFormat(price, getCurrencyFromCountryId(countryId))}
              </Text>
            </View>
          ) : null}
          {investmentPercentage ? (
            <View style={styles.priceView}>
              <Text style={styles.price}>
                {percentageFormat(investmentPercentage)}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.categoryDetailContainer}>
          <Text style={styles.txtCategoryAndItem}>{category}</Text>
          <View style={styles.space} />
          <Text style={styles.txtBusinessFor}>
            {isMyAdsDetail && postStatus === 0 ? 'Pending' : businessForLabel}
          </Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.categoryDetailContainer}>
          <Image
            source={{uri: flag}}
            style={styles.flagIcon}
            resizeMode={'center'}
          />
          <Text style={styles.location}>{location}</Text>
          <View style={styles.space} />
          <TouchableOpacity onPress={() => handleOnDetailPress()}>
            <Text style={styles.txtViewDetails}>{I18n.t('viewDetails')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: COLORS.white,
    ...Shadow.dropShadow,
    ...MarginStyle.mx16,
    ...MarginStyle.mB24,
  },
  containerShadow: {
    borderRadius: 20,
    backgroundColor: 'white',
    ...Shadow.dropShadow,
    elevation: 0,
    overflow: 'hidden',
    ...PaddingStyle.pB8,
  },
  imageContainer: {
    width: '100%',
    height: 163,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceView: {
    backgroundColor: COLORS.red,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    bottom: 0,
    ...PaddingStyle.px16,
    ...PaddingStyle.py8,
  },
  price: {
    ...FontSize.fontBold14,
    ...FontColor.colorWhite,
  },
  categoryDetailContainer: {
    ...ContainerStyles.containerRow,
    ...LayoutGravity.center,
    ...Gravity.center,
    ...PaddingStyle.px16,
    ...MarginStyle.mT8,
  },
  txtCategoryAndItem: {
    ...FontSize.fontLight14,
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
    ...PaddingStyle.px16,
    fontSize: 20,
    fontFamily: FONTS.medium,
    lineHeight: 33,
  },
  flagIcon: {
    width: 23,
    height: 23,
  },
  location: {
    ...FontSize.fontLight14,
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
});
export default TopAdsCell;
