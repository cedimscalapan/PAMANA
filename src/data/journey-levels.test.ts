import {describe,it,expect} from 'vitest';
import {journeyLevels,journeyTrailPath,adventureZones} from './journey-levels';
import {heritageChapters} from './heritage-journey';

describe('SMART PAMANA connected 2D Journey levels',()=>{
 it('has exactly fifteen unique playable nodes tied to real hometown chapters',()=>{
  expect(journeyLevels).toHaveLength(15);
  expect(journeyLevels.map(level=>level.number)).toEqual(Array.from({length:15},(_,i)=>i+1));
  expect(new Set(journeyLevels.map(l=>l.chapter.id)).size).toBe(15);
  expect(journeyLevels.map(l=>l.chapter.id)).toEqual(heritageChapters.map(l=>l.id));
 });
 it('uses legible non-overlapping vertical positions with safe horizontal margins',()=>{
  for(const [index,level] of journeyLevels.entries()){
   expect(level.x).toBeGreaterThanOrEqual(75);
   expect(level.x).toBeLessThanOrEqual(275);
   expect(level.y).toBeGreaterThan(0);
   expect(level.y).toBeLessThan(1810);
   expect(level.zone).toBe(Math.floor(index/5)+1);
   if(index>0)expect(level.y-journeyLevels[index-1].y).toBeGreaterThanOrEqual(100);
  }
 });
 it('connects all nodes using exactly fourteen smooth curves',()=>{
  const d=journeyTrailPath();
  expect(d.startsWith('M ')).toBe(true);
  expect((d.match(/ C /g)??[])).toHaveLength(14);
  expect(journeyTrailPath([])).toBe('');
 });
 it('uses three clearly named thematic paths, not fictional geographic regions',()=>{
  expect(adventureZones.map(zone=>zone.range)).toEqual(['01—05','06—10','11—15']);
  expect(adventureZones).toHaveLength(3);
 });
});
