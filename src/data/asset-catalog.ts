export type LocalAsset = {
  id: string;
  path: string;
  purpose: string;
  rights: 'provided_by_project_owner' | 'open_license_with_attribution' | 'review_required';
  attribution?: string;
};

import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';
import characterBoard from '../assets/reference/ka-pamana-character-board.png';
import showcaseBoard from '../assets/reference/smart-pamana-showcase.png';
import { curatedPhotos } from './gallery';

/** Only local assets are referenced by the app at runtime. */
export const localAssets: LocalAsset[] = [
  { id: 'ka-pamana-icon', path: kaPamanaIcon, purpose: 'App icon, profile avatar, and Ka-Pamana guide', rights: 'provided_by_project_owner' },
  { id: 'character-board', path: characterBoard, purpose: 'Character reference and visual design guidance', rights: 'provided_by_project_owner' },
  { id: 'showcase-board', path: showcaseBoard, purpose: 'UI/UX reference board bundled for design review', rights: 'provided_by_project_owner' },
  ...curatedPhotos.map(image => ({ id: image.id, path: image.src, purpose: image.title, rights: image.rightsStatus === 'open-license' ? 'open_license_with_attribution' as const : 'review_required' as const, attribution: `${image.credit}. ${image.license}. Source: ${image.source}` })),
];
