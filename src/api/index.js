import React from 'react';
import Axios from 'axios';
import {Platform} from 'react-native';
import Storage, {LANGUAGE, NATIONALITY} from '../const/storage';
import {hideLoader, showLoader} from '../components/Loader';
import {isLogIn, signOut} from '../const/utils';
import {getLanguages} from 'react-native-i18n';

// const BASE_URL = 'http://192.168.1.3:8000/api/';
const BASE_URL = 'http://pedra.todaystechnology.in/api/';

export const auth = async () => {
  // {
  //   "user_details": {
  //   "user_country_id": 39,
  //     "user_dob": "2021-08-03",
  //     "user_email": "jay@mailinator.com",
  //     "user_gender": 1,
  //     "user_name": "Jay Thummar",
  //     "user_phone_no": "8511291444",
  //     "user_phonecode": "93",
  //     "user_profile": "http://192.168.1.8:8000/assets/logo.png",
  //     "user_token": "e932c9484c76a3a1d9bf32e43e17dbac"
  // }
  // }
  let userData = await Storage.getData('userData');
  userData = JSON.parse(userData);
  return {
    token: userData?.user_token,
  };
};

export const language = async () => {
  let language = await Storage.getData(LANGUAGE);
  language = JSON.parse(language);
  return language?.lang_id;
};

export const country = async () => {
  let nationality = await Storage.getData(NATIONALITY);
  nationality = JSON.parse(nationality);
  return nationality?.country_id;
};

export const apiCall = async (method, onResponse, manageLoader, onLoading) => {
  try {
    if (manageLoader) {
      showLoader();
    } else {
      onLoading && onLoading(true);
    }
    let response = await method;
    if (manageLoader) {
      hideLoader();
    } else {
      onLoading && onLoading(false);
    }
    let data = response.data;
    let success = data.success;
    let message = data.message;
    if (success === 2) {
      signOut(true);
      return;
    }
    if (success) {
      onResponse(data.data, message);
    } else {
      onResponse(null, message);
    }
  } catch (exception) {
    if (manageLoader) {
      hideLoader();
    } else {
      onLoading && onLoading(false);
    }
    onResponse(null, exception.message);
  }
};

export const login = async (user_email, user_password) => {
  return Axios.post(BASE_URL + 'app-user-login', {
    user_email: user_email,
    user_password: user_password,
    language: 1,
    fcm_token: '1234567',
    device_type: Platform.OS === 'android' ? 1 : 0,
  });
};

export const signup = (
  user_phonecode,
  user_phone_no,
  user_name,
  user_email,
  user_password,
  confirm_password,
  user_country_id,
  user_gender,
  user_dob,
  termscheck,
) => {
  console.log('user_phonecode', user_phonecode);
  console.log('user_phone_no', user_phone_no);
  console.log('user_name', user_name);
  console.log('user_email', user_email);
  console.log('user_password', user_password);
  console.log('confirm_password', confirm_password);
  console.log('user_country_id', user_country_id);
  console.log('user_gender', user_gender);
  console.log('user_dob', user_dob);
  console.log('termscheck', termscheck);

  return Axios.post(BASE_URL + 'app-user-registration', {
    user_phonecode: user_phonecode,
    user_phone_no: user_phone_no,
    user_name: user_name,
    user_email: user_email,
    user_password: user_password,
    confirm_password: confirm_password,
    user_country_id: user_country_id,
    user_gender: user_gender,
    user_dob: user_dob,
    termscheck: termscheck,
  });
};

export const getCountryList = async in_app => {
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();
  formData.append('in_app', in_app);
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  return Axios.post(BASE_URL + 'app-country-list', formData);
};

export const getCategoryList = async type => {
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  if (type) {
    formData.append('type', type);
  }
  return Axios.post(BASE_URL + 'app-category-list', formData);
};

export const forgotPassword = email => {
  return Axios.post(BASE_URL + 'app-user-forget-password', {user_email: email});
};

export const getProfile = async () => {
  let data = await auth();
  let token = data.token;

  let formData = new FormData();
  formData.append('user_token', token);
  let request = Axios.post(BASE_URL + 'app-user-profile', formData);
  return request;
};

export const logout = async () => {
  let data = await auth();
  let token = data.token;
  return Axios.post(BASE_URL + 'app-user-logout', {
    user_token: token,
  });
};

export const updateProfile = async (
  user_phonecode,
  user_phone_no,
  user_name,
  user_country_id,
  user_gender,
  user_dob,
) => {
  console.log('user_phonecode', user_phonecode);
  console.log('user_phone_no', user_phone_no);
  console.log('user_name', user_name);
  console.log('user_country_id', user_country_id);
  console.log('user_gender', user_gender);
  console.log('user_dob', user_dob);

  let data = await auth();
  let token = data.token;

  return Axios.post(BASE_URL + 'app-user-update-profile', {
    user_token: token,
    user_phonecode: user_phonecode,
    user_phone_no: user_phone_no,
    user_name: user_name,
    user_country_id: user_country_id,
    user_gender: user_gender,
    user_dob: user_dob,
  });
};

