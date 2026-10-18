import {setStored} from './storage';
import {findChapter,emptyJourney,type JourneyProgress,type ChapterProgress} from '../data/heritage-journey';
import {readQuestProgress} from './quest-games';
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
    questCompletedId:typeof item.questCompletedId==='string'?item.questCompletedId:undefined
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
