import {Dimensions, StyleSheet} from 'react-native';
import {FONTS} from './fonts';
import {COLORS} from './colors';

export const MarginStyle = StyleSheet.create({
  my8: {marginVertical: 8},
  my16: {marginVertical: 16},
  my24: {marginVertical: 24},
  my32: {marginVertical: 32},

  mT8: {marginTop: 8},
  mT16: {marginTop: 16},
  mT24: {marginTop: 24},
  mT32: {marginTop: 32},

  mB8: {marginBottom: 8},
  mB16: {marginBottom: 16},
  mB24: {marginBottom: 24},
  mB32: {marginBottom: 32},

  mx8: {marginHorizontal: 8},
  mx16: {marginHorizontal: 16},
  mx24: {marginHorizontal: 24},
  mx32: {marginHorizontal: 32},
  mx48: {marginHorizontal: 48},

  mL8: {marginLeft: 8},
  mL16: {marginLeft: 16},
  mL24: {marginLeft: 24},
  mL32: {marginLeft: 32},
  mL48: {marginLeft: 48},

  mR8: {marginRight: 8},
  mR16: {marginRight: 16},
  mR24: {marginRight: 24},
  mR32: {marginRight: 32},

  m8: {margin: 8},
  m16: {margin: 16},
  m24: {margin: 24},
  m32: {margin: 32},
});

export const PaddingStyle = StyleSheet.create({
  py8: {paddingVertical: 8},
  py16: {paddingVertical: 16},
  py24: {paddingVertical: 24},
  py32: {paddingVertical: 32},

  pT8: {paddingTop: 8},
  pT16: {paddingTop: 16},
  pT24: {paddingTop: 24},
  pT32: {paddingTop: 32},

  pB8: {paddingBottom: 8},
  pB16: {paddingBottom: 16},
  pB24: {paddingBottom: 24},
  pB32: {paddingBottom: 32},

  px8: {paddingHorizontal: 8},
  px16: {paddingHorizontal: 16},
  px24: {paddingHorizontal: 24},
  px32: {paddingHorizontal: 32},

  pL8: {paddingStart: 8},
  pL16: {paddingStart: 16},
  pL24: {paddingStart: 24},
  pL32: {paddingStart: 32},

  pR8: {paddingEnd: 8},
  pR16: {paddingEnd: 16},
  pR24: {paddingEnd: 24},
  pR32: {paddingEnd: 32},

  p8: {padding: 8},
  p16: {padding: 16},
  p24: {padding: 24},
  p32: {padding: 32},
});

