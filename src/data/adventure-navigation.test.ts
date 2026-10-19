import {describe,expect,it} from 'vitest';
import {adventureTabs,supportingRoutes,tabForSection} from './adventure-navigation';
describe('SMART PAMANA finalized five-feature navigation',()=>{
 it('uses exactly five simple Tagalog-labeled destinations',()=>{
  expect(adventureTabs.map(t=>t.label)).toEqual(['Simula','Lakbay','Matuto','Sulat','Pamana']);
  expect(adventureTabs.map(t=>t.path)).toEqual(['/home','/journey','/learn','/writing','/my-pamana']);
  expect(new Set(adventureTabs.map(t=>t.path)).size).toBe(5);
 });
 it('maps historical feature pages into the right destination',()=>{
  for(const x of ['journey','explore','quest'] as const)expect(tabForSection(x)).toBe('journey');
  for(const x of ['my-pamana','stories','collection','profile','settings','more'] as const)expect(tabForSection(x)).toBe('my-pamana');
  expect(tabForSection('writing')).toBe('writing');
  expect(tabForSection('home')).toBe('home');
  expect(tabForSection('learn')).toBe('learn');
 });
 it('preserves every original deep link destination',()=>{
  for(const path of ['/explore','/quest','/stories','/collection','/profile','/settings','/more','/onboarding','/welcome'])
   expect(supportingRoutes).toContain(path);
 });
});
