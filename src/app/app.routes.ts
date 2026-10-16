import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { OnboardingPage } from './onboarding/onboarding.page';
import { LearnPage } from './learn/learn.page';
import { WritingPage } from './writing/writing.page';
import { ExplorePage } from './explore/explore.page';
import { QuestPage } from './quest/quest.page';
import { StoriesPage } from './stories/stories.page';
import { CollectionPage } from './collection/collection.page';
import { SettingsPage } from './settings/settings.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'onboarding', component: OnboardingPage },
  { path: 'home', component: HomePage },
  { path: 'learn', component: LearnPage },
  { path: 'writing', component: WritingPage },
  { path: 'explore', component: ExplorePage },
  { path: 'quest', component: QuestPage },
  { path: 'stories', component: StoriesPage },
  { path: 'collection', component: CollectionPage },
  { path: 'settings', component: SettingsPage },
  { path: '**', redirectTo: 'home' }
];
