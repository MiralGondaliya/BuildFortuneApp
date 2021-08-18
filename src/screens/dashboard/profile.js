import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {
  ContainerStyles,
  FontColor,
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
import I18n from '../../i18n/i18n';
import TitleView from '../../components/titleView';
import MyProfileOptions from '../../components/myProfileOption';
import NavigationService from '../../navigation/NavigationService';
import Dialog from '../../components/dialog';
import {apiCall, getProfile} from '../../api';
import {signOut} from '../../const/utils';

const Profile = ({navigation}) => {
  //const {t} = useTranslation();
  const [showLogout, setShowLogout] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      apiCallGetUserDetail();
    });
  }, [navigation]);

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
    {
      title: I18n.t('signOut'),
      description: I18n.t('logoutOrSwitchAccount'),
      onPress: () => {
        setShowLogout(true);
      },
    },
  ];

  const renderHeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={ContainerStyles.containerRow}>
          <Text style={styles.headerTitle}>{I18n.t('my')}</Text>
          <Text style={styles.headerTitleLight}>{I18n.t('profile')}</Text>
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
          {renderGeneral('general', GENERAL)}
          <View style={MarginStyle.mT16} />
          {renderGeneral('support', SUPPORT)}
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
