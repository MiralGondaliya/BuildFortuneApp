import React from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';
import {SocialAuthResponse} from './socialAuthResponse';

const GOOGLE_CANCEL_MESSAGE = 'Sign in cancelled';

export class GoogleAuth {
  static async initGoogle() {
    try {
      await GoogleSignIn.initAsync({
        clientId:
          '796090406377-02r81r6g006kogo9knni4j9dd88bu0tn.apps.googleusercontent.com',
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async signInWithGoogle(
    callBack: (resObj?: SocialAuthResponse, message?: string) => void,
  ) {
    await this.initGoogle();
    try {
      const googleSignInResponse = await GoogleSignIn.signInAsync();
      const userDetail = JSON.parse(JSON.stringify(googleSignInResponse));
      const {user} = userDetail;
      const socialAuthResponse = new SocialAuthResponse(user);
      callBack(socialAuthResponse, undefined);
    } catch (error) {
      callBack(undefined, GOOGLE_CANCEL_MESSAGE);
    }
  }

  static async signOutFromGoogle(callBack: (essage?: string) => void) {
    try {
      await GoogleSignIn.signOutAsync();
      callBack('success');
    } catch ({message}) {
      callBack(message);
    }
  }
}
