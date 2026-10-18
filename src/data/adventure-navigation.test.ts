import {describe,expect,it} from 'vitest';
import {adventureTabs,supportingRoutes,tabForSection} from './adventure-navigation';
describe('phase 01 adventure navigation',()=>{
 it('uses exactly five clear tab destinations',()=>{
   expect(adventureTabs.map(t=>t.label)).toEqual(['Home','Journey','Matuto','Quest','More']);
   expect(adventureTabs.map(t=>t.path)).toEqual(['/home','/journey','/learn','/quest','/more']);
   expect(new Set(adventureTabs.map(t=>t.path)).size).toBe(5);
 });
 it('keeps heritage exploration visible through Journey while other modules remain in More',()=>{
   expect(tabForSection('explore')).toBe('journey');
   for(const section of ['writing','stories','collection','settings'] as const)expect(tabForSection(section)).toBe('more');
   for(const section of ['home','journey','learn','quest','more'] as const)expect(tabForSection(section)).toBe(section);
 });
 it('does not remove any existing content or profile destination',()=>{
   for(const route of ['/explore','/writing','/stories','/collection','/profile','/settings','/onboarding'])
     expect(supportingRoutes).toContain(route);
 });
});
