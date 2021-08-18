import React, {useEffect, useState} from 'react';
import Screen from '../components/screen';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';
import {FONTS} from '../styles/fonts';
import BackButton from '../components/backButton';
import I18n from '../i18n/i18n';
import CategoriesCell from '../components/categoriesCell';
import {IMAGES} from '../assets/images';
import TitleView from '../components/titleView';
import {apiCall, getCategoryList} from '../api';
import {showErrorMessage} from '../const/flashMessage';

const AllCategories = () => {
  //const {t} = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiCallGetCategories();
  }, []);

  const apiCallGetCategories = () => {
    apiCall(
      getCategoryList(),
      (data, message) => {
        if (data) {
          setCategories(data.category_list);
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
        <Text style={styles.headerTitle}>{I18n.t('categories')} </Text>
      </View>
    );
  };

  return (
    <Screen useScroll={false}>
      <View style={styles.container}>
        {renderHeader()}
        <View
          style={[
            GlobalStyles.footerContainerLightSmallRadius,
            {...LayoutGravity.center},
          ]}>
          {categories ? (
            <FlatList
              data={categories}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <View style={MarginStyle.mT16}>
                  <TitleView title={I18n.t('categories')} small={true} />
                </View>
              )}
              renderItem={({item, index}) => (
                <View
                  style={[
                    index % 2 === 0 ? MarginStyle.mx16 : MarginStyle.mR16,
                    MarginStyle.my16,
                  ]}>
                  <CategoriesCell
                    big={true}
                    categoryId={item.category_id}
                    image={item.category_icon}
                    adsCount={'1,234'}
                    category={item.category_name}
                  />
                </View>
              )}
            />
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

export default AllCategories;

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.container,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    ...ContainerStyles.containerRow,
    ...MarginStyle.mB32,
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
  headerTitleBold: {
    fontFamily: FONTS.medium,
  },
});
