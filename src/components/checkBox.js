import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  Gravity,
  LayoutGravity,
  MarginStyle,
} from '../styles/globalStyles';
import {IMAGES} from '../assets/images';
import {COLORS} from '../styles/colors';

const Checkbox = ({containerStyle, onCheckedChange, title, isSelected}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={containerStyle ?? null}
      onPress={() => onCheckedChange()}>
      <View style={styles.checkBoxWrapper}>
        <View
          style={
            isSelected ? styles.checkBoxSelected : styles.checkBoxUnSelected
          }>
          <Image
            style={styles.image}
            source={IMAGES.right_mark}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxSelected: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    ...LayoutGravity.center,
    marginTop: 4,
  },
  checkBoxUnSelected: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    ...LayoutGravity.center,
    marginTop: 4,
  },
  titleStyle: {
    ...FontSize.fontRegular14,
    ...FontColor.colorBlack,
    ...MarginStyle.mx8,
    marginTop: 2,
  },
  image: {
    width: 10,
    height: 10,
  },
  checkBoxWrapper: {
    ...ContainerStyles.containerRow,
  },
});

export default Checkbox;
