import React, {useEffect, useState} from 'react';
import Screen from '../components/screen';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
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
import {getNavigationParams} from '../const/utils';
import NavigationService from '../navigation/NavigationService';
import {apiCall, getPostList} from '../api';
import EmptyView from '../components/emptyView';

const CategoryAds = ({route}) => {
  //const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [showEmptyView, setShowEmptyView] = useState(false);
  const [isBottomLoading, setIsBottomLoading] = useState(false);
  const category = getNavigationParams(route.params, 'category', '');
  const categoryId = getNavigationParams(route.params, 'categoryId', '');
  const toHome = getNavigationParams(route.params, 'toHome', false);

  useEffect(() => {
    apiCallGetPostList(true);
  }, []);

  const apiCallGetPostList = isLoadingFirst => {
    let apiCallMethod;
    if (categoryId !== '0') {
      apiCallMethod = getPostList({
        page: page,
        my: 0,
        post_category_id: categoryId,
      });
    } else {
      apiCallMethod = getPostList({page: page, my: 0});
    }
    setShowEmptyView(false);
    apiCall(
      apiCallMethod,
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
      isLoadingFirst,
      status => {
        console.log(status);
        setIsBottomLoading(status);
      },
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton
            light={true}
            onBackPress={() => {
              if (toHome) {
                NavigationService.reset('Dashboard');
              } else {
                NavigationService.goBack();
              }
            }}
          />
          <Text style={styles.headerTitle}>{category} </Text>
        </View>
      </View>
    );
  };

  return (
    <Screen useScroll={false}>
      <View style={styles.container}>
        {renderHeader()}
        <View style={[GlobalStyles.footerContainerLightSmallRadius]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={postList}
            contentContainerStyle={{flexGrow: 1}}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (page <= totalPage) {
                apiCallGetPostList(false);
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
                {/*<TitleView*/}
                {/*  title={I18n.t('top')}*/}
                {/*  subTitle={I18n.t('ads')}*/}
                {/*  small={true}*/}
                {/*/>*/}
              </View>
            )}
            renderItem={({item, index}) => (
              <View>
                <TopAdsCell
                  key={index+''}
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

export default CategoryAds;

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
});
