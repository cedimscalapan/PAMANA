import {describe,it,expect} from 'vitest';
import {heritageChapters} from './heritage-journey';
import {getJourneyReader,getJourneyQuestions} from './journey-learning';
import {lessonArticles} from './lesson-articles';
import {lessons} from './learning';
import {officialFestivals} from './official-heritage';
import {sources} from './content';

describe('all fifteen fully offline, festival-specific learning packs',()=>{
 it('provides complete sourced reading for every hometown',()=>{
  for(const chapter of heritageChapters){
   const fest=getJourneyReader(chapter,'festival'),lesson=getJourneyReader(chapter,'lesson');
   expect(fest).toHaveLength(9);
   expect(fest.some(section=>section.id==='local-0')).toBe(true);
   expect(fest.some(section=>section.id==='local-1')).toBe(true);
   expect(fest.some(section=>section.id==='heritage-and-consent')).toBe(true);
   expect(lesson).toHaveLength(lessonArticles[chapter.lessonId].sections.length+1);
   expect(lesson[0].title).toContain(chapter.town);
   expect(lesson[0].text).toContain(chapter.festivalName);
   expect(lesson.length).toBeGreaterThanOrEqual(3);
   expect(fest.map(s=>s.text).join(' ').length).toBeGreaterThan(2000);
   expect(fest[0].text).toBe(officialFestivals.find(f=>f.id===chapter.festivalId)!.description);
   for(const section of [...fest,...lesson]){
    expect(section.title.length).toBeGreaterThan(6);
    expect(section.text.length).toBeGreaterThan(100);
    expect(section.sourceIds.length).toBeGreaterThan(0);
    for(const id of section.sourceIds)expect(sources.find(item=>item.id===id)).toBeDefined();
   }
  }
 });
 it('asks eleven distinct verified questions from local culture and Matuto rather than generic free-play Quest material',()=>{
  const positions=new Set<number>();
  for(const chapter of heritageChapters){
   const qs=getJourneyQuestions(chapter);
   expect(getJourneyQuestions(chapter)).toEqual(qs); // stable after reload
   qs.forEach(q=>positions.add(q.answer));
   expect(qs).toHaveLength(11);
   expect(qs.some(q=>q.id==='culture-0')).toBe(true);
   expect(qs.some(q=>q.id==='culture-1')).toBe(true);
   expect(qs.some(q=>q.id==='common-identities')).toBe(true);
   expect(qs.some(q=>q.id==='common-consent')).toBe(true);
   expect(new Set(qs.map(q=>q.id)).size).toBe(11);
   expect(qs.filter(q=>q.stage==='festival')).toHaveLength(8);
   expect(qs.filter(q=>q.stage==='lesson')).toHaveLength(3);
   expect(qs[0].options[qs[0].answer]).toBe(chapter.festivalName);
   expect(qs[2].options[qs[2].answer]).toBe(chapter.town);
   const related=lessons.find(lesson=>lesson.id===chapter.lessonId)!;
   expect(qs[3].prompt).toBe(related.quiz.prompt);
   expect(qs[3].options[qs[3].answer]).toBe(related.quiz.answers[related.quiz.correctIndex]);
   for(const q of qs){
    expect(q.options).toHaveLength(4);
    expect(new Set(q.options).size).toBe(4);
    expect(q.options[q.answer]).toBeTruthy();
    expect(q.explanation.length).toBeGreaterThan(15);
    expect(q.sourceIds.length).toBeGreaterThan(0);
   }
  }
  expect(positions.size).toBeGreaterThanOrEqual(3);
 });
});
