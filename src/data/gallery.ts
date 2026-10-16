import tamaraw from '../assets/media/tamaraw-gregg-yan.jpg';
import naujan from '../assets/media/naujan.jpg';
import halcon from '../assets/media/halcon.jpg';
import puerto from '../assets/media/puerto-galera.jpg';

export type CuratedPhoto = { id: string; title: string; src: string; description: string; folderId: string; credit: string; source: string; license: string; licenseUrl: string; location: string; lessonIds: string[]; placeIds: string[] };
export const curatedPhotos: CuratedPhoto[] = [
  { id: 'puerto', title: 'White Beach, Puerto Galera', src: puerto, description: 'White Beach seen from the sea. This photograph documents a coastal landscape; it does not represent all of Puerto Galera or its communities.', folderId: 'landscapes', credit: 'Eugene Alvin Villar (seav)', source: 'https://commons.wikimedia.org/wiki/File:PH_-_Puerto_Galera_-_White_Beach_-_from_sea_2.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', location: 'Puerto Galera, Oriental Mindoro', lessonIds: ['l1', 'l11'], placeIds: ['puerto-galera'] },
  { id: 'naujan', title: 'Naujan Lake', src: naujan, description: 'A view of Naujan Lake and its surrounding landscape. Wetland learning connects the water, its habitats, and the people who depend on them.', folderId: 'landscapes', credit: 'Hariboneagle927', source: 'https://commons.wikimedia.org/wiki/File:Naujan_Lake.jpg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', location: 'Oriental Mindoro', lessonIds: ['l12'], placeIds: ['naujan-lake'] },
  { id: 'halcon', title: 'Mount Halcon', src: halcon, description: 'Mount Halcon photographed from a distance. A landscape photograph is an introduction to the mountain, not a route guide or confirmation that trails are open.', folderId: 'landscapes', credit: 'Mil Del', source: 'https://commons.wikimedia.org/wiki/File:Mount_Halcon.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', location: 'Mindoro', lessonIds: ['l2', 'l14'], placeIds: ['mount-halcon'] },
  { id: 'tamaraw', title: 'Tamaraw · Bubalus mindorensis', src: tamaraw, description: 'The tamaraw is a wild buffalo endemic to Mindoro. This image supports learning about wildlife and habitat conservation; it is not a promise of a wildlife encounter.', folderId: 'wildlife', credit: 'Gregg Yan', source: 'https://commons.wikimedia.org/wiki/File:Bubalus_mindorensis_by_Gregg_Yan_02.jpg', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', location: 'Mindoro', lessonIds: ['l13'], placeIds: [] },
];
export const curatedFolders = [
  { id: 'landscapes', name: 'Places & landscapes', description: 'Coasts, mountains, and the water between.', coverId: 'puerto', tone: 'blue' },
  { id: 'wildlife', name: 'Nature & wildlife', description: 'Meet the living heritage of Mindoro.', coverId: 'tamaraw', tone: 'green' },
];
export const photoForLesson = (id: string) => curatedPhotos.find(photo => photo.lessonIds.includes(id));
export const photoForPlace = (id: string) => curatedPhotos.find(photo => photo.placeIds.includes(id));
