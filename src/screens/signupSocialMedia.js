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
import Checkbox from '../components/checkBox';
import FloatingTextInput from '../components/floatingTextInput';
import Button from '../components/button';
import SocialLogin from '../components/socialLogin';
import AuthAccountFooter from '../components/authAccountFooter';
import NavigationService from '../navigation/NavigationService';

const SignupSocialMedia = () => {
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [isTermsAccepted, setTermsAccepted] = useState(false);

  const inputs = [
    {
      placeholder: 'Phone Number',
      value: phone,
      keyboardType: 'number-pad',
      setValue: value => {
        setPhone(value);
      },
    },
    {
      placeholder: 'Full Name',
      value: fullName,
      keyboardType: 'default',
      setValue: value => {
        setFullName(value);
      },
    },
    {
      placeholder: 'Email ID',
      value: email,
      keyboardType: 'email',
      setValue: value => {
        setEmail(value);
      },
    },
    {
      placeholder: 'Password',
      value: password,
      keyboardType: 'default',
      setValue: value => {
        setPassword(value);
      },
    },
    {
      placeholder: 'Confirm Password',
      value: confirmPassword,
      keyboardType: 'default',
      setValue: value => {
        setConfirmPassword(value);
      },
    },
    {
      placeholder: 'Gender',
      value: gender,
      keyboardType: 'default',
      setValue: value => {
        setGender(value);
      },
    },
    {
      placeholder: 'Date of Birth',
      value: dateOfBirth,
      keyboardType: 'default',
      setValue: value => {
        setDateOfBirth(value);
      },
    },
  ];

  const handleOnSignUpClick = () => {};

  return (
    <Screen useScroll={true}>
      <View style={styles.container}>
        <View style={GlobalStyles.headerContainerDark}>
          <BackButton light={true} />
          <Text
            style={{
              ...MarginStyle.mx48,
              ...FontSize.fontBold48,
              ...FontColor.colorWhite,
            }}>
            Register
          </Text>
          <Text
            style={{
              ...MarginStyle.mx48,
              ...FontSize.fontRegular14,
              ...FontColor.colorCornFlowerFlue,
              marginTop: -16,
            }}>
            Create a new account
          </Text>
        </View>
        <View style={GlobalStyles.footerContainerLight}>
          {inputs.map((item, index) => (
            <FloatingTextInput
              onChange={value => {
                item.setValue(value);
              }}
              value={item.value}
              keyboardType={item.keyboardType}
              placeholder={item.placeholder}
            />
          ))}

          <Button
            title={'Submit'}
            dark={true}
            onPress={() => handleOnSignUpClick()}
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
export default SignupSocialMedia;
