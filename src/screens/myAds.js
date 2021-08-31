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
import TitleView from '../components/titleView';
import TopAdsCell from '../components/topAdsCell';
import {apiCall, getPostList} from '../api';
import {currencyFormat} from '../const/utils';
import EmptyView from '../components/emptyView';

const MyAds = () => {
  //const {t} = useTranslation();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [postList, setPostList] = useState([]);
  const [isBottomLoading, setIsBottomLoading] = useState(false);
  const [showEmptyView, setShowEmptyView] = useState(false);

  useEffect(() => {},[page,totalPage])

  useEffect(() => {
    apiCallGetPostList(true);
  }, []);

  const apiCallGetPostList = isLoadingFirst => {
    setShowEmptyView(false);
    apiCall(
      getPostList({
        page: page,
        my: 1,
      }),
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
          <BackButton light={true} />
          <Text style={styles.headerTitle}>{I18n.t('myAds')} </Text>
        </View>
        {/*<Text style={styles.headerTitleLight}>{I18n.t('ads')} </Text>*/}
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
            ListHeaderComponent={() => <View style={MarginStyle.mT24} />}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (page <= totalPage) {
                apiCallGetPostList(false);
              }
            }}
            ListEmptyComponent={() =>
              showEmptyView && (
                <EmptyView title={I18n.t('noAds')} icon={IMAGES.empty_ad} />
              )
            }
            ListFooterComponent={() =>
              isBottomLoading && (
                <ActivityIndicator
                  color={COLORS.primary}
                  style={styles.indicator}
                />
              )
            }
            renderItem={({item, index}) => (
              <View>
                <TopAdsCell
                  isMyAdsDetail={true}
                  post_id={item.post_id}
                  location={item.post_country_name}
                  flag={item.post_country_flag_icon}
                  title={item.post_title}
                  category={item.post_category_name}
                  product={'Car'}
                  currencySymbol={item.post_country_currency_symbol}
                  investmentPercentage={item.post_investment_percentage}
                  postStatus={item.post_status}
                  image={item.post_image}
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

export default MyAds;

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.container,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    ...ContainerStyles.containerRow,
    ...PaddingStyle.pB32,
    ...PaddingStyle.pT16,
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
    paddingHorizontal: 56,
    marginTop: -12,
    fontFamily: FONTS.extra_light,
    ...MarginStyle.mB32,
  },
});
