import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import BackButton from '../components/backButton';
import Screen from '../components/screen';
import I18n from '../i18n/i18n';
import TitleView from '../components/titleView';
import FloatingTextInput from '../components/floatingTextInput';
import Button from '../components/button';
import {showErrorMessage, showSuccessMessage} from '../const/flashMessage';
import {apiCall, changePassword} from '../api';
import NavigationService from '../navigation/NavigationService';

const PrivacySetting = () => {
  //const {t} = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnSubmitPress = () => {
    if (!currentPassword) {
      showErrorMessage(I18n.t('pleaseEnterCurrentPass'));
      return;
    }
    if (!password) {
      showErrorMessage(I18n.t('pleaseEnterNewPassword'));
      return;
    }
    if (!confirmPassword) {
      showErrorMessage(I18n.t('pleaseEnterConfirmPassword'));
      return;
    }
    if (password !== confirmPassword) {
      showErrorMessage(I18n.t('passwordDoseNotMatch'));
      return;
    }

    apiCall(
      changePassword(currentPassword, password, confirmPassword),
      (data, message) => {
        if (data) {
          showSuccessMessage(message);
          setTimeout(() => {
            NavigationService.goBack();
          }, [2000]);
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const inputs = [
    {
      placeholder: I18n.t('currentPassword'),
      value: currentPassword,
      keyboardType: 'default',
      secret: true,
      setValue: value => {
        setCurrentPassword(value);
      },
    },
    {
      placeholder: I18n.t('password'),
      value: password,
      keyboardType: 'default',
      secret: true,
      setValue: value => {
        setPassword(value);
      },
    },
    {
      placeholder: I18n.t('confirmPassword'),
      value: confirmPassword,
      secret: true,
      keyboardType: 'default',
      setValue: value => {
        setConfirmPassword(value);
      },
    },
  ];

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton light={true} />
          <Text style={styles.headerTitle}>{I18n.t('privacy')} </Text>
        </View>
        <Text style={styles.headerTitleLight}>{I18n.t('settings')} </Text>
      </View>
    );
  };

  return (
    <Screen useScroll={true}>
      <View style={styles.container}>
        {renderHeader()}
        <View
          style={[
            GlobalStyles.footerContainerLightSmallRadius,
            {...PaddingStyle.p16},
          ]}>
          <TitleView title={I18n.t('password')} subTitle={I18n.t('reset')} small={true} />
          <Text style={styles.txtMessage}>{I18n.t('resetPasswordMessage')}</Text>
          <View style={PaddingStyle.p16}>
            {inputs.map((item, index) => (
              <View style={(MarginStyle.mx16, PaddingStyle.py8)}>
                <FloatingTextInput
                  onChange={value => {
                    item.setValue(value);
                  }}
                  leftComponent={item.leftComponent}
                  secret={item.secret}
                  value={item.value}
                  keyboardType={item.keyboardType}
                  placeholder={item.placeholder}
                  rightIcon={item.rightIcon}
                />
              </View>
            ))}
            <View style={GlobalStyles.space} />
            <Button
              title={I18n.t('changePassword')}
              dark={true}
              onPress={() => handleOnSubmitPress()}
            />
          </View>
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
  txtMessage: {
    fontFamily: FONTS.extra_light,
    fontSize: 14,
    ...PaddingStyle.px16,
  },
});

export default PrivacySetting;
