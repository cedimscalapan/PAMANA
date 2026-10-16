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
import tamarawImage from '../assets/media/tamaraw-gregg-yan.jpg';

/** Only local assets are referenced by the app at runtime. */
export const localAssets: LocalAsset[] = [
  { id: 'ka-pamana-icon', path: kaPamanaIcon, purpose: 'App icon, profile avatar, and Ka-Pamana guide', rights: 'provided_by_project_owner' },
  { id: 'character-board', path: characterBoard, purpose: 'Character reference and visual design guidance', rights: 'provided_by_project_owner' },
  { id: 'showcase-board', path: showcaseBoard, purpose: 'UI/UX reference board bundled for design review', rights: 'provided_by_project_owner' },
  { id: 'tamaraw', path: tamarawImage, purpose: 'Offline wildlife learning card', rights: 'open_license_with_attribution', attribution: 'Gregg Yan, CC BY-SA 3.0, via Wikimedia Commons' },
];
