import {setStored} from './storage';
import {findChapter,emptyJourney,type JourneyProgress,type ChapterProgress} from '../data/heritage-journey';
import {readQuestProgress} from './quest-games';
import {getJourneyReader,getJourneyQuestions} from '../data/journey-learning';
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
    chapterQuestCompleted:item.chapterQuestCompleted===true,
    researchEdition:item.researchEdition===2?2:undefined,
    chapterLessonCompleted:item.chapterLessonCompleted===true
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
 const previous=current.researchEdition===2?current[key]??[]:[];
 const values=[...new Set([...previous,index])].sort((a,b)=>a-b);
 // Legacy index-only checkmarks must NOT silently mark a different researched article as read.
 const reset=current.researchEdition===2?{}:{festivalReadSections:[],lessonReadSections:[],chapterCorrectQuestions:[],chapterLessonCompleted:false};
 return patchChapter(id,{...reset,researchEdition:2,[key]:values});
}
export async function completeFestivalReading(id:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const record=readJourneyProgress().chapters[id]??{};
 const required=getJourneyReader(chapter,'festival').length;
 if((record.researchEdition===2||!record.festivalOpened) && (record.festivalReadSections??[]).length<required)throw Error('Read all researched hometown sections before finishing.');
 return patchChapter(id,{festivalOpened:true});
}
export async function completeJourneyLessonReading(id:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const record=readJourneyProgress().chapters[id]??{};
 if(!record.festivalOpened)throw Error('Finish Tuklas before continuing to the festival and heritage learning step.');
 const required=getJourneyReader(chapter,'lesson').length;
 if(record.researchEdition!==2||(record.lessonReadSections??[]).length<required)throw Error('Read all source-linked festival and heritage sections before finishing.');
 // Do NOT mark the separate generic Matuto lesson complete: it was not actually read.
 return patchChapter(id,{chapterLessonCompleted:true});
}
export async function markJourneyQuestionCorrect(id:string,questionId:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const status=readJourneyProgress().chapters[id]??{};
 if(!status.festivalOpened||status.chapterLessonCompleted!==true)throw Error('Finish both unique hometown reading steps before the challenge.');
 if(!getJourneyQuestions(chapter).some(question=>question.id===questionId))throw Error('Unknown chapter question');
 const values=[...new Set([...(status.chapterCorrectQuestions??[]),questionId])];
 return patchChapter(id,{chapterCorrectQuestions:values});
}
export async function completeChapterKnowledgeCheck(id:string):Promise<JourneyProgress>{
 const chapter=findChapter(id);
 if(!chapter)throw Error('Unknown hometown journey');
 const status=readJourneyProgress().chapters[id]??{};
 if(!status.festivalOpened||status.chapterLessonCompleted!==true)throw Error('Complete Tuklas and festival heritage readings first.');
 if(!getJourneyQuestions(chapter).every(question=>(status.chapterCorrectQuestions??[]).includes(question.id)))throw Error('Answer every hometown-specific question correctly before completing.');
 return patchChapter(id,{chapterQuestCompleted:true});
}
