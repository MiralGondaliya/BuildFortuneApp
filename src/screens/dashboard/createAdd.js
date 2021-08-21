import React, {useEffect, useRef, useState} from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ContainerStyles,
  FontColor,
  FontSize,
  GlobalStyles,
  Gravity,
  LayoutGravity,
  MarginStyle,
  PaddingStyle,
  Shadow,
} from '../../styles/globalStyles';
import {COLORS} from '../../styles/colors';
import Screen from '../../components/screen';
import {FONTS} from '../../styles/fonts';
import I18n from '../../i18n/i18n';
import TitleView from '../../components/titleView';
import {IMAGES} from '../../assets/images';
import Menu, {MenuItem} from 'react-native-material-menu';
import Checkbox from '../../components/checkBox';
import {ImagePickerHelper} from '../../const/imagePickerHelper';
import Button from '../../components/button';
import {showErrorMessage, showSuccessMessage} from '../../const/flashMessage';
import {apiCall, createAds} from '../../api';
import moment from 'moment';
import NationalitySelectionPopup from '../../components/nationalitySelectionPopup';
import {
  filterStringByNumber,
  getCategoriesFromStorage,
  isEmailValid,
} from '../../const/utils';

const CreateAdd = () => {
  //const {t} = useTranslation();
  const refMenuType = useRef(null);
  const refLicensed = useRef(null);

  const refMenuYesOrNoBusinessModal = useRef(null);
  const refMenuYesOrFasibilityStudy = useRef(null);
  const refMenuYesOrNoBranding = useRef(null);
  const refMenuYesOrNoMarketing = useRef(null);

  const refMenuCategory = useRef(null);
  const [selectType, setSelectedType] = useState('');
  const [categories, setCategories] = useState([]);
  const [showCountyPicker, setShowCountryPicker] = useState(false);
  const [showCountyCodePickerPhone, setShowCountyCodePickerPhone] =
    useState(false);
  const [showCountyCodePickerWhatsApp, setShowCountyCodePickerWhatsApp] =
    useState(false);

  //Fill information
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [titleInEnglish, setTitleInEnglish] = useState('');
  const [titleInArabic, setTitleInArabic] = useState('');
  const [businessNameEnglish, setBusinessNameEnglish] = useState('');
  const [businessNameArabic, setBusinessNameArabic] = useState('');
  const [establishmentYear, setEstablishmentYear] = useState('');
  const [licensed, setLicensed] = useState('');
  const [noOfStaff, setNoOfStaff] = useState(1);
  const [sellingPrice, setSellingPrice] = useState('');
  const [descriptionEnglish, setDescriptionEnglish] = useState('');
  const [descriptionArabic, setDescriptionArabic] = useState('');
  const [attachImage, setAttachImage] = useState('');
  const [attachImage2, setAttachImage2] = useState('');
  const [attachImage3, setAttachImage3] = useState('');
  const [attachImageUri, setAttachImageUri] = useState('');
  const [attachImageUri2, setAttachImageUri2] = useState('');
  const [attachImageUri3, setAttachImageUri3] = useState('');
  const [country, setCountry] = useState('');
  const [countryId, setCountryId] = useState('');
  const [investmentPercentage, setInvestmentPercentage] = useState('');

  //Contact information
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCodePhoneNumber, setCountryCodePhoneNumber] = useState('1');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [countryCodeWhatsAppNumber, setCountryCodeWhatsAppNumber] =
    useState('1');
  const [isCheckedContactInfo, setCheckContactInfo] = useState(false);

  //Local information
  const [addressEnglish, setAddressEnglish] = useState('');
  const [addressArabic, setAddressArabic] = useState('');
  const [space, setSpace] = useState('');
  const [spaceRent, setSpaceRent] = useState('');

  //Social Information
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [faceBook, setFaceBook] = useState('');
  const [youtube, setYouTube] = useState('');
  const [webSite, setWebsite] = useState('');

  //Additional info
  const [businessModal, setBusinessModal] = useState('');
  const [feasibilityStrategy, setFeasibilityStrategy] = useState('');
  const [brandingStrategy, setBrandingStrategy] = useState('');
  const [marketingStrategy, setMarketingStrategy] = useState('');

  //Investor info
  const [investorNationality, setInvestorNationality] = useState('');
  const [investorNationalityInArabic, setInvestorNationalityInArabic] =
    useState('');
  const [investorFieldOfExp, setInvestorFieldOfExp] = useState('');
  const [investorFieldOfExpInArabic, setInvestorFieldOfExpInArabic] =
    useState('');
  const [investorCharacteristics, setInvestorCharacteristics] = useState('');
  const [investorCharacteristicsInArabic, setInvestorCharacteristicsInArabic] =
    useState('');

  const clearState = () => {
    setCategory('');
    setCategoryId('');
    setTitleInEnglish('');
    setTitleInArabic('');
    setBusinessNameEnglish('');
    setBusinessNameArabic('');
    setEstablishmentYear('');
    setLicensed('');
    setNoOfStaff('');
    setSellingPrice('');
    setDescriptionEnglish('');
    setDescriptionArabic('');
    setAttachImage('');
    setAttachImage2('');
    setAttachImage3('');
    setAttachImageUri('');
    setAttachImageUri2('');
    setAttachImageUri3('');
    setCountry('');
    setCountryId('');
    setInvestmentPercentage('');
    setEmail('');
    setPhoneNumber('');
    setCountryCodePhoneNumber('1');
    setWhatsAppNumber('');
    setCountryCodeWhatsAppNumber('1');
    setCheckContactInfo(false);
    setAddressEnglish('');
    setAddressArabic('');
    setSpace('');
    setSpaceRent('');
    setTwitter('');
    setInstagram('');
    setFaceBook('');
    setYouTube('');
    setWebsite('');
    setBusinessModal('');
    setFeasibilityStrategy('');
    setBrandingStrategy('');
    setMarketingStrategy('');
    setInvestorNationality('');
    setInvestorNationalityInArabic('');
    setInvestorFieldOfExp('');
    setInvestorFieldOfExpInArabic('');
    setInvestorCharacteristics('');
    setInvestorCharacteristicsInArabic('');
  };

  // useEffect(() => {}, [categories]);
  useEffect(() => {
    apiCallGetCategories(() => {});
  }, []);

  const apiCallGetCategories = async onResponseSuccess => {
    let categoriesFromStorage = await getCategoriesFromStorage();
    if (categoriesFromStorage) {
      setCategories(categoriesFromStorage);
      onResponseSuccess && onResponseSuccess();
    } else {
      // apiCall(
      //   getCategoryList(),
      //   (data, message) => {
      //     if (data) {
      //       setCategories(data.category_list);
      //       onResponseSuccess && onResponseSuccess();
      //     } else {
      //       showErrorMessage(message);
      //     }
      //   },
      //   false,
      // );
    }
  };

  const renderCountryCodePicker = isWhatsApp => (
    <TouchableOpacity
      style={{
        ...ContainerStyles.containerRow,
        ...Gravity.center,
        ...LayoutGravity.center,
        ...PaddingStyle.px8,
      }}
      onPress={() => {
        if (isWhatsApp) {
          setShowCountyCodePickerWhatsApp(true);
        } else {
          setShowCountyCodePickerPhone(true);
        }
      }}>
      <Text
        style={{
          ...FontColor.colorBlack,
          ...FontSize.fontRegular14,
        }}>
        {isWhatsApp ? countryCodeWhatsAppNumber : countryCodePhoneNumber}
      </Text>
      <Image
        style={{width: 17, height: 17, ...MarginStyle.mx8}}
        source={IMAGES.dropdown}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );

  const FILL_INFO = [
    {
      title: I18n.t('selectCategory'),
      placeholder: I18n.t('selectCategory'),
      value: category,
      keyboardType: 'default',
      dropdown: true,
      setValue: value => {
        setCategory(value);
      },
      leftComponent: null,
      rightIcon: IMAGES.dropdown,
      validation: () => {
        let isValid = !!category;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseSelectCategory'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('title'),
      placeholder: I18n.t('titleInEnglish'),
      value: titleInEnglish,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setTitleInEnglish(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!titleInEnglish;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseEnterTitleInEnglish'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('title'),
      placeholder: I18n.t('titleInArabic'),
      value: titleInArabic,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setTitleInArabic(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!titleInArabic;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseEnterTitleInArabic'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('businessNameOpt'),
      placeholder: I18n.t('businessNameInEnglish'),
      value: businessNameEnglish,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setBusinessNameEnglish(value);
      },
      leftComponent: null,
      validation: () => {
        return true;
      },
    },
    {
      title: I18n.t('businessNameOpt'),
      placeholder: I18n.t('businessNameInArabic'),
      value: businessNameArabic,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setBusinessNameArabic(value);
      },
      leftComponent: null,
      validation: () => {
        return true;
      },
    },
    {
      title:
        selectType !== I18n.t('sellMyBusinessIdea')
          ? I18n.t('establishmentYear')
          : I18n.t('establishmentYearOpt'),
      placeholder: I18n.t('year'),
      value: establishmentYear,
      keyboardType: 'number-pad',
      dropdown: false,
      limit: 4,
      setValue: value => {
        setEstablishmentYear(filterStringByNumber(value));
      },
      leftComponent: null,
      validation: () => {
        if (selectType !== I18n.t('sellMyBusinessIdea')) {
          let isValid = true;
          if (establishmentYear) {
            if (
              parseInt(establishmentYear) < 1900 ||
              parseInt(establishmentYear) > moment().year()
            ) {
              isValid = false;
              showErrorMessage(
                `${I18n.t('establishmentYearShouldBe')} ${moment().year()}`,
              );
            }
          }
          return isValid;
        } else {
          let isValid = !!establishmentYear;
          if (!isValid) {
            showErrorMessage(I18n.t('pleaseEnterEstablishmentYear'));
          } else {
            if (
              parseInt(establishmentYear) < 1900 ||
              parseInt(establishmentYear) > moment().year()
            ) {
              isValid = false;
              showErrorMessage(
                `${I18n.t('establishmentYearShouldBe')} - ${moment().year()}`,
              );
            }
          }
          return isValid;
        }
      },
    },
    {
      title: I18n.t('investmentPercentageOpt'),
      isVisible: selectType === I18n.t('sellMyBusinessShares'),
      placeholder: I18n.t('hintPercentage'),
      value: investmentPercentage,
      keyboardType: 'number-pad',
      dropdown: false,
      setValue: value => {
        setInvestmentPercentage(filterStringByNumber(value));
      },
      leftComponent: null,
      validation: () => {
        return true;
      },
    },
    {
      isVisible: selectType === I18n.t('sellMyBusiness'),
      title: I18n.t('licensedOpt'),
      placeholder: I18n.t('yesOrNo'),
      value: licensed,
      keyboardType: 'default',
      reference: refLicensed,
      dropdown: true,
      rightIcon: IMAGES.dropdown,
      setValue: value => {
        setLicensed(value);
      },
      leftComponent: null,
      validation: () => {
        return true;
      },
    },
    {
      isVisible: selectType === I18n.t('sellMyBusiness'),
      title: I18n.t('noOfStaff'),
      placeholder: I18n.t('staff'),
      value: noOfStaff,
      keyboardType: 'number-pad',
      dropdown: false,
      setValue: value => {
        setNoOfStaff(filterStringByNumber(value));
      },
      leftComponent: null,
      validation: () => {
        return true;
      },
    },
    {
      title: I18n.t('sellingPrice'),
      isVisible: selectType !== I18n.t('sellMyBusinessShares'),
      placeholder: I18n.t('yourSellingPrice'),
      value: sellingPrice,
      keyboardType: 'number-pad',
      dropdown: false,
      setValue: value => {
        setSellingPrice(filterStringByNumber(value));
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!sellingPrice;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseEnterSellingPrice'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('imageTitle'),
      placeholder: I18n.t('attachImages'),
      value: attachImage,
      keyboardType: 'default',
      dropdown: true,
      setValue: value => {},
      leftComponent: null,
      rightIcon: IMAGES.attachments,
      validation: () => {
        let isValid = !!(attachImage && attachImageUri);
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseSelectImage'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('imageTitleTwo'),
      placeholder: I18n.t('attachImages2'),
      value: attachImage2,
      keyboardType: 'default',
      dropdown: true,
      setValue: value => {},
      leftComponent: null,
      rightIcon: IMAGES.attachments,
      validation: () => {
        return true;
      },
    },
    {
      title: I18n.t('imageTitleThree'),
      placeholder: I18n.t('attachImages3'),
      value: attachImage3,
      keyboardType: 'default',
      dropdown: true,
      setValue: value => {},
      leftComponent: null,
      rightIcon: IMAGES.attachments,
      validation: () => {
        return true;
      },
    },
    {
      title: I18n.t('description'),
      placeholder: I18n.t('aboutYourBusinessInEnglish'),
      value: descriptionEnglish,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setDescriptionEnglish(value);
      },
      leftComponent: null,
      multiLine: true,
      validation: () => {
        let isValid = !!descriptionEnglish;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseEnterDescriptionInEnglish'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('description'),
      placeholder: I18n.t('aboutYourBusinessInArabic'),
      value: descriptionArabic,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setDescriptionArabic(value);
      },
      multiLine: true,
      leftComponent: null,
      validation: () => {
        let isValid = !!descriptionArabic;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseEnterDescriptionInArabic'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('country'),
      placeholder: I18n.t('originCountry'),
      value: country,
      keyboardType: 'default',
      dropdown: true,
      rightIcon: IMAGES.dropdown,
      setValue: value => {
        setCountry(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!country;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseSelectCountry'));
        }
        return isValid;
      },
    },
  ];

  const CONTACT_INFO = [
    {
      title: I18n.t('emailAddress'),
      placeholder: I18n.t('yourEmailAddress'),
      value: email,
      keyboardType: 'email-address',
      dropdown: false,
      setValue: value => {
        setEmail(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!email && isEmailValid(email);
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseEnterValidEmail'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('phoneNumber'),
      placeholder: I18n.t('phoneNumber'),
      value: phoneNumber,
      keyboardType: 'number-pad',
      dropdown: false,
      setValue: value => {
        setPhoneNumber(filterStringByNumber(value));
      },
      leftComponent: renderCountryCodePicker(false),
      validation: () => {
        let isValid = !!phoneNumber;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseEnterValidPhoneNumber'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('whatsAppNumberOpt'),
      placeholder: I18n.t('phoneNumber'),
      value: whatsAppNumber,
      keyboardType: 'number-pad',
      dropdown: false,
      setValue: value => {
        setWhatsAppNumber(filterStringByNumber(value));
      },
      leftComponent: renderCountryCodePicker(true),
      validation: () => {
        return true;
      },
    },
  ];

  const LOCAL_INFO = [
    {
      title: I18n.t('addressOpt'),
      placeholder: I18n.t('addressInEnglish'),
      value: addressEnglish,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setAddressEnglish(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('addressOpt'),
      placeholder: I18n.t('addressInArabic'),
      value: addressArabic,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setAddressArabic(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('spaceOpt'),
      placeholder: I18n.t('squareMeters'),
      value: space,
      keyboardType: 'number-pad',
      dropdown: false,
      setValue: value => {
        setSpace(filterStringByNumber(value));
      },
      leftComponent: null,
    },
    {
      title: I18n.t('spaceRentOpt'),
      placeholder: I18n.t('amount'),
      value: spaceRent,
      keyboardType: 'number-pad',
      dropdown: false,
      setValue: value => {
        setSpaceRent(filterStringByNumber(value));
      },
      leftComponent: null,
    },
  ];

  const SOCIAL_INFO = [
    {
      title: I18n.t('twitterOpt'),
      placeholder: I18n.t('twitterHint'),
      value: twitter,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setTwitter(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('instagramOpt'),
      placeholder: I18n.t('instagramHint'),
      value: instagram,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setInstagram(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('faceBookOpt'),
      placeholder: I18n.t('faceBookHint'),
      value: faceBook,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setFaceBook(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('youtubeOpt'),
      placeholder: I18n.t('youtubeHint'),
      value: youtube,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setYouTube(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('websiteOpt'),
      placeholder: I18n.t('websiteHint'),
      value: webSite,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setWebsite(value);
      },
      leftComponent: null,
    },
  ];

  const ADDITIONAL_INFO = [
    {
      title: I18n.t('haveBusinessModal'),
      placeholder: I18n.t('yesOrNo'),
      value: businessModal,
      keyboardType: 'default',
      dropdown: true,
      reference: refMenuYesOrNoBusinessModal,
      rightIcon: IMAGES.dropdown,
      setValue: value => {
        setBusinessModal(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!businessModal;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseSelectBusinessModal'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('haveBrandingStrayegy'),
      placeholder: I18n.t('yesOrNo'),
      value: brandingStrategy,
      keyboardType: 'default',
      dropdown: true,
      reference: refMenuYesOrNoBranding,
      rightIcon: IMAGES.dropdown,
      setValue: value => {
        setBrandingStrategy(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!brandingStrategy;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseSelectBrandingStrategy'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('includeAFasabilityStudy'),
      placeholder: I18n.t('yesOrNo'),
      value: feasibilityStrategy,
      keyboardType: 'default',
      reference: refMenuYesOrFasibilityStudy,
      dropdown: true,
      rightIcon: IMAGES.dropdown,
      setValue: value => {
        setFeasibilityStrategy(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!feasibilityStrategy;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseSelectFeasibilityStudy'));
        }
        return isValid;
      },
    },
    {
      title: I18n.t('haveMarketing'),
      placeholder: I18n.t('yesOrNo'),
      value: marketingStrategy,
      reference: refMenuYesOrNoMarketing,
      keyboardType: 'default',
      dropdown: true,
      rightIcon: IMAGES.dropdown,
      setValue: value => {
        setMarketingStrategy(value);
      },
      leftComponent: null,
      validation: () => {
        let isValid = !!marketingStrategy;
        if (!isValid) {
          showErrorMessage(I18n.t('pleaseSelectMarketingStrategy'));
        }
        return isValid;
      },
    },
  ];

  const INVESTOR_INFO = [
    {
      title: I18n.t('investorNationality'),
      placeholder: I18n.t('investorNationalityHint'),
      value: investorNationality,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setInvestorNationality(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('investorNationality'),
      placeholder: I18n.t('investorNationalityHintArabic'),
      value: investorNationalityInArabic,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setInvestorNationalityInArabic(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('investorFieldOfExp'),
      placeholder: I18n.t('investorFieldOfExpHint'),
      value: investorFieldOfExp,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setInvestorFieldOfExp(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('investorFieldOfExp'),
      placeholder: I18n.t('investorFieldOfExpHintArabic'),
      value: investorFieldOfExpInArabic,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setInvestorFieldOfExpInArabic(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('investorCharacteristics'),
      placeholder: I18n.t('investorCharacteristicsHint'),
      value: investorCharacteristics,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setInvestorCharacteristics(value);
      },
      leftComponent: null,
    },
    {
      title: I18n.t('investorCharacteristics'),
      placeholder: I18n.t('investorCharacteristicsHintArabic'),
      value: investorCharacteristicsInArabic,
      keyboardType: 'default',
      dropdown: false,
      setValue: value => {
        setInvestorCharacteristicsInArabic(value);
      },
      leftComponent: null,
    },
  ];

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            {I18n.t('create')}{' '}
            <Text style={styles.headerTitleLight}>{I18n.t('ad')} </Text>
          </Text>
        </View>
      </View>
    );
  };

  const renderSelectCategory = () => {
    const hideMeuType = () => {
      refMenuType.current.hide();
    };

    const showMenuType = () => {
      refMenuType.current.show();
    };

    const renderMenuTypeItem = title => {
      return (
        <MenuItem
          textStyle={{...FontSize.fontRegular14}}
          onPress={() => {
            setSelectedType(I18n.t(title));
            hideMeuType();
          }}>
          {I18n.t(title)}
        </MenuItem>
      );
    };

    return (
      <View style={styles.selectCategoryContainer}>
        <TitleView
          title={I18n.t('select')}
          subTitle={I18n.t('type')}
          small={true}
        />
        <TouchableOpacity
          onPress={() => showMenuType()}
          style={[styles.roundedBg, ContainerStyles.containerRow]}>
          <Text style={styles.txtSelectType}>
            {selectType !== '' ? selectType : I18n.t('selectType')}
          </Text>
          <Image
            source={IMAGES.dropdown}
            style={styles.icon}
            resizeMode={'contain'}
          />
        </TouchableOpacity>

        <Menu
          ref={refMenuType}
          style={styles.dropDownContainer}
          textStyle={{
            ...COLORS.cornFlowerBlue,
            ...FontSize.fontRegular14,
          }}>
          {renderMenuTypeItem('sellMyBusiness')}
          {renderMenuTypeItem('sellMyBusinessIdea')}
          {renderMenuTypeItem('sellMyBusinessShares')}
        </Menu>
      </View>
    );
  };

  const renderForm = (form, title) => {
    const showTitle = (item, index) => {
      if (index === 0) {
        return true;
      } else {
        return form[index - 1].title !== item.title;
      }
    };

    const hideMeuCategory = () => {
      refMenuCategory.current.hide();
    };

    const showMenuCategory = () => {
      refMenuCategory.current.show();
    };

    const renderMenuCategoryItem = (title, id) => {
      return (
        <MenuItem
          textStyle={{...FontSize.fontRegular14}}
          onPress={() => {
            setCategory(title);
            setCategoryId(id);
            hideMeuCategory();
          }}>
          {title}
        </MenuItem>
      );
    };

    const renderMenuCategory = () => {
      return (
        <Menu
          ref={refMenuCategory}
          style={styles.dropDownContainerInform}
          textStyle={{
            ...COLORS.cornFlowerBlue,
            ...FontSize.fontRegular14,
          }}>
          {categories.map(category =>
            renderMenuCategoryItem(
              category.category_name,
              category.category_id,
            ),
          )}
        </Menu>
      );
    };

    const hideMenuYesOrNo = referance => {
      referance.current.hide();
    };

    const showMenuYesOrNo = referance => {
      referance.current.show();
    };

    const renderMenuYesNo = item => {
      return (
        <Menu
          ref={item.reference}
          style={styles.dropDownContainerInform}
          textStyle={{
            ...COLORS.cornFlowerBlue,
            ...FontSize.fontRegular14,
          }}>
          <MenuItem
            textStyle={{...FontSize.fontRegular14}}
            onPress={() => {
              item.setValue(I18n.t('yes'));
              hideMenuYesOrNo(item.reference);
            }}>
            {I18n.t('yes')}
          </MenuItem>
          <MenuItem
            textStyle={{...FontSize.fontRegular14}}
            onPress={() => {
              item.setValue(I18n.t('no'));
              hideMenuYesOrNo(item.reference);
            }}>
            {I18n.t('no')}
          </MenuItem>
        </Menu>
      );
    };

    const handleOnPress = (placeholder, item) => {
      if (placeholder === I18n.t('selectCategory')) {
        if (categories.length > 0) {
          showMenuCategory();
        } else {
          apiCallGetCategories(() => {
            setTimeout(() => {
              showMenuCategory();
            }, 1000);
          });
        }
      }
      if (placeholder === I18n.t('yesOrNo')) {
        showMenuYesOrNo(item.reference);
      }
      if (placeholder === I18n.t('originCountry')) {
        setShowCountryPicker(true);
      }
      if (placeholder === I18n.t('attachImages')) {
        ImagePickerHelper.pickImage(data => {
          console.log(JSON.stringify(data));
          let filename = data.uri.substring(data.uri.lastIndexOf('/') + 1);
          setAttachImage(filename);
          setAttachImageUri(data.uri);
        }).then(r => {});
      }
      if (placeholder === I18n.t('attachImages2')) {
        ImagePickerHelper.pickImage(data => {
          console.log(JSON.stringify(data));
          let filename = data.uri.substring(data.uri.lastIndexOf('/') + 1);
          setAttachImage2(filename);
          setAttachImageUri2(data.uri);
        }).then(r => {});
      }
      if (placeholder === I18n.t('attachImages3')) {
        ImagePickerHelper.pickImage(data => {
          console.log(JSON.stringify(data));
          let filename = data.uri.substring(data.uri.lastIndexOf('/') + 1);
          setAttachImage3(filename);
          setAttachImageUri3(data.uri);
        }).then(r => {});
      }
    };

    const renderFormItem = (item, index) => {
      let isVisible = item.isVisible ?? true;
      if (!isVisible) {
        return <View />;
      }
      return (
        <View style={MarginStyle.mB16}>
          {showTitle(item, index) ? (
            <Text style={styles.title}>{item.title}</Text>
          ) : null}

          <TouchableOpacity
            disabled={!item.dropdown}
            onPress={() => {
              handleOnPress(item.placeholder, item);
            }}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: COLORS.gray_border,
                borderBottomWidth: 1,
              }}>
              {/*<FloatingTextInput*/}
              {/*  onChange={value => {*/}
              {/*    item.setValue(value);*/}
              {/*  }}*/}
              {/*  multiLine={item.multiLine ?? false}*/}
              {/*  hintColor={COLORS.gray_hint_light}*/}
              {/*  leftComponent={item.leftComponent}*/}
              {/*  secret={item.secret}*/}
              {/*  value={item.value}*/}
              {/*  limit={item.limit}*/}
              {/*  keyboardType={item.keyboardType}*/}
              {/*  placeholder={item.placeholder}*/}
              {/*  rightIcon={item.rightIcon}*/}
              {/*/>*/}
              <TextInput
                style={{
                  ...FontSize.fontRegular14,
                  ...MarginStyle.mx8,
                  flex: 1,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                }}
                multiline={item.multiLine ?? false}
                placeholderTextColor={COLORS.gray_hint_light}
                secureTextEntry={item.secret}
                value={item.value}
                onChangeText={value => item.setValue(value)}
                maxLength={item.limit ?? Number.MAX_VALUE}
                keyboardType={item.keyboardType}
                placeholder={item.placeholder}
              />
              {item.rightIcon && (
                <Image
                  source={item.rightIcon}
                  resizeMode={'contain'}
                  style={{width: 15, height: 15, alignSelf: 'center'}}
                />
              )}
            </View>

            {item.placeholder === I18n.t('yesOrNo')
              ? renderMenuYesNo(item)
              : null}
            {item.dropdown ? (
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'transparent',
                }}
              />
            ) : null}
          </TouchableOpacity>
          {item.title === I18n.t('selectCategory') && categories.length > 0
            ? renderMenuCategory()
            : null}
        </View>
      );
    };

    return (
      <View style={styles.fillInfoContainer}>
        <TitleView
          title={I18n.t(title)}
          subTitle={I18n.t('information')}
          small={true}
        />
        <View style={styles.roundedBg}>
          {form.map((item, index) => renderFormItem(item, index))}
          {form === CONTACT_INFO ? (
            <Checkbox
              title={I18n.t('createAdCheckBox')}
              isSelected={isCheckedContactInfo}
              onCheckedChange={() => setCheckContactInfo(!isCheckedContactInfo)}
            />
          ) : null}
        </View>
      </View>
    );
  };

  const validateForm = form => {
    let isValid = true;
    for (let i = 0; i < form.length; i++) {
      let item = form[i];
      let isVisible = item.isVisible ?? true;
      if (isVisible) {
        if (!item.validation()) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  };

  const handleOnSubmitPress = async () => {
    let valid = true;
    let validMainInfo = await validateForm(FILL_INFO);
    if (validMainInfo) {
      let validContactInfo = await validateForm(CONTACT_INFO);
      if (validContactInfo) {
        if (selectType === I18n.t('sellMyBusinessIdea')) {
          let validAdditionalInfo = await validateForm(ADDITIONAL_INFO);
          if (validAdditionalInfo) {
          } else {
            valid = false;
          }
        } else {
          valid = true;
        }
      } else {
        valid = false;
      }
    } else {
      valid = false;
    }

    if (!valid) {
      return;
    }

    let postTypeId =
      selectType === I18n.t('sellMyBusiness')
        ? 1
        : selectType === I18n.t('sellMyBusinessIdea')
        ? 2
        : 3;

    apiCall(
      createAds(
        postTypeId,
        categoryId,
        titleInEnglish,
        titleInArabic,
        businessNameEnglish,
        businessNameArabic,
        establishmentYear,
        sellingPrice,
        descriptionEnglish,
        descriptionArabic,
        countryId,
        email,
        countryCodePhoneNumber,
        phoneNumber,
        countryCodeWhatsAppNumber,
        whatsAppNumber,
        isCheckedContactInfo ? 1 : 0,
        licensed === I18n.t('yes') ? 1 : 0,
        noOfStaff,
        addressEnglish,
        addressArabic,
        space,
        spaceRent,
        twitter,
        instagram,
        faceBook,
        youtube,
        webSite,
        investmentPercentage,
        investorNationality,
        investorNationalityInArabic,
        investorFieldOfExp,
        investorFieldOfExpInArabic,
        investorCharacteristics,
        investorCharacteristicsInArabic,
        attachImageUri,
        attachImageUri2,
        attachImageUri3,
        businessModal === I18n.t('yes') ? 1 : 0,
        brandingStrategy === I18n.t('yes') ? 1 : 0,
        feasibilityStrategy === I18n.t('yes') ? 1 : 0,
        marketingStrategy === I18n.t('yes') ? 1 : 0,
      ),
      (data, message) => {
        if (data) {
          clearState();
          showSuccessMessage(message);
        } else {
          console.log(message);
          showErrorMessage(message);
        }
      },
      true,
    );
  };

  return (
    <Screen useScroll={true}>
      <View style={styles.container}>
        {renderHeader()}
        <View style={[GlobalStyles.footerContainerLightSmallRadius]}>
          {renderSelectCategory()}
          {selectType ? (
            <View>
              {renderForm(FILL_INFO, 'main')}
              {renderForm(CONTACT_INFO, 'contact')}
              {selectType === I18n.t('sellMyBusiness')
                ? renderForm(LOCAL_INFO, 'local')
                : null}
              {selectType === I18n.t('sellMyBusinessShares')
                ? renderForm(INVESTOR_INFO, 'investor')
                : null}

              {selectType !== I18n.t('sellMyBusinessIdea')
                ? renderForm(SOCIAL_INFO, 'social')
                : renderForm(ADDITIONAL_INFO, 'additional')}
              <View style={styles.spaceH16} />
              <Button
                title={I18n.t('continue')}
                buttonStyle={{marginHorizontal: 16}}
                onPress={() => handleOnSubmitPress()}
                dark={true}
              />
              <View style={styles.spaceH16} />
            </View>
          ) : null}
        </View>
        <NationalitySelectionPopup
          limited={showCountyPicker}
          countryOrigin={true}
          showModal={
            showCountyCodePickerPhone ||
            showCountyCodePickerWhatsApp ||
            showCountyPicker
          }
          onSelect={data => {
            if (showCountyPicker) {
              setCountry(data.country_name);
              setCountryId(data.country_id);
            }
            if (showCountyCodePickerPhone) {
              setCountryCodePhoneNumber(data.country_phonecode);
            }
            if (showCountyCodePickerWhatsApp) {
              setCountryCodeWhatsAppNumber(data.country_phonecode);
            }
          }}
          hideModal={() => {
            if (showCountyPicker) {
              setShowCountryPicker(false);
            }
            if (showCountyCodePickerPhone) {
              setShowCountyCodePickerPhone(false);
            }
            if (showCountyCodePickerWhatsApp) {
              setShowCountyCodePickerWhatsApp(false);
            }
          }}
        />
      </View>
    </Screen>
  );
};

export default CreateAdd;

const styles = StyleSheet.create({
  container: {
    ...ContainerStyles.container,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    ...ContainerStyles.containerRow,
    ...MarginStyle.my32,
    ...MarginStyle.mx24,
    flexDirection: 'row-reverse',
  },
  headerTitle: {
    ...LayoutGravity.center,
    ...FontColor.colorWhite,
    ...Gravity.center,
    ...LayoutGravity.centerX,
    fontSize: 25,
    fontFamily: FONTS.extra_light,
  },
  headerTitleLight: {
    fontFamily: FONTS.regular,
  },
  roundedBg: {
    backgroundColor: COLORS.white,
    minHeight: 48,
    borderRadius: 20,
    ...Shadow.dropShadow,
    ...MarginStyle.mT16,
    ...MarginStyle.mx16,
    ...PaddingStyle.px16,
    ...PaddingStyle.py16,
  },
  selectCategoryContainer: {
    ...Gravity.center,
    ...MarginStyle.mT16,
  },
  txtSelectType: {
    ...FontColor.colorBlack,
    ...FontSize.fontRegular14,
    flex: 1,
  },
  icon: {
    width: 14,
    height: 14,
    alignSelf: 'center',
  },
  dropDownContainer: {
    width: '85%',
    alignSelf: 'center',
    ...MarginStyle.mL16,
    ...MarginStyle.mT16,
    borderRadius: 12,
  },
  dropDownContainerInform: {
    width: '85%',
    ...MarginStyle.mT8,
    borderRadius: 12,
    alignSelf: 'center',
  },
  fillInfoContainer: {
    ...Gravity.center,
    ...MarginStyle.mT24,
  },
  title: {
    ...FontSize.fontRegular14,
    marginLeft: 12,
  },
  spaceH16: {
    height: 16,
  },
});
