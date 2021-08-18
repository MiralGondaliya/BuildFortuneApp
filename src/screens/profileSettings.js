import React, {useEffect, useRef, useState} from 'react';
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
import {FONTS} from '../styles/fonts';
import BackButton from '../components/backButton';
import I18n from '../i18n/i18n';
import Screen from '../components/screen';
import {IMAGES} from '../assets/images';
import Menu, {MenuItem} from 'react-native-material-menu';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FloatingTextInput from '../components/floatingTextInput';
import Button from '../components/button';
import {ImagePickerHelper} from '../const/imagePickerHelper';
import {apiCall, getProfile, updateProfile, updateProfileImage} from '../api';
import {showErrorMessage, showSuccessMessage} from '../const/flashMessage';
import NationalitySelectionPopup from '../components/nationalitySelectionPopup';

const ProfileSettings = () => {
  //const {t} = useTranslation();
  const refMenuGender = useRef(null);
  const [countryCode, setCountryCode] = useState('+1');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [nationalityId, setNationalityId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showNationalityPopup, setShowNationalityPopup] = useState(false);
  const [showCountyCodePicker, setShowCountyCodePicker] = useState(false);
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    apiCallGetUserDetail();
  }, []);

  const apiCallGetUserDetail = () => {
    apiCall(
      getProfile(),
      (data, message) => {
        if (data) {
          data = data.user_details;
          setCountryCode(data.user_phonecode);
          setPhone(data.user_phone_no);
          setFullName(data.user_name);
          setEmail(data.user_email);
          setGender(
            data.user_gender === 1
              ? I18n.t('male')
              : data.user_gender === 2
              ? I18n.t('female')
              : I18n.t('other'),
          );
          setNationality(data.user_nationality);
          setNationalityId(data.user_country_id);
          setDateOfBirth(data.user_dob);
          setUserProfile(data.user_profile);
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const apiCallUpdateProfile = () => {
    let isCountryCode = !!countryCode;
    let isPhone = !!phone;
    let isFullName = !!fullName;
    let isGender = Platform.OS === 'ios' ? true : !!gender;
    let isNationality = !!nationality;
    let isDateOfBirth = !!dateOfBirth;
    if (!isCountryCode) {
      showErrorMessage(I18n.t('pleaseSelectCountryCode'));
      return;
    }
    if (!isPhone) {
      showErrorMessage(I18n.t('pleaseEnterPhoneNumber'));
      return;
    }
    if (!isFullName) {
      showErrorMessage(I18n.t('pleaseEnterFullName'));
      return;
    }
    if (!isGender) {
      showErrorMessage(I18n.t('pleaseSelectGender'));
      return;
    }
    if (!isNationality) {
      showErrorMessage(I18n.t('pleaseSelectNationality'));
      return;
    }
    if (!isDateOfBirth) {
      showErrorMessage(I18n.t('pleaseSelectDateOfBirth'));
      return;
    }

    apiCall(
      updateProfile(
        countryCode,
        phone,
        fullName,
        nationalityId,
        gender === I18n.t('male') ? 1 : gender === I18n.t('female') ? 2 : 3,
        dateOfBirth,
      ),
      (data, message) => {
        if (data) {
          console.log(data);
          showSuccessMessage(message);
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const handleOnImagePic = () => {
    ImagePickerHelper.pickImage(data => {
      console.log(data);
      setUserProfile(data.uri);
      apiCall(
        updateProfileImage(data.uri),
        (data, message) => {
          if (data) {
            showSuccessMessage(message);
          } else {
            showErrorMessage(message);
          }
        },
        true,
      );
    });
  };

  const handleOnUpdate = () => {
    apiCallUpdateProfile();
  };

  const renderCountryCodePicker = () => (
    <TouchableOpacity
      style={{
        ...ContainerStyles.containerRow,
        ...Gravity.center,
        ...LayoutGravity.center,
        ...PaddingStyle.px8,
      }}
      onPress={() => {
        setShowCountyCodePicker(true);
      }}>
      <Text
        style={{
          ...FontColor.colorBlack,
          ...FontSize.fontMedium14,
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
      isDisabled: true,
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
          onPress={() => {
            item.setValue(I18n.t('male')), hideGenderMenu();
          }}>
          {I18n.t('male')}
        </MenuItem>
        <MenuItem
          onPress={() => {
            item.setValue(I18n.t('female')), hideGenderMenu();
          }}>
          {I18n.t('female')}
        </MenuItem>
        <MenuItem
          onPress={() => {
            item.setValue(I18n.t('other')), hideGenderMenu();
          }}>
          {I18n.t('other')}
        </MenuItem>
      </Menu>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton light={true} />
          <Text style={styles.headerTitle}>{I18n.t('profile')} </Text>
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
          {userProfile ? (
            <TouchableOpacity onPress={() => handleOnImagePic()}>
              <Image
                style={styles.profilePic}
                source={{
                  uri: userProfile,
                }}
              />
            </TouchableOpacity>
          ) : null}

          {inputs.map((item, index) => (
            <TouchableOpacity
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
              {item.isDisabled ? (
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
              <View style={MarginStyle.mB16} />
            </TouchableOpacity>
          ))}

          <Button
            title={I18n.t('saveChanges')}
            dark={true}
            onPress={() => handleOnUpdate()}
          />

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
  profilePic: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: 'center',
    ...MarginStyle.my16,
  },
});

export default ProfileSettings;
