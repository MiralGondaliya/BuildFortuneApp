import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Screen from '../../components/screen';
import {
  ContainerStyles,
  FontColor,
  GlobalStyles,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../../styles/globalStyles';
import {COLORS} from '../../styles/colors';
import {IMAGES} from '../../assets/images';
import I18n from '../../i18n/i18n';
import TitleView from '../../components/titleView';
import {FONTS} from '../../styles/fonts';
import TrendingAdsCell from '../../components/trendingAdsCell';
import {apiCall, getTrendingPost} from '../../api';
import NavigationService from '../../navigation/NavigationService';

const Search = () => {
  //const {t} = useTranslation();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [trendingAds, setTrendingAds] = useState([]);

  useEffect(() => {
    apiCallGteTrendingAds();
  }, []);

  const apiCallGteTrendingAds = () => {
    apiCall(
      getTrendingPost(),
      (data, message) => {
        if (data) {
          setTrendingAds(data.post_list);
          console.log(data);
        }
      },
      false,
      status => {
        setIsLoading(status);
      },
    );
  };

  const handleOnClosePress = () => {
    setSearch('');
  };

  const renderSearchHeader = () => {
    return (
      <View style={styles.searchHeaderContainer}>
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate('SearchAds');
          }}
          style={styles.searchContainer}>
          <Image source={IMAGES.search_dark} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={I18n.t('searchYourNeeds')}
            placeholderTextColor={COLORS.gray_hint}
            value={search}
            editable={false}
            onChangeText={value => {
              setSearch(value);
            }}
          />
          {search ? (
            <TouchableOpacity
              onPress={() => {
                handleOnClosePress();
              }}>
              <Image source={IMAGES.close} style={styles.closeIcon} />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const renderHistoryKeywordsItem = keyword => {
    return (
      <View style={styles.historyKeywordItemContainer} key={keyword}>
        <Image source={IMAGES.search_dark} style={styles.searchIcon} />
        <Text style={styles.txtKeyword}>{keyword}</Text>
      </View>
    );
  };

  const renderHistoryKeyWord = () => {
    return (
      <View style={styles.historyKeyWordContainer}>
        <TitleView title={I18n.t('history')} subTitle={I18n.t('keywords')} />
        <View style={MarginStyle.mB16} />
        <FlatList
          data={[1, 1, 1, 1]}
          renderItem={({item, index}) =>
            renderHistoryKeywordsItem('Jeep Rubicon On Rent')
          }
        />
      </View>
    );
  };

  const renderTrendingAds = () => {
    return (
      <View style={{paddingTop: 16}}>
        <TitleView
          title={I18n.t('trendingAds')}
          // subTitle={I18n.t('ads')}
        />
        <FlatList
          data={trendingAds}
          ListFooterComponent={() =>
            isLoading && (
              <ActivityIndicator
                color={COLORS.primary}
                style={styles.indicator}
              />
            )
          }
          renderItem={({item, index}) => (
            <TrendingAdsCell
              title={item.post_title}
              category={item.post_category_name}
              price={item.post_selling_price}
              location={item.post_country_name}
              flag={item.post_country_flag_icon}
              businessForLabel={item.post_business_type}
              image={item.post_image}
              currencySymbol={item.post_country_currency_symbol}
              investmentPercentage={item.post_investment_percentage}
              post_id={item.post_id}
              countryId={item.post_country_id}
            />
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
        {renderSearchHeader()}
        <View style={GlobalStyles.footerContainerLightSmallRadius}>
          {renderTrendingAds()}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchHeaderContainer: {
    ...PaddingStyle.px24,
    ...PaddingStyle.py24,
  },
  searchContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px16,
    alignItems: 'center',
  },
  searchIcon: {
    width: 22,
    height: 22,
  },
  searchInput: {
    fontSize: 20,
    ...PaddingStyle.px16,
    ...FontColor.colorBlack,
    lineHeight: 20,
    flex: 1,
  },
  closeIcon: {
    width: 12,
    height: 12,
  },
  historyKeyWordContainer: {
    ...MarginStyle.mT24,
  },
  historyKeywordItemContainer: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px24,
    ...PaddingStyle.pB16,
    ...LayoutGravity.center,
  },
  txtKeyword: {
    fontSize: 20,
    fontFamily: FONTS.light,
    ...FontColor.colorGrayLabel,
    flex: 1,
    lineHeight: 22,
    paddingTop: 4,
    paddingHorizontal: 16,
  },
});

export default Search;
