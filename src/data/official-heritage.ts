/**
 * Curated records from the official Mangyan Heritage Center and Travel
 * Oriental Mindoro portals. These are intentionally small, source-linked
 * records for the offline app; they are not a mirror of either website.
 */

import { festivalContexts } from './festival-context';

export type OfficialSource = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  status: string;
  use: string;
};

export type OfficialPlace = {
  id: string;
  name: string;
  municipality: string;
  type: string;
  description: string;
  sourceIds: string[];
  detailUrl?: string;
  latitude?: number;
  longitude?: number;
};

export type OfficialFestival = {
  id: string;
  name: string;
  municipality: string;
  month: number;
  day: number;
  description: string;
  highlights?: string[];
  sourceIds: string[];
  detailUrl?: string;
};

export type OfficialCatalogStat = {
  id: string;
  label: string;
  count: number;
  sourceIds: string[];
};

export type TravelPlanningNote = {
  id: string;
  label: string;
  value: string;
  sourceIds: string[];
};

export const officialSources: OfficialSource[] = [
  {
    id: 'mhc-home',
    title: 'Mangyan Heritage Center',
    publisher: 'Mangyan Heritage Center',
    url: 'https://mangyanheritage.odoo.com/',
    status: 'Review pending',
    use: 'Institutional context and approved Mangyan cultural learning only.',
  },
  {
    id: 'mhc-groups',
    title: 'Mangyan groups and community contacts',
    publisher: 'Mangyan Heritage Center',
    url: 'https://mangyanheritage.odoo.com/mangyan-groups',
    status: 'Community review pending',
    use: 'Group names and geographic context; do not publish as a definitive map without community review.',
  },
  {
    id: 'mhc-library',
    title: 'Mangyan Library and Publications',
    publisher: 'Mangyan Heritage Center',
    url: 'https://mangyanheritage.odoo.com/tl/mangyan-library',
    status: 'Permission required',
    use: 'Catalog metadata and approved references; full documents, poems, translations, and recordings require permission.',
  },
  {
    id: 'mhc-projects',
    title: 'Research and community-consent policy',
    publisher: 'Mangyan Heritage Center',
    url: 'https://mangyanheritage.odoo.com/projects',
    status: 'Source checked',
    use: 'FPIC, community approval, cultural safety, and partner workflow guidance.',
  },
  {
    id: 'mhc-crafts',
    title: 'Mangyan arts and crafts gallery',
    publisher: 'Mangyan Heritage Center',
    url: 'https://mangyanheritage.odoo.com/mangyancrafts',
    status: 'Permission required',
    use: 'Craft context only; images and living designs require rights and community review.',
  },
  {
    id: 'lakbay-home',
    title: 'Travel Oriental Mindoro',
    publisher: 'Oriental Mindoro Provincial Tourism Office',
    url: 'https://www.travelorientalmindoro.ph/',
    status: 'Source checked',
    use: 'Province overview, tourism categories, MAHAL TANA identity story, and public destination context.',
  },
  {
    id: 'lakbay-cultural',
    title: 'Historical and cultural sites',
    publisher: 'Oriental Mindoro Provincial Tourism Office',
    url: 'https://www.travelorientalmindoro.ph/attractions/historical-cultural',
    status: 'Source checked',
    use: 'Public place names and municipalities for a source-linked heritage directory.',
  },
  {
    id: 'lakbay-festivals',
    title: 'Festivals of Oriental Mindoro',
    publisher: 'Oriental Mindoro Provincial Tourism Office',
    url: 'https://www.travelorientalmindoro.ph/festivals',
    status: 'Source checked',
    use: 'Annual festival names, municipalities, and calendar dates; verify details before travel.',
  },
  {
    id: 'lakbay-place-mangyan-villages',
    title: 'Mangyan Villages, Mansalay',
    publisher: 'Oriental Mindoro Provincial Tourism Office',
    url: 'https://www.travelorientalmindoro.ph/place/mangyan-villages',
    status: 'Community review pending',
    use: 'Public listing only; visits and cultural descriptions require community protocol.',
  },
  {
    id: 'lakbay-place-heritage-center',
    title: 'Oriental Mindoro Heritage and Cultural Center',
    publisher: 'Oriental Mindoro Provincial Tourism Office',
    url: 'https://www.travelorientalmindoro.ph/place/oriental-mindoro-heritage-and-cultural-center',
    status: 'Source checked',
    use: 'Public location and institutional description for a heritage-place card.',
  },
  {
    id: 'lakbay-how-to-get-here',
    title: 'How to get to Oriental Mindoro',
    publisher: 'Oriental Mindoro Provincial Tourism Office',
    url: 'https://www.travelorientalmindoro.ph/page/how-to-get-here',
    status: 'Dynamic / verify before travel',
    use: 'Offline planning context only; schedules, operators, and access conditions may change.',
  },
  {
    id: 'lakbay-terms',
    title: 'LAKBAY terms and conditions',
    publisher: 'Oriental Mindoro Provincial Tourism Office',
    url: 'https://www.travelorientalmindoro.ph/page/terms-and-conditions',
    status: 'Source checked',
    use: 'Rights boundary for destination information, user reviews, and uploaded media.',
  },
];

