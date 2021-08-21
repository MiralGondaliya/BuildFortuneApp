import isPresent from 'is-present';
import {has} from 'lodash';
import Storage, {GENERAL_DATA, LANGUAGE, USER_DATA} from './storage';
import {apiCall, logout} from '../api';
import NavigationService from '../navigation/NavigationService';
import {showErrorMessage} from './flashMessage';
import I18n from 'react-native-i18n';
import {I18nManager} from 'react-native';

export function getNavigationParams(routeParams, paramName, defaultValue = '') {
  if (isPresent(routeParams)) {
    if (has(routeParams, paramName)) {
      return routeParams[paramName];
    }
  }
  return defaultValue;
}

export const isLogIn = async () => {
  return !!(await Storage.getData(USER_DATA));
};

export const languageTypePostParameter = async () => {
  return (await Storage.getData(LANGUAGE)) === 'English' ? 1 : 0;
};

export const languageTypeForTranslation = async () => {
  return (await Storage.getData(LANGUAGE)) === 'English' ? 'en' : 'ar';
};

export const isEmailValid = email => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(email);
};

export const signOut = async local => {
  if (local) {
    Storage.logout();
    NavigationService.reset('Dashboard');
  } else {
    apiCall(
      logout(),
      (data, message) => {
        console.log(message);
        if (data) {
          Storage.logout();
          NavigationService.reset('Dashboard');
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  }
};

export const currencyFormat = (num, currencySymbol) => {
  if (I18nManager.isRTL) {
    return (
      parseFloat(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
      ' ' +
      currencySymbol
    );
  } else {
    return (
      currencySymbol +
      ' ' +
      parseFloat(num)
        .toFixed(0)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    );
  }
};

export const percentageFormat = num => {
  return (
    parseFloat(num)
      .toFixed(1)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' % '
  );
};

export const filterStringByNumber = text => {
  return text.replace(/\D/g, '');
};

export const getCurrencyFromCountryId = countryId => {
  let label = '';
  switch (countryId) {
    case 65:
      label = 'Egypt';
      break;
    case 101:
      label = 'India';
      break;
    case 117:
      label = 'Kuwait';
      break;
    case 121:
      label = 'Lebanon';
      break;
    case 179:
      label = 'Qatar';
      break;
    case 225:
      label = 'Turkey';
      break;
    case 231:
      label = 'UnitedArabEmirates';
      break;
    case 232:
      label = 'UnitedKingdom';
      break;
    case 233:
      label = 'UnitedStates';
      break;
  }

  if (label) {
    return I18n.t(label);
  } else {
    return I18n.t('UnitedStates');
  }
};

export const getGeneralData = async () => {
  let data = await Storage.getData(GENERAL_DATA);
  if (data) {
    data = JSON.parse(data);
    return data;
  } else {
    return null;
  }
};

export const getCategoriesFromStorage = async () => {
  let generalData = await getGeneralData();
  return generalData?.categories;
};

export const getFeaturedCategories = async () => {
  let generalData = await getGeneralData();
  return generalData?.featured_categories;
};

export const getCountries = async () => {
  let generalData = await getGeneralData();
  return generalData?.countries;
};

export const getCountriesInApp = async () => {
  let generalData = await getGeneralData();
  return generalData?.countries_inapp;
};
