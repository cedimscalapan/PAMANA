import { festivals } from './content';
import { destinations } from './destinations';
import { readingExcerpt } from './reading-utils';

export type CulturalFact = {
  id: string; title: string; explanation: string; category: string; topic: string;
  locality: string; sourceIds: string[]; verifiedAt: string; referenceYear?: string;
  lessonId?: string; placeId?: string; festivalId?: string; imageId?: string;
};
type Entry = [id: string, title: string, explanation: string, topic: string, lessonId?: string, imageId?: string, referenceYear?: string];
const pack = (category: string, locality: string, sourceIds: string[], rows: Entry[]): CulturalFact[] => rows.map(([id, title, explanation, topic, lessonId, imageId, referenceYear]) => ({ id, title, explanation, topic, lessonId, imageId, referenceYear, category, locality, sourceIds, verifiedAt: '2026-10-17' }));

/** Original short readings. Topic keys intentionally group related claims, preventing disguised repeats. */
export const culturalFacts: CulturalFact[] = [
  ...pack('Geography', 'Oriental Mindoro', ['ppdo-general'], [
    ['capital', 'A city at the heart of the province', 'Calapan City is the provincial capital. It is also Oriental Mindoro’s one component city, alongside fourteen municipalities.', 'administration', 'l1', 'calapan-hall'],
    ['region', 'Part of MIMAROPA', 'Oriental Mindoro belongs to Region IV-B, known as MIMAROPA. Mindoro is an island; Oriental Mindoro is a province on it.', 'region', 'l1', 'lesson-l1'],
    ['barangays', '426 barangays', 'The provincial profile lists 426 barangays. A barangay is a smaller administrative unit than a municipality or city.', 'administration', 'l1'],
    ['land-area', 'Reading the land-area figure', 'PPDO reports 4,364.72 square kilometres, equivalent to 436,472 hectares. Keep the unit attached when comparing province profiles.', 'area', 'l2', 'halcon', 'PPDO profile checked 2026'],
    ['north-water', 'Water to the north', 'Verde Island Passage is the province’s northern water boundary in the PPDO profile. It separates this part of Mindoro from Batangas.', 'boundaries', 'l2', 'lesson-l1'],
    ['east-water', 'Looking east', 'The PPDO names Tablas Strait and Maestro del Campo Island on the eastern side of Oriental Mindoro’s geographic setting.', 'boundaries', 'l2'],
    ['west-neighbour', 'A neighbouring province on the same island', 'Occidental Mindoro lies to the west. “Mindoro” and “Oriental Mindoro” therefore describe different geographic extents.', 'boundaries', 'l2'],
    ['terrain', 'An irregular coastline', 'The provincial profile describes rugged terrain and an irregular coastline, crossed by numerous rivers and streams.', 'terrain', 'l2', 'halcon'],
    ['climate', 'Two climate types in one province', 'PPDO describes Type I and Type III climate areas. This regional classification is background information, rather than a forecast for a visit.', 'climate', 'l2'],
  ]),
  ...pack('Population', 'Oriental Mindoro', ['psa-2024'], [
    ['census-total', '919,504 people in 2024', 'The 2024 POPCEN counted 919,504 residents as of 1 July 2024. This is a census count, rather than today’s live population.', 'census', 'l3', 'lesson-l3', '2024'],
    ['census-change', 'Change between two censuses', 'PSA reports 11,165 more residents in 2024 than in 2020. The comparison uses 908,339 for 2020 and 919,504 for 2024.', 'census', 'l3', 'lesson-l3', '2020–2024'],
    ['census-growth', 'Growth has a time period', 'The average annual population growth rate was 0.29% for 2020–2024, compared with 1.56% for 2015–2020.', 'census', 'l3', 'lesson-l3', '2015–2024'],
    ['calapan-count', 'Calapan’s 2024 population', 'Calapan had 148,558 residents, the largest city or municipality count in the province’s 2024 census release.', 'city-populations', 'l3', 'calapan-hall', '2024'],
    ['naujan-count', 'Naujan’s 2024 population', 'Naujan recorded 109,122 residents in 2024, second among the province’s city and municipalities. Population rank differs from land-area rank.', 'city-populations', 'l3', undefined, '2024'],
    ['teodoro-count', 'San Teodoro’s 2024 population', 'San Teodoro recorded 19,650 residents, the smallest municipal population in the 2024 provincial release.', 'city-populations', 'l3', undefined, '2024'],
    ['bulalacao-growth', 'Bulalacao in the growth figures', 'Bulalacao recorded the province’s fastest municipal annual population growth, 1.10% between 2020 and 2024.', 'census-growth-local', 'l3', undefined, '2020–2024'],
    ['regional-share', 'A regional perspective', 'Oriental Mindoro accounted for about 28.3% of MIMAROPA’s population in the 2024 census.', 'regional-population', 'l3', undefined, '2024'],
  ]),
  ...pack('Writing & language', 'Hanunó’o writing', ['unicode', 'hanunoo'], [
    ['abugida', 'A consonant carries a vowel', 'Hanunó’o is an abugida: a consonant letter normally includes an inherent a vowel. Vowel signs modify that reading.', 'script-structure', 'l5', 'lesson-l5'],
    ['three-vowels', 'Three independent vowel letters', 'The inventory includes A, I and U as independent letters. They are different characters from the combining vowel signs.', 'script-inventory', 'l5', 'lesson-l5'],
    ['fifteen-consonants', 'Fifteen consonant letters', 'The Hanunó’o inventory has fifteen consonant letters, including NGA as a single letter rather than two Latin characters.', 'script-inventory', 'l5', 'lesson-l5'],
    ['vowel-signs', 'Two signs, several vowel sounds', 'The I sign also represents e, and the U sign also represents o. A Latin spelling is therefore not a one-to-one character substitution.', 'script-structure', 'l5', 'lesson-l5'],
    ['pamudpod', 'Marking vowel absence', 'Pamudpod, encoded as U+1734, marks the absence of an inherent vowel in modern Hanunó’o orthography.', 'script-signs', 'l6', 'lesson-l6'],
    ['unicode-range', 'A block and its assigned characters', 'The Hanunoo Unicode block spans U+1720–U+173F. Its 23 assigned characters run through U+1736; these ranges describe different things.', 'script-encoding', 'l6', 'lesson-l6'],
    ['punctuation', 'Punctuation shared with other scripts', 'U+1735 and U+1736 are Philippine single and double punctuation. They are punctuation marks, rather than syllable letters.', 'script-signs', 'l6', 'lesson-l6'],
    ['glyph-variation', 'Fonts are representations', 'Unicode notes that its reference glyphs are not prescriptive. A font’s printed letter shape does not capture every handwriting variation.', 'script-fonts', 'l6'],
  ]),
  ...pack('Poetry & transmission', 'Hanunuo Mangyan · Mansalay', ['ncca-ginaw', 'ncca-ambahan'], [
    ['ambahan-meter', 'Seven syllables to a line', 'NCCA describes ambahan as poetry built from seven-syllable lines. Its form belongs in the context of Hanunuo Mangyan expression.', 'ambahan-form', 'l7', 'lesson-l7'],
    ['ambahan-images', 'Meaning through images', 'Ambahan communicates through metaphors and images. Its subjects include advice, hospitality, courtship and farewell.', 'ambahan-meaning', 'l7', 'lesson-l7'],
    ['ginaw-award', 'Ginaw Bilog’s 1993 recognition', 'Ginaw Bilog, a Hanunuo Mangyan poet from Panaytayan, was recognized as a National Living Treasure in 1993.', 'ginaw-bilog', 'l8', 'lesson-l8', '1993'],
    ['ginaw-records', 'Bamboo and notebooks', 'Ginaw Bilog kept ambahan on bamboo tubes and in notebooks, including poetry inherited from his father and grandfather.', 'ginaw-recording', 'l8', 'lesson-l8'],
    ['living-school', 'Learning from a culture bearer', 'NCCA’s 2003 account describes Bilog teaching young people in Bait, Mansalay. A School of Living Traditions passes skills through practical learning.', 'teaching', 'l8', undefined, '2003 account'],
  ]),
  ...pack('Communities & literature', 'Mindoro', ['loc'], [
    ['umbrella', 'Many communities within one umbrella term', 'The Library of Congress identifies eight Mangyan groups with distinct languages. A shared umbrella name does not make them one culture.', 'communities', 'l4', 'lesson-l4'],
    ['named-groups', 'Names deserve their context', 'The guide names Iraya, Alangan, Tadyawan, Tawbuid, Bangon, Buhid, Hanunuo and Ratagnon. Spellings can vary across sources and communities.', 'communities', 'l4', 'lesson-l4'],
    ['two-scripts', 'Distinct writing traditions', 'The guide distinguishes Surat Hanunuo Mangyan from Surat Buhid Mangyan. Learning one script does not mean knowing both.', 'writing-traditions', 'l5'],
    ['urukay', 'Urukay is a different poetic form', 'The guide describes urukay with eight-syllable lines and guitar accompaniment, distinguishing it from ambahan.', 'literary-forms', 'l7'],
    ['adahiyo', 'Another form in the historical guide', 'Adahiyo is described with usually six syllables per line and no fixed end rhyme. The guide documents a form, not every current performance.', 'literary-forms', 'l7'],
    ['bamboo-preservation', 'Why the writing surface matters', 'Bamboo deteriorates in a tropical climate. Preserving an inscribed object therefore presents different challenges from keeping a printed book.', 'material-preservation', 'l9', 'lesson-l9'],
  ]),
  ...pack('Collections & archives', 'Mindoro · Library of Congress collection', ['loc-introduction'], [
    ['bamboo-77', 'Seventy-seven bamboo objects', 'The Library of Congress holds 71 bamboo slats and six cylinders in this collection. Both verse and prose appear in its records.', 'collection-inventory', 'l9', 'lesson-l9', 'Collection circa 1900–1939'],
    ['luyon-records', 'Luyon’s writing covers everyday life', 'Forty-eight slats are attributed to Luyon. Their subjects include agriculture, education and stages of life.', 'luyon', 'l10', 'lesson-l10', '1938–1939 collection context'],
    ['kabal-records', 'Kabal and the verse collection', 'Twenty-two verse items are attributed to Kabal. The guide distinguishes writing or copying a poem from claiming its original composition.', 'kabal', 'l9', 'lesson-l9', 'Collection circa 1900–1939'],
    ['balik-records', 'Balik’s six cylinders', 'Balik is credited with the collection’s six prose cylinders. A bamboo manuscript need not contain poetry.', 'balik', 'l9', 'lesson-l9', '1938'],
    ['accompanying-docs', 'More than photographs of objects', 'The collection includes typed and handwritten Romanized transliterations and translations, helping readers connect objects with documented interpretations.', 'documentation', 'l10', 'lesson-l10'],
    ['indic-volumes', 'A three-volume publication', 'Indic Writings of the Mindoro Palawan Axis appeared in three volumes in 1939–1940, including vocabulary and grammar alongside manuscript studies.', 'publication-history', 'l10', undefined, '1939–1940'],
  ]),
  ...pack('Historical research', 'Mindoro · archival collection', ['loc-provenance'], [
    ['maliwanag', 'The Maliwanag brothers’ contribution', 'Ildefonso and Eusebio Maliwanag helped acquire, transliterate and translate material for the collection. Its history involves local collaborators as well as Gardner.', 'research-collaboration', 'l10', 'lesson-l10', '1938–1939'],
    ['bacal', 'Translation was collaborative', 'The provenance guide also names Guillermo Bacal among contributors to English translation and collecting. Collection labels can hide a wider research network.', 'research-collaboration', 'l10', undefined, '1938–1939'],
    ['set1-dating', 'An honest uncertainty in the record', 'The guide finds conflicting evidence for the collection date of Set 1. It concludes the items were collected no later than 1939.', 'dating-uncertainty', 'l10', undefined, 'No later than 1939'],
    ['luyon-biography', 'A name can survive while a biography remains disputed', 'Historical accounts disagree about Luyon’s biographical details. The guide retains that disagreement while identifying Luyon with Set 2.', 'luyon', 'l10'],
    ['1938-project', 'A study renewed in 1938', 'Gardner began a study of Philippine Indic scripts in 1938, working with the Maliwanag brothers and material from several collections.', 'research-project', 'l10', undefined, '1938'],
    ['collections-network', 'Related objects live in different institutions', 'The provenance guide points to related Gardner collections at the Newberry Library, University of Michigan and Witte Museum.', 'collections-network', 'l10'],
  ]),
  ...pack('Heritage institutions', 'Mangyan Heritage Center · Calapan', ['mhc-library'], [
    ['mhc-documents', 'A catalogue spanning centuries', 'The Center describes more than 2,000 Mangyan-related documents, from the 1570s onward. This is the institution’s catalogue description, not a live inventory.', 'mhc-catalogue', 'l9', undefined, 'Institutional page checked 2026'],
    ['bibliography', 'A bibliography as a research doorway', 'Antoon Postma’s Annotated Mangyan Bibliography 1570–1988 was published in 1988. A bibliography identifies sources rather than replacing their contents.', 'bibliography', 'l10', undefined, '1988'],
    ['bamboo-whispers', 'Bamboo Whispers appeared in 2017', 'The book presents one hundred poems in the original Hanunuo Mangyan and translations in Filipino, English and Spanish, using two scripts.', 'bamboo-whispers', 'l7', undefined, '2017'],
    ['book-awards', 'Recognition for a translated book', 'The Center records Bamboo Whispers winning Best Translated Book at the 37th National Book Awards and a 2018 Gintong Aklat award.', 'bamboo-whispers', 'l7', undefined, '2018 / 37th National Book Awards'],
    ['audio-archive', 'An archive of voiced poetry', 'The Center describes over 20,000 digitally preserved ambahan recordings with transcription. Catalogue access does not grant permission to redistribute recordings.', 'audio-archive', 'l7', undefined, 'Institutional page checked 2026'],
    ['document-request', 'A catalogue record is not a download license', 'The Center offers a document-request service with approval. A publicly visible record and permission to reproduce its document are separate matters.', 'archive-access', 'l10'],
  ]),
  ...pack('Documentary heritage', 'Mindoro & Palawan', ['unesco-paleographs'], [
    ['unesco-year', 'Registered in 1999', 'UNESCO’s Philippine Paleographs record gives 1998 as the submission year and 1999 as the registration year. These dates should not be interchanged.', 'unesco-dates', 'l6', undefined, '1998–1999'],
    ['four-traditions', 'Four traditions in one UNESCO record', 'The inscription names Hanunoo, Buid, Tagbanua and Pala’wan. The record brings together writing traditions from Mindoro and Palawan.', 'unesco-traditions', 'l5'],
    ['documentary-register', 'Memory of the World', 'Philippine Paleographs appears in UNESCO’s documentary-heritage register. Its recognition concerns writing traditions rather than designating a tourist monument.', 'heritage-register', 'l6'],
  ]),
  ...pack('Provincial history', 'Oriental & Occidental Mindoro', ['ra505', 'proc186'], [
    ['division-law', 'Two dates in the province’s creation', 'Republic Act 505 was approved on 13 June 1950. Proclamation 186 set its effectivity to 15 November 1950.', 'province-creation', 'l14', undefined, '1950'],
    ['division-capitals', 'Two provinces, two capitals', 'Republic Act 505 identifies Calapan for Oriental Mindoro and Mamburao for Occidental Mindoro. These capitals belong to separate provinces on one island.', 'division-capitals', 'l1', 'calapan-hall', '1950 act'],
  ]),
  ...pack('Nature & heritage', 'Naujan Lake · Oriental Mindoro', ['travel-naujan'], [
    ['lake-four-towns', 'A lake connected with four municipalities', 'Naujan Lake borders Naujan, Victoria, Socorro and Pola. Its name should not hide the landscape’s connections across municipal boundaries.', 'naujan-geography', 'l12', 'naujan'],
    ['lake-birds', 'A wetland for resident and migratory birds', 'The provincial lake account highlights both local and migratory water birds, alongside varied fish. Wetland learning reaches beyond the water’s scenic surface.', 'wetland-life', 'l12', 'naujan-socorro'],
    ['lake-ranking', 'A freshwater landmark', 'The provincial portal identifies Naujan Lake as the Philippines’ fifth-largest lake and the province’s largest freshwater lake.', 'lake-scale', 'l12', 'naujan'],
  ]),
  ...pack('Conservation history', 'Naujan Lake', ['ramsar-naujan'], [
    ['park-1956', 'A national park history beginning in 1956', 'The Ramsar information sheet records the national park’s proclamation on 27 March 1956 and an amendment dated 25 January 1968.', 'park-history', 'l12', 'naujan', '1956 / 1968'],
  ]),
  ...pack('Wildlife & learning', 'Mindoro', ['denr-corridor', 'denr-tamaraw'], [
    ['tamaraw-endemic', 'Mindoro’s own wild buffalo', 'The tamaraw, Bubalus mindorensis, is endemic to Mindoro. Endemic describes its restricted natural distribution, rather than whether a visitor can see one.', 'tamaraw-species', 'l13', 'tamaraw'],
    ['corridor-learning', 'Conservation can begin in the classroom', 'DENR’s October 2024 Dalaw Turo campaign used Mindoro’s critically endangered tamaraw to introduce learners to biodiversity and habitat conservation.', 'environmental-learning', 'l13', 'tamaraw', 'October 2024'],
  ]),
  ...pack('Travel & interpretation', 'Oriental Mindoro', ['travel-lakbay'], [
    ['lakbay-word', 'The journey in LAKBAY', 'The provincial portal explains LAKBAY as “travel” or “journey” in Filipino. It brings destinations, events and planning references into one service.', 'travel-word', 'l11', 'puerto'],
    ['sustainable-tourism', 'Travel connects with local livelihoods', 'The portal’s stated mission links sustainable tourism with local communities and the preservation of natural and cultural heritage.', 'sustainable-travel', 'l11', 'muelle-port'],
  ]),
  ...pack('Crafts & materials', 'Mindoro · community-specific craft traditions', ['mhc-crafts'], [
    ['craft-materials', 'Materials connect making with place', 'The Center’s craft gallery describes cotton, vines, bamboo, bark and wood, alongside materials obtained through trade. Craft traditions do not depend on one material alone.', 'craft-materials', 'l4'],
    ['buri-bag', 'A named Hanunuo Mangyan bag', 'The gallery identifies bay-ong sinuluyan as a Hanunuo Mangyan bag made from narrow buri-palm strips, used for small personal items.', 'hanunuo-bag', 'l4'],
    ['weaving-preparation', 'Weaving begins before the loom', 'The Center highlights material preparation and indigo dyeing in its account of weaving. Finished cloth records skills beyond the visible pattern.', 'weaving-process', 'l4'],
  ]),
  // Each named place and festival retains its own direct official source and related route.
  ...destinations.filter(place => !['puerto-galera', 'calapan', 'mount-halcon', 'naujan-lake', 'mangyan-villages'].includes(place.id)).map(place => ({
    id: `place-${place.id}`, title: place.name, explanation: readingExcerpt(place.background, 2),
    category: place.type.includes('Nature') || place.type.includes('Island') ? 'Landscapes' : 'Places & craftsmanship', topic: place.id,
    locality: place.municipality, sourceIds: place.sourceIds, verifiedAt: place.verifiedAt, placeId: place.id,
  })),
  ...festivals.map(festival => ({
    id: `festival-${festival.id}`, title: festival.name, explanation: `${readingExcerpt(festival.description, 2)} The directory’s recurring date is ${new Date(2000, festival.month - 1, festival.day).toLocaleDateString('en-PH', { month: 'long', day: 'numeric' })}; confirm each year’s program.`,
    category: 'Festivals', topic: `festival-${festival.id}`, locality: festival.municipality, sourceIds: festival.sourceIds,
    verifiedAt: '2026-10-17', referenceYear: 'Annual directory checked 2026', festivalId: festival.id,
  })),
];
