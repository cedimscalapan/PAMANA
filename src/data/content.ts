export type SourceStatus = 'reviewed' | 'awaiting_review';

export type Lesson = {
  id: string;
  title: string;
  category: string;
  summary: string;
  duration: number;
  sourceStatus: SourceStatus;
  points: string[];
};

export type Place = { name: string; municipality: string; type: string; description: string };

export const lessons: Lesson[] = [
  { id: 'l1', title: 'Getting to know Oriental Mindoro', category: 'History & Geography', summary: 'An introduction to the province, its towns, landscapes, and communities.', duration: 12, sourceStatus: 'awaiting_review', points: ['Oriental Mindoro has 15 municipalities and one city.', 'Its learning landscape includes coastal places, mountains, and wetlands.', 'Travel details should be rechecked before a trip.'] },
  { id: 'l2', title: 'Mangyan communities of Mindoro', category: 'Communities', summary: 'Learn why communities grouped under “Mangyan” should be understood on their own terms.', duration: 15, sourceStatus: 'awaiting_review', points: ['Mangyan is an umbrella term for several Indigenous communities in Mindoro.', 'Communities have distinct languages and traditions.', 'Community terminology requires respectful local review.'] },
  { id: 'l3', title: 'Hanunó’o script basics', category: 'Writing', summary: 'Explore the abugida structure, vowel signs, and Unicode characters used in modern Hanunó’o writing.', duration: 10, sourceStatus: 'reviewed', points: ['Hanunó’o is an abugida: consonants carry an inherent vowel.', 'Two combining marks represent four post-consonant vowel sounds.', 'Pamudpod marks vowel absence in modern writing.'] },
  { id: 'l4', title: 'Living traditions and shared memory', category: 'Traditions', summary: 'How culture is carried through practice, story, and place.', duration: 10, sourceStatus: 'awaiting_review', points: ['Ambahan is a traditional poetic form associated with Hanunó’o practice.', 'Bamboo objects can preserve writing and memory.', 'Use attribution and permission for living cultural materials.'] }
];

export const places: Place[] = [
  { name: 'Puerto Galera', municipality: 'Puerto Galera', type: 'Nature & heritage', description: 'A coastal locality presented by the tourism portal as a destination for landscapes and cultural tourism.' },
  { name: 'Calapan City', municipality: 'Calapan City', type: 'City heritage', description: 'The provincial capital and a center for local learning and exchange.' },
  { name: 'Naujan Lake', municipality: 'Naujan', type: 'Environment', description: 'A significant wetland landscape connected to community life and conservation.' },
  { name: 'Mount Halcon', municipality: 'Baco', type: 'Nature', description: 'A major mountain landmark; access details should be checked before travel.' },
  { name: 'Mangyan heritage', municipality: 'Mindoro', type: 'Community', description: 'Explore community knowledge only with proper attribution, consent, and cultural review.' }
];

export const sources = [
  { id: 'tourism', title: 'Travel Oriental Mindoro', publisher: 'Oriental Mindoro tourism portal', url: 'https://www.travelorientalmindoro.ph/', status: 'Review pending', use: 'Province overview, towns, attractions, and travel context.' },
  { id: 'loc', title: 'Mangyan Bamboo Collection: Background', publisher: 'Library of Congress', url: 'https://guides.loc.gov/mangyan-bamboo-collection/background', status: 'Review pending', use: 'Mangyan communities, ambahan, bamboo collection, and writing traditions.' },
  { id: 'hanunoo', title: 'Hanunó’o orthography notes', publisher: 'Richard Ishida / r12a', url: 'https://r12a.github.io/scripts/hano/hnn.html', status: 'Source checked', use: 'Unicode, abugida structure, vowel signs, and pamudpod reference.' },
  { id: 'unicode', title: 'Hanunoo Unicode chart', publisher: 'Unicode Consortium', url: 'https://unicode.org/charts/PDF/U1720.pdf', status: 'Source checked', use: 'Character block and code-point reference.' },
  { id: 'ppdo', title: 'Provincial Planning and Development Office', publisher: 'Oriental Mindoro PPDO', url: 'https://ppdo.ormindoro.gov.ph', status: 'Review pending', use: 'Requested official planning reference; verify before publication.' }
];

export const storageKey = (id: string) => `pamana.lesson.${id}`;
