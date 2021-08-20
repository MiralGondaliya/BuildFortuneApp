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
import {getFeaturedCategories, isLogIn} from '../const/utils';
import {apiCall, getCategoryList} from '../api';

const SelectBusinessStrategy = () => {
  //const {t} = useTranslation();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    apiCallGetCategories();
  }, []);

  const apiCallGetCategories = async () => {
    let featuredCategories = await getFeaturedCategories();
    if (featuredCategories) {
      setCategories(featuredCategories);
    } else {
      // apiCall(
      //   getCategoryList(1),
      //   (data, message) => {
      //     if (data) {
      //       setCategories(data.category_list);
      //     }
      //   },
      //   false,
      // );
    }
  };

  const BUSINESS_STRATEGY = [
    {
      name: I18n.t('buyABusiness'),
      icon: IMAGES.handshake,
    },
    {
      name: I18n.t('sellMyBusiness'),
      icon: IMAGES.handshake,
    },
    {
      name: I18n.t('sellMyBusinessIdea'),
      icon: IMAGES.idea,
    },
    {
      name: I18n.t('sellMyBusinessShares'),
      icon: IMAGES.shares,
    },
  ];

  const handleOnNextPress = async businessStrategy => {
    switch (businessStrategy) {
      case I18n.t('buyABusiness'):
        NavigationService.navigate('SelectIndustry', {
          categoryList: categories,
        });
        break;
      case I18n.t('sellMyBusiness'):
      case I18n.t('sellMyBusinessIdea'):
      case I18n.t('sellMyBusinessShares'):
        if (await isLogIn()) {
          NavigationService.reset('Dashboard', {
            createAdd: 'true',
          });
        } else {
          NavigationService.navigate('Login');
        }
        break;
      case I18n.t('justAViewer'):
        NavigationService.reset('Dashboard');
        break;
    }
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
              {I18n.t('selectBusinessStrategy')}
            </Text>
            <View style={MarginStyle.mT16} />
            <View>
              <SelectableButtons
                bigIcon={true}
                isSelectable={false}
                options={BUSINESS_STRATEGY}
                onOptionSelected={value => {
                  handleOnNextPress(value);
                }}
              />
              <Button
                title={I18n.t('justAViewer')}
                dark={true}
                onPress={() => {
                  handleOnNextPress(I18n.t('justAViewer'));
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

export default SelectBusinessStrategy;
