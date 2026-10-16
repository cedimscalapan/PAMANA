import type { Lesson } from './content';

export type QuestDifficulty = 'easy' | 'medium' | 'hard';

export type QuestQuestion = {
  id: string;
  category: string;
  difficulty: QuestDifficulty;
  prompt: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
  sourceIds: string[];
  timeLimit: number;
};

const reviewed = '2026-10-16';

/**
 * Offline Matuto lesson pack.
 * Every lesson is deliberately tied to a local source ID in content.ts.
 * Counts and classifications are presented with their source year where relevant.
 */
export const lessons: Lesson[] = [
  {
    id: 'l1', title: 'Oriental Mindoro at a glance', category: 'History & Geography', duration: 12,
    summary: 'Build a clear province profile before exploring its places and stories.', sourceStatus: 'reviewed', sourceIds: ['ppdo-general', 'psa-2024'], lastReviewed: reviewed,
    points: ['Oriental Mindoro is in Region IV-B, also called MIMAROPA.', 'The capital is Calapan City.', 'The province has 14 municipalities, one component city, and 426 barangays.'],
    quiz: { prompt: 'What is the capital of Oriental Mindoro?', answers: ['Calapan City', 'Puerto Galera', 'Naujan', 'Mansalay'], correctIndex: 0, explanation: 'The PPDO identifies Calapan City as the provincial capital.' },
  },
  {
    id: 'l2', title: 'Land, boundaries, and climate', category: 'History & Geography', duration: 14,
    summary: 'Read the province as a landscape: coastline, terrain, boundaries, and seasons.', sourceStatus: 'reviewed', sourceIds: ['ppdo-general', 'ppdo-profile'], lastReviewed: reviewed,
    points: ['The official PPDO land-area figure is 4,364.72 square kilometers.', 'The province is bounded by Verde Island Passage to the north and Tablas Strait to the east.', 'The PPDO describes Type I and Type III climate areas.'],
    quiz: { prompt: 'Which region includes Oriental Mindoro?', answers: ['MIMAROPA (Region IV-B)', 'Central Visayas (Region VII)', 'Ilocos Region (Region I)', 'Caraga (Region XIII)'], correctIndex: 0, explanation: 'The PPDO lists Oriental Mindoro under Region IV-B, known as MIMAROPA.' },
  },
  {
    id: 'l3', title: 'The 2024 population picture', category: 'History & Geography', duration: 12,
    summary: 'Use recent official census data carefully and always keep the reference date visible.', sourceStatus: 'reviewed', sourceIds: ['psa-2024'], lastReviewed: reviewed,
    points: ['The 2024 POPCEN counted 919,504 people in Oriental Mindoro as of 1 July 2024.', 'Calapan City had the largest city/municipality population at 148,558.', 'San Teodoro had the smallest city/municipality population at 19,650.'],
    quiz: { prompt: 'What was the official Oriental Mindoro population in the 2024 POPCEN?', answers: ['919,504', '908,339', '785,602', '1,200,000'], correctIndex: 0, explanation: 'The PSA release reports 919,504 people as of 1 July 2024.' },
  },
  {
    id: 'l4', title: 'Many communities, not one label', category: 'People & Communities', duration: 15,
    summary: 'Learn why “Mangyan” is an umbrella term and why each community deserves its own name and context.', sourceStatus: 'reviewed', sourceIds: ['ncca-mangyan', 'loc'], lastReviewed: reviewed,
    points: ['NCCA describes Mangyan as a generic term for Indigenous peoples of Mindoro.', 'NCCA lists groups including Hanunoo, Buhid, Tawbuid, Tadyawan, Alangan, Iraya, Ratagnon, and others.', 'A respectful lesson should not treat the groups as one language or one culture.'],
    quiz: { prompt: 'Why should the word “Mangyan” be introduced carefully?', answers: ['It is an umbrella term for distinct communities', 'It names one single language', 'It is only a mountain name', 'It refers to one festival'], correctIndex: 0, explanation: 'The NCCA profile uses Mangyan as a generic term for Indigenous peoples with distinct communities and traditions.' },
  },
  {
    id: 'l5', title: 'Hanunó’o writing: how the script works', category: 'Writing & Language', duration: 12,
    summary: 'Understand the verified Unicode and orthographic structure before tracing characters.', sourceStatus: 'reviewed', sourceIds: ['hanunoo', 'unicode'], lastReviewed: reviewed,
    points: ['Hanunó’o is an abugida: consonants carry an inherent vowel sound.', 'The inherent vowel is a; three independent vowels can appear word-initially or word-medially.', 'Two combining vowel signs represent four post-consonant vowel sounds.'],
    quiz: { prompt: 'What kind of writing system is Hanunó’o?', answers: ['An abugida', 'A logographic system', 'A calendar', 'A sign language'], correctIndex: 0, explanation: 'The orthography reference describes Hanunó’o as an abugida.' },
  },
  {
    id: 'l6', title: 'Hanunó’o Unicode and pamudpod', category: 'Writing & Language', duration: 13,
    summary: 'Practice the local character inventory and learn how vowel absence is marked.', sourceStatus: 'reviewed', sourceIds: ['hanunoo', 'unicode'], lastReviewed: reviewed,
    points: ['The Unicode Hanunoo block contains 23 assigned characters from U+1720 through U+1736.', 'U+1734 HANUNOO SIGN PAMUDPOD marks vowel absence in modern writing.', 'The orthography notes describe 15 consonant letters and three independent vowel letters.'],
    quiz: { prompt: 'Which code point is the Hanunó’o pamudpod?', answers: ['U+1734', 'U+1720', 'U+1736', 'U+1740'], correctIndex: 0, explanation: 'The Hanunó’o orthography notes identify U+1734 as HANUNOO SIGN PAMUDPOD.' },
  },
  {
    id: 'l7', title: 'Ambahan: poetry in seven-syllable lines', category: 'Living Traditions', duration: 15,
    summary: 'Explore the form, performance, and messages of ambahan without treating living culture as decoration.', sourceStatus: 'reviewed', sourceIds: ['ncca-ginaw', 'ncca-ambahan'], lastReviewed: reviewed,
    points: ['NCCA describes ambahan as a poetic form composed of seven-syllable lines.', 'Ambahan can convey messages through metaphors and images.', 'The tradition may be sung or chanted and can address courtship, advice, welcome, or farewell.'],
    quiz: { prompt: 'How many syllables are in the ambahan line described by NCCA?', answers: ['Seven', 'Four', 'Ten', 'Twelve'], correctIndex: 0, explanation: 'NCCA describes ambahan as a poetic literary form composed of seven-syllable lines.' },
  },
  {
    id: 'l8', title: 'Ginaw Bilog and cultural transmission', category: 'Living Traditions', duration: 13,
    summary: 'Meet a culture bearer whose work helped keep ambahan knowledge moving between generations.', sourceStatus: 'reviewed', sourceIds: ['ncca-ginaw', 'ncca-ambahan'], lastReviewed: reviewed,
    points: ['Ginaw Bilog was a Hanunoo Mangyan from Panaytayan, Oriental Mindoro.', 'NCCA recognized him as a National Living Treasure in 1993.', 'He kept ambahan on bamboo tubes and in notebooks and shared old and new ambahan with fellow Mangyans.'],
    quiz: { prompt: 'What did Ginaw Bilog help preserve and share?', answers: ['Ambahan poetry', 'A navigation chart', 'A town census', 'A commercial brand'], correctIndex: 0, explanation: 'NCCA identifies Ginaw Bilog with the preservation and sharing of the ambahan tradition.' },
  },
  {
    id: 'l9', title: 'The Library of Congress bamboo collection', category: 'Living Traditions', duration: 15,
    summary: 'Study a documented historical collection while keeping provenance and historical limits visible.', sourceStatus: 'reviewed', sourceIds: ['loc'], lastReviewed: reviewed,
    points: ['The Library of Congress collection contains 77 bamboo items: 71 slats and 6 cylinders.', 'The collection dates approximately from 1900–1939 and includes Mangyan script writings.', 'The collection’s material was produced by authors including Luyon, Kabal, and Balik.'],
    quiz: { prompt: 'How many bamboo items are in the Library of Congress collection?', answers: ['77', '23', '48', '6'], correctIndex: 0, explanation: 'The Library of Congress describes 71 bamboo slats and 6 cylinders, totaling 77 items.' },
  },
  {
    id: 'l10', title: 'From bamboo objects to documented knowledge', category: 'Living Traditions', duration: 12,
    summary: 'Learn how collection records, transliterations, and translations support responsible study.', sourceStatus: 'reviewed', sourceIds: ['loc'], lastReviewed: reviewed,
    points: ['The collection includes transliterations and translations alongside inscribed bamboo materials.', 'Luyon’s writings cover topics such as agriculture, education, and stages of life.', 'Historical records should not be presented as if they replace present-day community voices.'],
    quiz: { prompt: 'What accompanies many of the inscribed bamboo items?', answers: ['Transliterations and translations', 'Live GPS routes', 'Tourist discount cards', 'Weather forecasts'], correctIndex: 0, explanation: 'The Library of Congress describes accompanying Romanized transliterations and translations.' },
  },
  {
    id: 'l11', title: 'LAKBAY and sustainable tourism', category: 'Nature & Travel', duration: 12,
    summary: 'Use the official tourism portal as a starting point for discovery, not as a replacement for local guidance.', sourceStatus: 'reviewed', sourceIds: ['travel-lakbay', 'tourism'], lastReviewed: reviewed,
    points: ['LAKBAY means “travel” or “journey” in Filipino.', 'The official portal describes a mission to support sustainable tourism and local communities.', 'The portal covers destinations, events, travel planning, services, and community reviews.'],
    quiz: { prompt: 'What does LAKBAY mean in Filipino?', answers: ['Travel or journey', 'Mountain peak', 'Festival light', 'Freshwater lake'], correctIndex: 0, explanation: 'The official portal explains that LAKBAY means travel or journey.' },
  },
  {
    id: 'l12', title: 'Naujan Lake: a wetland landscape', category: 'Nature & Travel', duration: 14,
    summary: 'Connect geography, waterbirds, fish, and wetland stewardship through one place-based lesson.', sourceStatus: 'reviewed', sourceIds: ['travel-naujan', 'tourism'], lastReviewed: reviewed,
    points: ['The tourism portal describes Naujan Lake as the fifth-largest lake in the Philippines.', 'It is the largest freshwater lake in Oriental Mindoro and a wetland of international importance under Ramsar.', 'The lake is bordered by Naujan, Victoria, Socorro, and Pola and supports fish and water birds.'],
    quiz: { prompt: 'Which four municipalities border Naujan Lake?', answers: ['Naujan, Victoria, Socorro, and Pola', 'Baco, Roxas, Mansalay, and Gloria', 'Calapan, Bulalacao, Bansud, and Bongabong', 'Puerto Galera, San Teodoro, Pola, and Roxas'], correctIndex: 0, explanation: 'The official place page lists Naujan, Victoria, Socorro, and Pola.' },
  },
  {
    id: 'l13', title: 'Tamaraw and the living landscape', category: 'Nature & Travel', duration: 14,
    summary: 'Understand why the tamaraw is both a wildlife subject and a conservation responsibility.', sourceStatus: 'reviewed', sourceIds: ['tourism', 'denr-tamaraw'], lastReviewed: reviewed,
    points: ['The tamaraw is Bubalus mindorensis, a dwarf buffalo found only on Mindoro.', 'The official tourism portal describes it as critically endangered.', 'The lesson connects wildlife learning with habitat care and responsible travel.'],
    quiz: { prompt: 'What is the scientific name of the tamaraw?', answers: ['Bubalus mindorensis', 'Bubalus bubalis', 'Bison mindorensis', 'Bos indicus'], correctIndex: 0, explanation: 'The official tourism portal identifies the tamaraw as Bubalus mindorensis.' },
  },
  {
    id: 'l14', title: 'Mount Halcon, festivals, and provincial identity', category: 'Nature & Travel', duration: 14,
    summary: 'See how a province can connect mountains, festivals, wildlife, lakes, and people in one identity story.', sourceStatus: 'reviewed', sourceIds: ['tourism', 'travel-history'], lastReviewed: reviewed,
    points: ['The tourism portal describes Mount Halcon as 2,586 metres and the highest point on Mindoro.', 'MAHAL TANA links Mangyan, Halcon, Tamaraw, and Naujan Lake as four provincial icons.', 'Mindoro was divided into Oriental and Occidental Mindoro in 1950 under Republic Act No. 505.'],
    quiz: { prompt: 'In the tourism portal’s MAHAL TANA explanation, what does “NA” refer to?', answers: ['Naujan Lake', 'National museum', 'Narra tree', 'Naujan festival'], correctIndex: 0, explanation: 'The portal explains MAHAL TANA as Mangyan, Halcon, Tamaraw, and Naujan Lake.' },
  },
];