export const changePassword = async (
  old_password,
  user_password,
  confirm_password,
) => {
  let data = await auth();
  let token = data.token;

  let formData = new FormData();
  formData.append('user_token', token);
  formData.append('old_password', old_password);
  formData.append('user_password', user_password);
  formData.append('confirm_password', confirm_password);

  return Axios.post(BASE_URL + 'app-change-password', formData);
};

export const saveUserSetting = async (push_alert, sms_alert, language_id) => {
  let data = await auth();
  let token = data.token;

  let formData = new FormData();
  formData.append('user_token', token);
  formData.append('push_alert', push_alert);
  formData.append('sms_alert', sms_alert);
  formData.append('language_id', language_id);

  return Axios.post(BASE_URL + 'app-user-save-settings', formData);
};

export const updateProfileImage = async image => {
  let data = await auth();
  let token = data.token;

  let formData = new FormData();
  formData.append('user_token', token);

  const name: string = image.substr(1 + image.lastIndexOf('/'));
  const ext: string = name.substr(1 + name.lastIndexOf('.'));
  const imageObj = {
    uri: image,
    type: `image/${ext}`,
    name,
  };
  formData.append('user_profile_image', imageObj);

  return Axios.post(BASE_URL + 'app-user-profile-image', formData);
};

export const getUserSetting = async () => {
  let data = await auth();
  let token = data.token;

  let formData = new FormData();
  formData.append('user_token', token);
  return Axios.post(BASE_URL + 'app-user-settings', formData);
};

export const updateUserSettings = async (
  push_alert,
  sms_alert,
  language_id,
) => {
  let data = await auth();
  let token = data.token;

  let formData = new FormData();
  formData.append('user_token', token);
  formData.append('push_alert', push_alert);
  formData.append('sms_alert', sms_alert);
  formData.append('language_id', language_id);
  return Axios.post(BASE_URL + 'app-user-save-settings', formData);
};

export const getImageObject = image => {
  const name: string = image.substr(1 + image.lastIndexOf('/'));
  const ext: string = name.substr(1 + name.lastIndexOf('.'));
  const imageObj = {
    uri: image,
    type: `image/${ext}`,
    name,
  };
  return imageObj;
};

export const createAds = async (
  post_type_id,
  post_category_id,
  post_title_1,
  post_title_2,
  post_business_name_1,
  post_business_name_2,
  post_establishment_year,
  post_selling_price,
  post_description_1,
  post_description_2,
  post_country_id,
  post_contact_email_id,
  post_contact_phone_phonecode,
  post_contact_phone_no,
  post_contact_whatsapp_phonecode,
  post_contact_whatsapp_no,
  post_contact_visibility,
  post_licensed,
  post_no_of_staff,
  post_address_1,
  post_address_2,
  post_space,
  post_space_rent,
  post_twitter,
  post_instagram,
  post_facebook,
  post_youtube,
  post_website,
  post_investment_percentage,
  post_investor_nationality_1,
  post_investor_nationality_2,
  post_investor_field_1,
  post_investor_field_2,
  post_investor_characteristics_1,
  post_investor_characteristics_2,
  post_image_1,
  post_image_2,
  post_image_3,
  post_answer_1,
  post_answer_2,
  post_answer_3,
  post_answer_4,
  post_id,
) => {
  let data = await auth();
  let token = data.token;
  let formData = new FormData();

  formData.append('user_token', token);
  formData.append('post_type_id', post_type_id);
  formData.append('post_category_id', post_category_id);
  formData.append('post_title_1', post_title_1);
  formData.append('post_title_2', post_title_2);
  formData.append('post_business_name_1', post_business_name_1);
  formData.append('post_business_name_2', post_business_name_2);
  formData.append('post_establishment_year', post_establishment_year);
  formData.append('post_selling_price', post_selling_price);
  formData.append('post_description_1', post_description_1);
  formData.append('post_description_2', post_description_2);
  formData.append('post_country_id', post_country_id);
  formData.append('post_contact_email_id', post_contact_email_id);
  formData.append('post_contact_phone_phonecode', post_contact_phone_phonecode);
  formData.append('post_contact_phone_no', post_contact_phone_no);
  formData.append(
    'post_contact_whatsapp_phonecode',
    post_contact_whatsapp_phonecode,
  );
  formData.append('post_contact_whatsapp_no', post_contact_whatsapp_no);
  formData.append('post_contact_visibility', post_contact_visibility);
  formData.append('post_licensed', post_licensed);
  formData.append('post_no_of_staff', post_no_of_staff);
  formData.append('post_address_1', post_address_1);
  formData.append('post_address_2', post_address_2);
  formData.append('post_space', post_space);
  formData.append('post_space_rent', post_space_rent);
  formData.append('post_twitter', post_twitter);
  formData.append('post_instagram', post_instagram);
  formData.append('post_facebook', post_facebook);
  formData.append('post_youtube', post_youtube);
  formData.append('post_website', post_website);
  formData.append('post_investment_percentage', post_investment_percentage);
  formData.append('post_investor_nationality_1', post_investor_nationality_1);
  formData.append('post_investor_nationality_2', post_investor_nationality_2);
  formData.append('post_investor_field_1', post_investor_field_1);
  formData.append('post_investor_field_2', post_investor_field_2);
  formData.append(
    'post_investor_characteristics_1',
    post_investor_characteristics_1,
  );
  formData.append(
    'post_investor_characteristics_2',
    post_investor_characteristics_2,
  );
  formData.append('post_answer_1', post_answer_1);
  formData.append('post_answer_2', post_answer_2);
  formData.append('post_answer_3', post_answer_3);
  formData.append('post_answer_4', post_answer_4);
  if (post_id) {
    formData.append('post_id', post_id);
  }

  formData.append('post_image_1', getImageObject(post_image_1));
  if (!post_image_1.startsWith('http')) {
    formData.append('post_image_1', getImageObject(post_image_1));
  }
  if (post_image_2) {
    if (!post_image_2.startsWith('http')) {
      formData.append('post_image_2', getImageObject(post_image_2));
    }
  }
  if (post_image_3) {
    if (!post_image_3.startsWith('http')) {
      formData.append('post_image_3', getImageObject(post_image_3));
    }
  }
  console.log(formData);

  return Axios.post(BASE_URL + 'app-save-post', formData);
};

