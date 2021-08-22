import I18n from 'react-native-i18n';
import {I18nManager} from 'react-native';
I18n.fallBacks = true;

I18n.translations = {
  en: {
    welcome: 'Welcome',
    welcomeMessage:
      'Welcome to Build Fortune, A platform for buying, selling businesses and business shares.',
    getStarted: 'Get Started >',
    signin: 'Signin',
    signInToContinue: 'Sign in to continue',
    emailId: 'Email ID',
    password: 'Password',
    rememberMe: 'Remember Me',
    login: 'Login',
    forgotPassword: 'Forgot Password',
    doNotHaveAccount: "Don't have an account?",
    signUp: 'Sign Up',
    phoneNumber: 'Phone Number',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    nationality: 'Nationality',
    gender: 'Gender',
    dateOfBirth: 'Date of Birth',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    register: 'Register',
    createAnewAccount: 'Create a new account.',
    acceptTerms1: 'I accept the',
    acceptTerms2: 'terms & conditions',
    acceptTerms3: 'and',
    acceptTerms4: 'privacy policy',
    acceptTerms5: 'of Build Fortune.',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    forgotPasswordQue: 'Forgot Password?',
    forgotPasswordMsg: 'Enter your email address to request a password reset.',
    sendLink: 'Send Link',
    selectPreferredLanguage: 'Select Your Preferred Language',
    selectNationality:
      'Select country where you would like to buy or sell a business?',
    selectBusinessStrategy: 'Would you like to buy or sell a business?',
    justAViewer: 'Just a viewer',
    buyABusiness: 'Buy a business',
    sellMyBusiness: 'Sell my business',
    sellMyBusinessIdea: 'Sell my business idea',
    sellMyBusinessShares: 'Sell shares of my business',
    usa: 'USA',
    uk: 'UK',
    uae: 'UAE',
    kuwait: 'Kuwait',
    qatar: 'Qatar',
    turkey: 'Turkey',
    india: 'India',
    egypt: 'Egypt',
    lebanon: 'Lebanon',
    selectIndustry:
      'The business industry which you want to buy your business?',
    foodAndBaveraged: 'Food & Beverages Business',
    technologyBusiness: 'Technology Business',
    healthFacilitiesBusiness: 'Health Facilities Business',
    viewAll: 'View all',
    viewDetails: 'View Details >',
    business: 'Business',
    details: 'Details',
    searchYourNeeds: 'Search for a business',
    history: 'History',
    keywords: 'Keywords',
    trending: 'Trending',
    ads: 'Ads',
    categories: 'Categories',
    top: 'Top',
    create: 'Create',
    ad: 'Ad',
    select: 'Select',
    category: 'Category',
    main: 'Main',
    information: 'Information',
    selectCategory: 'Select Category',
    title: 'Title',
    titleInEnglish: 'Title in English',
    titleInArabic: 'Title in Arabic',
    businessNameOpt: 'Business Name (Optional)',
    businessNameInEnglish: 'Business name in English',
    businessNameInArabic: 'Business name in Arabic',
    establishmentYear: 'Establishment Year',
    year: 'Year',
    licensedOpt: 'Licensed (Optional)',
    yesOrNo: 'Yes/No',
    sellingPrice: 'Selling Price',
    yourSellingPrice: 'Your selling price',
    description: 'Description',
    aboutYourBusinessInEnglish: 'About your business in English',
    aboutYourBusinessInArabic: 'About your business in Arabic',
    imageTitle: 'Image 1*',
    attachImages: 'Attach images',
    country: 'Country',
    originCountry: 'Origin Country',
    contact: 'Contact',
    emailAddress: 'Email Address',
    yourEmailAddress: 'Your email address',
    whatsAppNumberOpt: 'Whatsapp Number (Optional)',
    addressOpt: 'Address (Optional)',
    addressInEnglish: 'Address in English',
    addressInArabic: 'Address in Arabic',
    spaceOpt: 'Space (Optional)',
    amount: 'Amount',
    spaceRentOpt: 'Space Rent (Optional)',
    social: 'Social',
    twitterOpt: 'Twitter (Optional)',
    instagramOpt: 'Instagram (Optional)',
    faceBookOpt: 'Facebook (Optional)',
    youtubeOpt: 'Youtube (Optional)',
    websiteOpt: 'Website (Optional)',
    twitterHint: 'https://twitter.com/...',
    instagramHint: 'https://instagram.com/...',
    faceBookHint: 'https://facebook.com/...',
    youtubeHint: 'https://youtube.com/...',
    websiteHint: 'https://websitename.com/',
    createAdCheckBox:
      'If clicked, your contact information will be displayed to subscribers ONLY, but it may reduce the number of interactions with post.',
    continue: 'Continue',
    my: 'My',
    notifications: 'Notifications',
    today: 'Today',
    clearAll: 'Clear All',
    this: 'This',
    week: 'Week',
    profile: 'Profile',
    general: 'General',
    profileSetting: 'Profile Settings',
    modifyYourProfile: 'Modify Your Profile',
    privacy: 'Privacy',
    changeYourPassword: 'Change your password',
    myAds: 'My Ads',
    listOfYourAds: 'List of your ads',
    setting: 'Settings',
    personalizePreferences: 'Personalize your preferences',
    aboutUs: 'About Us',
    knowAboutUs: 'Know about us',
    privacyPolicy: 'Privacy Policy',
    checkOurPolicy: 'Check our policy',
    termsAndConditions: 'Terms & Conditions',
    readTandC: 'Read our terms and conditions',
    contactUs: 'Contact Us',
    solveYourQueries: 'Send us your queries',
    signOut: 'Sign out',
    logoutOrSwitchAccount: 'Logout your account',
    support: 'Support',
    settings: 'Settings',
    saveChanges: 'Save Changes',
    reset: 'Reset',
    resetPasswordMessage:
      'You can directly change your password by filling out below fields.',
    currentPassword: 'Current Password',
    changePassword: 'Change Password',
    preferences: 'Preferences',
    language: 'Language',
    pushAlert: 'Push Notifications',
    getPushNotificationOnAlert: 'Get push notifications on alerts',
    smsAlert: 'SMS Alert',
    getSmsNotificationOnAlert: 'Get SMS notification on alerts',
    skip: 'Skip',
    validMessageEmptyEmail: 'Please enter your email address',
    validMessageValidEmail: 'Please enter a valid email address',
    validMessageEmptyPassword: 'Please enter your password',
    sureWantToLogout: 'Sure you want to sign out?',
    cancel: 'Cancel',
    pleaseSelectCountryCode: 'Please select the country code',
    pleaseEnterPhoneNumber: 'Please enter your phone number',
    pleaseEnterFullName: 'Please enter your name',
    pleaseSelectNationality: 'Please select a nationality',
    pleaseSelectGender: 'Please select a gender',
    pleaseSelectDateOfBirth: 'Please select your date of birth',
    local: 'Location',
    pleaseEnterCurrentPass: 'Please enter the current password',
    pleaseEnterNewPassword: 'Please enter a new password',
    pleaseEnterConfirmPassword: 'Please confirm the new password',
    passwordDoseNotMatch: 'Password and confirm password do not match',
    noOfStaff: 'Number of staff (Optional)',
    staff: 'Staff',
    imageTitleTwo: 'Image 2 (Optional)',
    imageTitleThree: 'Image 3 (Optional)',
    attachImages2: 'Attach images 2',
    attachImages3: 'Attach images 3',
    establishmentYearOpt: 'Establishment Year (Optional)',
    haveBusinessModal: 'Does it have a business modal?',
    includeAFasabilityStudy: 'Does it include a feasibility study?',
    haveBrandingStrayegy: 'Does it have a branding strategy?',
    haveMarketing: 'Dose it have a marketing strategy?',
    additional: 'Additional',
    investmentPercentageOpt: 'Investment Percentage (Optional)',
    hintPercentage: 'Percentage',
    investor: 'Investor',
    investorNationality: 'Investor Nationality (Optional)',
    investorNationalityHint: 'Nationality in English',
    investorNationalityHintArabic: 'Nationality in Arabic',
    investorFieldOfExp: 'Investor Field of Experience (Optional)',
    investorFieldOfExpHint: 'Experience in English',
    investorFieldOfExpHintArabic: 'Experience in Arabic',
    investorCharacteristics: 'Investor Characteristics (Optional)',
    investorCharacteristicsHint: 'Characteristics in English',
    investorCharacteristicsHintArabic: 'Characteristics in Arabic',
    selectType: 'Select Type',
    yes: 'Yes',
    no: 'No',
    edit: 'Edit',
    pending: 'Pending',
    noAds: 'No Ads',
    noNotifications: 'You have no notifications',
    all: 'All',
    type: 'Type',
    allAds: 'All Ads',
    home: 'Home',
    search: 'Search',
    notice: 'Notices',
    createAdd: 'Create Ad',
    hello: 'Hello',
    pleaseSelectCategory: 'Please select a category',
    pleaseEnterTitleInEnglish: 'Please enter the English title',
    pleaseEnterTitleInArabic: 'Please enter the Arabic title',
    establishmentYearShouldBe: 'Establishment year should be 1900 to',
    pleaseEnterEstablishmentYear: 'Please enter the establishment year',
    pleaseEnterSellingPrice: 'Please enter your selling price',
    pleaseSelectImage: 'Please select an image',
    pleaseEnterDescriptionInEnglish: 'Please enter the English description',
    pleaseEnterDescriptionInArabic: 'Please enter the Arabic description',
    pleaseSelectCountry: 'Please select origin country',
    pleaseEnterValidEmail: 'Please enter a valid email address',
    pleaseEnterValidPhoneNumber: 'Please enter a valid phone number',
    pleaseSelectBusinessModal: 'Please select your business model',
    pleaseSelectBrandingStrategy: 'Please select branding strategy',
    pleaseSelectMarketingStrategy: 'Please select marketing strategy',
    pleaseSelectFeasibilityStudy: 'Please select feasibility study',
    viewContactDetails: 'View contact details',
    noAdsCountry: 'No businesses available in this country',
    translatingApplication: 'Translating Build Fortune..',
    Egypt: 'EGP',
    India: 'INR',
    Kuwait: 'KWD',
    Lebanon: 'LBP',
    Qatar: 'QAR',
    Turkey: 'TUL',
    UnitedArabEmirates: 'AED',
    UnitedKingdom: 'GBP',
    UnitedStates: 'USD',
    squareMeters: 'Square Meters',
    account: 'Account',
    comma: ',',
    adType: 'ad type',
  },
  ar: {
    welcome: 'مرحبا',
    welcomeMessage: 'مرحبا بك في بلد فورتشن، منصة بيع وشراء ومشاركة المشاريع.',
    getStarted: 'ابدأ الآن >',
    signin: 'تسجيل الدخول',
    signInToContinue: 'تسجيل الدخول للاستمرار',
    emailId: 'البريد الإلكتروني',
    password: 'كلمة السر',
    rememberMe: 'تذكرني',
    login: 'دخول',
    forgotPassword: 'نسيت كلمة السر',
    doNotHaveAccount: 'ليس لديك حساب؟',
    signUp: 'التسجيل',
    phoneNumber: 'رقم الهاتف',
    fullName: 'الاسم الكامل',
    confirmPassword: 'تأكيد كلمة السر',
    nationality: 'الجنسية',
    gender: 'الجنس',
    dateOfBirth: 'تاريخ الميلاد',
    male: 'ذكر',
    female: 'أنثى',
    other: 'آخر',
    register: 'التسجيل',
    createAnewAccount: 'إنشاء حساب جديد',
    acceptTerms1: 'أوافق على ',
    acceptTerms2: 'الشروط والأحكام',
    acceptTerms3: ' و ',
    acceptTerms4: 'سياسة الخصوصية',
    acceptTerms5: 'لمنصة بلد فورتشن.',
    alreadyHaveAccount: 'لديك حساب؟',
    signIn: 'تسجيل الدخول',
    forgotPasswordQue: 'نسيت كلمة السر؟',
    forgotPasswordMsg: 'اكتب بريدك الإلكتروني لطلب رابط تغيير كلمة السر',
    sendLink: 'إرسال الرابط',
    selectPreferredLanguage: 'حدد لغتك المفضلة',
    selectNationality: 'ما هي الدولة التي ترغب ببيع أو شراء المشروع فيها؟',
    selectBusinessStrategy: 'هل ترغب في بيع أو شراء مشروع؟',
    justAViewer: 'مشاهدة فقط',
    buyABusiness: 'شراء مشروع',
    sellMyBusiness: 'بيع مشروعي',
    sellMyBusinessIdea: 'بيع فكرة مشروعي',
    sellMyBusinessShares: 'بيع حصة من مشروعي',
    usa: 'أمريكا',
    uk: 'بريطانيا',
    uae: 'الإمارات',
    kuwait: 'الكويت',
    qatar: 'قطر',
    turkey: 'تركيا',
    india: 'الهند',
    egypt: 'مصر',
    lebanon: 'لبنان',
    selectIndustry: 'ما هو نشاط المشروع الذي ترغب في شرائه؟',
    foodAndBaveraged: 'المطاعم والمأكولات',
    technologyBusiness: 'المشاريع التقنية',
    healthFacilitiesBusiness: 'مشاريع الخدمات الصحية',
    viewAll: 'مشاهدة الكل',
    viewDetails: 'عرض التفاصيل >',
    business: 'المشروع',
    details: 'التفاصيل',
    searchYourNeeds: 'ابحث احتياجاتك',
    history: 'السجل',
    keywords: 'كلمات البحث',
    trending: 'الرائجة',
    ads: 'الإعلانات',
    categories: 'الفئات',
    top: 'الأشهر',
    create: 'إنشاء',
    ad: 'إعلان',
    select: 'اختيار',
    category: 'الفئة',
    main: 'الإعلان',
    information: 'معلومات',
    selectCategory: 'اختر الفئة',
    title: 'العنوان',
    titleInEnglish: 'العنوان بالإنجليزي',
    titleInArabic: 'العنوان بالعربي',
    businessNameOpt: 'إسم المشروع (اختياري)',
    businessNameInEnglish: 'اسم المشروع بالإنجليزي',
    businessNameInArabic: 'اسم المشروع بالعربي',
    establishmentYear: 'سنة التأسيس',
    year: 'السنة',
    licensedOpt: 'مُرخص (اختياري)',
    yesOrNo: 'نعم/لا',
    sellingPrice: 'السعر المطلوب',
    yourSellingPrice: 'سعر البيع الذي ترغب به',
    description: 'الوصف',
    aboutYourBusinessInEnglish: 'وصف مشروعك بالإنجليزي',
    aboutYourBusinessInArabic: 'وصف مشروعك بالعربي',
    imageTitle: 'صورة المشروع *',
    attachImages: 'إضافة صور',
    country: 'الدولة',
    originCountry: 'مقر المشروع',
    contact: 'طريقة الاتصال',
    emailAddress: 'البريد الإلكتروني',
    yourEmailAddress: 'عنوان بريدك الإلكتروني',
    whatsAppNumberOpt: 'رقم واتساب (اختياري)',
    addressOpt: 'العنوان (اختياري)',
    addressInEnglish: 'العنوان بالانجليزي',
    addressInArabic: 'العنوان بالعربي',
    spaceOpt: 'المساحة (اختياري)',
    amount: 'بالأرقام',
    spaceRentOpt: 'ايجار المقر (اختياري)',
    social: 'التواصل الاجتماعي',
    twitterOpt: 'تويتر (اختياري)',
    instagramOpt: 'انستاغرام (اختياري)',
    faceBookOpt: 'فيسبوك (اختياري)',
    youtubeOpt: 'يوتيوب (اختياري)',
    websiteOpt: 'الموقع (اختياري)',
    twitterHint: 'https://twitter.com/...',
    instagramHint: 'https://instagram.com/...',
    faceBookHint: 'https://facebook.com/...',
    youtubeHint: 'https://youtube.com/...',
    websiteHint: 'https://websitename.com/',
    createAdCheckBox:
      'عرض بيانات الاتصال للمشتركين فقط؟ قد يقلص هذا الاختيار من فرص التواصل معك.',
    continue: 'استمرار',
    my: 'خاصتي',
    notifications: 'التنبيهات',
    today: 'اليوم',
    clearAll: 'مسح الكل',
    this: 'هذا',
    week: 'الأسبوع',
    profile: 'حسابي',
    general: 'عام',
    profileSetting: 'إعدادات حسابي',
    modifyYourProfile: 'تعديل بياناتك',
    privacy: 'الخصوصية',
    changeYourPassword: 'تغيير كلمة السر',
    myAds: 'إعلاناتي',
    listOfYourAds: 'قائمة إعلاناتك',
    setting: 'الإعدادات',
    personalizePreferences: 'تخصيص إعداداتك',
    aboutUs: 'نبذة عنا',
    knowAboutUs: 'تعرف علينا',
    privacyPolicy: 'سياسة الخصوصية',
    checkOurPolicy: 'اطلع على سياسة الخصوصية',
    termsAndConditions: 'الشروط والأحكام',
    readTandC: 'قراءة الشروط والأحكام',
    contactUs: 'اتصل بنا',
    solveYourQueries: 'تواصل معنا',
    signOut: 'تسجيل الخروج',
    logoutOrSwitchAccount: 'تسجيل الخروج من هذا الحساب',
    support: 'المساعدة',
    settings: 'الإعدادات',
    saveChanges: 'حفظ التغييرات',
    reset: 'مسح',
    resetPasswordMessage: 'يمكنك تغيير كلمة السر مباشرة بكتابة البيانات أدناه',
    currentPassword: 'كلمة السر الحالية',
    changePassword: 'تغيير كلمة السر',
    preferences: 'التفضيلات',
    language: 'اللغة',
    pushAlert: 'التنبيه الفوري',
    getPushNotificationOnAlert: 'الحصول على التنبيهات الفورية من التطبيق',
    smsAlert: 'تنبيهات الرسائل القصيرة',
    getSmsNotificationOnAlert:
      'الحصول على التنبيهات الفورية عبر الرسائل القصسرة',
    skip: 'تخطي',
    validMessageEmptyEmail: 'الرجاء كتابة عنوان بريدك الإلكتروني',
    validMessageEmptyPassword: 'الرجاء كتابة كلمة السر',
    sureWantToLogout: 'متأكد أنك تريد تسجيل خروجك؟',
    cancel: 'إلغاء',
    pleaseSelectCountryCode: 'الرجاء اختيار المفتاح الدولي',
    pleaseEnterPhoneNumber: 'الرجاء كتابة رقم الهاتف',
    pleaseEnterFullName: 'الرجاء كتابة اسمك',
    pleaseSelectNationality: 'الرجاء اختيار جنسيتك',
    pleaseSelectGender: 'الرجاء اختيار الجنس',
    pleaseSelectDateOfBirth: 'الرجاء تحديد تاريخ الميلاد',
    local: 'موقع',
    pleaseEnterCurrentPass: 'الرجاء كتابة كلمة السر الحالية',
    pleaseEnterNewPassword: 'الرجاء كتابة كلمة السر الجديدة',
    pleaseEnterConfirmPassword: 'الرجاء كتابة تأكيد كلمة السر الجديدة',
    passwordDoseNotMatch: 'كلمة السر الجديدة وتأكيدها غير متطابقتين',
    noOfStaff: 'عدد الموظفين (اختياري)',
    staff: 'الموظفين',
    imageTitleTwo: 'صورة ثانية (اختيارية)',
    imageTitleThree: 'صورة ثالثة (اختيارية)',
    attachImages2: 'أضف صورة ثانية',
    attachImages3: 'أضف صورة ثالثة',
    haveBusinessModal: 'هل حددت مجال عمل مشروعك؟',
    includeAFasabilityStudy: 'هل لديك دراسة جدوى؟',
    haveBrandingStrayegy: 'هل لديك خطة هوية المشروع؟',
    haveMarketing: 'هل لديك خطة تسويق؟',
    additional: 'إضافية',
    investmentPercentageOpt: 'النسبة المئوية للمستثمر (اختياري)',
    hintPercentage: 'النسبة المئوية',
    investor: 'المستثمر',
    investorNationality: 'جنسية المستثمر (اختياري)',
    investorNationalityHint: 'الجنسية',
    investorFieldOfExp: 'مجال خبرة المستثمر (اختياري)',
    investorFieldOfExpHint: 'مجال الخبرة',
    investorCharacteristics: 'صفات المستثمر (اختياري)',
    investorCharacteristicsHint: 'الصفات',
    selectType: 'اختيار',
    yes: 'نعم',
    no: 'لا',
    edit: 'تعديل',
    pending: 'بالانتظار',
    noAds: 'لا يوجد إعلانات',
    noNotifications: 'لا يوجد تنبيهات',
    all: 'الكل',
    type: 'النوع',
    allAds: 'جميع المشاريع',
    home: 'الرئيسية',
    search: 'بحث',
    notice: 'تنبيهات',
    createAdd: 'إضافة إعلان',
    hello: 'مرحبا',
    pleaseSelectCategory: 'يرجى اختيار الفئة',
    pleaseEnterTitleInEnglish: 'يرجى كتابة العنوان الإنجليزي',
    pleaseEnterTitleInArabic: 'يرجى كتابة العنوان العربي',
    establishmentYearShouldBe: 'سنة التأسيس يجب أن تبدأ من 1900 إلى',
    pleaseEnterEstablishmentYear: 'يرجى كتابة سنة التأسيس',
    pleaseEnterSellingPrice: 'يرجى كتابة سعر البيع',
    pleaseSelectImage: 'يرجى اختيار صورة',
    pleaseEnterDescriptionInEnglish: 'يرجى كتابة الوصف الانجليزي',
    pleaseEnterDescriptionInArabic: 'يرجى كتابة الوصف العربي',
    pleaseSelectCountry: 'يرجى تحديد بلد المشروع',
    pleaseEnterValidEmail: 'يرجى كتابة بريد إلكتروني صحيح',
    pleaseEnterValidPhoneNumber: 'يرجى كتابة رقم هاتف صحيح',
    pleaseSelectBusinessModal: 'يرجى اختيار نشاط المشروع',
    pleaseSelectBrandingStrategy: 'الرجاء اختيار خطة هوية المشروع',
    pleaseSelectMarketingStrategy: 'الرجاء اختيار خطة التسويق',
    pleaseSelectFeasibilityStudy: 'الرجاء اختيار دراسة الجدوى',
    viewContactDetails: 'عرض بيانات الاتصال',
    noAdsCountry: 'لا يوجد مشاريع في هذه الدولة',
    translatingApplication: 'ترجمة بلد فورتشن..',
    Egypt: 'ج.م',
    India: '₹',
    Kuwait: 'د.ك',
    Lebanon: 'ل.ل',
    Qatar: 'ر.ق',
    Turkey: 'ل.ت',
    UnitedArabEmirates: 'د.إ',
    UnitedKingdom: '£',
    UnitedStates: '$',
    squareMeters: 'متر مربع',
    account: 'حسابي',
    comma: '،',
    investorNationalityHintArabic: 'جنسية المستثمر بالعربي',
    investorFieldOfExpHintArabic: 'مجال خبرة المستثمر بالعربي',
    investorCharacteristicsHintArabic: 'صفات المستثمر بالعربي',
    adType: 'نوع الإعلان',
    establishmentYearOpt: 'سنة التأسيس )اختياري(',
  },
};
export const changeAppLanguage = languageKey => {
  // i18next.changeLanguage(languageKey, data => {
  //   console.log('data AfterTranslation' + data);
  // }); // -> returns a Promise
  I18n.locale = languageKey;
};

export default I18n;