const question = (
  id: string,
  category: string,
  difficulty: QuestDifficulty,
  prompt: string,
  answers: string[],
  correctIndex: number,
  explanation: string,
  sourceIds: string[],
  timeLimit = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 25 : 30,
): QuestQuestion => ({ id, category, difficulty, prompt, answers, correctIndex, explanation, sourceIds, timeLimit });

/**
 * Challenge bank: questions are selected randomly at runtime and never require a network call.
 * Keep distractors plausible but clearly distinguishable from the source-backed answer.
 */
export const questQuestions: QuestQuestion[] = [
  question('geo-01', 'Geography', 'easy', 'Which city is the capital of Oriental Mindoro?', ['Calapan City', 'Puerto Galera', 'Naujan', 'Roxas'], 0, 'PPDO identifies Calapan City as the capital.', ['ppdo-general']),
  question('geo-02', 'Geography', 'easy', 'Oriental Mindoro belongs to which region?', ['MIMAROPA / Region IV-B', 'Central Luzon / Region III', 'Bicol / Region V', 'Western Visayas / Region VI'], 0, 'The PPDO identifies Oriental Mindoro as part of Region IV-B, MIMAROPA.', ['ppdo-general']),
  question('geo-03', 'Geography', 'medium', 'How many municipalities and component cities does the province have?', ['14 municipalities and 1 city', '15 municipalities and 2 cities', '10 municipalities and 1 city', '1 municipality and 14 cities'], 0, 'The official provincial profile states 14 municipalities and one component city.', ['ppdo-general', 'psa-2024']),
  question('geo-04', 'Geography', 'medium', 'What is the official PPDO land-area figure for Oriental Mindoro?', ['4,364.72 km²', '436.47 km²', '9,195.04 km²', '1,950.00 km²'], 0, 'PPDO lists 4,364.72 square kilometers, or 436,472 hectares.', ['ppdo-general']),
  question('geo-05', 'Geography', 'hard', 'Which body of water is listed as a northern boundary of Oriental Mindoro?', ['Verde Island Passage', 'Sulu Sea', 'Manila Bay', 'Bohol Sea'], 0, 'The PPDO lists Verde Island Passage to the north.', ['ppdo-general']),
  question('geo-06', 'Geography', 'medium', 'How many barangays does the PPDO list for the province?', ['426', '77', '15', '698'], 0, 'The PPDO general information page lists 426 barangays.', ['ppdo-general']),
  question('geo-07', 'Geography', 'medium', 'Which climate types are identified by the PPDO?', ['Type I and Type III', 'Type II and Type IV', 'Type I only', 'Type IV only'], 0, 'The PPDO describes Type I and Type III climate areas.', ['ppdo-general']),
  question('geo-08', 'Geography', 'hard', 'Which municipality had the largest land area in the PPDO province profile?', ['Naujan', 'Roxas', 'Calapan City', 'Puerto Galera'], 0, 'The PPDO profile identifies Naujan as the largest by land area.', ['ppdo-profile']),

  question('pop-01', 'Population', 'easy', 'What was Oriental Mindoro’s total population in the 2024 POPCEN?', ['919,504', '908,339', '785,602', '1,458,558'], 0, 'PSA reports 919,504 as of 1 July 2024.', ['psa-2024']),
  question('pop-02', 'Population', 'medium', 'Which locality recorded the largest population in the 2024 POPCEN?', ['Calapan City', 'Naujan', 'Pinamalayan', 'Bongabong'], 0, 'Calapan City recorded 148,558 people.', ['psa-2024']),
  question('pop-03', 'Population', 'medium', 'Which locality recorded the smallest population in the 2024 POPCEN?', ['San Teodoro', 'Pola', 'Socorro', 'Baco'], 0, 'San Teodoro recorded 19,650 people.', ['psa-2024']),
  question('pop-04', 'Population', 'hard', 'What was the reported annual population growth rate from 2020 to 2024?', ['0.29%', '1.56%', '2.90%', '11.165%'], 0, 'The PSA release reports a 0.29% annual population growth rate for 2020–2024.', ['psa-2024']),
  question('pop-05', 'Population', 'hard', 'Which three localities together accounted for about 37.9% of the province’s 2024 population?', ['Calapan, Naujan, and Pinamalayan', 'Baco, Pola, and Roxas', 'Puerto Galera, Gloria, and Victoria', 'Mansalay, Socorro, and San Teodoro'], 0, 'PSA names Calapan City, Naujan, and Pinamalayan.', ['psa-2024']),

  question('comm-01', 'Communities', 'easy', 'What does “Mangyan” represent in the NCCA profile?', ['A generic term for Indigenous peoples of Mindoro', 'One single language', 'One municipality', 'A mountain range'], 0, 'NCCA uses Mangyan as a generic term for Indigenous peoples of Mindoro.', ['ncca-mangyan']),
  question('comm-02', 'Communities', 'medium', 'Which group does NCCA associate with the southern part of Oriental Mindoro?', ['Hanunoo', 'Iraya', 'Alangan', 'Tadyawan'], 0, 'NCCA places Hanunoo in the southern part of Oriental Mindoro.', ['ncca-mangyan']),
  question('comm-03', 'Communities', 'medium', 'Which group does NCCA place near Mount Halcon?', ['Alangan', 'Hanunoo', 'Ratagnon', 'Buhid'], 0, 'NCCA associates Alangan with the vicinity of Mount Halcon.', ['ncca-mangyan']),
  question('comm-04', 'Communities', 'hard', 'Why should one avoid calling all Mangyan communities one language?', ['They have distinct communities, languages, and traditions', 'The word is only used for wildlife', 'All writing is prohibited', 'The communities live outside Mindoro'], 0, 'The source distinguishes multiple communities rather than one homogeneous culture.', ['ncca-mangyan', 'loc']),
  question('comm-05', 'Communities', 'medium', 'Which practice is described in the sources as connected to Mangyan writing?', ['Writing on bamboo with a stylus or knife', 'Printing on metal coins', 'Painting on concrete walls', 'Carving only on stone monuments'], 0, 'NCCA and LOC describe writing inscribed on bamboo.', ['ncca-mangyan', 'loc']),
  question('comm-06', 'Communities', 'hard', 'What is a respectful app practice when presenting community knowledge?', ['Keep attribution, permissions, and community review visible', 'Remove all source names', 'Treat living designs as decoration', 'Present historical records as current consent'], 0, 'The app keeps source and permission notes visible as part of responsible learning.', ['ncca-mangyan', 'loc']),

  question('write-01', 'Writing', 'easy', 'What type of script is Hanunó’o?', ['Abugida', 'Logographic script', 'Alphabet with no vowel behavior', 'Pictographic map'], 0, 'The orthography reference describes Hanunó’o as an abugida.', ['hanunoo']),
  question('write-02', 'Writing', 'easy', 'What is the inherent vowel of Hanunó’o consonants?', ['a', 'i', 'u', 'o'], 0, 'The inherent vowel is described as a.', ['hanunoo']),
  question('write-03', 'Writing', 'medium', 'How many basic consonant letters are described for Hanunó’o?', ['15', '3', '23', '48'], 0, 'The orthography notes list 15 consonant letters.', ['hanunoo']),
  question('write-04', 'Writing', 'medium', 'How many independent vowel letters are in the Hanunó’o inventory?', ['3', '2', '15', '4'], 0, 'The source describes three independent vowels.', ['hanunoo', 'unicode']),
  question('write-05', 'Writing', 'medium', 'How many combining vowel signs represent post-consonant vowels?', ['2', '3', '4', '15'], 0, 'Two combining signs represent four post-consonant vowel sounds.', ['hanunoo']),
  question('write-06', 'Writing', 'hard', 'Which code point is the pamudpod?', ['U+1734', 'U+1723', 'U+1732', 'U+1736'], 0, 'U+1734 is HANUNOO SIGN PAMUDPOD.', ['hanunoo', 'unicode']),
  question('write-07', 'Writing', 'hard', 'How many assigned characters are in the Unicode Hanunoo block?', ['23', '15', '17', '77'], 0, 'The Unicode block contains 23 assigned characters.', ['hanunoo', 'unicode']),
  question('write-08', 'Writing', 'medium', 'What does the pamudpod mark?', ['Vowel absence', 'A sentence question', 'A word’s capitalization', 'A number'], 0, 'The pamudpod is used to indicate vowel absence.', ['hanunoo']),
  question('write-09', 'Writing', 'hard', 'What should the Sulat Pamana voice guide do with “i or e” and “u or o”?', ['Show them as source-described alternatives', 'Choose one as universally correct', 'Hide the vowel signs', 'Replace them with Tagalog spelling'], 0, 'The source describes these signs as representing two possible sounds.', ['hanunoo']),

  question('lit-01', 'Living Traditions', 'easy', 'How many syllables are in the ambahan line described by NCCA?', ['Seven', 'Five', 'Eight', 'Ten'], 0, 'NCCA describes ambahan as seven-syllable lines.', ['ncca-ginaw', 'ncca-ambahan']),
  question('lit-02', 'Living Traditions', 'medium', 'What can ambahan convey through metaphors and images?', ['Messages and shared experience', 'Only weather reports', 'Only place coordinates', 'Only legal contracts'], 0, 'NCCA describes ambahan as a way to convey messages through metaphors and images.', ['ncca-ginaw']),
  question('lit-03', 'Living Traditions', 'medium', 'How may ambahan be performed?', ['Sung or chanted', 'Only silently read', 'Only typed into a database', 'Only acted without words'], 0, 'NCCA describes ambahan as sung or chanted.', ['ncca-ginaw', 'ncca-ambahan']),
  question('lit-04', 'Living Traditions', 'hard', 'Which topic is listed among ambahan messages?', ['Courtship, advice, or farewell', 'Traffic enforcement only', 'Weather forecasting only', 'Banking instructions only'], 0, 'The NCCA profile gives examples including courtship, advice to the young, and farewell.', ['ncca-ginaw']),
  question('lit-05', 'Living Traditions', 'medium', 'Where was Ginaw Bilog identified as being from?', ['Panaytayan, Oriental Mindoro', 'Calapan City proper', 'Puerto Galera town center', 'Naujan Lake boardwalk'], 0, 'NCCA identifies Ginaw Bilog as a Hanunoo Mangyan from Panaytayan, Oriental Mindoro.', ['ncca-ginaw']),
  question('lit-06', 'Living Traditions', 'hard', 'What did Ginaw Bilog use in addition to bamboo tubes to keep ambahan?', ['Notebooks', 'Tourist maps', 'Stone tablets', 'Audio CDs only'], 0, 'NCCA says he kept ambahan on bamboo tubes and old notebooks.', ['ncca-ginaw']),
  question('lit-07', 'Living Traditions', 'medium', 'How many bamboo items are in the Library of Congress collection?', ['77', '71', '48', '6'], 0, 'The collection has 71 slats plus 6 cylinders, totaling 77.', ['loc']),
  question('lit-08', 'Living Traditions', 'hard', 'Who wrote the 48 bamboo slats described in the LOC collection summary?', ['Luyon', 'Kabal', 'Balik', 'Gardner'], 0, 'The LOC summary attributes 48 slats to Luyon.', ['loc']),
  question('lit-09', 'Living Traditions', 'hard', 'What is the approximate date range of the LOC bamboo collection?', ['1900–1939', '1600–1639', '1950–1975', '2000–2024'], 0, 'The collection guide dates the material circa 1900–1939.', ['loc']),

  question('nature-01', 'Nature & Travel', 'easy', 'What does LAKBAY mean?', ['Travel or journey', 'River or lake', 'Festival or song', 'Mountain or forest'], 0, 'The official tourism portal explains LAKBAY as travel or journey.', ['travel-lakbay']),
  question('nature-02', 'Nature & Travel', 'medium', 'What kind of development does the LAKBAY mission support?', ['Sustainable tourism that supports local communities', 'Unregulated access to every site', 'Private-only tourism', 'Online-only tourism'], 0, 'The portal describes sustainable tourism, community support, and heritage preservation.', ['travel-lakbay']),
  question('nature-03', 'Nature & Travel', 'easy', 'Which lake is described as the fifth-largest in the Philippines?', ['Naujan Lake', 'Laguna Lake', 'Taal Lake', 'Lake Lanao'], 0, 'The tourism portal describes Naujan Lake as the fifth-largest lake in the Philippines.', ['travel-naujan']),
  question('nature-04', 'Nature & Travel', 'medium', 'Which municipality is NOT listed as bordering Naujan Lake?', ['Mansalay', 'Naujan', 'Victoria', 'Socorro'], 0, 'The source lists Naujan, Victoria, Socorro, and Pola; Mansalay is not listed.', ['travel-naujan']),
  question('nature-05', 'Nature & Travel', 'hard', 'What kind of wetland status is associated with Naujan Lake?', ['Wetland of international importance under Ramsar', 'World Heritage City status', 'National capital status', 'A private resort classification'], 0, 'The official place page identifies it as a wetland of international importance under Ramsar.', ['travel-naujan']),
  question('nature-06', 'Nature & Travel', 'easy', 'What is the tamaraw’s scientific name?', ['Bubalus mindorensis', 'Bubalus arnee', 'Bison bison', 'Bos taurus'], 0, 'The tourism portal identifies the tamaraw as Bubalus mindorensis.', ['tourism', 'denr-tamaraw']),
  question('nature-07', 'Nature & Travel', 'medium', 'Where is the tamaraw naturally found?', ['Mindoro', 'Palawan only', 'Cebu only', 'Luzon’s Cordillera only'], 0, 'The tamaraw is endemic to Mindoro.', ['tourism', 'denr-tamaraw']),
  question('nature-08', 'Nature & Travel', 'medium', 'How high does the tourism portal list Mount Halcon?', ['2,586 metres', '1,586 metres', '3,586 metres', '586 metres'], 0, 'The portal lists Mount Halcon at 2,586 metres.', ['tourism']),
  question('nature-09', 'Nature & Travel', 'hard', 'In the portal’s MAHAL TANA explanation, what does “TA” represent?', ['Tamaraw', 'Tadyawan', 'Travel', 'Tablas Strait'], 0, 'The four icons are Mangyan, Halcon, Tamaraw, and Naujan Lake.', ['tourism']),
  question('nature-10', 'Nature & Travel', 'hard', 'What should a learner do before visiting a place?', ['Check current access rules and respect local guidelines', 'Assume every route is open', 'Ignore community guidance', 'Treat the app as live navigation'], 0, 'The app is an offline educational map, so current access and local guidance must be checked separately.', ['travel-lakbay', 'tourism']),

  question('history-01', 'History & Identity', 'medium', 'In what year was Mindoro divided into Oriental and Occidental provinces?', ['1950', '1639', '1905', '2024'], 0, 'The tourism history page describes the division in 1950 under Republic Act No. 505.', ['travel-history']),
  question('history-02', 'History & Identity', 'hard', 'Which law is associated with the 1950 division of Mindoro?', ['Republic Act No. 505', 'Republic Act No. 7160', 'Republic Act No. 10625', 'Republic Act No. 11032'], 0, 'The official history page identifies Republic Act No. 505.', ['travel-history']),
  question('history-03', 'History & Identity', 'medium', 'Which four icons make up the tourism portal’s MAHAL TANA story?', ['Mangyan, Halcon, Tamaraw, Naujan Lake', 'Mansalay, Alangan, Tadyawan, Naujan', 'Manila, Halcon, Taal, Nature', 'Mangrove, Harbor, Tourism, Navigation'], 0, 'The portal explains MAHAL TANA through Mangyan, Mt. Halcon, Tamaraw, and Naujan Lake.', ['tourism']),
  question('history-04', 'History & Identity', 'hard', 'What is the safest way to describe historical collection records?', ['As documented records with provenance and limits', 'As complete replacements for present-day voices', 'As permission to reproduce everything', 'As proof that all traditions are unchanged'], 0, 'The LOC and NCCA materials support source-aware learning, not blanket claims about living communities.', ['loc', 'ncca-mangyan']),
];

export const questCategories = Array.from(new Set(questQuestions.map((item) => item.category)));
