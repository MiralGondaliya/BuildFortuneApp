import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../styles/colors';
import I18n from '../i18n/i18n';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  PaddingStyle,
} from '../styles/globalStyles';
import AdsInformation from './adsInformation';
import BackButton from './backButton';
import {FONTS} from '../styles/fonts';

const ContactDetailsPopup = ({showModal, hideModal, data}) => {
  //const {t} = useTranslation();

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <BackButton
            light={true}
            onBackPress={() => {
              hideModal();
            }}
          />
        </View>
      </View>
    );
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {}}>
      {data && (
        <View style={styles.container}>
          {renderHeader()}
          <View
            style={[
              GlobalStyles.footerContainerLightSmallRadius,
              {...PaddingStyle.py24},
            ]}>
            <AdsInformation
              title={data.key}
              subTitle={I18n.t('information')}
              information={data.information}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    ...ContainerStyles.containerRow,
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    fontSize: 25,
    fontFamily: FONTS.regular,
    ...Gravity.center,
  },
  headerTitleLight: {
    ...FontColor.colorWhite,
    fontSize: 25,
    fontFamily: FONTS.extra_light,
  },
  dialogContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    width: '88%',
  },
  txtMessage: {
    ...FontColor.colorBlack,
    ...FontSize.fontRegular14,
    ...PaddingStyle.px16,
    ...PaddingStyle.py16,
    ...Gravity.center,
  },
  txtButton: {
    ...FontColor.colorPrimary,
    ...FontSize.fontMedium14,
    ...PaddingStyle.px16,
    ...PaddingStyle.py16,
    textAlign: 'center',
  },
  divider: {
    backgroundColor: COLORS.border,
    height: 1,
  },
  dividerH: {
    backgroundColor: COLORS.border,
    width: 1,
    height: '100%',
  },
});

export default ContactDetailsPopup;
