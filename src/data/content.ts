import { officialCatalogStats, officialFestivals, officialMunicipalities, officialPlaces, officialSources, travelPlanningNotes } from './official-heritage';
import type { OfficialFestival } from './official-heritage';
import destinationRecords from './destination-records.json';
import { researchSources } from './research-sources';

export type SourceStatus = 'reviewed' | 'awaiting_review';

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  status: string;
  use: string;
};

export type QuizQuestion = {
  prompt: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  category: string;
  summary: string;
  duration: number;
  sourceStatus: SourceStatus;
  sourceIds: string[];
  points: string[];
  quiz: QuizQuestion;
  lastReviewed?: string;
};

export type Place = {
  id: string;
  name: string;
  municipality: string;
  type: string;
  description: string;
  latitude?: number;
  longitude?: number;
  sourceIds: string[];
  detailUrl?: string;
};

export type Story = {
  id: string;
  title: string;
  summary: string;
  status: 'reviewed' | 'private_template' | 'awaiting_review';
  sourceIds: string[];
};

export type CollectionItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  sourceIds: string[];
};

export const sources: Source[] = [
  ...researchSources,
  { id: 'tourism', title: 'Travel Oriental Mindoro', publisher: 'Oriental Mindoro tourism portal', url: 'https://www.travelorientalmindoro.ph/', status: 'Source checked', use: 'Province overview, towns, attractions, and travel context.' },
  { id: 'loc', title: 'Mangyan Bamboo Collection: Background', publisher: 'Library of Congress', url: 'https://guides.loc.gov/mangyan-bamboo-collection/background', status: 'Source checked', use: 'Mangyan communities, ambahan, bamboo collection, and writing traditions.' },
  { id: 'hanunoo', title: 'Hanunó’o orthography notes', publisher: 'Richard Ishida / r12a', url: 'https://r12a.github.io/scripts/hano/hnn.html', status: 'Source checked', use: 'Unicode, abugida structure, vowel signs, and pamudpod reference.' },
  { id: 'unicode', title: 'Hanunoo Unicode chart', publisher: 'Unicode Consortium', url: 'https://unicode.org/charts/PDF/U1720.pdf', status: 'Source checked', use: 'Character block and code-point reference.' },
  { id: 'ppdo', title: 'Provincial Planning and Development Office', publisher: 'Oriental Mindoro PPDO', url: 'https://ppdo.ormindoro.gov.ph', status: 'Review pending', use: 'Requested official planning reference; verify before publication.' },
  { id: 'ppdo-general', title: 'General Information', publisher: 'Oriental Mindoro PPDO', url: 'https://ppdo.ormindoro.gov.ph/provincialdata/general-information/', status: 'Source checked', use: 'Official province location, land area, boundaries, climate, capital, municipalities, and barangays.' },
  { id: 'ppdo-profile', title: 'Profile of the Province', publisher: 'Oriental Mindoro PPDO', url: 'https://ppdo.ormindoro.gov.ph/wp-content/uploads/2022/10/063021-AR-2020.pdf', status: 'Source checked', use: 'Province profile including land-area distribution by city/municipality.' },
  { id: 'psa-2024', title: '2024 Census of Population', publisher: 'Philippine Statistics Authority', url: 'https://rssomimaropa.psa.gov.ph/content/highlights-oriental-mindoro-population-2024-census-population-2024-popcen', status: 'Source checked', use: 'Official 2024 population counts for Oriental Mindoro and its city/municipalities.' },
  { id: 'ncca-mangyan', title: 'Peoples of the Philippines: Mangyan', publisher: 'National Commission for Culture and the Arts', url: 'https://ncca.gov.ph/about-culture-and-arts/culture-profile/glimpses-peoples-of-the-philippines/mangyan/', status: 'Source checked', use: 'Community names, geographic groupings, writing, and ambahan context.' },
  { id: 'ncca-ginaw', title: 'Ginaw Bilog and the Ambahan Tradition', publisher: 'National Commission for Culture and the Arts', url: 'https://ncca.gov.ph/about-culture-and-arts/culture-profile/gamaba/national-living-treasures-ginaw-bilog/', status: 'Source checked', use: 'Ambahan form, performance, transmission, and Ginaw Bilog’s cultural work.' },
  { id: 'ncca-ambahan', title: 'In Focus: Ginaw Bilog and the Ambahan Tradition', publisher: 'National Commission for Culture and the Arts', url: 'https://ncca.gov.ph/about-culture-and-arts/in-focus/ginaw-bilog-and-the-ambahan-tradition/', status: 'Source checked', use: 'Seven-syllable ambahan lines, bamboo inscription, and community-sensitive context.' },
  { id: 'travel-lakbay', title: 'What is LAKBAY', publisher: 'Travel Oriental Mindoro', url: 'https://www.travelorientalmindoro.ph/page/what-is-lakbay', status: 'Source checked', use: 'Official tourism portal mission, sustainable tourism, destinations, events, and services.' },
  { id: 'travel-history', title: 'History of Oriental Mindoro', publisher: 'Travel Oriental Mindoro', url: 'https://www.travelorientalmindoro.ph/page/history', status: 'Source checked', use: 'Provincial history and the 1950 division of Mindoro.' },
  { id: 'travel-naujan', title: 'Naujan Lake', publisher: 'Travel Oriental Mindoro', url: 'https://www.travelorientalmindoro.ph/place/naujan-lake', status: 'Source checked', use: 'Lake size ranking, Ramsar status, surrounding municipalities, fish, and water birds.' },
  { id: 'denr-tamaraw', title: 'DENR Tamaraw news alert', publisher: 'Department of Environment and Natural Resources', url: 'https://denr.gov.ph/wp-content/uploads/2023/07/DENR_News_Alerts_13_October_2020_Tuesday.pdf', status: 'Source checked', use: 'Government conservation context for the Mindoro-endemic tamaraw.' },
  { id: 'tamaraw-media', title: 'Tamaraw photograph', publisher: 'Gregg Yan / Wikimedia Commons', url: 'https://commons.wikimedia.org/wiki/File:Bubalus_mindorensis_by_Gregg_Yan_02.jpg', status: 'License checked', use: 'Offline wildlife image; CC BY-SA 3.0 attribution is shown in-app.' },
  ...officialSources,
  ...officialFestivals.map(festival => ({ id: `festival-${festival.id}`, title: festival.name, publisher: 'Oriental Mindoro Provincial Tourism Office', url: festival.detailUrl ?? 'https://www.travelorientalmindoro.ph/festivals', status: 'Official festival page checked 17 October 2026', use: 'Festival-specific public description. Not a cultural recording or image reuse license.' })),
  { id: 'loc-introduction', title: 'Mangyan bamboo collection: Introduction', publisher: 'Library of Congress', url: 'https://guides.loc.gov/mangyan-bamboo-collection', status: 'Source checked 17 October 2026', use: 'Collection size, formats, and named writers.' },
  { id: 'loc-provenance', title: 'Mangyan bamboo collection: Provenance', publisher: 'Library of Congress', url: 'https://guides.loc.gov/mangyan-bamboo-collection/provenance', status: 'Source checked 17 October 2026', use: 'Collection history, dates, contributors, and documentary uncertainties.' },
  ...Object.entries(destinationRecords).map(([slug, record]) => ({ id: `destination-${slug}`, title: slug.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' '), publisher: 'Oriental Mindoro Provincial Tourism Office', url: record.url, status: 'Public directory checked 17 October 2026', use: 'Place-specific description and address. Published points are orientation references; current access requires verification.' })),
];

