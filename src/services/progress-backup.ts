import {PROFILE_KEY,sanitizeProfile} from '../data/personalization';
import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {setStored} from './storage';
import {readQuestProgress} from './quest-games';
import {readJourneyProgress} from './heritage-journey';
import {heritageChapters} from '../data/heritage-journey';
export const SNAPSHOT_KIND='smart-pamana-learning-snapshot';
export const SNAPSHOT_VERSION=1;
export type LearningSnapshot={kind:typeof SNAPSHOT_KIND;version:1;exportedAt:string;values:Record<string,string>};
const fixedKeys=[PROFILE_KEY,'pamana.quest.games.v2','pamana.journey.v1','pamana.onboardingComplete','pamana.interfaceSound.v1'];
const lessonKeys=lessons.flatMap(l=>[storageKey(l.id),'pamana.discovery.'+l.id+'.v1','pamana.reflection.'+l.id]);
const allowedKeys=new Set([...fixedKeys,...lessonKeys]);
/** Portable app-state subset: NEVER claims to include private media, drawings, story files or native SQLite writing records. */
export function makeLearningSnapshot():LearningSnapshot{
 const values:Record<string,string>={};
 for(const key of allowedKeys){const value=localStorage.getItem(key);if(value!==null)values[key]=value;}
 return {kind:SNAPSHOT_KIND,version:1,exportedAt:new Date().toISOString(),values};
}
export function validateLearningSnapshot(raw:unknown):LearningSnapshot{
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Not a SMART PAMANA learning snapshot.');
 const value=raw as Record<string,unknown>;
 if(value.kind!==SNAPSHOT_KIND||value.version!==1||typeof value.exportedAt!=='string'||Number.isNaN(Date.parse(value.exportedAt)))throw Error('Unsupported snapshot version or format.');
 const values=value.values;
 if(!values||typeof values!=='object'||Array.isArray(values))throw Error('Learning data is missing.');
 const checked:Record<string,string>={};
 for(const [key,record] of Object.entries(values)){
  if(!allowedKeys.has(key)||typeof record!=='string'||record.length>250000)throw Error('The snapshot contains an unsupported key or oversized value.');
  if(key===PROFILE_KEY){let obj:unknown;try{obj=JSON.parse(record);}catch{throw Error('Invalid profile record.');}if(!obj||typeof obj!=='object'||Array.isArray(obj))throw Error('Invalid profile record.');const clean=sanitizeProfile(obj as Record<string,unknown>);checked[key]=JSON.stringify(clean);}
  else if(key==='pamana.quest.games.v2'){
   let obj:any;try{obj=JSON.parse(record);}catch{throw Error('Invalid Quest data.');}
   if(!obj||obj.version!==2||!Array.isArray(obj.results)||obj.results.length>100||!obj.totals||typeof obj.totals.completed!=='number')throw Error('Invalid Quest data.');
   checked[key]=record;
  }else if(key==='pamana.journey.v1'){
   let obj:any;try{obj=JSON.parse(record);}catch{throw Error('Invalid journey data.');}
   if(!obj||obj.version!==1||!obj.chapters||typeof obj.chapters!=='object'||Array.isArray(obj.chapters)||Object.keys(obj.chapters).some(id=>!heritageChapters.some(c=>c.id===id)))throw Error('Invalid journey data.');
   checked[key]=record;
  }else if(key.startsWith('pamana.lesson.')&&record!=='complete')throw Error('Unrecognized lesson completion.');
  else if(key==='pamana.onboardingComplete'&&record!=='true'&&record!=='false')throw Error('Invalid onboarding value.');
  else if(key==='pamana.interfaceSound.v1'&&record!=='on'&&record!=='off')throw Error('Invalid sound preference.');
  else checked[key]=record;
 }
 return {kind:SNAPSHOT_KIND,version:1,exportedAt:value.exportedAt,values:checked};
}
export async function restoreLearningSnapshot(snapshot:LearningSnapshot):Promise<number>{
 const verified=validateLearningSnapshot(snapshot);
 let written=0;
 for(const [key,value] of Object.entries(verified.values)){await setStored(key,value);written++;}
 return written;
}
