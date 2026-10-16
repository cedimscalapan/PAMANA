import { transliterateFilipino } from './hanunoo-transliteration';

export type FilipinoVocabularyEntry = {
  id: string;
  word: string;
  meaning: string;
  category: 'Tao' | 'Tahanan' | 'Panahon' | 'Ugnayan' | 'Kalikasan' | 'Pagkatuto' | 'Kultura';
};

export const filipinoVocabulary: FilipinoVocabularyEntry[] = [
  { id: 'pinoy', word: 'Pinoy', meaning: 'Di-pormal na katawagan sa Pilipino.', category: 'Tao' },
  { id: 'pilipinas', word: 'Pilipinas', meaning: 'Ang bansang Pilipinas.', category: 'Kultura' },
  { id: 'salamat', word: 'Salamat', meaning: 'Pahayag ng pasasalamat.', category: 'Ugnayan' },
  { id: 'mahal', word: 'Mahal', meaning: 'Minamahal; maaari ring tumukoy sa mataas na halaga.', category: 'Ugnayan' },
  { id: 'pamilya', word: 'Pamilya', meaning: 'Magkakaugnay na pangkat ng mga tao sa isang sambahayan o angkan.', category: 'Tao' },
  { id: 'bahay', word: 'Bahay', meaning: 'Tirahan o tahanan.', category: 'Tahanan' },
  { id: 'tubig', word: 'Tubig', meaning: 'Likidong mahalaga sa buhay.', category: 'Kalikasan' },
  { id: 'araw', word: 'Araw', meaning: 'Maaaring tumukoy sa day o sa araw na bituin.', category: 'Panahon' },
  { id: 'buwan', word: 'Buwan', meaning: 'Maaaring tumukoy sa month o sa buwan sa langit.', category: 'Panahon' },
  { id: 'gabi', word: 'Gabi', meaning: 'Bahagi ng araw mula paglubog hanggang pagsikat ng araw.', category: 'Panahon' },
  { id: 'umaga', word: 'Umaga', meaning: 'Unang bahagi ng araw.', category: 'Panahon' },
  { id: 'kaibigan', word: 'Kaibigan', meaning: 'Taong may ugnayang pagkakaibigan.', category: 'Ugnayan' },
  { id: 'pag-ibig', word: 'Pag-ibig', meaning: 'Malalim na pagmamahal o pagkalinga.', category: 'Ugnayan' },
  { id: 'maganda', word: 'Maganda', meaning: 'Kaaya-aya o may mabuting katangian.', category: 'Ugnayan' },
  { id: 'mabuhay', word: 'Mabuhay', meaning: 'Pagbati o paghiling ng mahabang buhay.', category: 'Ugnayan' },
  { id: 'kalikasan', word: 'Kalikasan', meaning: 'Likas na kapaligiran at mga buhay na bahagi nito.', category: 'Kalikasan' },
  { id: 'paaralan', word: 'Paaralan', meaning: 'Lugar o institusyon para sa pag-aaral.', category: 'Pagkatuto' },
  { id: 'wika', word: 'Wika', meaning: 'Sistema ng komunikasyon ng isang pamayanan.', category: 'Pagkatuto' },
  { id: 'kultura', word: 'Kultura', meaning: 'Mga kaalaman, gawi, sining, at pagpapahalaga ng isang pamayanan.', category: 'Kultura' },
  { id: 'pamana', word: 'Pamana', meaning: 'Bagay, kaalaman, o tradisyong ipinapasa sa susunod na salinlahi.', category: 'Kultura' },
];

export const offlineVocabulary = filipinoVocabulary.map((entry) => ({
  ...entry,
  transliteration: transliterateFilipino(entry.word),
}));

