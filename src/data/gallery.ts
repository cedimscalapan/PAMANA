import tamaraw from '../assets/media/tamaraw-gregg-yan.jpg';
import naujan from '../assets/media/naujan.jpg';
import halcon from '../assets/media/halcon.jpg';
import puerto from '../assets/media/puerto-galera.jpg';
import calapanHall from '../assets/media/researched/calapan-hall.jpg';
import calapanPort from '../assets/media/researched/calapan-port.jpg';
import muelle from '../assets/media/researched/muelle-port.jpg';
import naujanSocorro from '../assets/media/researched/naujan-socorro.jpg';
import provenance from './photo-provenance.json';
import learningMedia from './learning-media.json';
import festivalMedia from './festival-media.json';
import { sourceById } from './content';
import fontLicense from '../assets/fonts/OFL.txt?raw';
export const hanunooFontLicense = fontLicense;

type PhotoBase = { id: string; title: string; src: string; description: string; folderId: string; credit: string; source: string; license: string; licenseUrl: string; location: string; lessonIds: string[]; placeIds: string[] };
export type CuratedPhoto = PhotoBase & { alt: string; kind: 'photograph' | 'diagram'; checkedAt: string; captureDate: string; changes: string; rightsHolder: string; rightsStatus: string; sourceIds: string[]; festivalIds: string[]; originalFile?: string; permissionNote?: string; subjectStatus?: string; subjectNote?: string };
const originalPhotos: PhotoBase[] = [
  { id: 'puerto', title: 'White Beach, Puerto Galera', src: puerto, description: 'White Beach seen from the sea. This photograph documents a coastal landscape; it does not represent all of Puerto Galera or its communities.', folderId: 'landscapes', credit: 'Eugene Alvin Villar (seav)', source: 'https://commons.wikimedia.org/wiki/File:PH_-_Puerto_Galera_-_White_Beach_-_from_sea_2.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', location: 'Puerto Galera, Oriental Mindoro', lessonIds: ['l11'], placeIds: ['puerto-galera'] },
  { id: 'naujan', title: 'Naujan Lake', src: naujan, description: 'A view of Naujan Lake and its surrounding landscape. Wetland learning connects the water, its habitats, and the people who depend on them.', folderId: 'landscapes', credit: 'Hariboneagle927', source: 'https://commons.wikimedia.org/wiki/File:Naujan_Lake.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', location: 'Oriental Mindoro', lessonIds: ['l12'], placeIds: ['naujan-lake'] },
  { id: 'halcon', title: 'Mount Halcon', src: halcon, description: 'Mount Halcon photographed from a distance. A landscape photograph is an introduction to the mountain, not a route guide or confirmation that trails are open.', folderId: 'landscapes', credit: 'Mil Del', source: 'https://commons.wikimedia.org/wiki/File:Mount_Halcon.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', location: 'Mindoro', lessonIds: ['l2', 'l14'], placeIds: ['mount-halcon'] },
  { id: 'tamaraw', title: 'Tamaraw · Bubalus mindorensis', src: tamaraw, description: 'The tamaraw is a wild buffalo endemic to Mindoro. This image supports learning about wildlife and habitat conservation; it is not a promise of a wildlife encounter.', folderId: 'wildlife', credit: 'Gregg Yan', source: 'https://commons.wikimedia.org/wiki/File:Bubalus_mindorensis_by_Gregg_Yan_02.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', location: 'Mindoro', lessonIds: ['l13'], placeIds: [] },
];
const researchedPhotos: PhotoBase[] = [
  { id: 'calapan-hall', title: 'Calapan City Hall', src: calapanHall, description: 'Calapan City Hall photographed in July 2019. This is the city hall, rather than the provincial heritage museum or old provincial capitol.', folderId: 'landscapes', credit: '', source: '', license: '', licenseUrl: '', location: 'Calapan City', lessonIds: [], placeIds: ['calapan'] },
  { id: 'calapan-port', title: 'Entrance to the Port of Calapan', src: calapanPort, description: 'The entrance gate to the Port of Calapan in December 2012. The photograph records a past appearance, rather than current transport or access arrangements.', folderId: 'landscapes', credit: '', source: '', license: '', licenseUrl: '', location: 'Calapan City', lessonIds: [], placeIds: [] },
  { id: 'muelle-port', title: 'Muelle waterfront, Puerto Galera', src: muelle, description: 'Boats and the Muelle waterfront in April 2023. This documents the harbor setting beside the heritage park, rather than every feature of the park.', folderId: 'landscapes', credit: '', source: '', license: '', licenseUrl: '', location: 'Puerto Galera', lessonIds: [], placeIds: ['muelle-cultural-heritage-park'] },
  { id: 'naujan-socorro', title: 'Naujan Lake viewed from Socorro', src: naujanSocorro, description: 'A view across Naujan Lake from Socorro, photographed in June 2020. The image record identifies the viewpoint’s municipality.', folderId: 'landscapes', credit: '', source: '', license: '', licenseUrl: '', location: 'Socorro, Oriental Mindoro', lessonIds: [], placeIds: [] },
];
const diagrams = import.meta.glob('../assets/media/learning/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const festivalFiles = import.meta.glob('../assets/media/festivals/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
export const curatedPhotos: CuratedPhoto[] = [
  ...[...originalPhotos, ...researchedPhotos].map(photo => ({ ...photo, ...provenance.find(item => item.id === photo.id), alt: photo.description, kind: 'photograph' as const, sourceIds: [], festivalIds: [] } as CuratedPhoto)),
  ...learningMedia.map(item => ({ ...item, kind: 'diagram' as const, source: sourceById(item.sourceIds[0])?.url ?? '', src: diagrams[`../assets/media/learning/${item.filename}`] })),
  ...festivalMedia.map(item => ({ ...item, kind: 'photograph' as const, src: festivalFiles[`../assets/media/festivals/${item.filename}`] })),
];
export const curatedFolders = [
  { id: 'landscapes', name: 'Places & landscapes', description: 'Coasts, mountains, and the water between.', coverId: 'puerto', tone: 'blue' },
  { id: 'wildlife', name: 'Nature & wildlife', description: 'Meet the living heritage of Mindoro.', coverId: 'tamaraw', tone: 'green' },
  { id: 'festivals', name: 'Festival photographs', description: 'The official portal’s images, matched to their celebrations. Individual credits and reuse terms remain unconfirmed.', coverId: 'festival-photo-pandang-gitab', tone: 'purple' },
  { id: 'learning', name: 'Learning illustrations', description: 'Original diagrams make writing, poetry, archives, and data easier to explore.', coverId: 'lesson-l5', tone: 'green' },
  { id: 'place-guides', name: 'Place reference guides', description: 'Labeled maps and text guides where a licensed documentary photograph is still needed.', coverId: 'place-bansud-museum', tone: 'blue' },
];
export const photoForLesson = (id: string) => curatedPhotos.find(photo => photo.lessonIds.includes(id));
export const photoForPlace = (id: string) => curatedPhotos.find(photo => photo.placeIds.includes(id));
export const photoForFestival = (id: string) => curatedPhotos.find(photo => photo.festivalIds.includes(id));
export const imageById = (id?: string) => curatedPhotos.find(photo => photo.id === id);
