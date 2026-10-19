import {municipalities,type Municipality} from './festival-themes';
import {officialFestivals} from './official-heritage';
import {lessons} from './learning';
import type {GameMode} from './quest-games';
export type HeritageChapter={id:string;town:Municipality;festivalId:string;festivalName:string;lessonId:string;lessonTitle:string;mode:GameMode};
const featured:Partial<Record<Municipality,{lessonId:string;mode:GameMode;festivalId?:string}>>={
 'Calapan City':{lessonId:'l1',mode:'sort',festivalId:'pandang-gitab'},
 Baco:{lessonId:'l14',mode:'photo'},
 'Puerto Galera':{lessonId:'l11',mode:'map'},
 Naujan:{lessonId:'l12',mode:'memory'},
 Mansalay:{lessonId:'l4',mode:'quiz'},
 Gloria:{lessonId:'l16',mode:'sort'},
 Victoria:{lessonId:'l12',mode:'map'},
 Pola:{lessonId:'l12',mode:'map'},
 Bulalacao:{lessonId:'l11',mode:'photo'},
 'San Teodoro':{lessonId:'l11',mode:'photo'},
 Bongabong:{lessonId:'l16',mode:'sort'},
 Bansud:{lessonId:'l16',mode:'sort'},
 Pinamalayan:{lessonId:'l16',mode:'word'},
 Roxas:{lessonId:'l16',mode:'quiz'},
 Socorro:{lessonId:'l12',mode:'memory'}
};
export const townId=(town:string)=>town.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
/** Reuse existing sourced content; a Quest can cover Mindoro broadly, not exclusively the chosen town. */
export const heritageChapters:HeritageChapter[]=municipalities.map(town=>{
 const config=featured[town]??{lessonId:'l16',mode:'quiz' as const};
 const festival=officialFestivals.find(f=>f.municipality===town&&f.id===config.festivalId)??officialFestivals.find(f=>f.municipality===town);
 const lesson=lessons.find(item=>item.id===config.lessonId);
 if(!festival||!lesson)throw new Error('Missing verified journey content for '+town);
 return {id:townId(town),town,festivalId:festival.id,festivalName:festival.name,lessonId:lesson.id,lessonTitle:lesson.title,mode:config.mode};
});
export const findChapter=(id:string|null|undefined)=>heritageChapters.find(chapter=>chapter.id===id);
export type ChapterProgress={festivalOpened?:boolean;questSessionId?:string;questCompletedId?:string;festivalReadSections?:number[];lessonReadSections?:number[];chapterCorrectQuestions?:string[];chapterQuestCompleted?:boolean;researchEdition?:2;chapterLessonCompleted?:boolean};
export type JourneyProgress={version:1;chapters:Record<string,ChapterProgress>};
export const emptyJourney=():JourneyProgress=>({version:1,chapters:{}});
export type QuestResultRef={id:string;mode:GameMode};
export type JourneyStatus={festivalOpened:boolean;lessonCompleted:boolean;questCompleted:boolean;done:number;total:3;completed:boolean};
export function chapterStatus(chapter:HeritageChapter,progress:JourneyProgress,completedLessons:ReadonlySet<string>,results:readonly QuestResultRef[]):JourneyStatus {
 const local=progress.chapters[chapter.id]??{};
 const festivalOpened=local.festivalOpened===true;
 const legacyQuest=!!local.questCompletedId||!!local.questSessionId&&results.some(r=>r.id===local.questSessionId&&r.mode===chapter.mode);
 const legacyEarned=festivalOpened&&completedLessons.has(chapter.lessonId)&&legacyQuest;
 const lessonCompleted=local.chapterLessonCompleted===true||(local.researchEdition!==2&&completedLessons.has(chapter.lessonId))||legacyEarned;
 const questCompleted=local.chapterQuestCompleted===true||legacyQuest;
 const done=Number(festivalOpened)+Number(lessonCompleted)+Number(questCompleted);
 return {festivalOpened,lessonCompleted,questCompleted,done,total:3,completed:done===3};
}
