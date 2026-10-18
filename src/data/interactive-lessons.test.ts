import {describe,expect,it} from 'vitest';
import {interactiveLessons,interactiveLessonFor,isDiscoveryAnswerCorrect,validDiscoveryRecord} from './interactive-lessons';
import {lessons} from './learning';
import {lessonArticles} from './lesson-articles';
import {sourceById} from './content';
import {imageById} from './gallery';
describe('source-backed interactive Matuto activities',()=>{
 it('contains three unique pilots for Calapan, Baco and Puerto Galera',()=>{
  expect(interactiveLessons.map(pack=>pack.town)).toEqual(['Calapan City','Baco','Puerto Galera']);
  expect(new Set(interactiveLessons.map(pack=>pack.lessonId)).size).toBe(3);
  for(const pack of interactiveLessons){
   expect(interactiveLessonFor(pack.lessonId)).toBe(pack);
   const lesson=lessons.find(x=>x.id===pack.lessonId);
   expect(lesson).toBeTruthy();
   expect(lessonArticles[pack.lessonId]?.terms.length).toBeGreaterThanOrEqual(2);
   expect(pack.prompts.length).toBeGreaterThanOrEqual(2);
  }
 });
 it('never offers a missing or uncredited image as a required visual',()=>{
  expect(interactiveLessonFor('l1')?.imageId).toBeUndefined();
  for(const pack of interactiveLessons.filter(p=>p.imageId)){
   const image=imageById(pack.imageId);
   expect(image?.kind).toBe('photograph');
   expect(image?.credit?.trim()).toBeTruthy();
   expect(image?.license?.startsWith('CC BY')).toBe(true);
  }
 });
 it('uses supported lesson references, distinct answer choices and exactly one correct option',()=>{
  for(const pack of interactiveLessons){
   const lesson=lessons.find(x=>x.id===pack.lessonId)!;
   for(const prompt of pack.prompts){
    expect(prompt.sourceIds.length).toBeGreaterThan(0);
    for(const src of prompt.sourceIds){expect(lesson.sourceIds).toContain(src);expect(sourceById(src)).toBeTruthy();}
    expect(prompt.choices.length).toBeGreaterThanOrEqual(2);
    expect(new Set(prompt.choices.map(c=>c.id)).size).toBe(prompt.choices.length);
    expect(prompt.choices.filter(c=>isDiscoveryAnswerCorrect(prompt,c.id))).toHaveLength(1);
    expect(isDiscoveryAnswerCorrect(prompt,'unknown')).toBe(false);
    expect(prompt.explanation.length).toBeGreaterThan(20);
   }
  }
 });
 it('accepts completion data only for the matching pack and a parseable date',()=>{
  const pack=interactiveLessons[0];
  expect(validDiscoveryRecord({version:1,packId:pack.id,completedAt:'2026-10-19T01:00:00.000Z'},pack)).toBe(true);
  expect(validDiscoveryRecord({version:1,packId:'fake',completedAt:'2026-10-19T01:00:00.000Z'},pack)).toBe(false);
  expect(validDiscoveryRecord({version:1,packId:pack.id,completedAt:'nonsense'},pack)).toBe(false);
  expect(validDiscoveryRecord({version:2,packId:pack.id,completedAt:'2026-10-19T01:00:00.000Z'},pack)).toBe(false);
 });
});
