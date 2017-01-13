import Telescope from 'meteor/nova:lib';
import Users from 'meteor/nova:users';
import Upload from 'meteor/xavcz:nova-forms-upload';
import CvUpload from 'meteor/cityhive:cv-upload';
import PublicationUtils from 'meteor/utilities:smart-publications';

// check if user can create a new post
const canInsert = user => Users.canDo(user, "posts.new");
// check if user can edit a post
const canEdit = Users.canEdit;

// remove fields
Users.removeField('telescope.notifications_users');
Users.removeField('telescope.notifications_posts');
Users.removeField('telescope.bio');

const professionalGroup = {
  name: "professional",
  label: "Edit your professional details",
  order: 1
};

const qualificationsGroup = {
  name: "qualifications",
  label: "Edit your qualifications",
  order: 2
};

const extraDetailsGroup = {
  name: "extraDetails",
  label: "Edit your extra details",
  order: 3
};

// years range

let currentYear = new Date().getFullYear(),
  years = [],
  startYear = 1950;

years.push({
  label: '--- please choose ---',
  value: ''
});

while ( startYear <= currentYear ) {
  let year = startYear++;
  years.push({label: year, value: year});
}

// add new fields

Users.addField(
  [
    {// Field required by mizzao:user-status
      fieldName: 'status',
      fieldSchema: {
        type: Object,
        blackbox: true,
        publish: true,
        optional: true
      }
    },
    {
      fieldName: 'profile',
      fieldSchema: {
        type: Object,
        optional: true,
        blackbox: false
      }
    },
    {
      fieldName: 'profile.image',
      fieldSchema: {
        type: String,
        optional: true,
        publish: true,
        control: Upload,
        insertableIf: canInsert,
        editableIf: canEdit,
        autoform: {
          options: {
            preset: Telescope.settings.get('cloudinaryPresets').avatar
          }
        }
      }
    },
    {
      fieldName: 'profile.title',
      fieldSchema: {
        type: String,
        control: "select",
        optional: false,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        autoform: {
          options: [
            {
              label: '--- please choose ---',
              value: ''
            },
            {
              label: 'Miss',
              value: 'miss'
            },
            {
              label: 'Mrs',
              value: 'mrs'
            },
            {
              label: 'Ms',
              value: 'ms'
            },
            {
              label: 'Mr',
              value: 'mr'
            },
          ]
        },
      }
    },
    {
      fieldName: 'profile.firstName',
      fieldSchema: {
        type: String,
        control: "text",
        optional: false,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.lastName',
      fieldSchema: {
        type: String,
        control: "text",
        optional: false,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.personalEmail',
      fieldSchema: {
        type: String,
        optional: true,
        regEx: SimpleSchema.RegEx.Email,
        insertableIf: canInsert,
        editableIf: canEdit
      }
    },
    {
      fieldName: 'profile.mobileNumber',
      fieldSchema: {
        type: String,
        control: "text",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.basedIn',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        autoform: {
          options: countriesOptions()
        },
      }
    },
    {
      fieldName: 'profile.bio',
      fieldSchema: {
        type: String,
        control: "textarea",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
      }
    },
    {
      fieldName: 'profile.department',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        autoform: {
          options: [
            {
              label: '--- please choose ---',
              value: ''
            },
            {
              label: 'Finance',
              value: 'finance'
            },
            {
              label: 'Human Resources',
              value: 'human-resources'
            },
            {
              label: 'Management',
              value: 'management'
            },
            {
              label: 'Legal',
              value: 'legal'
            },
            {
              label: 'Marketing & Product Strategy',
              value: 'marketing-product-strategy'
            },
            {
              label: 'Operations & IT',
              value: 'operations-it'
            },
            {
              label: 'Risk & Compliance',
              value: 'risk-compliance'
            },
            {
              label: 'Sales & Distribution',
              value: 'sales-distribution'
            },
            {
              label: 'Other',
              value: 'other'
            },
          ]
        },
      }
    },
    {
      fieldName: 'profile.yearStarted',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        autoform: {
          options: years
        },
      }
    },
    {
      fieldName: 'profile.jobTitle',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
      }
    },
    {
      fieldName: 'profile.firm',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
      }
    },
    {
      fieldName: 'profile.profession',
      fieldSchema: {
        type: String,
        control: "select",
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: professionalGroup,
        autoform: {
          options: [
            {
              label: '--- please choose ---',
              value: ''
            },
            {
              label: 'Asset Management',
              value: 'asset-management'
            },
            {
              label: 'Investment Management',
              value: 'investment-management'
            },
            {
              label: 'Private Banking',
              value: 'private-banking'
            },
            {
              label: 'Wealth Management',
              value: 'wealth-management'
            },
            {
              label: 'Other',
              value: 'other'
            },
          ]
        },
      }
    },
    {
      fieldName: 'profile.professionalQualifications',
      fieldSchema: {
        type: [String],
        control: "checkboxgroup",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: qualificationsGroup,
        autoform: {
          options: [
            {
              label: 'CFA',
              value: 'cfa'
            },
            {
              label: 'CAIA',
              value: 'caia'
            },
            {
              label: 'CISI',
              value: 'cisi'
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.maritalStatus',
      fieldSchema: {
        type: String,
        control: "radiogroup",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        autoform: {
          options: [
            {
              label: 'Single',
              value: 'single'
            },
            {
              label: 'Married',
              value: 'married'
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.children',
      fieldSchema: {
        type: String,
        control: "radiogroup",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        autoform: {
          options: [
            {
              label: 'No',
              value: 'no'
            },
            {
              label: 'Yes',
              value: 'yes'
            }
          ]
        },
      }
    },
    {
      fieldName: 'profile.pets',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        autoform: {
          options: [
            {
              label: '--- please choose ---',
              value: ''
            },
            {
              label: 'Dogs',
              value: 'dogs'
            },
            {
              label: 'Cats',
              value: 'cats'
            },
            {
              label: 'Small furry',
              value: 'small-furry'
            },
            {
              label: 'Horse',
              value: 'horse'
            },
            {
              label: 'Feathered',
              value: 'feathered'
            },
            {
              label: 'Aquatic',
              value: 'aquatic'
            },
            {
              label: 'Reptile',
              value: 'reptila'
            },
            {
              label: 'Other',
              value: 'other'
            },
            {
              label: 'None',
              value: 'none'
            },
          ]
        },
      }
    },
    {
      fieldName: 'profile.languages',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
        autoform: {
          options: languagesOptions()
        }
      }
    },
    {
      fieldName: 'profile.hobbies',
      fieldSchema: {
        type: String,
        control: "text",
        optional: true,
        insertableIf: canInsert,
        editableIf: canEdit,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'profile.favMovie',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'profile.favBook',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'profile.favMusician',
      fieldSchema: {
        type: String,
        control: "text",
        insertableIf: canInsert,
        editableIf: canEdit,
        optional: true,
        publish: true,
        group: extraDetailsGroup,
      }
    },
    {
      fieldName: 'cityhive.privacyVisibility',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        autoform: {
          options: [
            {
              label: 'Show full profile',
              value: 'show-full-profile'
            },
            {
              label: 'Show full profile only to those I’m following',
              value: 'show-full-profile-only-to-following'
            },
          ]
        },
      }
    },
    {
      fieldName: 'cityhive.privacyNotifications',
      fieldSchema: {
        type: String,
        control: "select",
        optional: true,
        autoform: {
          options: [
            {
              label: 'Do not email me',
              value: 'none'
            },
            {
              label: 'Send Notifications',
              value: 'send-notifications'
            },
          ]
        },
      }
    },
  ]

);

PublicationUtils.addToFields(Users.publishedFields.list, [
  'status',
  'profile.cv',
  'profile.image',
  'profile.firstName',
  'profile.lastName',
  'profile.personalEmail',
  'profile.profession',
  'profile.jobTitle',
  'profile.yearStarted',
  'profile.mobileNumber',
  'profile.education',
  'profile.department',
  'profile.professionalQualifications',
  'profile.languages',
]);

function languagesOptions() {
  const array = [
    'English',
    'Afrikaans',
    'Albanian',
    'Arabic',
    'Armenian',
    'Basque',
    'Bengali',
    'Bulgarian',
    'Catalan',
    'Cambodian',
    'Chinese (Mandarin)',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'Estonian',
    'Fiji',
    'Finnish',
    'French',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Hebrew',
    'Hindi',
    'Hungarian',
    'Icelandic',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Korean',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Macedonian',
    'Malay',
    'Malayalam',
    'Maltese',
    'Maori',
    'Marathi',
    'Mongolian',
    'Nepali',
    'Norwegian',
    'Persian',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Quechua',
    'Romanian',
    'Russian',
    'Samoan',
    'Serbian',
    'Slovak',
    'Slovenian',
    'Spanish',
    'Swahili',
    'Swedish',
    'Tagalog',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Tibetan',
    'Tonga',
    'Turkish',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Xhosa',
    'Other',
  ];

  let elements = [];

  elements.push({
    label: '--- please choose ---',
    value: ''
  });

  array.forEach((language) => {
    let slug = language.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
      ;
    elements.push({
      label: language,
      value: slug
    });
  });

  return elements;
}

function countriesOptions() {
  const array = [
    'UNITED KINGDOM',
    'AFGHANISTAN',
    'ÅLAND ISLANDS',
    'ALBANIA',
    'ALGERIA',
    'AMERICAN SAMOA',
    'ANDORRA',
    'ANGOLA',
    'ANGUILLA',
    'ANTARCTICA',
    'ANTIGUA AND BARBUDA',
    'ARGENTINA',
    'ARMENIA',
    'ARUBA',
    'AUSTRALIA',
    'AUSTRIA',
    'AZERBAIJAN',
    'BAHAMAS',
    'BAHRAIN',
    'BANGLADESH',
    'BARBADOS',
    'BELARUS',
    'BELGIUM',
    'BELIZE',
    'BENIN',
    'BERMUDA',
    'BHUTAN',
    'BOLIVIA, PLURINATIONAL STATE OF',
    'BONAIRE, SINT EUSTATIUS AND SABA',
    'BOSNIA AND HERZEGOVINA',
    'BOTSWANA',
    'BOUVET ISLAND',
    'BRAZIL',
    'BRITISH INDIAN OCEAN TERRITORY',
    'BRUNEI DARUSSALAM',
    'BULGARIA',
    'BURKINA FASO',
    'BURUNDI',
    'CAMBODIA',
    'CAMEROON',
    'CANADA',
    'CAPE VERDE',
    'CAYMAN ISLANDS',
    'CENTRAL AFRICAN REPUBLIC',
    'CHAD',
    'CHILE',
    'CHINA',
    'CHRISTMAS ISLAND',
    'COCOS (KEELING) ISLANDS',
    'COLOMBIA',
    'COMOROS',
    'CONGO',
    'CONGO, THE DEMOCRATIC REPUBLIC OF THE',
    'COOK ISLANDS',
    'COSTA RICA',
    'CÔTE D\'IVOIRE',
    'CROATIA',
    'CUBA',
    'CURAÇAO',
    'CYPRUS',
    'CZECH REPUBLIC',
    'DENMARK',
    'DJIBOUTI',
    'DOMINICA',
    'DOMINICAN REPUBLIC',
    'ECUADOR',
    'EGYPT',
    'EL SALVADOR',
    'EQUATORIAL GUINEA',
    'ERITREA',
    'ESTONIA',
    'ETHIOPIA',
    'FALKLAND ISLANDS (MALVINAS)',
    'FAROE ISLANDS',
    'FIJI',
    'FINLAND',
    'FRANCE',
    'FRENCH GUIANA',
    'FRENCH POLYNESIA',
    'FRENCH SOUTHERN TERRITORIES',
    'GABON',
    'GAMBIA',
    'GEORGIA',
    'GERMANY',
    'GHANA',
    'GIBRALTAR',
    'GREECE',
    'GREENLAND',
    'GRENADA',
    'GUADELOUPE',
    'GUAM',
    'GUATEMALA',
    'GUERNSEY',
    'GUINEA',
    'GUINEA-BISSAU',
    'GUYANA',
    'HAITI',
    'HEARD ISLAND AND MCDONALD ISLANDS',
    'HOLY SEE (VATICAN CITY STATE)',
    'HONDURAS',
    'HONG KONG',
    'HUNGARY',
    'ICELAND',
    'INDIA',
    'INDONESIA',
    'IRAN, ISLAMIC REPUBLIC OF',
    'IRAQ',
    'IRELAND',
    'ISLE OF MAN',
    'ISRAEL',
    'ITALY',
    'JAMAICA',
    'JAPAN',
    'JERSEY',
    'JORDAN',
    'KAZAKHSTAN',
    'KENYA',
    'KIRIBATI',
    'KOREA, DEMOCRATIC PEOPLE\'S REPUBLIC OF',
    'KOREA, REPUBLIC OF',
    'KUWAIT',
    'KYRGYZSTAN',
    'LAO PEOPLE\'S DEMOCRATIC REPUBLIC',
    'LATVIA',
    'LEBANON',
    'LESOTHO',
    'LIBERIA',
    'LIBYA',
    'LIECHTENSTEIN',
    'LITHUANIA',
    'LUXEMBOURG',
    'MACAO',
    'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
    'MADAGASCAR',
    'MALAWI',
    'MALAYSIA',
    'MALDIVES',
    'MALI',
    'MALTA',
    'MARSHALL ISLANDS',
    'MARTINIQUE',
    'MAURITANIA',
    'MAURITIUS',
    'MAYOTTE',
    'MEXICO',
    'MICRONESIA, FEDERATED STATES OF',
    'MOLDOVA, REPUBLIC OF',
    'MONACO',
    'MONGOLIA',
    'MONTENEGRO',
    'MONTSERRAT',
    'MOROCCO',
    'MOZAMBIQUE',
    'MYANMAR',
    'NAMIBIA',
    'NAURU',
    'NEPAL',
    'NETHERLANDS',
    'NEW CALEDONIA',
    'NEW ZEALAND',
    'NICARAGUA',
    'NIGER',
    'NIGERIA',
    'NIUE',
    'NORFOLK ISLAND',
    'NORTHERN MARIANA ISLANDS',
    'NORWAY',
    'OMAN',
    'PAKISTAN',
    'PALAU',
    'PALESTINE, STATE OF',
    'PANAMA',
    'PAPUA NEW GUINEA',
    'PARAGUAY',
    'PERU',
    'PHILIPPINES',
    'PITCAIRN',
    'POLAND',
    'PORTUGAL',
    'PUERTO RICO',
    'QATAR',
    'RÉUNION',
    'ROMANIA',
    'RUSSIAN FEDERATION',
    'RWANDA',
    'SAINT BARTHÉLEMY',
    'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA',
    'SAINT KITTS AND NEVIS',
    'SAINT LUCIA',
    'SAINT MARTIN (FRENCH PART)',
    'SAINT PIERRE AND MIQUELON',
    'SAINT VINCENT AND THE GRENADINES',
    'SAMOA',
    'SAN MARINO',
    'SAO TOME AND PRINCIPE',
    'SAUDI ARABIA',
    'SENEGAL',
    'SERBIA',
    'SEYCHELLES',
    'SIERRA LEONE',
    'SINGAPORE',
    'SINT MAARTEN (DUTCH PART)',
    'SLOVAKIA',
    'SLOVENIA',
    'SOLOMON ISLANDS',
    'SOMALIA',
    'SOUTH AFRICA',
    'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS',
    'SOUTH SUDAN',
    'SPAIN',
    'SRI LANKA',
    'SUDAN',
    'SURINAME',
    'SVALBARD AND JAN MAYEN',
    'SWAZILAND',
    'SWEDEN',
    'SWITZERLAND',
    'SYRIAN ARAB REPUBLIC',
    'TAIWAN, PROVINCE OF CHINA',
    'TAJIKISTAN',
    'TANZANIA, UNITED REPUBLIC OF',
    'THAILAND',
    'TIMOR-LESTE',
    'TOGO',
    'TOKELAU',
    'TONGA',
    'TRINIDAD AND TOBAGO',
    'TUNISIA',
    'TURKEY',
    'TURKMENISTAN',
    'TURKS AND CAICOS ISLANDS',
    'TUVALU',
    'UGANDA',
    'UKRAINE',
    'UNITED ARAB EMIRATES',
    'UNITED STATES',
    'UNITED STATES MINOR OUTLYING ISLANDS',
    'URUGUAY',
    'UZBEKISTAN',
    'VANUATU',
    'VENEZUELA, BOLIVARIAN REPUBLIC OF',
    'VIETNAM',
    'VIRGIN ISLANDS, BRITISH',
    'VIRGIN ISLANDS, U.S.',
    'WALLIS AND FUTUNA',
    'WESTERN SAHARA',
    'YEMEN',
    'ZAMBIA',
    'ZIMBABWE',
  ];

  let elements = [];

  elements.push({
    label: '--- please choose ---',
    value: ''
  });

  array.forEach((country) => {
    let slug = country.toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
      ;
    elements.push({
      label: country,
      value: slug
    });
  });

  return elements;
}
