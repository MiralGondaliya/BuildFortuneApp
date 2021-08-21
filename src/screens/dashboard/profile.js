import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  Text,
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
  Shadow,
} from '../../styles/globalStyles';
import {FONTS} from '../../styles/fonts';
import Screen from '../../components/screen';
import {COLORS} from '../../styles/colors';
import I18n, {changeAppLanguage} from '../../i18n/i18n';
import TitleView from '../../components/titleView';
import MyProfileOptions from '../../components/myProfileOption';
import NavigationService from '../../navigation/NavigationService';
import Dialog from '../../components/dialog';
import {apiCall, getGeneralData, getLanguageList, getProfile} from '../../api';
import {isLogIn, signOut} from '../../const/utils';
import Storage, {
  GENERAL_DATA,
  INITIAL_SCREEN,
  IS_MANUAL_RESTART,
  LANGUAGE,
} from '../../const/storage';
import Menu, {MenuItem} from 'react-native-material-menu';
import {showErrorMessage} from '../../const/flashMessage';
import RNRestart from 'react-native-restart'; // Import package from node modules

const Profile = ({navigation}) => {
  //const {t} = useTranslation();
  const refMenuLanguage = useRef(null);
  const [showLogout, setShowLogout] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      let isLoginFlag = await isLogIn();
      setIsLogin(isLoginFlag);
      if (isLoginFlag) {
        apiCallGetUserDetail();
      } else {
        let mLanguage = await getLanguage();
        setSelectedLanguage(mLanguage.lang_name);
        apiCallGetLanguageList();
      }
    });
  }, [navigation]);

  useEffect(() => {}, [selectedLanguage]);

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
      false,
    );
  };

  const apiCallGetUserDetail = () => {
    apiCall(
      getProfile(),
      (data, message) => {
        if (data) {
          data = data.user_details;
          setUserProfile(data.user_profile);
        }
      },
      false,
    );
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

  const GENERAL = [
    {
      title: I18n.t('profileSetting'),
      description: I18n.t('modifyYourProfile'),
      onPress: () => {
        NavigationService.navigate('ProfileSettings');
      },
    },
    {
      title: I18n.t('privacy'),
      description: I18n.t('changeYourPassword'),
      onPress: () => {
        NavigationService.navigate('PrivacySetting');
      },
    },
    {
      title: I18n.t('myAds'),
      description: I18n.t('listOfYourAds'),
      onPress: () => {
        NavigationService.navigate('MyAds');
      },
    },
    {
      title: I18n.t('setting'),
      description: I18n.t('personalizePreferences'),
      onPress: () => {
        NavigationService.navigate('MyPreferences');
      },
    },
    {
      title: I18n.t('signOut'),
      description: I18n.t('logoutOrSwitchAccount'),
      onPress: () => {
        setShowLogout(true);
      },
    },
  ];

  const navigateToWebView = (title, subTitle) => {
    NavigationService.navigate('WebContent', {
      title: title,
      subTitle: subTitle,
    });
  };

  const SUPPORT = [
    {
      title: I18n.t('aboutUs'),
      description: I18n.t('knowAboutUs'),
      onPress: () => {
        navigateToWebView(I18n.t('aboutUs'));
      },
    },
    {
      title: I18n.t('privacyPolicy'),
      description: I18n.t('checkOurPolicy'),
      onPress: () => {
        navigateToWebView(I18n.t('privacyPolicy'));
      },
    },
    {
      title: I18n.t('termsAndConditions'),
      description: I18n.t('readTandC'),
      onPress: () => {
        navigateToWebView(I18n.t('termsAndConditions'));
      },
    },
    {
      title: I18n.t('contactUs'),
      description: I18n.t('solveYourQueries'),
      onPress: () => {
        navigateToWebView(I18n.t('contactUs'));
      },
    },
  ];

  const GUEST_MENU = [
    {
      title: I18n.t('aboutUs'),
      description: I18n.t('knowAboutUs'),
      onPress: () => {
        navigateToWebView(I18n.t('aboutUs'));
      },
    },
    {
      title: I18n.t('privacyPolicy'),
      description: I18n.t('checkOurPolicy'),
      onPress: () => {
        navigateToWebView(I18n.t('privacyPolicy'));
      },
    },
    {
      title: I18n.t('termsAndConditions'),
      description: I18n.t('readTandC'),
      onPress: () => {
        navigateToWebView(I18n.t('termsAndConditions'));
      },
    },
    {
      title: I18n.t('signIn'),
      description: I18n.t('signInToContinue'),
      onPress: () => {
        NavigationService.navigate('Login');
      },
    },
  ];

  const renderHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={ContainerStyles.containerRow}>
          <Text style={styles.headerTitle}>{I18n.t('my')}</Text>
          <Text style={styles.headerTitleLight}>
            {isLogin ? I18n.t('profile') : I18n.t('settings')}
          </Text>
        </View>
        {userProfile && (
          <Image style={styles.profilePic} source={{uri: userProfile}} />
        )}
      </View>
    );
  };

  const renderGeneral = (title, option) => {
    return (
      <View>
        <TitleView title={I18n.t(title)} small={true} />
        <View style={styles.roundedBg}>
          <FlatList
            ListHeaderComponent={() =>
              !isLogin && (
                <View>
                  <MyProfileOptions
                    tittle={I18n.t('language')}
                    description={selectedLanguage}
                    onPress={() => {
                      showMenuLanguage();
                    }}
                  />
                  <View style={styles.divider} />
                  {renderLanguageDropDown()}
                </View>
              )
            }
            data={option}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            renderItem={({item, index}) => (
              <MyProfileOptions
                tittle={item.title}
                description={item.description}
                onPress={() => item.onPress()}
              />
            )}
          />
        </View>
      </View>
    );
  };

  const renderLanguageDropDown = () => {
    return (
      <Menu
        ref={refMenuLanguage}
        style={{width: '65%'}}
        textStyle={{
          ...COLORS.cornFlowerBlue,
          ...FontSize.fontRegular14,
        }}>
        {languageList.map(language => (
          <MenuItem onPress={() => handleOnLanguageSelection(language)}>
            {language.lang_name}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const hideMenuLanguage = () => {
    refMenuLanguage.current.hide();
  };

  const showMenuLanguage = () => {
    refMenuLanguage.current.show();
  };

  const getLanguage = async () => {
    let mLanguage = await Storage.getData(LANGUAGE);
    if (mLanguage) {
      mLanguage = JSON.parse(mLanguage);
    }
    return mLanguage;
  };

  return (
    <Screen useScroll={true}>
      <View
        style={{
          ...ContainerStyles.container,
          backgroundColor: COLORS.primary,
        }}>
        {renderHeaderComponent()}
        <View
          style={[
            GlobalStyles.footerContainerLightSmallRadius,
            {...PaddingStyle.py16},
          ]}>
          {!isLogin && renderGeneral('general', GUEST_MENU)}
          {isLogin && renderGeneral('general', GENERAL)}
          <View style={MarginStyle.mT16} />
          {isLogin && renderGeneral('support', SUPPORT)}
        </View>
        <Dialog
          showModal={showLogout}
          message={I18n.t('sureWantToLogout')}
          positive={I18n.t('signOut')}
          negative={I18n.t('cancel')}
          hideModal={positive => {
            setShowLogout(false);
            if (positive) {
              signOut(false);
            }
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    ...PaddingStyle.px32,
    ...PaddingStyle.pT32,
    ...PaddingStyle.pB24,
    justifyContent: 'space-between',
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    fontSize: 25,
    fontFamily: FONTS.regular,
  },
  headerTitleLight: {
    ...FontColor.colorWhite,
    fontSize: 25,
    ...Gravity.center,
    fontFamily: FONTS.extra_light,
    ...MarginStyle.mx8,
  },
  profilePic: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  roundedBg: {
    backgroundColor: COLORS.white,
    minHeight: 48,
    borderRadius: 20,
    ...Shadow.dropShadow,
    ...MarginStyle.mT16,
    ...MarginStyle.mx16,
    ...PaddingStyle.px16,
    ...PaddingStyle.py16,
    overflow: 'hidden',
  },
  divider: {
    backgroundColor: COLORS.border,
    height: 1,
    ...MarginStyle.mT8,
    ...MarginStyle.mB16,
  },
});

export default Profile;
