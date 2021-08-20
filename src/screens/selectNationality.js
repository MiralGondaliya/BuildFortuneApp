import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
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
import I18n from '../i18n/i18n';
import SelectableButtons from '../components/selectableButtons';
import Storage, {NATIONALITY} from '../const/storage';
import NavigationService from '../navigation/NavigationService';
import {apiCall, getCountryList} from '../api';
import {showErrorMessage} from '../const/flashMessage';
import {getCountriesInApp} from '../const/utils';

const SelectNationality = ({route}) => {
  //const {t} = useTranslation();
  const [countries, setCountries] = useState([]);
  const [countryListForSelection, setCountryListForSelection] = useState([]);

  useEffect(() => {
    apiCallGetCountryList();
  }, []);

  const apiCallGetCountryList = async () => {
    let countriesInApp = await getCountriesInApp();
    if (countriesInApp) {
      setCountries(countriesInApp);
      prepareCountryListForSelection(countriesInApp);
    } else {
      // apiCall(
      //   getCountryList(1),
      //   (data, message) => {
      //     console.log(data);
      //     console.log(message);
      //     if (data) {
      //       setCountries(data.country_list);
      //       prepareCountryListForSelection(data.country_list);
      //     } else {
      //       showErrorMessage(message);
      //     }
      //   },
      //   true,
      // );
    }
  };

  const prepareCountryListForSelection = countryList => {
    let countryListBucket = [];
    countryList.map((item, index) => {
      let countryObject = {
        name: item.country_name,
        icon: item.country_flag_icon,
      };
      countryListBucket.push(countryObject);
    });
    setCountryListForSelection(countryListBucket);
  };

  const handleOnNextPress = nationality => {
    let selectedCountry = countries.filter(country => {
      return country.country_name === nationality;
    });
    Storage.storeData(NATIONALITY, JSON.stringify(selectedCountry[0]));
    NavigationService.navigate('SelectBusinessStrategy');
  };

  return (
    <Screen useScroll={true}>
      <View
        style={{
          ...ContainerStyles.container,
        }}>
        <GetStartedHeader hideBackButton={true} />
        <View style={[{flex: 1}, GlobalStyles.footerContainer]}>
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
                ...Gravity.left,
              }}>
              {I18n.t('selectNationality')}
            </Text>
            <View style={MarginStyle.mT16} />
            <View>
              <SelectableButtons
                isSelectable={false}
                options={countryListForSelection}
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

export default SelectNationality;
