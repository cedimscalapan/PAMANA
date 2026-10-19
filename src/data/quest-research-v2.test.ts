import {describe,expect,it} from 'vitest';
import {localityQuestQuestions,sortingItems,wordItems,createRounds,photoItems,mapItems,timelineItems} from './quest-games';
import {localityProfiles,festivalProfiles} from './journey-research';
import {sources} from './content';

describe('refreshed educational mini games and free-play bank',()=>{
 it('contains locally unique questions for every city and municipality',()=>{
  const idSet=new Set(localityQuestQuestions.map(q=>q.id));
  expect(idSet.size).toBe(localityQuestQuestions.length);
  expect(localityQuestQuestions.length).toBeGreaterThan(120);
  for(const town of localityProfiles){
   expect(localityQuestQuestions.some(q=>q.town===town.name)).toBe(true);
   const sourcePool=localityQuestQuestions.filter(q=>q.town===town.name);
   expect(sourcePool.some(q=>q.id.includes('history'))).toBe(true);
   expect(sourcePool.some(q=>q.id.includes('life'))).toBe(true);
   expect(sourcePool.some(q=>q.id.includes('heritage'))).toBe(true);
  }
 });
 it('uses all 18 festival records and all 15 locality-based place sets in sorting',()=>{
  for(const event of festivalProfiles)
   expect(sortingItems.find(x=>x.id==='research-festival-'+event.id)?.group).toBe(event.municipality);
  for(const town of localityProfiles)
   expect(sortingItems.filter(x=>x.group===town.name).length).toBeGreaterThanOrEqual(3);
 });
 it('builds unique, source-backed word puzzles including towns',()=>{
  for(const town of localityProfiles){
   const entry=wordItems.find(x=>x.id==='research-word-'+town.id);
   expect(entry?.label).toBe(town.name.toUpperCase().replace(/[^A-Z]/g,''));
   expect(entry?.sourceIds.length).toBeGreaterThan(0);
  }
 });
 it('builds playable free-play quiz rounds using researched hometown questions',()=>{
  for(const level of ['gentle','challenge'] as const){
   const rounds=createRounds('quiz',level,[],()=>.32);
   expect(rounds.length).toBe(level==='gentle'?3:5);
   for(const round of rounds){
    expect(localityQuestQuestions.some(q=>q.id===round.id)).toBe(true);
    expect(round.answer).toBeDefined();
    expect(round.items.some(i=>i.id===round.answer)).toBe(true);
    expect(round.items.length).toBe(4);
    expect(round.sourceIds.every(id=>sources.some(s=>s.id===id))).toBe(true);
    expect(round.link).toContain('/journey/activity?town=');
   }
  }
 });
 it('retains documentary and historical game sources instead of guessing media or coordinates',()=>{
  for(const entry of [...photoItems,...mapItems,...timelineItems]){
   expect(entry.sourceIds.length).toBeGreaterThan(0);
   expect(entry.link.startsWith('/')).toBe(true);
  }
  expect(photoItems.length).toBeGreaterThanOrEqual(5);
  expect(timelineItems.every(x=>Number.isInteger(x.date))).toBe(true);
  expect(mapItems.every(x=>Number.isFinite(x.latitude)&&Number.isFinite(x.longitude))).toBe(true);
 });
});
