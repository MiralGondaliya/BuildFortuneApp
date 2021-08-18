import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';

const AuthAccountFooter = ({label, actionLabel, action}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtLabel}>{label}</Text>
      <TouchableOpacity onPress={() => action()}>
        <Text style={styles.txtActionLabel}>{actionLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.containerRow,
    ...Gravity.center,
    ...LayoutGravity.center,
    ...MarginStyle.mx16,
    ...PaddingStyle.pT24,
  },
  txtLabel: {
    ...FontSize.fontRegular14,
    ...FontColor.colorBlack,
    ...MarginStyle.mR8,
  },
  txtActionLabel: {
    ...FontSize.fontBold14,
    ...FontColor.colorPrimary,
  },
});
export default AuthAccountFooter;
