import {describe,expect,it} from 'vitest';
import {buildHomeDashboard} from './home-dashboard';
import {heritageChapters,emptyJourney,type JourneyProgress,type ChapterProgress} from './heritage-journey';
import {lessons} from './learning';

const baco=heritageChapters.find(c=>c.town==='Baco')!;
const calapan=heritageChapters.find(c=>c.town==='Calapan City')!;
const calculate=(opts:{
 hometown?:string;progress?:JourneyProgress;completed?:ReadonlySet<string>;
 results?:{id:string;mode:typeof baco.mode}[];quests?:number
}={})=>buildHomeDashboard({
 hometown:opts.hometown??'Baco',progress:opts.progress??emptyJourney(),
 completedLessonIds:opts.completed??new Set<string>(),questResults:opts.results??[],
 totalQuestCompletions:opts.quests??0
});
const withChapter=(chapterId:string,changes:ChapterProgress):JourneyProgress=>({
 version:1,chapters:{[chapterId]:changes}
});
describe('Phase 04 accurate offline Home dashboard',()=>{
 it('uses exactly the saved baseline values; no invented XP or streaks',()=>{
  const x=calculate();
  expect(x.finishedTowns).toBe(0);
  expect(x.finishedLessons).toBe(0);
  expect(x.totalLessons).toBe(lessons.length);
  expect(x.finishedQuests).toBe(0);
  expect(x.earnedGeneralStamps).toBe(0);
  expect(x.next.kind).toBe('festival');
  expect(x.next.path).toBe('/explore?festival='+baco.festivalId);
  expect(x.chapterIsSuggestion).toBe(false);
 });
 it('shows a hometown suggestion instead of inventing an assigned hometown',()=>{
  const x=calculate({hometown:''});
  expect(x.chapterIsSuggestion).toBe(true);
  expect(x.chapter.town).toBe('Baco');
 });
 it('suggests the real lesson only after documented festival visit is saved',()=>{
  const x=calculate({progress:withChapter(baco.id,{festivalOpened:true})});
  expect(x.status.done).toBe(1);
  expect(x.next.kind).toBe('lesson');
  expect(x.next.path).toBe('/learn?lesson='+baco.lessonId);
 });
 it('requires existing lesson completion before recommending a linked Quest',()=>{
  const x=calculate({progress:withChapter(baco.id,{festivalOpened:true}),
   completed:new Set([baco.lessonId])});
  expect(x.status.done).toBe(2);
  expect(x.next.kind).toBe('quest');
  expect(x.next.path).toBe('/quest?journey='+baco.id+'&mode='+baco.mode);
 });
 it('does not unlock a hometown with an unrelated or wrong-mode Quest result',()=>{
  const progress=withChapter(baco.id,{festivalOpened:true,questSessionId:'linked'});
  const completed=new Set([baco.lessonId]);
  const unrelated=calculate({progress,completed,results:[{id:'unrelated',mode:baco.mode}],quests:1});
  expect(unrelated.status.completed).toBe(false);
  expect(unrelated.finishedTowns).toBe(0);
  expect(unrelated.finishedQuests).toBe(1);
  expect(unrelated.next.kind).toBe('quest');
  const linked=calculate({progress,completed,results:[{id:'linked',mode:baco.mode}],quests:1});
  expect(linked.status.completed).toBe(true);
  expect(linked.finishedTowns).toBe(1);
  expect(linked.earnedGeneralStamps).toBeGreaterThan(0);
 });
 it('moves to an unfinished chapter when the chosen hometown is already completed',()=>{
  const x=calculate({hometown:'Baco',
   progress:withChapter(baco.id,{festivalOpened:true,questCompletedId:'earned'}),
   completed:new Set([baco.lessonId])});
  expect(x.finishedTowns).toBe(1);
  expect(x.chapter.town).not.toBe('Baco');
  expect(x.chapterIsSuggestion).toBe(true);
 });
 it('prefers a partially completed adventure when no hometown is selected',()=>{
  const x=calculate({hometown:'',
   progress:withChapter(calapan.id,{festivalOpened:true})});
  expect(x.chapter.town).toBe('Calapan City');
  expect(x.status.done).toBe(1);
 });
 it('keeps correct totals and a completed journey when all fifteen are done',()=>{
  const allLessons=new Set(lessons.map(l=>l.id));
  const chapters:JourneyProgress['chapters']={};
  for(const chapter of heritageChapters)chapters[chapter.id]={festivalOpened:true,questCompletedId:'saved-'+chapter.id};
  const x=calculate({hometown:'Calapan City',progress:{version:1,chapters},completed:allLessons,quests:15});
  expect(x.finishedTowns).toBe(15);
  expect(x.finishedLessons).toBe(lessons.length);
  expect(x.next.kind).toBe('complete');
  expect(x.totalGeneralStamps).toBe(6);
 });
});
