import React from 'react';
import {FloatingLabelInput} from 'react-native-floating-label-input/index';
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {
  ContainerStyles,
  FontSize,
  Gravity,
  LayoutGravity,
  PaddingStyle,
} from '../styles/globalStyles';
import {Image, Platform, View} from 'react-native';
import {IMAGES} from '../assets/images';

const FloatingTextInput = ({
  placeholder,
  keyboardType,
  value,
  onChange,
  rightIcon,
  secret,
  leftComponent,
  hintColor,
  multiLine,
  limit,
}) => {
  return (
    <FloatingLabelInput
      label={placeholder}
      hint={placeholder}
      multiline={multiLine ?? false}
      hintTextColor={COLORS.gray_hint}
      keyboardType={keyboardType ?? 'default'}
      value={value}
      maxLength={limit ?? Number.MAX_VALUE}
      autoCapitalize={
        secret || keyboardType === 'email-address' ? 'none' : 'words'
      }
      leftComponent={leftComponent ?? null}
      rightComponent={
        rightIcon ? (
          <View style={{...Gravity.center, ...LayoutGravity.center}}>
            <Image
              style={{width: 17, height: 17}}
              source={rightIcon}
              resizeMode={'contain'}
            />
          </View>
        ) : null
      }
      customShowPasswordComponent={
        <Image
          style={{width: 17, height: 17}}
          source={IMAGES.eye}
          resizeMode={'contain'}
        />
      }
      customHidePasswordComponent={
        <Image
          style={{width: 17, height: 17}}
          source={IMAGES.eye}
          resizeMode={'contain'}
        />
      }
      isPassword={secret ?? false}
      togglePassword={false}
      onChangeText={value => {
        onChange(value);
      }}
      customLabelStyles={{
        colorFocused: COLORS.black,
        colorBlurred: hintColor ?? COLORS.gray_hint,
        fontSizeFocused: 10,
      }}
      labelStyles={{
        // fontSizeFocused: 10,
        fontFamily: FONTS.regular,
        color: hintColor ?? COLORS.gray_light,
      }}
      containerStyles={{
        borderBottomWidth: 0.5,
        marginTop: 10,
        ...ContainerStyles.container,
        ...PaddingStyle.px8,
        minHeight: 48,
      }}
      inputStyles={{
        paddingBottom: 4,
        ...FontSize.fontMedium14,
        paddingLeft: Platform.OS === 'ios' ? 6 : 5,
        minHeight: 48,
      }}
    />
  );
};

export default FloatingTextInput;
