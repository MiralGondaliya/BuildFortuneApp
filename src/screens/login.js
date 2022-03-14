import React, {useState} from 'react';
import Screen from '../components/screen';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
import SocialLogin from '../components/socialLogin';
import AuthAccountFooter from '../components/authAccountFooter';
import NavigationService from '../navigation/NavigationService';
import I18n from '../i18n/i18n';
import Skip from '../components/skip';
import {apiCall, login, updateUserSettings} from '../api';
import {showErrorMessage} from '../const/flashMessage';
import {showLoader} from '../components/Loader';
import Storage, {LANGUAGE, USER_DATA} from '../const/storage';
import {isIos} from '../const/utils';

const Login = () => {
  //const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setRememberMe] = useState(false);

  const handleOnSignUpClick = () => {
    NavigationService.navigate('Signup');
  };

  const handleOnLoginClick = () => {
    if (!email) {
      showErrorMessage(I18n.t('validMessageEmptyEmail'));
      return;
    }
    if (!password) {
      showErrorMessage(I18n.t('validMessageEmptyPassword'));
      return;
    }

    apiCall(
      login(email, password),
      async (data, message) => {
        if (data) {
          let user_details = data.user_details;
          await Storage.storeData(USER_DATA, JSON.stringify(user_details));
          await apiCallSaveUserSetting();
          NavigationService.reset('Dashboard');
        } else {
          showErrorMessage(message);
        }
        console.log(data);
      },
      true,
    );
  };

  const getLanguage = async () => {
    let mLanguage = await Storage.getData(LANGUAGE);
    if (mLanguage) {
      mLanguage = JSON.parse(mLanguage);
    }
    return mLanguage;
  };

  const apiCallSaveUserSetting = async () => {
    let language = await getLanguage();
    if (language) {
      apiCall(
        updateUserSettings(1, 1, language.lang_short_name === 'ar' ? 2 : 1),
        (data, message) => {
          if (data) {
            console.log(data);
          }
          console.log(message);
        },
        false,
      );
    }
  };

  const handleOnForgotPasswordClick = () => {
    NavigationService.navigate('ForgotPassword');
  };

  return (
    <Screen useScroll={true}>
      <View style={styles.container}>
        <View style={GlobalStyles.headerContainerDark}>
          <View
            style={{
              ...ContainerStyles.containerRow,
              justifyContent: 'space-between',
            }}>
            <BackButton light={true} />
            <Skip
              onPress={() => {
                NavigationService.reset('Dashboard');
              }}
            />
          </View>
          <Text
            style={{
              ...MarginStyle.mx48,
              ...FontSize.fontBold48,
              ...FontColor.colorWhite,
            }}>
            {I18n.t('signin')}
          </Text>
          <Text
            style={{
              ...MarginStyle.mx48,
              ...FontSize.fontRegular14,
              ...FontColor.colorCornFlowerFlue,
              marginTop: isIos() ? -1 : -16,
            }}>
            {I18n.t('signInToContinue')}
          </Text>
        </View>
        <View style={GlobalStyles.footerContainerLight}>
          <FloatingTextInput
            onChange={value => {
              setEmail(value);
            }}
            value={email}
            keyboardType={'email-address'}
            placeholder={I18n.t('emailId')}
          />
          <FloatingTextInput
            onChange={value => {
              setPassword(value);
            }}
            secret={true}
            value={password}
            keyboardType={'default'}
            placeholder={I18n.t('password')}
          />

          {/*<Checkbox*/}
          {/*  containerStyle={styles.checkBoxContainerStyle}*/}
          {/*  onCheckedChange={value => {*/}
          {/*    setRememberMe(!isRememberMe);*/}
          {/*  }}*/}
          {/*  isSelected={isRememberMe}*/}
          {/*  title={I18n.t('rememberMe')}*/}
          {/*/>*/}

          <View style={MarginStyle.mT16} />
          <Button
            title={I18n.t('login')}
            dark={true}
            onPress={() => handleOnLoginClick()}
          />

          <TouchableOpacity onPress={() => handleOnForgotPasswordClick()}>
            <Text style={styles.txtForgotPassword}>
              {I18n.t('forgotPasswordQue')}
            </Text>
          </TouchableOpacity>

          <View
            style={{...GlobalStyles.space, ...MarginStyle.mT16, minHeight: 25}}
          />
          {/*<SocialLogin lightContent={false} />*/}
          <AuthAccountFooter
            label={I18n.t('doNotHaveAccount')}
            actionLabel={I18n.t('signUp')}
            action={() => handleOnSignUpClick()}
          />
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
  checkBoxContainerStyle: {
    ...MarginStyle.my16,
  },
  txtForgotPassword: {
    ...FontSize.fontRegular14,
    ...FontColor.colorBlack,
    ...Gravity.center,
  },
});
export default Login;
