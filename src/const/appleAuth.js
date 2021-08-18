import React from 'react';
import {SocialAuthResponse} from './socialAuthResponse';
import * as AppleAuthentication from 'expo-apple-authentication';
import {AppleAuthenticationCredential} from 'expo-apple-authentication';
import {AppleAuthenticationFullName} from 'expo-apple-authentication/src/AppleAuthentication.types';
import Storage, {APPLE_AUTH_DATA} from './storage';

const APPLE_CANCEL_MESSAGE = 'Sign in cancelled';

const getNameFromFullName = (fullName: AppleAuthenticationFullName | null) => {
  const givenName = fullName?.givenName ?? '';
  const familyName = fullName?.familyName ?? '';
  return `${givenName} ${familyName}`;
};

const getObjectFromResponse = (
  credential: AppleAuthenticationCredential,
): SocialAuthResponse => {
  const obj = {
    id: credential.authorizationCode,
    name: getNameFromFullName(credential.fullName),
    email: credential.email,
  };

  return new SocialAuthResponse(obj);
};

export class AppleAuth {
  static async signInWithApple(
    callBack: (resObj?: SocialAuthResponse, message?: string) => void,
  ) {
    try {
      const appleAuthResponse = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      /**
       * Name and email only available for first time after that it will return null
       * so needs to store on first signing.
       */

      if (appleAuthResponse.fullName?.familyName != null) {
        Storage.storeData(APPLE_AUTH_DATA, JSON.stringify(appleAuthResponse));
        callBack(getObjectFromResponse(appleAuthResponse), undefined);
      } else {
        const storedAppleAuthResponse = await Storage.getData(APPLE_AUTH_DATA);
        if (storedAppleAuthResponse != null) {
          const storedAppleAuthResponseInJson = JSON.parse(
            storedAppleAuthResponse,
          );
          const storedCredential = storedAppleAuthResponseInJson;
          callBack(getObjectFromResponse(storedCredential), undefined);
        }
      }
    } catch ({message}) {
      callBack(undefined, message);
    }
  }
}
