import React, {useEffect, useState} from 'react';
import Screen from '../components/screen';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
  Shadow,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import WebView from 'react-native-webview';
import I18n from '../i18n/i18n';
import {getNavigationParams} from '../const/utils';
import {apiCall, auth, getCmsPageDetails, language} from '../api';
import {showErrorMessage} from '../const/flashMessage';
import BackButton from '../components/backButton';

const WebContent = ({route}) => {
  //const {t} = useTranslation();
  const title = getNavigationParams(route.params, 'title', '');
  const subTitle = getNavigationParams(route.params, 'subTitle', '');

  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    apiCallGetLink();
  }, []);

  const apiCallGetLink = () => {
    apiCall(
      getCmsPageDetails(),
      (data, message) => {
        if (data) {
          let cms_pages = data.cms_pages;
          switch (title) {
            case I18n.t('aboutUs'):
              setUrl(cms_pages.about);
              break;
            case I18n.t('privacyPolicy'):
              setUrl(cms_pages.privacy);
              break;
            case I18n.t('termsAndConditions'):
              setUrl(cms_pages.terms);
              break;
            case I18n.t('contactUs'):
              auth().then(response => {
                language().then(languageId => {
                  if (languageId) {
                    let token = response.token;
                    setUrl(
                      `${cms_pages.contact}/${token}?language_id=${languageId}`,
                    );
                  }
                });
              });
              break;
          }
        } else {
          showErrorMessage(message);
        }
      },
      false,
      status => {
        setIsLoading(status);
      },
    );
  };

  const renderHeader = (title, subTitle) => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton light={true} />
          <Text style={styles.headerTitle}>{title} </Text>
        </View>
      </View>
    );
  };

  return (
    <Screen useScroll={false}>
      <View style={styles.container}>
        {renderHeader(title, subTitle)}
        <View
          style={[
            GlobalStyles.footerContainerLightSmallRadius,
            {...PaddingStyle.pB24},
          ]}>
          {url ? <WebView source={{uri: url}} /> : null}
          {isLoading ? (
            <ActivityIndicator
              style={styles.indicator}
              color={COLORS.primary}
              size={'large'}
            />
          ) : null}
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
    ...PaddingStyle.py32,
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    fontSize: 25,
    fontFamily: FONTS.regular,
    ...Gravity.center,
  },
  headerTitleLight: {
    ...FontColor.colorWhite,
    fontSize: 25,
    fontFamily: FONTS.extra_light,
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
    ...MarginStyle.mx16,
    ...MarginStyle.mT8,
    ...MarginStyle.mB16,
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 16,
  },
});
export default WebContent;
