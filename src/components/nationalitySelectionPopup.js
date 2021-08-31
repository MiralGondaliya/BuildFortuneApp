import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import {
  ContainerStyles,
  FontColor,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import BackButton from './backButton';
import I18n from '../i18n/i18n';
import {getCountries, getCountriesInApp} from '../const/utils';

const NationalitySelectionPopup = ({
  showModal,
  hideModal,
  isNationality,
  limited,
  onSelect,
  countryOrigin,
}) => {
  //const {t} = useTranslation();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (countryOrigin) {
      apiCallGetCountryList();
    }
  }, []);

  const apiCallGetCountryList = async () => {
    let countryListInApp = await getCountriesInApp();
    let countryList = await getCountries();
    if (countryListInApp || countryList) {
      setCountries(limited ? countryListInApp : countryList);
    } else {
      // apiCall(
      //   getCountryList(limited ? 1 : 0),
      //   (data, message) => {
      //     if (data) {
      //       setCountries(data.country_list);
      //     } else {
      //       showErrorMessage(message);
      //     }
      //   },
      //   false,
      // );
    }
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton
            light={true}
            onBackPress={() => {
              hideModal();
            }}
          />
          <Text style={styles.headerTitle}>
            {isNationality ? I18n.t('nationality') : I18n.t('country')}{' '}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onShow={() => {
        apiCallGetCountryList();
      }}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        {renderHeader()}
        <View style={GlobalStyles.footerContainerLightSmallRadius}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={ContainerStyles.container}>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={({item, index}) => index}
                data={countries}
                ListEmptyComponent={() => (
                  <ActivityIndicator
                    color={COLORS.primary}
                    style={styles.indicator}
                  />
                )}
                ListHeaderComponent={() => <View style={MarginStyle.mT24} />}
                ListFooterComponent={() => <View style={MarginStyle.mB24} />}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        onSelect(item), hideModal();
                      }}
                      style={styles.containerItem}>
                      {!isNationality && !limited ? (
                        <Text style={styles.txtCountryCode}>
                          {item.country_phonecode}
                        </Text>
                      ) : null}

                      <Text style={styles.txtCountryName}>
                        {isNationality
                          ? item.country_nationality
                          : item.country_name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.primary,
  },
  txtCountryCode: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    ...MarginStyle.mR8,
    minWidth: 30,
  },
  txtCountryName: {
    fontSize: 14,
    fontFamily: FONTS.extra_light,
  },
  headerContainer: {
    ...ContainerStyles.containerRow,
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    ...LayoutGravity.centerX,
    ...MarginStyle.mR32,
    flex: 1,
    fontSize: 20,
    fontFamily: FONTS.regular,
  },
  containerItem: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px24,
  },
  divider: {
    backgroundColor: COLORS.border,
    height: 1,
    ...MarginStyle.mx16,
    ...MarginStyle.mT8,
    ...MarginStyle.mB16,
  },
  indicator: {
    ...LayoutGravity.center,
    ...MarginStyle.my,
  },
});

export default NationalitySelectionPopup;