const culturalPlace = (
  id: string,
  name: string,
  municipality: string,
  description: string,
  detailUrl?: string,
): OfficialPlace => ({
  id,
  name,
  municipality,
  type: 'Historical & Cultural',
  description,
  sourceIds: ['lakbay-cultural'],
  detailUrl,
});

/** Public place names only. Descriptions remain deliberately conservative. */
export const officialPlaces: OfficialPlace[] = [
  culturalPlace('bansud-museum', 'Bansud Museum', 'Bansud', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('clarendon-cultural-center', 'Clarendon Cultural Center', 'Roxas', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('m-adriatico-pottery', 'M. Adriatico Pottery', 'Gloria', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('mangyan-cubool', 'Mangyan Cubool: Cultural Booth Of Love', 'Baco', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('mangyan-villages', 'Mangyan Villages', 'Mansalay', 'The official listing places Mangyan Villages in Barangay Panaytayan, Mansalay, and presents it as a Hanunuo Mangyan cultural site. Cultural visits require community protocol.', 'https://www.travelorientalmindoro.ph/place/mangyan-villages'),
  culturalPlace('muelle-cultural-heritage-park', 'Muelle Cultural Heritage Park', 'Puerto Galera', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('oriental-mindoro-heritage-cultural-center', 'Oriental Mindoro Heritage and Cultural Center', 'Mansalay', 'The official listing describes the center as a venue for promoting and preserving Mangyan works and culture.', 'https://www.travelorientalmindoro.ph/place/oriental-mindoro-heritage-and-cultural-center'),
  culturalPlace('oriental-mindoro-heritage-museum-calapan', 'Oriental Mindoro Heritage Museum', 'Calapan City', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('pinamalayan-welcome-arch', 'Pinamalayan Welcome Arch', 'Pinamalayan', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('pola-heritage-houses', 'Pola Heritage Houses', 'Pola', 'Listed by the official tourism portal as a historical and cultural site.'),
  culturalPlace('punta-baluarte', 'Punta Baluarte', 'San Teodoro', 'Listed by the official tourism portal as a historical and cultural site.'),
  {
    id: 'aslom-island',
    name: 'Aslom Island',
    municipality: 'Bulalacao',
    type: 'Beach & Island',
    description: 'A featured island destination on the official tourism portal. Access and environmental guidance should be verified before travel.',
    sourceIds: ['lakbay-home'],
  },
  {
    id: 'buyayao-island',
    name: 'Buyayao Island',
    municipality: 'Bulalacao',
    type: 'Beach & Island',
    description: 'A featured island destination on the official tourism portal. Access and environmental guidance should be verified before travel.',
    sourceIds: ['lakbay-home'],
  },
  {
    id: 'pocanil-rock-formation',
    name: 'Pocanil Rock Formation',
    municipality: 'Bulalacao',
    type: 'Beach & Island',
    description: 'A featured destination on the official tourism portal. Access and environmental guidance should be verified before travel.',
    sourceIds: ['lakbay-home'],
  },
];

const festival = (
  id: string,
  name: string,
  municipality: string,
  month: number,
  day: number,
  detailUrl?: string,
  description = `Annual festival listed by the official tourism portal for ${municipality}. Verify the current program and venue before travel.`,
  highlights?: string[],
): OfficialFestival => ({ id, name, municipality, month, day, description, highlights, sourceIds: ['lakbay-festivals'], detailUrl });

/** Annual dates from the official calendar; descriptions do not infer ritual meaning. */
export const officialFestivals: OfficialFestival[] = [
  festival('basudani', 'Basudani Festival', 'Bansud', 1, 19),
  festival('sipag', 'SIPAG Festival', 'Roxas', 1, 25),
  festival('banana', 'Banana Festival', 'Baco', 3, 15),
  festival('sulyog', 'SULYOG Festival', 'Bongabong', 3, 15),
  festival('kalap', 'Kalap Festival', 'Calapan City', 3, 21),
  festival('bahaghari', 'Bahaghari Festival', 'Pinamalayan', 4, 25),
  festival('pandang-gitab', 'Pandang Gitab Oriental Mindoro', 'Calapan City', 4, 30, 'https://www.travelorientalmindoro.ph/festival/pandang-gitab-festival', undefined, ['Festival of Lights', 'Street dancing', 'Thanksgiving celebration', 'Cultural shows']),
  festival('sab-uyan', 'Sab-Uyan Festival', 'Pola', 6, 24),
  festival('pakapya-agtike', 'Pakapya-Agtike Festival', 'Socorro', 6, 26),
  festival('biniray', 'Biniray Festival', 'Bulalacao', 6, 29),
  festival('dabalistihit', 'DABALISTIHIT Festival', 'Naujan', 9, 10),
  festival('kapakyanan', 'Kapakyanan Festival', 'Victoria', 9, 18, 'https://www.travelorientalmindoro.ph/festival/kapakyanan-festival', 'The official page connects this celebration with Victoria’s agricultural abundance and tropical-fruit production.', ['Citrus and fruit festival', 'Agricultural fair', 'Street dancing', 'Trade exhibits']),
  festival('kawayanan', 'Kawayanan Festival', 'Gloria', 10, 1),
  festival('kaaldawan-iraya', 'Kaaldawan-Iraya Festival', 'Puerto Galera', 10, 25, 'https://www.travelorientalmindoro.ph/festival/kaaldawan-iraya-festival', 'The official page describes an Iraya cultural celebration featuring dances, indigenous games, songs, and folktales.', ['Iraya tribal dances', 'Indigenous games', 'Traditional songs', 'Folktales']),
  festival('fiesta-mahal-tana', 'Fiesta MAHAL TANA!', 'Calapan City', 11, 15, 'https://www.travelorientalmindoro.ph/festival/fiesta-mahal-tana', 'The official page describes a provincial showcase connecting the official festivals of the municipalities and city.', ['Street dancing competition', 'Festival showcase', 'Cultural presentations', 'Grand parade']),
  festival('salong-dagitab', 'Salong Dagitab', 'Calapan City', 11, 15),
  festival('mangyan-festival', 'Mangyan Festival', 'Mansalay', 11, 25, 'https://www.travelorientalmindoro.ph/festival/mangyan-festival', 'The official page describes this as Mansalay’s festival acknowledging Mangyan culture and indigenous practices.', ['Mangyan cultural presentations', 'Indigenous dances', 'Traditional crafts', 'Heritage celebration']),
  festival('masayaw', 'MASAYAW Festival', 'San Teodoro', 12, 8),
].map(item => ({ ...item, ...festivalContexts[item.id], sourceIds: [...item.sourceIds, `festival-${item.id}`] }));

export const communityReviewQueue = [
  {
    id: 'mhc-group-profiles',
    title: 'Mangyan group profiles',
    summary: 'The Mangyan Heritage Center lists distinct groups and geographic associations. Publish only after community review and consent.',
    status: 'community_review_pending' as const,
    sourceIds: ['mhc-groups', 'mhc-projects'],
  },
  {
    id: 'mhc-ambahan-library',
    title: 'Ambahan text, translation, and audio',
    summary: 'The center describes extensive ambahan holdings. Full poems, translations, images, and recordings require a rights and community agreement.',
    status: 'permission_required' as const,
    sourceIds: ['mhc-library', 'mhc-projects'],
  },
  {
    id: 'mhc-craft-media',
    title: 'Craft images and living designs',
    summary: 'Craft context can support learning, but images and designs require permission, attribution, and community review.',
    status: 'permission_required' as const,
    sourceIds: ['mhc-crafts', 'mhc-projects'],
  },
];

/**
 * Directory snapshot from the official portal. Counts are intentionally
 * labelled as a snapshot because the portal's listings can change.
 */
export const officialCatalogStats: OfficialCatalogStat[] = [
  { id: 'catalog-places', label: 'Listed places', count: 698, sourceIds: ['lakbay-home'] },
  { id: 'catalog-municipalities', label: 'Towns and one city', count: 15, sourceIds: ['lakbay-home'] },
  { id: 'catalog-cultural', label: 'Historical & cultural sites', count: 14, sourceIds: ['lakbay-cultural'] },
  { id: 'catalog-festivals', label: 'Annual festivals', count: 18, sourceIds: ['lakbay-festivals'] },
  { id: 'catalog-beaches', label: 'Beaches & islands', count: 57, sourceIds: ['lakbay-home'] },
  { id: 'catalog-waterfalls', label: 'Waterfalls & springs', count: 41, sourceIds: ['lakbay-home'] },
  { id: 'catalog-parks', label: 'Parks & nature reserves', count: 11, sourceIds: ['lakbay-home'] },
  { id: 'catalog-accommodation', label: 'Hotels & resorts', count: 278, sourceIds: ['lakbay-home'] },
  { id: 'catalog-restaurants', label: 'Restaurants', count: 156, sourceIds: ['lakbay-home'] },
];

export const officialMunicipalities = [
  'Baco', 'Bansud', 'Bongabong', 'Bulalacao', 'Calapan City', 'Gloria', 'Mansalay',
  'Naujan', 'Pinamalayan', 'Pola', 'Puerto Galera', 'Roxas', 'San Teodoro', 'Socorro', 'Victoria',
];

export const travelPlanningNotes: TravelPlanningNote[] = [
  { id: 'manila-batangas', label: 'Manila to Batangas Port', value: 'About 2–3 hours by bus or car', sourceIds: ['lakbay-how-to-get-here'] },
  { id: 'batangas-puerto-galera', label: 'Batangas to Puerto Galera', value: 'About 1–1.5 hours by ferry or fastcraft', sourceIds: ['lakbay-how-to-get-here'] },
  { id: 'batangas-calapan', label: 'Batangas to Calapan', value: 'About 2–3 hours by RoRo ferry', sourceIds: ['lakbay-how-to-get-here'] },
  { id: 'getting-around', label: 'Getting around', value: 'Jeepneys, vans, tricycles, motorcycles, cars, and boats are listed options', sourceIds: ['lakbay-how-to-get-here'] },
];
