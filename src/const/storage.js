import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_DATA = 'userData';
export const IS_APP_INSTALLED = 'isAppInstalled';
export const LANGUAGE = 'language';
export const NATIONALITY = 'nationality';
export const BUSINESS_MODE = 'businessMode';
export const INDUSTRY = 'industry';
export const APPLE_AUTH_DATA = 'appleAuthData';
export const INITIAL_SCREEN = 'initialScreen';
export const IS_MANUAL_RESTART = 'isManualRestart';
export const FCM_TOKEN = 'fcmToken';
export const GENERAL_DATA = 'generalData';

export default class Storage {
  static storeData(key, value) {
    AsyncStorage.setItem(key, value);
  }
  static async getData(key) {
    return await AsyncStorage.getItem(key);
  }
  static async clear() {
    return await AsyncStorage.clear();
  }
  static async logout() {
    return await AsyncStorage.setItem(USER_DATA, '');
  }
}
