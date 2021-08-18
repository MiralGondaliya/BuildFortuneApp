import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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
import {IMAGES} from '../assets/images';
import Button from '../components/button';
import NavigationService from '../navigation/NavigationService';
import {getNavigationParams} from '../const/utils';

const SelectIndustry = ({route}) => {
  //const {t} = useTranslation();
  const categoryList = getNavigationParams(route.params, 'categoryList', []);
  const [categoryListForSelection, setCategoryListForSelection] = useState([]);
  useEffect(() => {
    prepareCategoryListForSelection();
  }, []);

  const prepareCategoryListForSelection = () => {
    let categoryListBucket = [];
    categoryList.map((item, index) => {
      let categoryObject = {
        name: item.category_name,
      };
      categoryListBucket.push(categoryObject);
    });
    setCategoryListForSelection(categoryListBucket);
  };

  const handleOnNextPress = industry => {
    let category = industry;
    let categoryId = '0';
    let selectedCategory = categoryList.filter(country => {
      return country.category_name === industry;
    })[0];
    if (selectedCategory) {
      category = selectedCategory.category_name;
      categoryId = selectedCategory.category_id;
    }
    NavigationService.navigate('CategoryAds', {
      category: category,
      categoryId: categoryId,
      toHome: true,
    });
  };

  return (
    <Screen useScroll={true}>
      <View
        style={{
          ...ContainerStyles.container,
        }}>
        <GetStartedHeader />
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
              {I18n.t('selectIndustry')}
            </Text>
            <View style={MarginStyle.mT16} />
            <View>
              <SelectableButtons
                bigIcon={true}
                options={categoryListForSelection}
                onOptionSelected={value => {
                  handleOnNextPress(value);
                }}
              />
              <Button
                title={I18n.t('viewAll')}
                dark={true}
                onPress={() => {
                  handleOnNextPress(I18n.t('viewAll'));
                }}
                buttonStyle={{marginTop: 0}}
              />
            </View>
            <Image
              source={IMAGES.banner}
              resizeMode={'contain'}
              style={style.bannerContainer}
            />
            <View style={GlobalStyles.space} />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const style = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
});

export default SelectIndustry;
