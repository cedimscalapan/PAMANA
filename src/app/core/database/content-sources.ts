export type SourceStatus = 'reviewed' | 'awaiting_review';

export interface ContentSource {
  id: string;
  title: string;
  url: string;
  publisher: string;
  status: SourceStatus;
  note: string;
}

/** Offline attribution registry. URLs are references only; the app never fetches them at runtime. */
export const CONTENT_SOURCES: ContentSource[] = [
  { id: 'tourism-oriental-mindoro', title: 'Travel Oriental Mindoro', url: 'https://www.travelorientalmindoro.ph/', publisher: 'Oriental Mindoro tourism portal', status: 'awaiting_review', note: 'Used for place names, province overview, and travel context. Recheck time-sensitive details before publication.' },
  { id: 'loc-mangyan-bamboo', title: 'Mangyan Bamboo Collection: Background', url: 'https://guides.loc.gov/mangyan-bamboo-collection/background', publisher: 'Library of Congress', status: 'awaiting_review', note: 'Used for a respectful overview of Mangyan communities, ambahan, and writing traditions.' },
  { id: 'r12a-hanunoo', title: 'Hanunó’o orthography notes', url: 'https://r12a.github.io/scripts/hano/hnn.html', publisher: 'Richard Ishida / r12a', status: 'reviewed', note: 'Used for the writing lesson’s Unicode and orthography reference. Examples still need language-community review.' },
  { id: 'ppdo-oriental-mindoro', title: 'Provincial Planning and Development Office', url: 'https://ppdo.ormindoro.gov.ph', publisher: 'Oriental Mindoro PPDO', status: 'awaiting_review', note: 'Reference requested by the project owner; source was unavailable during this content pass.' }
];
