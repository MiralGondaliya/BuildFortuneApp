import React, {useEffect, useRef, useState} from 'react';
import Screen from '../components/screen';
import {
  Image,
  Platform,
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
import BackButton from '../components/backButton';
import Checkbox from '../components/checkBox';
import FloatingTextInput from '../components/floatingTextInput';
import Button from '../components/button';
import AuthAccountFooter from '../components/authAccountFooter';
import NavigationService from '../navigation/NavigationService';
import {IMAGES} from '../assets/images';
import Menu, {MenuItem} from 'react-native-material-menu';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import I18n from '../i18n/i18n';
import Skip from '../components/skip';
import NationalitySelectionPopup from '../components/nationalitySelectionPopup';
import {apiCall, signup} from '../api';
import {showErrorMessage, showSuccessMessage} from '../const/flashMessage';
import { isEmailValid, isIos } from "../const/utils";

const Signup = () => {
  //const {t} = useTranslation();
  const refMenuGender = useRef(null);
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [nationalityId, setNationalityId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isTermsAccepted, setTermsAccepted] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isBtnEnabled, setButtonEnabled] = useState(false);

  const [showNationalityPopup, setShowNationalityPopup] = useState(false);
  const [showCountyCodePicker, setShowCountyCodePicker] = useState(false);

  useEffect(() => {
    validateForm();
  });

  const validateForm = () => {
    let isCountryCode = !!countryCode;
    let isPhone = !!phone;
    let isFullName = !!fullName;
    let isEmail = !!email; //&& isEmailValid(email);
    let isPassword = !!password;
    let isConfirmPassword = !!confirmPassword;
    // let isPasswordMatch = password === confirmPassword;
    let isGender = Platform.OS === 'ios' ? true : !!gender;
    let isNationality = !!nationality;
    let isDateOfBirth = !!dateOfBirth;
    setButtonEnabled(
      isCountryCode &&
        isPhone &&
        isFullName &&
        isEmail &&
        isPassword &&
        // isPasswordMatch &&
        isConfirmPassword &&
        isGender &&
        isNationality &&
        isDateOfBirth &&
        isTermsAccepted,
    );
  };

  const renderCountryCodePicker = () => (
    <TouchableOpacity
      onPress={() => {
        setShowCountyCodePicker(true);
      }}
      style={{
        ...ContainerStyles.containerRow,
        ...Gravity.center,
        ...LayoutGravity.center,
        ...PaddingStyle.px8,
      }}>
      <Text
        style={{
          ...FontColor.colorBlack,
          ...FontSize.fontRegular14,
        }}>
        {countryCode}
      </Text>
      <Image
        style={{width: 17, height: 17, ...MarginStyle.mx8}}
        source={IMAGES.dropdown}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );

  const inputs = [
    {
      placeholder: I18n.t('phoneNumber'),
      value: phone,
      keyboardType: 'number-pad',
      setValue: value => {
        setPhone(value);
      },
      leftComponent: renderCountryCodePicker(),
    },
    {
      placeholder: I18n.t('fullName'),
      value: fullName,
      keyboardType: 'default',
      setValue: value => {
        setFullName(value);
      },
    },
    {
      placeholder: I18n.t('emailId'),
      value: email,
      keyboardType: 'email-address',
      setValue: value => {
        setEmail(value);
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
    {
      placeholder: I18n.t('nationality'),
      value: nationality,
      keyboardType: 'default',
      dropdown: true,
      rightIcon: IMAGES.dropdown,
      setValue: value => {
        setNationality(value);
      },
    },
    {
      placeholder: I18n.t('gender'),
      value: gender,
      dropdown: true,
      rightIcon: IMAGES.dropdown,
      keyboardType: 'default',
      setValue: value => {
        setGender(value);
      },
    },
    {
      placeholder: I18n.t('dateOfBirth'),
      value: dateOfBirth,
      dropdown: true,
      rightIcon: IMAGES.calendar,
      keyboardType: 'default',
      setValue: value => {
        setDateOfBirth(value);
      },
    },
  ];

  const handleOnSignInClick = () => {
    NavigationService.navigate('Login');
  };

  const handleOnSignUpClick = () => {
    let isEmail = isEmailValid(email);
    let isPasswordMatch = password === confirmPassword;

    if (!isEmail) {
      showErrorMessage(I18n.t('validMessageValidEmail'));
      return;
    }
    if (!isPasswordMatch) {
      showErrorMessage(I18n.t('passwordDoseNotMatch'));
      return;
    }

    apiCall(
      signup(
        countryCode,
        phone,
        fullName,
        email,
        password,
        confirmPassword,
        nationalityId,
        gender === I18n.t('male') ? 1 : gender === I18n.t('female') ? 2 : 3,
        dateOfBirth,
        isTermsAccepted ? 1 : 0,
      ),
      (data, message) => {
        if (data) {
          showSuccessMessage(message);
          NavigationService.navigate('Login');
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const hideGenderMenu = () => {
    refMenuGender.current.hide();
  };

  const showGenderMenu = () => {
    refMenuGender.current.show();
  };

  const renderGenderDropdown = item => {
    return (
      <Menu
        ref={refMenuGender}
        style={{width: '85%'}}
        textStyle={{
          ...COLORS.cornFlowerBlue,
          ...FontSize.fontRegular14,
        }}>
        <MenuItem
          textStyle={{...FontSize.fontRegular14}}
          onPress={() => {
            item.setValue(I18n.t('male')), hideGenderMenu();
          }}>
          {I18n.t('male')}
        </MenuItem>
        <MenuItem
          textStyle={{...FontSize.fontRegular14}}
          onPress={() => {
            item.setValue(I18n.t('female')), hideGenderMenu();
          }}>
          {I18n.t('female')}
        </MenuItem>
        <MenuItem
          textStyle={{...FontSize.fontRegular14}}
          onPress={() => {
            item.setValue(I18n.t('other')), hideGenderMenu();
          }}>
          {I18n.t('other')}
        </MenuItem>
      </Menu>
    );
  };

  const navigateToWebView = (title, subTitle) => {
    NavigationService.navigate('WebContent', {
      title: title,
      subTitle: subTitle,
    });
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
            {I18n.t('register')}
          </Text>
          <Text
            style={{
              ...MarginStyle.mx48,
              ...FontSize.fontRegular14,
              ...FontColor.colorCornFlowerFlue,
              marginTop: isIos() ? -1 : -16,
            }}>
            {I18n.t('createAnewAccount')}
          </Text>
        </View>
        <View style={GlobalStyles.footerContainerLight}>
          {inputs.map((item, index) => (
            <TouchableOpacity
              disabled={true}
              onPress={() => {
                if (item.placeholder === I18n.t('dateOfBirth')) {
                  setDatePickerVisibility(!isDatePickerVisible);
                }
                if (item.placeholder === I18n.t('gender')) {
                  showGenderMenu();
                }
                if (item.placeholder === I18n.t('nationality')) {
                  setShowNationalityPopup(true);
                }
              }}>
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
              {item.dropdown ? (
                <View
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'transparent',
                  }}
                />
              ) : null}
              {item.placeholder === I18n.t('gender')
                ? renderGenderDropdown(item)
                : null}
            </TouchableOpacity>
          ))}

          <Checkbox
            containerStyle={{...MarginStyle.mT24, ...MarginStyle.mB16}}
            isSelected={isTermsAccepted}
            onCheckedChange={() => {
              setTermsAccepted(!isTermsAccepted);
            }}
            title={
              <Text>
                {I18n.t('acceptTerms1')}{' '}
                <Text
                  style={{...FontSize.fontMedium14}}
                  onPress={() => {
                    navigateToWebView(I18n.t('termsAndConditions'));
                  }}>
                  {I18n.t('acceptTerms2')}
                </Text>{' '}
                {I18n.t('acceptTerms3')}{' '}
                <Text
                  onPress={() => {
                    navigateToWebView(I18n.t('privacyPolicy'));
                  }}
                  style={{...COLORS.primary, ...FontSize.fontMedium14}}>
                  {I18n.t('acceptTerms4')}
                </Text>{' '}
                {I18n.t('acceptTerms5')}
              </Text>
            }
          />
          <Button
            title={I18n.t('signUp')}
            dark={true}
            disabled={!isBtnEnabled}
            onPress={() => handleOnSignUpClick()}
          />

          <View
            style={{...GlobalStyles.space, ...MarginStyle.mT16, minHeight: 25}}
          />
          {/*<SocialLogin lightContent={false} />*/}

          <AuthAccountFooter
            label={I18n.t('alreadyHaveAccount')}
            actionLabel={I18n.t('signIn')}
            action={() => handleOnSignInClick()}
          />
        </View>

        <DateTimePickerModal
          date={
            dateOfBirth
              ? moment(dateOfBirth, 'DD-MM-YYYY').toDate()
              : new Date()
          }
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date()}
          onConfirm={date => {
            setDatePickerVisibility(false);
            setDateOfBirth(date.toString());
            let formattedDate = moment(date.toString()).format('DD-MM-YYYY');
            setDateOfBirth(formattedDate);
          }}
          onCancel={() => {
            setDatePickerVisibility(false);
          }}
        />
        <NationalitySelectionPopup
          isNationality={showNationalityPopup}
          showModal={showCountyCodePicker || showNationalityPopup}
          onSelect={data => {
            if (showCountyCodePicker) {
              setCountryCode(data.country_phonecode);
            }
            if (showNationalityPopup) {
              setNationality(data.country_nationality);
              setNationalityId(data.country_id);
            }
          }}
          hideModal={() => {
            if (showCountyCodePicker) {
              setShowCountyCodePicker(false);
            }
            if (showNationalityPopup) {
              setShowNationalityPopup(false);
            }
          }}
        />
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
export default Signup;
