import {describe,it,expect} from 'vitest';
import {heritageChapters} from './heritage-journey';
import {getJourneyReader,getJourneyQuestions} from './journey-learning';
import {localityProfiles,festivalProfiles,heritageResearch,festivalsForTown} from './journey-research';
import {sources} from './content';

describe('unique, offline Mindoro Journey v2 curriculum',()=>{
 it('has fourteen municipality profiles, Calapan City, and all 18 separately described public festivals',()=>{
  expect(localityProfiles).toHaveLength(15);
  expect(localityProfiles.filter(t=>t.kind==='city').map(t=>t.name)).toEqual(['Calapan City']);
  expect(festivalProfiles).toHaveLength(18);
  expect(festivalsForTown('Calapan City')).toHaveLength(4);
  expect(new Set(Object.keys(heritageResearch.sources)).size).toBe(62);
 });
 it('does not repeat common province-wide paragraphs in the mandatory town reading',()=>{
  const bodies:string[]=[];
  for(const chapter of heritageChapters){
   const first=getJourneyReader(chapter,'festival'),second=getJourneyReader(chapter,'lesson');
   expect(first).toHaveLength(3);
   expect(first.map(x=>x.id)).toEqual([chapter.id+'-history',chapter.id+'-life',chapter.id+'-heritage']);
   expect(second).toHaveLength(festivalsForTown(chapter.town).length+2);
   expect(second.some(x=>x.id==='places-'+chapter.id)).toBe(true);
   expect(second.some(x=>x.id==='research-'+chapter.id)).toBe(true);
   for(const section of [...first,...second]){
    expect(section.title.length).toBeGreaterThan(4);
    expect(section.text.length).toBeGreaterThan(100);
    expect(section.sourceIds.length).toBeGreaterThan(0);
    section.sourceIds.forEach(id=>expect(sources.find(s=>s.id===id)?.url).toMatch(/^https:\/\//));
   }
   bodies.push(...first.map(x=>x.text));
   expect(new Set(first.map(x=>x.text)).size).toBe(first.length);
  }
  expect(new Set(bodies).size).toBe(45);
 });
 it('derives different checked questions for every town and all four Calapan festivals',()=>{
  const positions=new Set<number>();
  for(const chapter of heritageChapters){
   const questions=getJourneyQuestions(chapter),festivals=festivalsForTown(chapter.town);
   expect(questions).toEqual(getJourneyQuestions(chapter));
   expect(questions).toHaveLength(festivals.length+7);
   expect(new Set(questions.map(q=>q.id)).size).toBe(questions.length);
   expect(questions.filter(q=>q.id.startsWith('v2-'+chapter.id))).toHaveLength(3);
   expect(questions.filter(q=>q.id.startsWith('v2-festival'))).toHaveLength(festivals.length);
   for(const q of questions){
    expect(q.options).toHaveLength(4);
    expect(new Set(q.options).size).toBe(4);
    expect(q.sourceIds.length).toBeGreaterThan(0);
    expect(q.options[q.answer].length).toBeGreaterThan(0);
    expect(q.explanation.length).toBeGreaterThan(25);
    positions.add(q.answer);
    for(const ref of q.sourceIds)expect(sources.some(s=>s.id===ref)).toBe(true);
   }
  }
  expect(positions.size).toBeGreaterThanOrEqual(3);
 });
});