export const FontSize = StyleSheet.create({
  fontLight12: {
    fontSize: 12,
    fontFamily: FONTS.light,
  },
  fontRegular12: {
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
  fontMedium12: {
    fontSize: 12,
    fontFamily: FONTS.medium,
  },
  fontBold12: {
    fontSize: 12,
    fontFamily: FONTS.bold,
  },

  fontLight14: {
    fontSize: 14,
    fontFamily: FONTS.light,
  },
  fontRegular14: {
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  fontMedium14: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
  fontBold14: {
    fontSize: 14,
    fontFamily: FONTS.bold,
  },

  fontLight16: {
    fontSize: 16,
    fontFamily: FONTS.light,
  },
  fontRegular16: {
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  fontMedium16: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  fontBold16: {
    fontSize: 16,
    fontFamily: FONTS.bold,
  },

  fontLight18: {
    fontSize: 18,
    fontFamily: FONTS.light,
  },
  fontRegular18: {
    fontSize: 18,
    fontFamily: FONTS.regular,
  },
  fontMedium18: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
  fontBold18: {
    fontSize: 18,
    fontFamily: FONTS.bold,
  },

  fontLight24: {
    fontSize: 24,
    fontFamily: FONTS.light,
  },
  fontRegular24: {
    fontSize: 24,
    fontFamily: FONTS.regular,
  },
  fontMedium24: {
    fontSize: 24,
    fontFamily: FONTS.medium,
  },
  fontBold24: {
    fontSize: 24,
    fontFamily: FONTS.bold,
  },

  fontExtraLight32: {
    fontSize: 32,
    fontFamily: FONTS.extra_light,
  },
  fontLight32: {
    fontSize: 32,
    fontFamily: FONTS.light,
  },
  fontRegular32: {
    fontSize: 32,
    fontFamily: FONTS.regular,
  },
  fontMedium32: {
    fontSize: 32,
    fontFamily: FONTS.medium,
  },
  fontBold32: {
    fontSize: 32,
    fontFamily: FONTS.bold,
  },

  fontLight48: {
    fontSize: 48,
    fontFamily: FONTS.light,
  },
  fontRegular48: {
    fontSize: 48,
    fontFamily: FONTS.regular,
  },
  fontMedium48: {
    fontSize: 48,
    fontFamily: FONTS.medium,
  },
  fontBold48: {
    fontSize: 48,
    fontFamily: FONTS.bold,
  },
});

export const FontColor = StyleSheet.create({
  colorPrimary: {
    color: COLORS.primary,
  },
  colorWhite: {
    color: COLORS.white,
  },
  colorGary: {
    color: COLORS.gray,
  },
  colorBlack: {
    color: COLORS.black,
  },
  colorCornFlowerFlue: {
    color: COLORS.cornFlowerBlue,
  },
  colorGrayLabel: {
    color: COLORS.gray_lable,
  },
  colorRed: {
    color: COLORS.red,
  },
});

export const Gravity = StyleSheet.create({
  center: {alignSelf: 'center'},
  left: {alignSelf: 'flex-start'},
  right: {alignSelf: 'flex-end'},
});

export const LayoutGravity = StyleSheet.create({
  center: {justifyContent: 'center', alignItems: 'center'},
  centerX: {justifyContent: 'center'},
  centerY: {alignItems: 'center'},
  alignRight: {alignItems: 'flex-end'},
  alignStart: {alignItems: 'flex-start'},
});

export const TextGravity = StyleSheet.create({
  vCenter: {textAlign: 'center'},
});

export const Shadow = StyleSheet.create({
  dropShadow: {
    shadowOffset: {width: 0, height: 1},
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export const ContainerStyles = StyleSheet.create({
  container: {
    flex: 1.0,
  },
  contentContainer: {
    flexGrow: 1.0,
    backgroundColor: COLORS.gray_athens,
  },
  containerGray: {
    backgroundColor: COLORS.gray_athens,
  },
  containerWithHorizontalPadding16: {
    flex: 1.0,
    ...PaddingStyle.px16,
  },
  containerHorizontalSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerCenterAlign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMatchParent: {
    width: '100%',
    height: '100%',
  },
  containerRow: {
    flexDirection: 'row',
  },
  containerColumn: {
    flexDirection: 'column',
  },
  containerCard16: {
    borderRadius: 16,
  },
  containerCard8: {
    borderRadius: 8,
  },
  containerCard4: {
    borderRadius: 4,
  },
});

export const GlobalStyles = StyleSheet.create({
  authScreenTitle: {
    ...FontSize.fontBold24,
    ...FontColor.colorGary,
    ...MarginStyle.my16,
    ...Gravity.center,
  },
  screenSubTitle: {
    ...FontSize.fontRegular16,
    ...Gravity.center,
    ...FontColor.colorGary,
    ...TextGravity.vCenter,
  },
  authInput: {
    ...FontSize.fontBold14,
    ...FontColor.colorBlack,
    ...ContainerStyles.container,
  },
  navIcon: {
    width: 22,
    height: 22,
  },
  navIconContainer: {
    width: 56,
    height: 56,
    ...ContainerStyles.containerCenterAlign,
  },
  navIconWhite: {
    tintColor: COLORS.white,
  },
  footerIcon: {
    width: 35,
    height: 35,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  space8: {
    width: 16,
  },
  space16: {
    width: 16,
  },
  space: {
    flex: 1,
  },
  headerContainer: {
    ...LayoutGravity.center,
  },
  headerContainerDark: {
    minHeight: Dimensions.get('window').height / 4,
  },
  footerContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 72,
    ...PaddingStyle.p32,
    ...LayoutGravity.centerY,
  },
  footerContainerLight: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 72,
    ...PaddingStyle.p32,
  },
  footerContainerLightSmallRadius: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 45,
    overflow: 'hidden',
  },
});

export const isMiniIosDevice = Dimensions.get('window').height < 700;
