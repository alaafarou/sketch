/**
 * Major Saudi cities & administrative centers (all 13 regions).
 * Values are stable URL-safe slugs for DB/API; use translation tables for Arabic display names.
 * For every municipality/village, prefer a DB table — this enum cannot list thousands of places.
 */
export enum CityEnum {
  // Riyadh Region
  Riyadh = 'riyadh',
  AdDilam = 'ad-dilam',
  Afif = 'afif',
  AlArtawiyah = 'al-artawiyah',
  AlDuwadimi = 'al-duwadimi',
  AlGhat = 'al-ghat',
  AlKharj = 'al-kharj',
  AlMajmah = 'al-majmah',
  AlQuwayiyah = 'al-quwayiyah',
  AshShimasiyah = 'ash-shimasiyah',
  Dhurma = 'dhurma',
  Diriyah = 'diriyah',
  HawtatBaniTamim = 'hawtat-bani-tamim',
  Huraymila = 'huraymila',
  Marat = 'marat',
  Ramah = 'ramah',
  Sedair = 'sedair',
  Zulfi = 'zulfi',

  // Makkah Region
  Makkah = 'makkah',
  Jeddah = 'jeddah',
  Taif = 'taif',
  Rabigh = 'rabigh',
  Khulais = 'khulais',
  AlJumum = 'al-jumum',
  Bahrah = 'bahrah',
  AlLith = 'al-lith',
  Mastoorah = 'mastoorah',
  Kamil = 'kamil',
  Khurmah = 'khurmah',
  Rania = 'rania',
  Turbah = 'turbah',

  // Madinah Region
  Madinah = 'madinah',
  Yanbu = 'yanbu',
  AlUla = 'al-ula',
  AlHanakiyah = 'al-hanakiyah',
  Badr = 'badr',
  Khaybar = 'khaybar',
  MahdAlDhahab = 'mahd-al-dhahab',
  WadiAlFara = 'wadi-al-fara',

  // Eastern Province (Ash Sharqiyah)
  Dammam = 'dammam',
  Khobar = 'khobar',
  Dhahran = 'dhahran',
  Jubail = 'jubail',
  Qatif = 'qatif',
  RasTanura = 'ras-tanura',
  HafrAlBatin = 'hafr-al-batin',
  Khafji = 'khafji',
  Nuayriyah = 'nuayriyah',
  AlAhsa = 'al-ahsa',
  Hofuf = 'hofuf',
  Mubarraz = 'mubarraz',
  Abqaiq = 'abqaiq',
  Buqayq = 'buqayq',

  // Al Qassim
  Buraidah = 'buraidah',
  Unaizah = 'unaizah',
  ArRass = 'ar-rass',
  Midhnab = 'midhnab',
  AlBadai = 'al-badai',
  AlMithnab = 'al-mithnab',

  // Ha'il Region
  Hail = 'hail',
  Baqa = 'baqa',
  AshShinan = 'ash-shinan',
  AshShammiyah = 'ash-shammiyah',
  Smira = 'smira',

  // Tabuk Region
  Tabuk = 'tabuk',
  AlWajh = 'al-wajh',
  Duba = 'duba',
  Umluj = 'umluj',
  Haql = 'haql',
  Sharma = 'sharma',

  // Northern Borders (Al Hudud Ash Shamaliyah)
  Arar = 'arar',
  Rafha = 'rafha',
  Turayf = 'turayf',

  // Al Jawf Region
  Sakaka = 'sakaka',
  Qurayyat = 'qurayyat',
  DawmatAlJandal = 'dawmat-al-jandal',

  // Asir Region
  Abha = 'abha',
  KhamisMushait = 'khamis-mushait',
  Bisha = 'bisha',
  Namas = 'namas',
  SaratAbidah = 'sarat-abidah',
  Mahayil = 'mahayil',
  RijalAlmaa = 'rijal-almaa',
  Tanumah = 'tanumah',
  Tathlith = 'tathlith',

  // Najran Region
  Najran = 'najran',
  Sharurah = 'sharurah',
  Habuna = 'habuna',
  Thar = 'thar',

  // Jazan Region
  Jazan = 'jazan',
  Sabya = 'sabya',
  AbuArish = 'abu-arish',
  Samtah = 'samtah',
  Farasan = 'farasan',
  AhadAlMasarihah = 'ahad-al-masarihah',
  AdDarb = 'ad-darb',
  ArRayth = 'ar-rayth',
  Damad = 'damad',

  // Al Bahah Region
  AlBahah = 'al-bahah',
  Baljurashi = 'baljurashi',
  Almandaq = 'almandaq',
  AlMakhwah = 'al-makhwah',
  Qilwah = 'qilwah',

  // Other frequently used (cross-region / legacy naming)
  KingAbdullahEconomicCity = 'king-abdullah-economic-city',
  KingKhalidMilitaryCity = 'king-khalid-military-city',
}
