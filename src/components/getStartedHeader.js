import React from 'react';
import {Image, View} from 'react-native';
import BackButton from './backButton';
import {IMAGES} from '../assets/images';
import {Gravity, LayoutGravity} from '../styles/globalStyles';

const GetStartedHeader = ({hideBackButton}) => {
  return (
    <View>
      {!hideBackButton && <BackButton light={false} />}
      <Image
        source={IMAGES.logo}
        resizeMode={'contain'}
        style={{
          width: 118,
          height: 140,
          marginTop: hideBackButton ? 10 : -40,
          ...Gravity.center,
          ...LayoutGravity.center,
        }}
      />
    </View>
  );
};

export default GetStartedHeader;
