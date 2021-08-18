import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

const IconButton = ({icon, onPress, style}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <Image
        source={icon}
        style={style ?? styles.image}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
  },
});

export default IconButton;
