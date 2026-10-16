export type LocalAsset = {
  id: string;
  path: string;
  purpose: string;
  rights: 'provided_by_project_owner' | 'open_license_pending_attribution' | 'review_required';
  attribution?: string;
};

/** Only local assets are referenced by the app at runtime. */
export const localAssets: LocalAsset[] = [
  { id: 'ka-pamana-icon', path: '/assets/reference/ka-pamana-icon.png', purpose: 'App icon, profile avatar, and Ka-Pamana guide', rights: 'provided_by_project_owner' },
  { id: 'character-board', path: '/assets/reference/ka-pamana-character-board.png', purpose: 'Character reference and visual design guidance', rights: 'provided_by_project_owner' },
  { id: 'showcase-board', path: '/assets/reference/smart-pamana-showcase.png', purpose: 'UI/UX reference board bundled for design review', rights: 'provided_by_project_owner' }
];
