import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {COLORS} from '../styles/colors';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  MarginStyle,
  Shadow,
} from '../styles/globalStyles';

const Button = ({title, onPress, dark = false, buttonStyle, disabled}) => {
  return (
    <View style={{minWidth: 148}}>
      <TouchableOpacity
        disabled={disabled ?? false}
        activeOpacity={0.5}
        style={[
          styles.buttonContainer,
          dark && styles.buttonContainerOnlyBorder,
          ContainerStyles.containerCenterAlign,
          MarginStyle.my16,
          {
            backgroundColor: dark
              ? disabled
                ? COLORS.gray_disable
                : COLORS.primary
              : COLORS.white,
          },
          buttonStyle ?? {},
        ]}
        onPress={() => {
          onPress();
        }}>
        <Text
          style={[
            FontSize.fontMedium14,
            MarginStyle.mx16,
            dark ? FontColor.colorWhite : FontColor.colorPrimary,
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    borderRadius: 8,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  buttonContainerOnlyBorder: {
    borderColor: COLORS.white,
  },
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.any.isRequired,
  borderOnly: PropTypes.bool,
  buttonStyle: PropTypes.any,
};

export default Button;
