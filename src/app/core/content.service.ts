import { Injectable, signal } from '@angular/core';
import { CONTENT_SOURCES, SourceStatus } from './database/content-sources';

export interface Lesson { id: string; title: string; category: string; summary: string; duration: number; completed: boolean; sourceStatus: SourceStatus; sourceId: string; }
export interface Place { name: string; municipality: string; type: string; description: string; }

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly lessons = signal<Lesson[]>([
    { id: 'l1', title: 'Getting to know Oriental Mindoro', category: 'History & Geography', summary: 'An introduction to the province, its towns, landscapes, and communities.', duration: 12, completed: false, sourceStatus: 'awaiting_review', sourceId: 'tourism-oriental-mindoro' },
    { id: 'l2', title: 'Mangyan communities of Mindoro', category: 'Communities', summary: 'Learn why the communities grouped under “Mangyan” should be understood on their own terms.', duration: 15, completed: false, sourceStatus: 'awaiting_review', sourceId: 'loc-mangyan-bamboo' },
    { id: 'l3', title: 'Hanunó’o script basics', category: 'Writing', summary: 'Explore the abugida structure, vowel signs, and Unicode characters used in modern Hanunó’o writing.', duration: 10, completed: false, sourceStatus: 'reviewed', sourceId: 'r12a-hanunoo' },
    { id: 'l4', title: 'Living traditions and shared memory', category: 'Traditions', summary: 'How culture is carried through practice, story, and place.', duration: 10, completed: false, sourceStatus: 'awaiting_review', sourceId: 'loc-mangyan-bamboo' }
  ]);
  readonly sources = CONTENT_SOURCES;
  readonly places: Place[] = [
    { name: 'Puerto Galera', municipality: 'Puerto Galera', type: 'Nature & heritage', description: 'A coastal locality presented by the provincial tourism portal as a destination for landscapes and cultural tourism.' },
    { name: 'Calapan City', municipality: 'Calapan City', type: 'City heritage', description: 'The provincial capital and a center for local learning and exchange.' },
    { name: 'Naujan Lake', municipality: 'Naujan', type: 'Environment', description: 'A significant wetland landscape connected to community life and conservation.' },
    { name: 'Mount Halcon', municipality: 'Baco', type: 'Nature', description: 'A major mountain landmark listed by the tourism portal; location and access details should be checked before travel.' },
    { name: 'Mangyan heritage', municipality: 'Mindoro', type: 'Community', description: 'Explore community knowledge only with proper attribution, consent, and cultural review.' }
  ];
  completeLesson(id: string): void { this.lessons.update(items => items.map(item => item.id === id ? { ...item, completed: true } : item)); }
  completedCount(): number { return this.lessons().filter(item => item.completed).length; }
}
