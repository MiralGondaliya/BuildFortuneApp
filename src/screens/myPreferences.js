import React, {useEffect, useRef, useState} from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import Screen from '../components/screen';
import BackButton from '../components/backButton';
import I18n, {changeAppLanguage} from '../i18n/i18n';
import {IMAGES} from '../assets/images';
import Switch from '../components/switch';
import Menu, {MenuItem} from 'react-native-material-menu';
import {
  apiCall,
  getGeneralData,
  getLanguageList,
  getUserSetting,
  updateUserSettings,
} from '../api';
import {showErrorMessage} from '../const/flashMessage';
import Storage, {
  GENERAL_DATA,
  INITIAL_SCREEN,
  IS_MANUAL_RESTART,
  LANGUAGE,
} from '../const/storage';
import RNRestart from 'react-native-restart'; // Import package from node modules

const MyPreferences = () => {
  //const {t} = useTranslation();
  const refMenuLanguage = useRef(null);
  const [isNotification, setIsNotification] = useState(false);
  const [isSmsAlert, setIsSmsAlert] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    apiCallGetUserSetting();
    apiCallGetLanguageList();
  }, []);

  useEffect(() => {
    apiCallSaveUserSetting();
  }, [isNotification, isSmsAlert, selectedLanguage]);

  const getLanguage = async () => {
    let mLanguage = await Storage.getData(LANGUAGE);
    if (mLanguage) {
      mLanguage = JSON.parse(mLanguage);
    }
    return mLanguage;
  };

  const apiCallGetUserSetting = () => {
    apiCall(
      getUserSetting(),
      async (data, message) => {
        if (data) {
          console.log(data);
          let settings = data.settings;
          setIsNotification(settings.push_alert === 1);
          setIsSmsAlert(settings.sms_alert === 1);
          setSelectedLanguage(settings.language_id == 1 ? 'English' : 'عربى');
        }
      },
      true,
    );
  };

  const apiCallGetLanguageList = () => {
    apiCall(
      getLanguageList(),
      (data, message) => {
        if (data) {
          console.log(data);
          let language_list = data.language_list;
          setLanguageList(language_list);
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const apiCallSaveUserSetting = () => {
    apiCall(
      updateUserSettings(
        isNotification ? 1 : 0,
        isSmsAlert ? 1 : 0,
        selectedLanguage === 'English' ? 1 : 2,
      ),
      (data, message) => {
        if (data) {
          console.log(data);
        }
        console.log(message);
      },
      false,
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton light={true} />
          <Text style={styles.headerTitle}>{I18n.t('myPreferences')} </Text>
        </View>
        {/*<Text style={styles.headerTitleLight}>{I18n.t('preferences')} </Text>*/}
      </View>
    );
  };

  const hideMenuLanguage = () => {
    refMenuLanguage.current.hide();
  };

  const showMenuLanguage = () => {
    refMenuLanguage.current.show();
  };

  const handleOnLanguageSelection = async language => {
    let preSelectedLanguage = await getLanguage();
    hideMenuLanguage();
    if (preSelectedLanguage?.lang_short_name !== language.lang_short_name) {
      setSelectedLanguage(language.lang_name);
      changeAppLanguage(language.lang_short_name);
      await Storage.storeData(LANGUAGE, JSON.stringify(language));
      await Storage.storeData(INITIAL_SCREEN, 'Dashboard');

      apiCallGetGeneralData(async () => {
        if (language.lang_short_name === 'ar') {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
        await Storage.storeData(IS_MANUAL_RESTART, 'true');
        RNRestart.Restart();
      });
    } else {
      let generalData = await Storage.getData(GENERAL_DATA);
      if (!generalData) {
        apiCallGetGeneralData(() => {});
      }
    }
  };

  const apiCallGetGeneralData = callback => {
    apiCall(
      getGeneralData(),
      async (data, message) => {
        if (data) {
          await Storage.storeData(GENERAL_DATA, JSON.stringify(data));
          setTimeout(() => {
            callback();
          }, 500);
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const renderGenderDropdown = item => {
    return (
      <Menu
        ref={refMenuLanguage}
        style={{width: '65%'}}
        textStyle={{
          ...COLORS.cornFlowerBlue,
          ...FontSize.fontRegular14,
        }}>
        {languageList.map(language => (
          <MenuItem
            textStyle={{...FontSize.fontRegular14}}
            onPress={() => handleOnLanguageSelection(language)}>
            {language.lang_name}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const renderItem = (icon, title, message, rightComponent) => {
    return (
      <View activeOpacity={0.7} style={styles.containerItem}>
        <Image source={icon} style={styles.icon} resizeMode={'contain'} />
        <View style={{flex: 1}}>
          <Text style={styles.txtTitle}>{title}</Text>
          <Text style={styles.txtMessage}>{message}</Text>
        </View>
        {rightComponent && rightComponent}
        <Image
          style={styles.nextIcon}
          source={IMAGES.next_grey}
          resizeMode={'contain'}
        />
      </View>
    );
  };

  const switchNotification = () => {
    return (
      <Switch
        style={{...LayoutGravity.center, ...MarginStyle.mx16}}
        isSelected={isNotification}
        onSwitchStatusChange={() => {
          setIsNotification(!isNotification);
        }}
      />
    );
  };

  const switchSMSAlert = () => {
    return (
      <Switch
        style={{...LayoutGravity.center, ...MarginStyle.mx16}}
        isSelected={isSmsAlert}
        onSwitchStatusChange={() => {
          setIsSmsAlert(!isSmsAlert);
        }}
      />
    );
  };

  const divider = () => {
    return <View style={styles.divider} />;
  };

  const language = () => {
    return (
      <TouchableOpacity
        style={{...LayoutGravity.center}}
        onPress={() => showMenuLanguage()}>
        <Text style={styles.selectedLanguage}>{selectedLanguage}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Screen useScroll={true}>
      <View style={styles.container}>
        {renderHeader()}
        <View
          style={[
            GlobalStyles.footerContainerLightSmallRadius,
            {...PaddingStyle.py24},
          ]}>
          {renderItem(
            IMAGES.language,
            I18n.t('language'),
            I18n.t('selectPreferredLanguage'),
            language(),
          )}
          {divider()}
          {renderGenderDropdown()}
          {renderItem(
            IMAGES.notification,
            I18n.t('pushAlert'),
            I18n.t('getPushNotificationOnAlert'),
            switchNotification(),
          )}
          {divider()}
          {renderItem(
            IMAGES.smsAlert,
            I18n.t('smsAlert'),
            I18n.t('getSmsNotificationOnAlert'),
            switchSMSAlert(),
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.container,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.pB32,
    ...PaddingStyle.pT16
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    ...LayoutGravity.centerX,
    ...MarginStyle.mR32,
    flex: 1,
    fontSize: 25,
    fontFamily: FONTS.regular,
  },
  headerTitleLight: {
    ...FontColor.colorWhite,
    fontSize: 25,
    paddingHorizontal: 56,
    marginTop: -16,
    fontFamily: FONTS.extra_light,
    ...MarginStyle.mB32,
  },
  containerItem: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px16,
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  txtTitle: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    ...PaddingStyle.px16,
  },
  txtMessage: {
    fontSize: 14,
    fontFamily: FONTS.extra_light,
    ...PaddingStyle.px16,
  },
  nextIcon: {
    width: 10,
    height: 11,
    alignSelf: 'center',
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  divider: {
    backgroundColor: COLORS.border,
    height: 1,
    ...MarginStyle.mx16,
    ...MarginStyle.mT8,
    ...MarginStyle.mB16,
  },
  selectedLanguage: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: COLORS.gray_hint,
    alignSelf: 'center',
    ...PaddingStyle.px16,
  },
});

export default MyPreferences;
