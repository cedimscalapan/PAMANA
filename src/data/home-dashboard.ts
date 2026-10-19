import {heritageChapters,chapterStatus,type HeritageChapter,type JourneyProgress,type QuestResultRef,type JourneyStatus} from './heritage-journey';
import {deriveHeritageStamps} from './heritage-stamps';
import {lessons} from './learning';

export type HomeAction={
 kind:'festival'|'lesson'|'quest'|'complete';
 title:string;description:string;buttonLabel:string;path:string
};
export type HomeDashboard={
 chapter:HeritageChapter;status:JourneyStatus;next:HomeAction;
 finishedTowns:number;finishedLessons:number;totalLessons:number;
 finishedQuests:number;earnedGeneralStamps:number;totalGeneralStamps:number;
 chapterIsSuggestion:boolean
};
/** Pure dashboard derivation. No new scores, save keys, or artificial achievements. */
export function buildHomeDashboard(args:{
 hometown:string;progress:JourneyProgress;completedLessonIds:ReadonlySet<string>;
 questResults:readonly QuestResultRef[];totalQuestCompletions:number
}):HomeDashboard {
 const {hometown,progress,completedLessonIds,questResults,totalQuestCompletions}=args;
 const all=heritageChapters.map(chapter=>({chapter,status:chapterStatus(chapter,progress,completedLessonIds,questResults)}));
 const finishedTowns=all.filter(item=>item.status.completed).length;
 const preferred=all.find(item=>item.chapter.town===hometown);
 const active=all.filter(item=>!item.status.completed&&item.status.done>0).sort((a,b)=>b.status.done-a.status.done)[0];
 // Prefer user's unfinished hometown, otherwise their most-progressed in-progress journey.
 // If their hometown is finished, continue a different in-progress chapter or suggest exploration.
 const chosen=(preferred&&!preferred.status.completed?preferred:active)
  ??all.find(item=>!item.status.completed)
  ??preferred??all[0];
 const {chapter,status}=chosen;
 let next:HomeAction;
 if(status.completed){
  next={kind:'complete',title:'Your chapter is complete!',description:'Revisit what you discovered or choose another hometown.',buttonLabel:'View my journey',path:'/journey?town='+chapter.id};
 }else if(!status.festivalOpened){
  next={kind:'festival',title:'Discover a local celebration',description:chapter.festivalName,buttonLabel:'Discover now',path:'/explore?festival='+encodeURIComponent(chapter.festivalId)};
 }else if(!status.lessonCompleted){
  next={kind:'lesson',title:'Learn a documented story',description:chapter.lessonTitle,buttonLabel:'Open Matuto',path:'/learn?lesson='+encodeURIComponent(chapter.lessonId)};
 }else{
  next={kind:'quest',title:'Play a Mindoro heritage Quest',description:'Finish the linked province-wide '+chapter.mode+' challenge to complete this journey.',buttonLabel:'Play the Quest',
   path:'/quest?journey='+chapter.id+'&mode='+chapter.mode};
 }
 const finishedLessons=lessons.filter(lesson=>completedLessonIds.has(lesson.id)).length;
 const stamps=deriveHeritageStamps(finishedLessons,totalQuestCompletions);
 return {chapter,status,next,finishedTowns,finishedLessons,totalLessons:lessons.length,
  finishedQuests:totalQuestCompletions,earnedGeneralStamps:stamps.filter(s=>s.earned).length,
  totalGeneralStamps:stamps.length,chapterIsSuggestion:chapter.town!==hometown};
}
