import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  GlobalStyles,
  MarginStyle,
  PaddingStyle,
} from '../../styles/globalStyles';
import {COLORS} from '../../styles/colors';
import Screen from '../../components/screen';
import BannerCards from '../../components/bannerCards';
import TitleView from '../../components/titleView';
import CategoriesCell from '../../components/categoriesCell';
import {IMAGES} from '../../assets/images';
import TopAdsCell from '../../components/topAdsCell';
import {FONTS} from '../../styles/fonts';
import NavigationService from '../../navigation/NavigationService';
import {isLogIn} from '../../const/utils';
import {apiCall, getAppHome, getProfile} from '../../api';
import I18n from '../../i18n/i18n';
import EmptyView from '../../components/emptyView';

const Home = ({navigation}) => {
  //const {t} = useTranslation();
  const [isLogin, setIsLogin] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userName, setUserName] = useState(null);
  const [homeData, setDataHome] = useState(null);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      apiCallAppHome();
      isLogIn().then(result => {
        setIsLogin(result);
        if (result) {
          apiCallGetUserDetail();
        }
      });
    });
  }, []);

  const apiCallGetUserDetail = () => {
    apiCall(
      getProfile(),
      (data, message) => {
        if (data) {
          data = data.user_details;
          setUserProfile(data.user_profile);
          setUserName(data.user_name);
        }
      },
      false,
    );
  };

  const apiCallAppHome = () => {
    apiCall(
      getAppHome(),
      (data, message) => {
        console.log(data);
        if (data) {
          setDataHome(data);
        }
      },
      false,
    );
  };

  const renderHeaderComponent = () => {
    if (isLogin) {
      return (
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.txtHello}>
              {I18n.t('hello')}
              {I18n.t('comma')}
            </Text>
            <Text style={styles.txtUserName}>{userName}</Text>
          </View>
          <Image
            style={styles.profilePic}
            source={{
              uri: userProfile,
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.headerContainer}>
          <Text style={styles.txtHelloGuest}>{I18n.t('hello')}</Text>
          <Image style={styles.profilePicGuest} source={IMAGES.guest_ph} />
        </View>
      );
    }
  };

  const renderCategories = () => {
    return (
      <View style={{marginTop: 16}}>
        <TitleView
          title={I18n.t('categories')}
          big={true}
          onPressViewAll={() => {
            NavigationService.navigate('AllCategories');
          }}
        />
        <FlatList
          data={homeData.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View
              style={[
                index === 0 ? MarginStyle.mx16 : MarginStyle.mR16,
                MarginStyle.my16,
              ]}>
              <CategoriesCell
                categoryId={item.category_id}
                image={item.category_icon}
                adsCount={'1,234'}
                category={item.category_name}
              />
            </View>
          )}
        />
      </View>
    );
  };

  const renderTopAdds = () => {
    return (
      <View>
        <TitleView
          title={I18n.t('top')}
          subTitle={I18n.t('ads')}
          big={true}
          onPressViewAll={() => {
            NavigationService.navigate('CategoryAds', {
              category: I18n.t('allAds'),
              categoryId: 0,
              toHome: false,
            });
          }}
        />
        <View style={{height: 16}} />
        <FlatList
          data={homeData.top_ads}
          ListEmptyComponent={() => (
            <EmptyView
              icon={IMAGES.empty_ad}
              title={I18n.t('noAdsCountry')}
              mini={true}
            />
          )}
          renderItem={({item, index}) => (
            <View>
              <TopAdsCell
                location={item.post_country_name}
                flag={item.post_country_flag_icon}
                title={item.post_title}
                category={item.post_category_name}
                product={'Car'}
                currencySymbol={item.post_country_currency_symbol}
                investmentPercentage={item.post_investment_percentage}
                image={item.post_image}
                post_id={item.post_id}
                businessForLabel={item.post_business_type}
                price={item.post_selling_price ?? ''}
                countryName={item.post_country_name}
                countryId={item.post_country_id}
              />
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <Screen useScroll={true}>
      <View
        style={{
          ...ContainerStyles.container,
          backgroundColor: COLORS.primary,
        }}>
        {renderHeaderComponent()}
        <View style={GlobalStyles.footerContainerLightSmallRadius}>
          {homeData ? (
            <View>
              <BannerCards entries={homeData.banners} />
              {renderCategories()}
              {renderTopAdds()}
            </View>
          ) : (
            <ActivityIndicator
              color={COLORS.primary}
              style={{...MarginStyle.mT16}}
            />
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    ...PaddingStyle.px32,
    ...PaddingStyle.pT32,
    ...PaddingStyle.pB24,
    justifyContent: 'space-between',
  },
  txtHello: {
    ...FontColor.colorWhite,
    fontSize: 30,
    fontFamily: FONTS.extra_light,
  },
  txtHelloGuest: {
    ...FontColor.colorWhite,
    fontSize: 40,
    fontFamily: FONTS.extra_light,
  },
  txtUserName: {
    ...FontColor.colorWhite,
    fontSize: 30,
    fontFamily: FONTS.regular,
    lineHeight: 35,
    marginTop: -8,
  },
  profilePic: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profilePicGuest: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Home;
