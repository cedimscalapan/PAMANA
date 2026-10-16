import { Injectable, signal } from '@angular/core';

export interface Lesson { id: string; title: string; category: string; summary: string; duration: number; completed: boolean; sourceStatus: 'awaiting_review' | 'reviewed'; }
export interface Place { name: string; municipality: string; type: string; description: string; }

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly lessons = signal<Lesson[]>([
    { id: 'l1', title: 'Getting to know Oriental Mindoro', category: 'History & Geography', summary: 'An introduction to the province, its landscapes, and communities.', duration: 12, completed: false, sourceStatus: 'awaiting_review' },
    { id: 'l2', title: 'Mangyan communities of Mindoro', category: 'Communities', summary: 'Learn why each community should be understood on its own terms.', duration: 15, completed: false, sourceStatus: 'awaiting_review' },
    { id: 'l3', title: 'Living traditions and shared memory', category: 'Traditions', summary: 'How culture is carried through practice, story, and place.', duration: 10, completed: false, sourceStatus: 'awaiting_review' }
  ]);
  readonly places: Place[] = [
    { name: 'Puerto Galera', municipality: 'Puerto Galera', type: 'Nature & heritage', description: 'A coastal locality known for rich landscapes and cultural tourism.' },
    { name: 'Calapan City', municipality: 'Calapan City', type: 'City heritage', description: 'The provincial capital and a center for local learning and exchange.' },
    { name: 'Naujan Lake', municipality: 'Naujan', type: 'Environment', description: 'A significant natural landscape connected to community life.' },
    { name: 'Mangyan heritage', municipality: 'Baco', type: 'Community', description: 'Explore verified community knowledge only with proper attribution and review.' }
  ];
  completeLesson(id: string): void { this.lessons.update(items => items.map(item => item.id === id ? { ...item, completed: true } : item)); }
  completedCount(): number { return this.lessons().filter(item => item.completed).length; }
}
