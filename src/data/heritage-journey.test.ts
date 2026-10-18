import {describe,expect,it} from 'vitest';
import {heritageChapters,findChapter,chapterStatus,emptyJourney,townId} from './heritage-journey';
import {municipalities} from './festival-themes';
import {lessons} from './learning';
import {officialFestivals} from './official-heritage';
describe('offline heritage journey',()=>{
 it('creates fifteen unique chapters from the official festival records',()=>{
  expect(heritageChapters).toHaveLength(15);
  expect(new Set(heritageChapters.map(chapter=>chapter.id)).size).toBe(15);
  expect(heritageChapters.map(chapter=>chapter.town)).toEqual([...municipalities]);
  for(const chapter of heritageChapters){
   expect(findChapter(chapter.id)).toEqual(chapter);
   expect(chapter.id).toBe(townId(chapter.town));
   expect(officialFestivals.some(festival=>festival.id===chapter.festivalId&&festival.municipality===chapter.town)).toBe(true);
   expect(lessons.some(lesson=>lesson.id===chapter.lessonId&&lesson.sourceIds.length>0)).toBe(true);
  }
 });
 it('does not unlock steps before they are actually recorded',()=>{
  const chapter=heritageChapters[0];
  expect(chapterStatus(chapter,emptyJourney(),new Set(),[])).toEqual({festivalOpened:false,lessonCompleted:false,questCompleted:false,done:0,total:3,completed:false});
 });
 it('keeps an opened festival separate from reading and Quest completion',()=>{
  const chapter=heritageChapters[0];
  const state={version:1 as const,chapters:{[chapter.id]:{festivalOpened:true}}};
  expect(chapterStatus(chapter,state,new Set(),[]).done).toBe(1);
  expect(chapterStatus(chapter,state,new Set([chapter.lessonId]),[]).done).toBe(2);
 });
 it('requires an exact linked Quest session in the expected mode',()=>{
  const chapter=heritageChapters[0];
  const state={version:1 as const,chapters:{[chapter.id]:{festivalOpened:true,questSessionId:'saved-game'}}};
  const lessons=new Set([chapter.lessonId]);
  expect(chapterStatus(chapter,state,lessons,[{id:'another-game',mode:chapter.mode}]).completed).toBe(false);
  expect(chapterStatus(chapter,state,lessons,[{id:'saved-game',mode:'memory'===chapter.mode?'quiz':'memory'}]).completed).toBe(false);
  expect(chapterStatus(chapter,state,lessons,[{id:'saved-game',mode:chapter.mode}]).completed).toBe(true);
 });
 it('preserves an earned stamp after Quest result histories are rotated',()=>{
  const chapter=heritageChapters[0];
  const state={version:1 as const,chapters:{[chapter.id]:{festivalOpened:true,questCompletedId:'earned-result'}}};
  expect(chapterStatus(chapter,state,new Set([chapter.lessonId]),[]).completed).toBe(true);
 });
});
