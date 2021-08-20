import React, {useEffect, useState} from 'react';
import {I18nManager, Text, View} from 'react-native';
import Screen from '../components/screen';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import GetStartedHeader from '../components/getStartedHeader';
import I18n, {changeAppLanguage} from '../i18n/i18n';
import SelectableButtons from '../components/selectableButtons';
import Storage, {
  GENERAL_DATA,
  INITIAL_SCREEN,
  IS_MANUAL_RESTART,
  LANGUAGE,
} from '../const/storage';
import {apiCall, getGeneralData, getLanguageList, selectLanguage} from '../api';
import {showErrorMessage} from '../const/flashMessage';
import RNRestart from 'react-native-restart';
import NavigationService from '../navigation/NavigationService'; // Import package from node modules

const SelectLanguage = () => {
  const [countries, setCountries] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [languageListForOptions, setLanguageListForOptions] = useState([]);

  useEffect(() => {}, [countries]);

  useEffect(() => {
    apiCallGetLanguageList();
  }, []);

  const apiCallGetLanguageList = () => {
    apiCall(
      getLanguageList(),
      (data, message) => {
        if (data) {
          console.log(data);
          let language_list = data.language_list;
          setLanguageList(language_list);
          prepareLanguageListForOptions(language_list);
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const prepareLanguageListForOptions = language_list => {
    let languageBucket = [];
    language_list.map(language => {
      let languageBucketObj = {
        name: language.lang_name,
      };
      languageBucket.push(languageBucketObj);
    });
    setLanguageListForOptions(languageBucket);
  };

  const getLanguage = async () => {
    let mLanguage = await Storage.getData(LANGUAGE);
    if (mLanguage) {
      mLanguage = JSON.parse(mLanguage);
    }
    return mLanguage;
  };

  const handleOnNextPress = async language => {
    let preSelectedLanguage = await getLanguage();
    let selectedLanguage = languageList.find(lng => lng.lang_name === language);
    if (
      preSelectedLanguage?.lang_short_name !== selectedLanguage.lang_short_name
    ) {
      apiCall(
        selectLanguage(selectedLanguage.lang_id),
        (data, message) => {
          console.log(message);
        },
        false,
      );
      changeAppLanguage(selectedLanguage.lang_short_name);

      await Storage.storeData(LANGUAGE, JSON.stringify(selectedLanguage));
      await Storage.storeData(INITIAL_SCREEN, 'SelectNationality');

      apiCallGetGeneralData(async () => {
        if (selectedLanguage.lang_short_name === 'ar') {
          I18nManager.forceRTL(true);
        } else {
          I18nManager.forceRTL(false);
        }
        await Storage.storeData(IS_MANUAL_RESTART, 'true');
        RNRestart.Restart();
      });
    } else {
      let generalData = await Storage.getData(GENERAL_DATA);
      if (generalData) {
        NavigationService.reset('SelectNationality');
      } else {
        apiCallGetGeneralData(() => {
          NavigationService.reset('SelectNationality');
        });
      }
    }
  };

  const apiCallGetGeneralData = callback => {
    apiCall(
      getGeneralData(),
      async (data, message) => {
        if (data) {
          await Storage.storeData(GENERAL_DATA, JSON.stringify(data));
          setTimeout(() => {
            callback();
          }, 500);
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  return (
    <Screen useScroll={true}>
      <View
        style={{
          ...ContainerStyles.container,
        }}>
        <GetStartedHeader hideBackButton={true} />
        <View
          style={[
            GlobalStyles.footerContainer,
            {
              flex: 1,
              borderTopLeftRadius: I18nManager.isRTL ? 0 : 72,
              borderTopRightRadius: I18nManager.isRTL ? 72 : 0,
            },
          ]}>
          <View
            style={{
              ...PaddingStyle.px24,
              width: '100%',
              flex: 1,
            }}>
            <Text
              style={{
                ...FontSize.fontRegular24,
                ...FontColor.colorWhite,
                alignSelf: I18nManager.isRTL ? 'flex-end' : 'flex-start',
              }}>
              {'Select Your Preferred Language'}
            </Text>
            <Text
              style={{
                ...FontSize.fontRegular24,
                ...FontColor.colorWhite,
                ...MarginStyle.my8,
              }}>
              {'اختر لغتك المفضلة'}
            </Text>
            <View>
              <SelectableButtons
                options={languageListForOptions}
                isSelectable={false}
                onOptionSelected={value => {
                  handleOnNextPress(value);
                }}
              />
            </View>
            <View style={GlobalStyles.space} />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default SelectLanguage;