export const getLanguageList = () => {
  return Axios.post(BASE_URL + 'app-languages');
};

export const getPostList = async ({page, post_category_id, my, search}) => {
  let data = await auth();
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();

  if (data.token) {
    formData.append('user_token', data.token);
  }

  formData.append('page', page);
  if (post_category_id) {
    formData.append('post_category_id', post_category_id ?? '');
  }
  formData.append('my', my ?? 0);
  formData.append('search', search ?? '');
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  console.log(formData);
  return Axios.post(BASE_URL + 'app-post-list', formData);
};

export const getPostDetail = async (post_id, my) => {
  let data = await auth();
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();

  if (data.token) {
    formData.append('user_token', data.token);
  }

  formData.append('post_id', post_id);
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  if (my) {
    formData.append('my', 1);
  }
  console.log(formData);
  return Axios.post(BASE_URL + 'app-post-detail', formData);
};

export const setPostContactDetail = async post_id => {
  let data = await auth();
  let languageId = await language();
  let countryId = await country();

  let formData = new FormData();
  if (data.token) {
    formData.append('user_token', data.token);
  }

  formData.append('post_id', post_id);
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  return Axios.post(BASE_URL + 'app-post-contact-detail', formData);
};

export const getCmsPageDetails = () => {
  return Axios.post(BASE_URL + 'app-cms-pages');
};

export const selectLanguage = async languageId => {
  let isLogin = await isLogIn();
  if (isLogin) {
    let data = await auth();
    let formData = new FormData();
    formData.append('user_token', data.token);
    formData.append('language_id', languageId);
    return Axios.post(BASE_URL + 'app-user-save-language', formData);
  } else {
    return null;
  }
};

export const getNotificationList = async page => {
  let data = await auth();
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();
  formData.append('user_token', data.token);
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  formData.append('page', page);
  return Axios.post(BASE_URL + 'app-notification-list', formData);
};

export const removeNotification = async page => {
  let data = await auth();
  let formData = new FormData();
  formData.append('user_token', data.token);
  return Axios.post(BASE_URL + 'app-remove-notification', formData);
};

export const getMyPostDetail = async post_id => {
  let data = await auth();
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();
  formData.append('user_token', data.token);
  formData.append('post_id', post_id);
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  return Axios.post(BASE_URL + 'app-my-post-detail', formData);
};

export const getAppHome = async () => {
  let data = await auth();
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();
  if (data) {
    formData.append('user_token', data.token);
  }
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);
  return Axios.post(BASE_URL + 'app-home-screen', formData);
};

export const getTrendingPost = async () => {
  let data = await auth();
  let languageId = await language();
  let countryId = await country();
  let formData = new FormData();

  if (data.token) {
    formData.append('user_token', data.token);
  }

  formData.append('page', 1);
  formData.append('trending', 1);
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);
  formData.append('country_id', countryId);
  formData.append('post_country_id', countryId);

  return Axios.post(BASE_URL + 'app-post-list', formData);
};

export const getGeneralData = async () => {
  let languageId = await language();
  let formData = new FormData();
  formData.append('language_id', languageId);
  formData.append('post_language_id', languageId);

  return Axios.post(BASE_URL + 'app-general-data', formData);
};

export const updateDeviceToken = async fcm_token => {
  let isLogin = await isLogIn();
  if (isLogin) {
    let data = await auth();
    let token = data.token;

    let formData = new FormData();
    formData.append('user_token', token);
    formData.append('fcm_token', fcm_token);

    return Axios.post(BASE_URL + 'app-user-update-fcm', formData);
  }
};
