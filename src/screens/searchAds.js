import React, {useState} from 'react';
import Screen from '../components/screen';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import BackButton from '../components/backButton';
import I18n from '../i18n/i18n';
import {IMAGES} from '../assets/images';
import TopAdsCell from '../components/topAdsCell';
import NavigationService from '../navigation/NavigationService';
import {apiCall, getPostList} from '../api';
import EmptyView from '../components/emptyView';

const SearchAds = ({route}) => {
  //const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [showEmptyView, setShowEmptyView] = useState(false);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [isBottomLoading, setIsBottomLoading] = useState(false);

  const apiCallGetPostList = (isLoadingFirst, searchString, currentPage) => {
    setPage(currentPage);
    setSearch(searchString);
    setShowEmptyView(false);
    if (isLoadingFirst) {
      setPostList([]);
    }
    apiCall(
      getPostList({page: currentPage, my: 0, search: searchString}),
      (data, message) => {
        console.log(data);
        if (data) {
          let current_page = data.current_page;
          let post_list = data.post_list;
          let total_page = data.total_page;

          setTotalPage(total_page);
          setPage(current_page + 1);

          if (post_list.length > 0) {
            if (isLoadingFirst) {
              setPostList(post_list);
            } else {
              let postListBucket = [...postList, ...post_list];
              setPostList(postListBucket);
            }
          } else {
            if (isLoadingFirst) {
              setShowEmptyView(true);
            }
          }
        } else {
          if (postList.length <= 0) {
            setShowEmptyView(true);
          }
        }
      },
      false,
      status => {
        if (isLoadingFirst) {
          setIsTopLoading(status);
        } else {
          setIsBottomLoading(status);
        }
      },
    );
  };

  const handleOnClosePress = () => {
    setSearch('');
  };

  const renderSearchHeader = () => {
    return (
      <View style={styles.searchHeaderContainer}>
        <BackButton
          light={true}
          onBackPress={() => {
            NavigationService.goBack();
          }}
        />
        <View
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
            onChangeText={value => {
              apiCallGetPostList(true, value, 1);
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
        </View>
      </View>
    );
  };

  return (
    <Screen useScroll={false}>
      <View style={styles.container}>
        {renderSearchHeader()}
        <View style={[GlobalStyles.footerContainerLightSmallRadius]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={postList}
            contentContainerStyle={{flexGrow: 1}}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (page < totalPage) {
                apiCallGetPostList(false, search, page);
              }
            }}
            ListFooterComponent={() =>
              isBottomLoading && (
                <ActivityIndicator
                  color={COLORS.primary}
                  style={styles.indicator}
                />
              )
            }
            ListEmptyComponent={() =>
              showEmptyView && (
                <EmptyView title={I18n.t('noAds')} icon={IMAGES.empty_ad} />
              )
            }
            ListHeaderComponent={() => (
              <View style={MarginStyle.mT16}>
                {isTopLoading ? (
                  <ActivityIndicator
                    color={COLORS.primary}
                    style={styles.indicator}
                  />
                ) : null}
              </View>
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
      </View>
    </Screen>
  );
};

export default SearchAds;

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.container,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.py16,
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    ...LayoutGravity.centerX,
    ...MarginStyle.mR32,
    flex: 1,
    fontSize: 25,
    fontFamily: FONTS.regular,
  },
  headerTitleLight: {
    ...FontColor.colorWhite,
    fontSize: 25,
    paddingStart: 56,
    marginTop: -12,
    fontFamily: FONTS.extra_light,
    ...MarginStyle.mB32,
  },
  indicator: {
    ...LayoutGravity.center,
    ...MarginStyle.my,
  },
  searchHeaderContainer: {
    ...PaddingStyle.pR24,
    ...PaddingStyle.py24,
    ...ContainerStyles.containerRow,
  },
  searchContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    ...ContainerStyles.containerRow,
    ...PaddingStyle.px16,
    alignItems: 'center',
    flex: 1,
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
});