export { lessons } from './learning';

export const places: Place[] = [
  { id: 'puerto-galera', name: 'Puerto Galera', municipality: 'Puerto Galera', type: 'Nature & heritage', description: 'A coastal locality presented by the tourism portal as a destination for landscapes and cultural tourism.', latitude: 13.5022, longitude: 120.9547, sourceIds: ['tourism'] },
  { id: 'calapan', name: 'Calapan City', municipality: 'Calapan City', type: 'City heritage', description: 'The provincial capital and a center for local learning and exchange.', latitude: 13.4117, longitude: 121.1803, sourceIds: ['tourism', 'ppdo'] },
  { id: 'naujan-lake', name: 'Naujan Lake', municipality: 'Naujan', type: 'Environment', description: 'A significant wetland landscape connected to community life and conservation.', latitude: 13.1558, longitude: 121.3022, sourceIds: ['tourism'] },
  { id: 'mount-halcon', name: 'Mount Halcon', municipality: 'Baco', type: 'Nature', description: 'A major mountain landmark; access details should be checked before travel.', latitude: 13.2688, longitude: 121.1867, sourceIds: ['tourism'] },
  { id: 'mangyan-heritage', name: 'Mangyan heritage', municipality: 'Mindoro', type: 'Community', description: 'Explore community knowledge only with proper attribution, consent, and cultural review.', latitude: 13.0, longitude: 121.1, sourceIds: ['loc'] },
  ...officialPlaces,
];

export const festivals: OfficialFestival[] = officialFestivals;
export { officialCatalogStats, officialMunicipalities, travelPlanningNotes };

export const stories: Story[] = [
  { id: 'story-review', title: 'A story awaiting community review', summary: 'A private offline entry reserved for approved community content.', status: 'awaiting_review', sourceIds: [] },
  { id: 'story-landscapes', title: 'Landscapes and memory', summary: 'A place-based story slot for reviewed local voices and attribution.', status: 'awaiting_review', sourceIds: ['tourism'] },
  { id: 'story-mhc-ambahan', title: 'Ambahan archive — permission pending', summary: 'The Mangyan Heritage Center describes a substantial ambahan archive. Text, translations, and recordings remain hidden until rights and community review are complete.', status: 'awaiting_review', sourceIds: ['mhc-library', 'mhc-projects'] },
  { id: 'story-private', title: 'Make your own private story', summary: 'A private story space that remains on this device.', status: 'private_template', sourceIds: [] },
];

export const collectionItems: CollectionItem[] = [
  { id: 'crafts', title: 'Traditional crafts', category: 'Craft', description: 'A learning card for documented objects and making practices with provenance and permission.', sourceIds: ['loc'] },
  { id: 'textiles', title: 'Clothing & textiles', category: 'Material culture', description: 'A respectful reference card for patterns, clothing, and textile knowledge; avoid treating living designs as decoration.', sourceIds: ['loc'] },
  { id: 'writing', title: 'Writing systems', category: 'Writing', description: 'Hanunó’o and Buhid writing systems should be taught with community-sensitive attribution.', sourceIds: ['hanunoo', 'unicode', 'loc'] },
  { id: 'nature', title: 'Nature & heritage', category: 'Environment', description: 'Mindoro wildlife and landscapes connect conservation with cultural learning.', sourceIds: ['tourism', 'tamaraw-media'] },
  { id: 'heritage-sites', title: 'Heritage places', category: 'Lakbay', description: 'Officially listed cultural places across Oriental Mindoro, kept with source links and travel verification reminders.', sourceIds: ['lakbay-cultural'] },
  { id: 'festival-calendar', title: 'Festival calendar', category: 'Lakbay', description: 'The official annual festival calendar, presented as learning context rather than a live travel guarantee.', sourceIds: ['lakbay-festivals'] },
];

export const storageKey = (id: string) => `pamana.lesson.${id}`;
export const sourceById = (id: string) => sources.find((source) => source.id === id);

