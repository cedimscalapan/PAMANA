import {setStored} from './storage';
import {findChapter,emptyJourney,type JourneyProgress,type ChapterProgress} from '../data/heritage-journey';
import {readQuestProgress} from './quest-games';
import {getJourneyReader,getJourneyQuestions} from '../data/journey-learning';
import {storageKey} from '../data/content';
const KEY='pamana.journey.v1';
export function readJourneyProgress():JourneyProgress {
 try {
  const raw=JSON.parse(localStorage.getItem(KEY)??'null');
  if(!raw||raw.version!==1||!raw.chapters||typeof raw.chapters!=='object'||Array.isArray(raw.chapters))return emptyJourney();
  const chapters:Record<string,ChapterProgress>={};
  for(const id of Object.keys(raw.chapters)){
   if(!findChapter(id))continue;
   const item=raw.chapters[id];
   if(!item||typeof item!=='object')continue;
   chapters[id]={
    festivalOpened:item.festivalOpened===true,
    questSessionId:typeof item.questSessionId==='string'?item.questSessionId:undefined,
    questCompletedId:typeof item.questCompletedId==='string'?item.questCompletedId:undefined,
    festivalReadSections:Array.isArray(item.festivalReadSections)?item.festivalReadSections.filter((x:unknown)=>Number.isInteger(x)&&Number(x)>=0&&Number(x)<32).slice(0,32):[],
    lessonReadSections:Array.isArray(item.lessonReadSections)?item.lessonReadSections.filter((x:unknown)=>Number.isInteger(x)&&Number(x)>=0&&Number(x)<12).slice(0,12):[],
    chapterCorrectQuestions:Array.isArray(item.chapterCorrectQuestions)?item.chapterCorrectQuestions.filter((x:unknown)=>typeof x==='string'&&x.length<=60).slice(0,20):[],
    chapterQuestCompleted:item.chapterQuestCompleted===true
   };
  }
  return {version:1,chapters};
 }catch{return emptyJourney();}
}
/** All journey writes use the native SQLite/browser-backed storage adapter. */
async function patchChapter(id:string,patch:Partial<ChapterProgress>):Promise<JourneyProgress>{
 if(!findChapter(id))throw Error('Unknown hometown journey');
 const current=readJourneyProgress();
 const updated:JourneyProgress={version:1,chapters:{...current.chapters,[id]:{...current.chapters[id],...patch}}};
 await setStored(KEY,JSON.stringify(updated));
 window.dispatchEvent(new Event('pamana:journey-changed'));
 return updated;
}
export const markFestivalOpened=(id:string)=>patchChapter(id,{festivalOpened:true});
/** Associates a specific saved Quest session with a single hometown.
 * A previously earned stamp remains unlocked when the Quest is replayed.
 */
export async function linkJourneyQuestSession(id:string,sessionId:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);if(!chapter||!sessionId)throw Error('Invalid journey session');
 return patchChapter(id,{questSessionId:sessionId});
}
export async function syncJourneyQuestCompletion(id:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 const current=readJourneyProgress();
 if(!chapter)return current;
 const state=current.chapters[id];
 if(!state?.questSessionId||state.questCompletedId)return current;
 const result=readQuestProgress().results.find(r=>r.id===state.questSessionId&&r.mode===chapter.mode);
 return result?patchChapter(id,{questCompletedId:result.id}):current;
}

/** Reading progress is stored per chapter, not just a page view.
 * This keeps section checkmarks and completed work after navigating away or restarting.
 */
export async function markJourneySectionRead(id:string,stage:'festival'|'lesson',index:number):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const sections=getJourneyReader(chapter,stage);
 if(!Number.isInteger(index)||index<0||index>=sections.length)throw Error('Invalid reading section');
 const key=stage==='festival'?'festivalReadSections':'lessonReadSections';
 const current=readJourneyProgress().chapters[id]??{};
 const values=[...new Set([...(current[key]??[]),index])].sort((a,b)=>a-b);
 return patchChapter(id,{[key]:values});
}
export async function completeFestivalReading(id:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const record=readJourneyProgress().chapters[id]??{};
 const required=getJourneyReader(chapter,'festival').length;
 if(!record.festivalOpened && (record.festivalReadSections??[]).length<required)throw Error('Read all festival sections before finishing.');
 return patchChapter(id,{festivalOpened:true});
}
export async function completeJourneyLessonReading(id:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const record=readJourneyProgress().chapters[id]??{};
 if(!record.festivalOpened)throw Error('Finish the festival discovery first.');
 const required=getJourneyReader(chapter,'lesson').length;
 const key=storageKey(chapter.lessonId);
 if(localStorage.getItem(key)!=='complete' && (record.lessonReadSections??[]).length<required)throw Error('Read all lesson sections before finishing.');
 // The existing global Matuto completion remains the source of truth for lesson status.
 // Use the native SQLite/browser adapter, not a second local-only progress key.
 await setStored(key,'complete');
 window.dispatchEvent(new Event('pamana:journey-changed'));
 return readJourneyProgress();
}
export async function markJourneyQuestionCorrect(id:string,questionId:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const status=readJourneyProgress().chapters[id]??{};
 if(!status.festivalOpened||localStorage.getItem(storageKey(chapter.lessonId))!=='complete')throw Error('Complete both readings before the challenge.');
 if(!getJourneyQuestions(chapter).some(question=>question.id===questionId))throw Error('Unknown chapter question');
 const values=[...new Set([...(status.chapterCorrectQuestions??[]),questionId])];
 return patchChapter(id,{chapterCorrectQuestions:values});
}
export async function completeChapterKnowledgeCheck(id:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const status=readJourneyProgress().chapters[id]??{};
 if(!status.festivalOpened||localStorage.getItem(storageKey(chapter.lessonId))!=='complete')throw Error('Complete the festival and Matuto readings first.');
 if(!getJourneyQuestions(chapter).every(question=>(status.chapterCorrectQuestions??[]).includes(question.id)))throw Error('Answer every hometown-specific question correctly before completing.');
 return patchChapter(id,{chapterQuestCompleted:true});
}
