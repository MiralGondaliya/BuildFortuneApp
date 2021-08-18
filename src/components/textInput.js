import React, {useRef, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  ContainerStyles,
  GlobalStyles,
  LayoutGravity,
  MarginStyle,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';

const Input = ({
  value,
  placeholder,
  leftIcon,
  onChangeText,
  keyboardType,
  secureTextEntry = false,
  onPress,
  isAutofocus,
}) => {
  const refInput = useRef(null);
  useEffect(() => {
    refInput.current.setNativeProps({style: GlobalStyles.authInput});
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.2 : 1.0}
      onPress={() => {
        onPress && onPress();
      }}
      style={[
        ContainerStyles.containerRow,
        LayoutGravity.centerY,
        MarginStyle.mx16,
        MarginStyle.mB8,
        styles.inputContainer,
      ]}>
      <Image
        source={leftIcon ?? {}}
        style={[styles.icon]}
        resizeMode={'contain'}
      />
      <TextInput
        value={value}
        ref={refInput}
        editable={!onPress}
        autoFocus={isAutofocus}
        style={GlobalStyles.authInput}
        keyboardType={keyboardType ?? 'default'}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: COLORS.gray_light,
    borderBottomWidth: 0.8,
    minHeight: 48,
  },
  icon: {
    width: 28,
    height: 28,
    marginEnd: 8,
  },
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  leftIcon: PropTypes.any,
  onChangeText: PropTypes.any.isRequired,
  keyboardType: PropTypes.any,
};

export default Input;
