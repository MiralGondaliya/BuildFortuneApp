import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../styles/colors';
import I18n from '../i18n/i18n';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  Gravity,
  LayoutGravity,
  PaddingStyle,
} from '../styles/globalStyles';

const Dialog = ({showModal, hideModal, message, positive, negative}) => {
  //const {t} = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {}}>
      <View style={styles.container}>
        <View style={styles.dialogContainer}>
          <Text style={styles.txtMessage}>{message}</Text>
          <View style={styles.divider} />
          <View style={{...ContainerStyles.containerRow}}>
            <TouchableOpacity style={{flex: 1}} onPress={() => hideModal(true)}>
              <Text style={styles.txtButton}>{positive}</Text>
            </TouchableOpacity>
            <View style={styles.dividerH} />
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => hideModal(false)}>
              <Text style={styles.txtButton}>{negative}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.transBlack,
    ...LayoutGravity.center,
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

export default Dialog;
