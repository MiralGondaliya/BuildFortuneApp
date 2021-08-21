import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {FontColor, Gravity, LayoutGravity} from '../styles/globalStyles';
import {isLogIn} from '../const/utils';
import NavigationService from '../navigation/NavigationService';
import I18n from '../i18n/i18n';
const BottomNavigationTab = ({
  color,
  size,
  icon,
  name,
  focused,
  navigation,
}) => {
  const navigate = async () => {
    isLogIn()
      .then(result => {
        if (result) {
          navigation.navigate(name);
        } else {
          NavigationService.navigate('Login');
        }
      })
      .catch(() => {});
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (name === I18n.t('createAdd') || name === I18n.t('notice')) {
          navigate();
        } else {
          navigation.navigate(name);
        }
      }}
      style={styles.containerMain}
      activeOpacity={1}>
      <View style={[styles.container, focused && styles.containerSelected]}>
        <Image
          source={icon}
          resizeMode={'contain'}
          style={{
            height: 20,
            width: 20,
            tintColor: focused ? COLORS.primary : COLORS.white,
          }}
        />
        <Text
          style={[
            styles.title,
            {color: focused ? COLORS.primary : COLORS.white},
          ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    width: '100%',
    height: '100%',
    ...Gravity.center,
    ...LayoutGravity.center,
  },
  container: {
    ...LayoutGravity.center,
    ...Gravity.center,
    borderRadius: 15,
    height: '80%',
    width: '90%',
    paddingTop: 4,
  },
  containerSelected: {
    backgroundColor: COLORS.white,
  },
  title: {
    ...FontColor.colorWhite,
    fontSize: 10,
    marginTop: 4,
    fontFamily: FONTS.light,
  },
});

export default BottomNavigationTab;
