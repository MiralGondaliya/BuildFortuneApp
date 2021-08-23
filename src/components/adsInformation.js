import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Linking,
  I18nManager,
} from 'react-native';
import TitleView from './titleView';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  MarginStyle,
  PaddingStyle,
} from '../styles/globalStyles';
import {COLORS} from '../styles/colors';

const AdsInformation = ({title, subTitle, information}) => {
  const renderSubItem = item => {
    const highlight =
      item.type === 'link' ||
      item.type === 'email' ||
      item.type === 'phone_no' ||
      item.type === 'whatsapp';
    return (
      <View style={styles.subInfoContainer}>
        <Text style={styles.txtSubInfoKey}>{item.key}</Text>
        <Text
          onPress={() => {
            switch (item.type) {
              case 'link':
                Linking.openURL(item.value);
                break;
              case 'email':
                Linking.openURL(`mailto:${item.value}`);
                break;
              case 'phone_no':
                Linking.openURL(`tel:${item.value}`);
                break;
              case 'whatsapp':
                Linking.openURL(`whatsapp://send?&phone=${item.value}`);
                break;
            }
          }}
          style={[
            styles.txtSubInfoValue,
            highlight && {color: COLORS.primary},
          ]}>
          {item.value}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TitleView
        title={title}
        subTitle={subTitle}
        small={true}
        reverseTitle={I18nManager.isRTL}
      />
      <View style={styles.infoContainer}>
        <FlatList
          data={information}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          renderItem={({item, index}) => renderSubItem(item)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...PaddingStyle.px8,
    ...MarginStyle.mB24,
  },
  infoContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    ...MarginStyle.mx16,
    ...MarginStyle.mT8,
  },
  subInfoContainer: {
    ...ContainerStyles.containerRow,
  },
  divider: {
    backgroundColor: COLORS.border,
    height: 1,
    width: '100%',
  },
  txtSubInfoKey: {
    flex: 0.3,
    ...PaddingStyle.px16,
    ...PaddingStyle.py16,
    ...FontSize.fontMedium14,
    borderRightColor: COLORS.border,
    borderLeftColor: COLORS.border,
    borderRightWidth: I18nManager.isRTL ? 0 : 1,
    borderLeftWidth: I18nManager.isRTL ? 1 : 0,
  },
  txtSubInfoValue: {
    flex: 0.7,
    textAlign: 'left',
    ...FontSize.fontLight14,
    ...PaddingStyle.px16,
    ...PaddingStyle.py16,
    ...FontColor.colorBlack,
  },
});

export default AdsInformation;
