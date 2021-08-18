import React, {useEffect, useState} from 'react';
import Screen from '../components/screen';
import {ActivityIndicator, Image, View} from 'react-native';
import {IMAGES} from '../assets/images';
import {ContainerStyles, Gravity, LayoutGravity} from '../styles/globalStyles';
import NavigationService from '../navigation/NavigationService';
import Storage, {
  INITIAL_SCREEN,
  IS_APP_INSTALLED,
  IS_MANUAL_RESTART,
  LANGUAGE,
} from '../const/storage';
import {changeAppLanguage} from '../i18n/i18n';
import {COLORS} from '../styles/colors';

const Splash = props => {
  const [showLoader, setShowLoader] = useState(false);
  changeAppLanguage('en');
  useEffect(() => {
    setTimeout(() => {
      redirection();
    }, 2500);
  }, []);

  useEffect(() => {
    checkIsManualRestart();
  }, []);

  const checkIsManualRestart = async () => {
    let mIsManualRestart = await Storage.getData(IS_MANUAL_RESTART);
    setShowLoader(mIsManualRestart === 'true');
  };

  const getLanguage = async () => {
    let mLanguage = await Storage.getData(LANGUAGE);
    if (mLanguage) {
      mLanguage = JSON.parse(mLanguage);
    }
    return mLanguage;
  };

  const redirection = async () => {
    let isAppInstalled = await Storage.getData(IS_APP_INSTALLED);
    let initialScreen = await Storage.getData(INITIAL_SCREEN);
    let isManualRestart = await Storage.getData(IS_MANUAL_RESTART);
    let language = await getLanguage();

    if (language) {
      changeAppLanguage(language.lang_short_name);
    } else {
      changeAppLanguage('en');
    }

    if (isAppInstalled) {
      if (language) {
        if (isManualRestart === 'true') {
          await Storage.storeData(IS_MANUAL_RESTART, 'false');
          NavigationService.reset(initialScreen ?? 'SelectNationality');
        } else {
          NavigationService.reset('SelectLanguage');
        }
      } else {
        NavigationService.reset('SelectLanguage');
      }
    } else {
      NavigationService.reset('Welcome');
    }
  };

  console.log(showLoader);

  return (
    <Screen>
      <View
        style={{
          ...ContainerStyles.container,
          ...ContainerStyles.containerCenterAlign,
        }}>
        <Image
          source={IMAGES.logo}
          resizeMode={'center'}
          style={{
            width: '70%',
            ...Gravity.center,
            ...LayoutGravity.center,
          }}
        />
        {showLoader ? (
          <ActivityIndicator
            color={COLORS.primary}
            size={'small'}
            style={{...LayoutGravity.center, position: 'absolute', bottom: 16}}
          />
        ) : null}
      </View>
    </Screen>
  );
};

export default Splash;
