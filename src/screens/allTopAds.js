import React from 'react';
import Screen from '../components/screen';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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

const AllTopAds = () => {
  //const {t} = useTranslation();

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton light={true} />
          <Text style={styles.headerTitle}>{I18n.t('top')} </Text>
        </View>
        <Text style={styles.headerTitleLight}>{I18n.t('ads')} </Text>
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
            data={[1, 1, 1, 1, 1, 1, 1]}
            ListHeaderComponent={() => (
              <View style={MarginStyle.mT16}>
                <TitleView title={I18n.t('top')} subTitle={I18n.t('ads')} small={true} />
              </View>
            )}
            renderItem={({item, index}) => (
              <View>
                <TopAdsCell
                  location={'New york, USA'}
                  flag={IMAGES.flag_us}
                  title={'Jeep Rubicon on rent'}
                  category={'Automobile'}
                  product={'Car'}
                  investmentPercentage={'50'}
                  image={
                    'https://images.news18.com/ibnlive/uploads/2020/03/Jeep-Wrangler-Rubicon.jpg'
                  }
                  businessForLabel={'Business share sell'}
                  price={'$ 33,000'}
                />
              </View>
            )}
          />
        </View>
      </View>
    </Screen>
  );
};

export default AllTopAds;

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.container,
    backgroundColor: COLORS.primary,
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
});
