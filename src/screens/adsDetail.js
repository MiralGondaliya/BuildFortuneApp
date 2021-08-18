import React, {useEffect, useState} from 'react';
import Screen from '../components/screen';
import {
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';
import BackButton from '../components/backButton';
import I18n from '../i18n/i18n';
import {FONTS} from '../styles/fonts';
import AdsCard from '../components/adsCard';
import AdsInformation from '../components/adsInformation';
import Button from '../components/button';
import {apiCall, getPostDetail, setPostContactDetail} from '../api';
import {
  currencyFormat,
  getCurrencyFromCountryId,
  getNavigationParams,
  isLogIn,
  percentageFormat,
} from '../const/utils';
import {showErrorMessage, showSuccessMessage} from '../const/flashMessage';
import NavigationService from '../navigation/NavigationService';
import {IMAGES} from '../assets/images';
import ContactDetailsPopup from '../components/contactDetailsPopup';

const AdsDetail = ({route}) => {
  //const {t} = useTranslation();
  const post_id = getNavigationParams(route.params, 'post_id', '');
  const isMyAdsDetail = getNavigationParams(
    route.params,
    'isMyAdsDetail',
    false,
  );
  const [postInfo, setPostInfo] = useState(null);
  const [detailsList, setDetailsList] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    apiCallGetPostDetail();
  }, []);

  const apiCallGetPostDetail = () => {
    apiCall(
      getPostDetail(post_id, isMyAdsDetail ? 1 : null),
      (data, message) => {
        if (data) {
          setPostInfo(data.post_info);
          setDetailsList(data.details_list);
          console.log(JSON.stringify(data));
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const handleOnViewContactDetail = async () => {
    let isLogin = await isLogIn();
    if (isLogin) {
      apiCallPostContactDetail();
    } else {
      NavigationService.navigate('Login');
    }
  };

  const apiCallPostContactDetail = () => {
    apiCall(
      setPostContactDetail(post_id),
      (data, message) => {
        if (data) {
          console.log(data);
          if (data.contact_info.length > 0) {
            let mData = {
              key: I18n.t('contact'),
              information: data.contact_info,
            };
            setContactInfo(mData);
          } else {
            showSuccessMessage(data.message);
          }
        } else {
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <BackButton light={true} />
        <Text style={styles.headerTitle}>
          {I18n.t('business')}{' '}
          <Text style={styles.headerTitleBold}>{I18n.t('details')}</Text>
        </Text>
        <TouchableOpacity
          style={GlobalStyles.navIconContainer}
          onPress={() => {
            Share.share({
              message: postInfo.post_share_link,
            });
          }}>
          <Image
            style={GlobalStyles.navIcon}
            source={IMAGES.share}
            resizeMode={'center'}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Screen useScroll={true}>
      {postInfo ? (
        <View
          style={{
            ...ContainerStyles.container,
            backgroundColor: COLORS.primary,
          }}>
          {renderHeader()}
          <AdsCard entries={postInfo.post_images} />
          <View style={GlobalStyles.footerContainerLightSmallRadius}>
            <View style={styles.categoryDetailContainer}>
              <Text style={styles.title}>{postInfo.post_title}</Text>
              {postInfo.post_selling_price ? (
                <Text style={styles.price}>
                  {currencyFormat(
                    postInfo.post_selling_price,
                    getCurrencyFromCountryId(postInfo.post_country_id),
                  )}
                </Text>
              ) : null}
              {postInfo.post_investment_percentage ? (
                <Text style={styles.price}>
                  {percentageFormat(postInfo.post_investment_percentage)}
                </Text>
              ) : null}
            </View>
            <Text style={styles.txtCategoryAndItem}>
              {`${postInfo.post_category_name}`}
            </Text>
            <View style={styles.locationContainer}>
              {postInfo.post_country_flag_icon ? (
                <Image
                  source={{uri: postInfo.post_country_flag_icon}}
                  style={styles.flagIcon}
                  resizeMode={'center'}
                />
              ) : null}

              <Text style={styles.location}>{postInfo.post_country_name}</Text>
              <View style={styles.space} />
              <Text style={styles.txtBusinessFor}>
                {postInfo.post_business_type}
              </Text>
            </View>
            <Text style={styles.txtDescription}>
              {postInfo.post_description}
            </Text>
            <FlatList
              data={detailsList}
              renderItem={({item, index}) =>
                item.information.length > 0 && (
                  <AdsInformation
                    title={item.key}
                    subTitle={I18n.t('information')}
                    information={item.information}
                  />
                )
              }
            />
            {!isMyAdsDetail ? (
              <View style={styles.buttonContainer}>
                <Button
                  title={I18n.t('viewContactDetails')}
                  dark={true}
                  onPress={() => {
                    handleOnViewContactDetail();
                  }}
                />
              </View>
            ) : null}
          </View>
          <ContactDetailsPopup
            data={contactInfo}
            showModal={!!contactInfo}
            hideModal={() => {
              setContactInfo(null);
            }}
          />
        </View>
      ) : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    ...ContainerStyles.containerRow,
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    ...LayoutGravity.centerX,
    ...MarginStyle.mR32,
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: FONTS.light,
  },
  headerTitleBold: {
    fontFamily: FONTS.medium,
  },
  categoryDetailContainer: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px24,
    ...MarginStyle.mT8,
    ...MarginStyle.mT16,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    lineHeight: 30,
    flex: 1,
    ...MarginStyle.mR8,
  },
  price: {
    backgroundColor: COLORS.red,
    borderRadius: 7,
    ...PaddingStyle.px16,
    ...FontSize.fontBold14,
    ...FontColor.colorWhite,
    ...PaddingStyle.pT8,
    height: 36,
  },
  space: {
    flex: 1,
    height: 0,
  },
  txtCategoryAndItem: {
    ...FontSize.fontLight14,
    ...FontColor.colorGrayLabel,
    ...PaddingStyle.px24,
    ...PaddingStyle.py8,
  },
  locationContainer: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px24,
    ...LayoutGravity.center,
  },
  flagIcon: {
    width: 23,
    height: 23,
  },
  location: {
    ...FontSize.fontLight14,
    ...FontColor.colorBlack,
    ...MarginStyle.mx8,
  },
  txtViewDetails: {
    ...FontColor.colorGrayLabel,
    ...FontSize.fontRegular14,
  },
  txtBusinessFor: {
    fontSize: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.red,
    textAlign: 'center',
    lineHeight: 15,
    paddingVertical: 2,
    ...PaddingStyle.px8,
    ...FontColor.colorRed,
  },
  txtDescription: {
    lineHeight: 23,
    flex: 1,
    textAlign: 'justify',
    ...MarginStyle.mR8,
    ...FontSize.fontRegular14,
    ...PaddingStyle.p24,
  },
  buttonContainer: {
    ...PaddingStyle.px24,
  },
});

export default AdsDetail;
