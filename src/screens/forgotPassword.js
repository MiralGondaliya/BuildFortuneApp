import React, {useState} from 'react';
import Screen from '../components/screen';
import {StyleSheet, Text, View} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  MarginStyle,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';
import BackButton from '../components/backButton';
import FloatingTextInput from '../components/floatingTextInput';
import Button from '../components/button';
import I18n from '../i18n/i18n';
import {isEmailValid} from '../const/utils';
import {showErrorMessage, showSuccessMessage} from '../const/flashMessage';
import {apiCall, forgotPassword} from '../api';
import NavigationService from '../navigation/NavigationService';

const ForgotPassword = () => {
  //const {t} = useTranslation();
  const [email, setEmail] = useState('');

  const handleOnForgotPasswordClick = () => {
    if (isEmailValid(email)) {
      apiCall(
        forgotPassword(email),
        (data, message) => {
          if (data) {
            showSuccessMessage(message);
            setTimeout(() => {
              NavigationService.goBack();
            }, 2000);
          } else {
            showErrorMessage(message);
          }
        },
        true,
      );
    } else {
      showErrorMessage(I18n.t('validMessageValidEmail'));
    }
  };

  return (
    <Screen useScroll={true}>
      <View style={styles.container}>
        <View style={GlobalStyles.headerContainerDark}>
          <BackButton light={true} />
          <Text
            style={{
              lineHeight: 52,
              ...MarginStyle.mL48,
              ...FontSize.fontBold48,
              ...FontColor.colorWhite,
            }}>
            {I18n.t('forgotPasswordQue')}
          </Text>
        </View>

        <View style={GlobalStyles.footerContainerLight}>
          <Text style={styles.txtForgotPassword}>
            {I18n.t('forgotPasswordMsg')}
          </Text>
          <FloatingTextInput
            onChange={value => {
              setEmail(value);
            }}
            value={email}
            keyboardType={'email-address'}
            placeholder={I18n.t('emailId')}
          />

          <Button
            title={I18n.t('sendLink')}
            dark={true}
            disabled={!email}
            onPress={() => handleOnForgotPasswordClick()}
          />
          <View style={GlobalStyles.space} />
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
  txtForgotPassword: {
    ...FontSize.fontRegular14,
    ...FontColor.colorBlack,
    ...Gravity.center,
    ...MarginStyle.mB32,
  },
});
export default ForgotPassword;
