import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../styles/colors';
import {
  FontColor,
  FontSize,
  Gravity,
  LayoutGravity,
  PaddingStyle,
} from '../styles/globalStyles';
import NavigationService from '../navigation/NavigationService';

const CategoriesCell = ({
  image,
  category,
  categoryId,
  adsCount,
  onCategoryPress,
  big,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, big && styles.containerBig]}
      onPress={() => {
        NavigationService.navigate('CategoryAds', {
          category: category,
          categoryId: categoryId,
          toHome: false,
        });
      }}>
      <Image
        style={big ? styles.iconBig : styles.icon}
        source={{uri: image}}
        resizeMode={'contain'}
      />
      <Text style={styles.txtCategory}>{category}</Text>
      {/*<Text style={styles.txtAdsCount}>{`(${adsCount}) ads`}</Text>*/}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    borderWidth: 1,
    width: 119,
    minHeight: 157,
    borderColor: COLORS.border,
    ...LayoutGravity.center,
    ...Gravity.center,
    ...PaddingStyle.pT8,
  },
  containerBig: {
    minWidth: 144,
    minHeight: 173,
  },
  txtCategory: {
    ...FontColor.colorPrimary,
    ...FontSize.fontRegular14,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 15,
  },
  txtAdsCount: {
    letterSpacing: -1,
    ...FontColor.colorBlack,
    ...FontSize.fontLight14,
    ...PaddingStyle.py8,
    lineHeight: 14,
  },
  icon: {
    width: 56,
    height: 56,
  },
  iconBig: {
    width: 75,
    height: 75,
  },
});
export default CategoriesCell;
