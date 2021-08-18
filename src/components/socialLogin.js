import React from 'react';
import {Platform, Text, View} from 'react-native';
import {
  ContainerStyles,
  FontSize,
  GlobalStyles,
  Gravity,
  MarginStyle,
} from '../styles/globalStyles';
import IconButton from './iconButton';
import {IMAGES} from '../assets/images';
import {COLORS} from '../styles/colors';

const SocialLogin = ({lightContent = true}) => {
  const handleOnGooglePress = () => {};

  const handleOnFaceBookPress = () => {};

  const handleOnAppleAuth = () => {};

  return (
    <View>
      <Text
        style={[
          {
            ...FontSize.fontRegular14,
            textAlign: 'center',
          },
          {color: !lightContent ? COLORS.gray : COLORS.cornFlowerBlue},
        ]}>
        - Login via social media -
      </Text>
      <View
        style={{
          ...ContainerStyles.containerRow,
          ...Gravity.center,
          ...MarginStyle.mT16,
        }}>
        <IconButton
          icon={lightContent ? IMAGES.fb : IMAGES.fb_filled}
          onPress={() => {
            handleOnFaceBookPress();
          }}
        />
        <View style={GlobalStyles.space8} />
        <IconButton
          icon={lightContent ? IMAGES.google : IMAGES.google_filled}
          onPress={() => {
            handleOnGooglePress();
          }}
        />
        {Platform.OS === 'ios' && (
          <View style={ContainerStyles.containerRow}>
            <View style={GlobalStyles.space8} />
            <IconButton
              icon={lightContent ? IMAGES.apple : IMAGES.apple}
              onPress={() => {
                handleOnAppleAuth();
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SocialLogin;
