import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {COLORS} from '../styles/colors';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from './NavigationService';
import Splash from '../screens/splash';
import Welcome from '../screens/welcome';
import Login from '../screens/login';
import Signup from '../screens/signup';
import SignupSocialMedia from '../screens/signupSocialMedia';
import ForgotPassword from '../screens/forgotPassword';
import Dashboard from '../screens/dashboard';
import SelectLanguage from '../screens/selectLanguage';
import SelectNationality from '../screens/selectNationality';
import SelectBusinessStrategy from '../screens/selectBusinessStrategy';
import SelectIndustry from '../screens/selectIndustry';
import AdsDetail from '../screens/adsDetail';
import AllCategories from '../screens/allCategories';
import AllTopAds from '../screens/allTopAds';
import ProfileSettings from '../screens/profileSettings';
import PrivacySetting from '../screens/privacySetting';
import MyAds from '../screens/myAds';
import MyPreferences from '../screens/myPreferences';
import CategoryAds from '../screens/categoryAds';
import WebContent from '../screens/webcontent';
import EditAdd from '../screens/editAdd';
import SearchAds from '../screens/searchAds';

const Stack = createStackNavigator();

const NavigationStack = props => {
  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name={'Welcome'} component={Welcome} />
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Signup'} component={Signup} />
        <Stack.Screen
          name={'SignupSocialMedia'}
          component={SignupSocialMedia}
        />
        <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
        <Stack.Screen name={'Dashboard'} component={Dashboard} />
        <Stack.Screen name={'SelectLanguage'} component={SelectLanguage} />
        <Stack.Screen
          name={'SelectNationality'}
          component={SelectNationality}
        />
        <Stack.Screen
          name={'SelectBusinessStrategy'}
          component={SelectBusinessStrategy}
        />
        <Stack.Screen name={'SelectIndustry'} component={SelectIndustry} />
        <Stack.Screen name={'AdsDetail'} component={AdsDetail} />
        <Stack.Screen name={'AllCategories'} component={AllCategories} />
        <Stack.Screen name={'AllTopAds'} component={AllTopAds} />
        <Stack.Screen name={'ProfileSettings'} component={ProfileSettings} />
        <Stack.Screen name={'PrivacySetting'} component={PrivacySetting} />
        <Stack.Screen name={'MyAds'} component={MyAds} />
        <Stack.Screen name={'MyPreferences'} component={MyPreferences} />
        <Stack.Screen name={'CategoryAds'} component={CategoryAds} />
        <Stack.Screen name={'WebContent'} component={WebContent} />
        <Stack.Screen name={'EditAdd'} component={EditAdd} />
        <Stack.Screen name={'SearchAds'} component={SearchAds} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationStack;
