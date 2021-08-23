import React, {useEffect, useState} from 'react';
import Screen from '../components/screen';
import {ActivityIndicator, BackHandler, StyleSheet, View} from 'react-native';
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
import {getNavigationParams} from '../const/utils';
import BackButton from '../components/backButton';
import {showErrorMessage} from '../const/flashMessage';
import I18n from '../i18n/i18n';

const PaymentWebview = ({route, navigation}) => {
  //const {t} = useTranslation();
  const url = getNavigationParams(route.params, 'returnUrl', '');
  const successUrl = getNavigationParams(route.params, 'successUrl', '');
  const failureUrl = getNavigationParams(route.params, 'failureUrl', '');
  const onBack = getNavigationParams(route.params, 'onBack', '');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {}, []);

  const onBackHandling = () => {
    onBack();
    navigation.goBack();
  };

  useEffect(() => {
    const backAction = () => {
      onBack();
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton
            light={true}
            onBackPress={() => {
              onBackHandling();
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <Screen useScroll={false}>
      <View style={styles.container}>
        {renderHeader()}
        <View
          style={[
            GlobalStyles.footerContainerLightSmallRadius,
            {...PaddingStyle.pB24},
          ]}>
          {url ? (
            <WebView
              source={{uri: url}}
              onLoad={() => {
                setIsLoading(false);
              }}
              onLoadEnd={data => {
                let endpoint = data.nativeEvent.url;
                console.log(endpoint);
                if (endpoint.includes(successUrl)) {
                  showErrorMessage(I18n.t('paymentSuccessFul'));
                  setTimeout(() => {
                    onBackHandling();
                  }, 1000);
                }
                if (endpoint.includes(failureUrl)) {
                  showErrorMessage(I18n.t('paymentFailed'));
                  setTimeout(() => {
                    onBackHandling();
                  }, 1000);
                }
              }}
            />
          ) : null}
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
    ...PaddingStyle.py16,
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
export default PaymentWebview;
