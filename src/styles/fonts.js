import {I18nManager} from 'react-native';

export const FONTS = {
  bold: I18nManager.isRTL ? 'Cairo-Bold' : 'Poppins-Bold',
  medium: I18nManager.isRTL ? 'Cairo-SemiBold' : 'Poppins-Medium',
  regular: I18nManager.isRTL ? 'Cairo-Regular' : 'Poppins-Regular',
  light: I18nManager.isRTL ? 'Cairo-Light' : 'Poppins-Light',
  extra_light: I18nManager.isRTL ? 'Cairo-ExtraLight' : 'Poppins-ExtraLight',
  SemiBold: I18nManager.isRTL ? 'Cairo-SemiBold' : 'Poppins-SemiBold',
};
