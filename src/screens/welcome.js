import React from 'react';
import {Image, Text, View} from 'react-native';
import Screen from '../components/screen';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import {IMAGES} from '../assets/images';
import Button from '../components/button';
import NavigationService from '../navigation/NavigationService';
import I18n from '../i18n/i18n';
import Storage, {IS_APP_INSTALLED} from '../const/storage';

const Welcome = () => {
  //const {t} = useTranslation();

  const handleOmGetStartedPress = () => {
    Storage.storeData(IS_APP_INSTALLED, 'true');
    NavigationService.reset('SelectLanguage');
  };

  return (
    <Screen useScroll={true}>
      <View
        style={{
          ...ContainerStyles.container,
        }}>
        <View style={[GlobalStyles.headerContainer, {flex: 0.2}]}>
          <Image
            source={IMAGES.logo}
            resizeMode={'contain'}
            style={{
              width: 257,
              height: 160,
              ...Gravity.center,
              ...LayoutGravity.center,
              ...MarginStyle.my32,
            }}
          />
        </View>
        <View style={GlobalStyles.footerContainer}>
          <View style={{...PaddingStyle.px24}}>
            <Text
              style={{
                ...FontSize.fontBold48,
                ...FontColor.colorWhite,
                ...PaddingStyle.pT32,
                alignSelf: 'center',
              }}>
              {I18n.t('welcome')}
            </Text>

            <Text
              style={{
                ...FontSize.fontRegular14,
                ...FontColor.colorCornFlowerFlue,
                textAlign: 'center',
              }}>
              {I18n.t('welcomeMessage')}
            </Text>
            <View style={GlobalStyles.space} />
            <View style={{alignSelf: 'center'}}>
              <Button
                title={I18n.t('getStarted')}
                onPress={() => handleOmGetStartedPress()}
              />
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default Welcome;
