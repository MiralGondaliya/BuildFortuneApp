import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {IMAGES} from '../assets/images';

const Switch = ({isSelected, onSwitchStatusChange, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onSwitchStatusChange()}
      style={style ?? null}>
      <Image
        style={{width: 42, height: 24}}
        resizeMode={'contain'}
        source={isSelected ? IMAGES.switch_on : IMAGES.switch_off}
      />
    </TouchableOpacity>
  );
};

export default Switch;
