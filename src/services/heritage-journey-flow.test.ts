import {beforeEach,describe,expect,it,vi} from 'vitest';
import {heritageChapters,chapterStatus} from '../data/heritage-journey';
import {getJourneyReader,getJourneyQuestions} from '../data/journey-learning';
import {readJourneyProgress,markJourneySectionRead,completeFestivalReading,completeJourneyLessonReading,markJourneyQuestionCorrect,completeChapterKnowledgeCheck} from './heritage-journey';
vi.mock('./storage',()=>({setStored:vi.fn(async(key:string,value:string)=>{localStorage.setItem(key,value);})}));
const mem=new Map<string,string>();
beforeEach(()=>{
 mem.clear();
 Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{
  getItem:(k:string)=>mem.get(k)??null,
  setItem:(k:string,v:string)=>{mem.set(k,v);},
  removeItem:(k:string)=>mem.delete(k)
 }});
 Object.defineProperty(globalThis,'window',{configurable:true,value:{dispatchEvent:()=>true}});
});
const chapter=heritageChapters[0];
describe('connected hometown Journey progress',()=>{
 it('does not count opening a festival as finishing the first chapter step',()=>{
  expect(readJourneyProgress().chapters[chapter.id]).toBeUndefined();
  expect(chapterStatus(chapter,readJourneyProgress(),new Set(),[]).done).toBe(0);
 });
 it('saves each reading section without prematurely completing a festival',async()=>{
  const sections=getJourneyReader(chapter,'festival');
  await markJourneySectionRead(chapter.id,'festival',0);
  expect(readJourneyProgress().chapters[chapter.id].festivalReadSections).toEqual([0]);
  await expect(completeFestivalReading(chapter.id)).rejects.toThrow('Read all');
  for(let i=1;i<sections.length;i++)await markJourneySectionRead(chapter.id,'festival',i);
  expect(readJourneyProgress().chapters[chapter.id].festivalOpened).toBe(false);
  await completeFestivalReading(chapter.id);
  expect(readJourneyProgress().chapters[chapter.id].festivalOpened).toBe(true);
 });
 it('requires festival, full Matuto reading, then correct answers before the new stamp',async()=>{
  await expect(markJourneySectionRead(chapter.id,'festival',100)).rejects.toThrow('Invalid reading section');
  await expect(completeJourneyLessonReading(chapter.id)).rejects.toThrow('Finish Tuklas');
  for(let i=0;i<getJourneyReader(chapter,'festival').length;i++)await markJourneySectionRead(chapter.id,'festival',i);
  await completeFestivalReading(chapter.id);
  await markJourneySectionRead(chapter.id,'lesson',0);
  await expect(completeJourneyLessonReading(chapter.id)).rejects.toThrow('Read all');
  for(let i=1;i<getJourneyReader(chapter,'lesson').length;i++)await markJourneySectionRead(chapter.id,'lesson',i);
  await completeJourneyLessonReading(chapter.id);
  expect(readJourneyProgress().chapters[chapter.id].chapterLessonCompleted).toBe(true);
  expect(chapterStatus(chapter,readJourneyProgress(),new Set(),[]).done).toBe(2);
  await expect(completeChapterKnowledgeCheck(chapter.id)).rejects.toThrow('Answer every');
  const questions=getJourneyQuestions(chapter);
  await expect(markJourneyQuestionCorrect(chapter.id,'fabricated-question')).rejects.toThrow('Unknown chapter question');
  for(const q of questions)await markJourneyQuestionCorrect(chapter.id,q.id);
  expect(readJourneyProgress().chapters[chapter.id].chapterQuestCompleted).toBe(false);
  await completeChapterKnowledgeCheck(chapter.id);
  const snapshot=readJourneyProgress();
  expect(snapshot.chapters[chapter.id].chapterQuestCompleted).toBe(true);
  expect(chapterStatus(chapter,snapshot,new Set(),[]).completed).toBe(true);
  expect(readJourneyProgress().chapters[chapter.id].chapterCorrectQuestions).toHaveLength(getJourneyQuestions(chapter).length);
  // Reading the old offline status still works after reloading localStorage.
  expect(mem.has('pamana.journey.v1')).toBe(true);
 });
 it('does not silently reuse old section checkmarks from the previous curriculum',async()=>{
  mem.set('pamana.journey.v1',JSON.stringify({version:1,chapters:{
   [chapter.id]:{festivalReadSections:[0,1,2,3,4,5,6,7,8],lessonReadSections:[0,1,2,3],festivalOpened:false}
  }}));
  expect(readJourneyProgress().chapters[chapter.id].researchEdition).toBeUndefined();
  await markJourneySectionRead(chapter.id,'festival',0);
  expect(readJourneyProgress().chapters[chapter.id].festivalReadSections).toEqual([0]);
  expect(readJourneyProgress().chapters[chapter.id].researchEdition).toBe(2);
  await expect(completeFestivalReading(chapter.id)).rejects.toThrow('Read all');
 });
 it('does not award another town a stamp for this town\'s specific challenge',async()=>{
  const other=heritageChapters[1];
  for(let i=0;i<getJourneyReader(chapter,'festival').length;i++)await markJourneySectionRead(chapter.id,'festival',i);
  await completeFestivalReading(chapter.id);
  for(let i=0;i<getJourneyReader(chapter,'lesson').length;i++)await markJourneySectionRead(chapter.id,'lesson',i);
  await completeJourneyLessonReading(chapter.id);
  for(const q of getJourneyQuestions(chapter))await markJourneyQuestionCorrect(chapter.id,q.id);
  await completeChapterKnowledgeCheck(chapter.id);
  expect(chapterStatus(other,readJourneyProgress(),new Set([chapter.lessonId]),[]).questCompleted).toBe(false);
 });
});
