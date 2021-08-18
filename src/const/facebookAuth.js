import React from 'react';
import * as Facebook from 'expo-facebook';
import {SocialAuthResponse} from './socialAuthResponse';
const FB_CANCEL_MESSAGE = 'Sign in cancelled';

export class FBAuth {
  static async signInWithFacebook(
    callBack: (resObj?: SocialAuthResponse, message?: string) => void,
  ) {
    try {
      await Facebook.initializeAsync({
        appId: '180823184035008',
      });

      await FBAuth.signOutFromFaceBook(() => {});

      const loginResponse = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (loginResponse?.type === 'success') {
        const token = loginResponse?.token;
        const userId = loginResponse?.userId;
        const response = await fetch(
          `https://graph.facebook.com/${userId}?fields=id,name,email&access_token=${token}`,
        );
        const respObj = await response.json();
        const socialAuthResponse = new SocialAuthResponse(respObj);
        callBack(socialAuthResponse, FB_CANCEL_MESSAGE);
      } else {
        callBack(undefined, FB_CANCEL_MESSAGE);
      }
    } catch ({message}) {
      callBack(undefined, message);
    }
  }

  static async signOutFromFaceBook(
    callBack: (message: string, error: string) => void,
  ) {
    try {
      await Facebook.logOutAsync();
      callBack('', '');
    } catch ({message}) {
      callBack(message, '');
    }
  }
}
