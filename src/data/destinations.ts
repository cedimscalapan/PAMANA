import { places, Place } from './content';
import { placeBackgrounds } from './place-details';
import records from './destination-records.json';

export type Destination = Place & { background: string; notice: string; focus: string[]; address: string; sourceUrl: string; verifiedAt: string; protectedCommunity?: boolean };
const slugs: Record<string, string> = {
  'mangyan-cubool': 'mangyan-cubool-cultural-booth-of-love',
  'oriental-mindoro-heritage-cultural-center': 'oriental-mindoro-heritage-and-cultural-center',
  'oriental-mindoro-heritage-museum-calapan': 'oriental-mindoro-heritage-museum',
};
const raw = records as Record<string, { address: string; url: string; latitude: number | null; longitude: number | null }>;
export const destinations: Destination[] = places.filter(place => place.id !== 'mangyan-heritage').map(place => {
  const record = raw[slugs[place.id] ?? place.id];
  const details = placeBackgrounds[place.id];
  const defaults: Record<string, typeof details> = {
    'puerto-galera': { background: 'Puerto Galera brings together a coastal town, bays, beaches, and public heritage places. White Beach and Muelle are different locations within the municipality, so use a specific destination name when arranging a visit. The shared image in this entry shows White Beach from the water; it is not a photograph of Muelle Cultural Heritage Park. Open the separate Muelle record for the park’s address and source-linked map point.', notice: 'Confirm your specific destination, transport arrangements, weather, and local access information. Ask before photographing people.', focus: ['Coastal landscape and harbor setting', 'The distinct places within one municipality'] },
    calapan: { background: 'Calapan City is the capital of Oriental Mindoro. It is counted as the province’s component city, alongside 14 municipalities. For a focused heritage visit, explore the separate record for the Oriental Mindoro Heritage Museum at the old provincial capitol site. A city is a broad geographic setting, so this overview does not place an arbitrary marker at a presumed visitor entrance.', notice: 'Use the address of the institution or destination you intend to visit. Verify its current hours and access arrangements.', focus: ['Provincial administration and city setting', 'The museum and other named institutions'] },
    'mount-halcon': { background: 'Mount Halcon is a major mountain landmark of Mindoro associated with Baco in the provincial learning references. It provides a setting for thinking about terrain, watersheds, and the relationship between landscapes and cultural learning. This entry offers a landscape introduction and a credited photograph. It does not contain a verified trailhead, current trekking program, or permission to climb.', notice: 'Current permits, trail conditions, access restrictions, and local or community requirements have not been verified. Seek guidance from the responsible local office before planning a mountain visit.', focus: ['Mountain landscape and physical geography', 'The difference between a landmark and an accessible itinerary'] },
  };
  const detail = details ?? defaults[place.id];
  const protectedCommunity = place.id === 'mangyan-villages';
  return { ...place, ...detail, description: detail.background.split(/(?<=\.)\s/)[0], address: record?.address || `${place.municipality}, Oriental Mindoro`,
    sourceUrl: record?.url ?? (place.id === 'calapan' ? 'https://ppdo.ormindoro.gov.ph/provincialdata/general-information/' : 'https://www.travelorientalmindoro.ph/'),
    sourceIds: [...place.sourceIds, ...(record ? [`destination-${slugs[place.id] ?? place.id}`] : [])],
    latitude: !protectedCommunity && record?.latitude ? record.latitude : undefined,
    longitude: !protectedCommunity && record?.longitude ? record.longitude : undefined,
    verifiedAt: record ? '2026-10-17' : '2026-10-16', protectedCommunity,
  };
});

export const destinationSources = destinations.filter(place => raw[slugs[place.id] ?? place.id]).map(place => ({ id: `destination-${place.id}`, title: place.name, publisher: 'Oriental Mindoro Provincial Tourism Office', url: place.sourceUrl, status: place.protectedCommunity ? 'Public listing; community access requires consent' : 'Public description checked 17 October 2026', use: 'Destination background, published address, and reference coordinates where provided.' }));
