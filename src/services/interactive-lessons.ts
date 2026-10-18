import {setStored} from './storage';
import {interactiveLessonFor,validDiscoveryRecord} from '../data/interactive-lessons';
export const discoveryKey=(lessonId:string)=>'pamana.discovery.'+lessonId+'.v1';
export function isDiscoveryComplete(lessonId:string):boolean{
 const pack=interactiveLessonFor(lessonId);
 if(!pack)return false;
 try{return validDiscoveryRecord(JSON.parse(localStorage.getItem(discoveryKey(lessonId))??'null'),pack);}
 catch{return false;}
}
/** Called only after both documented mini-game prompts have been checked correctly.
 * Does not mark Matuto reading as complete or alter Heritage Journey stamp prerequisites.
 */
export async function finishDiscovery(lessonId:string):Promise<void>{
 const pack=interactiveLessonFor(lessonId);
 if(!pack)throw Error('Unknown interactive Matuto activity');
 await setStored(discoveryKey(lessonId),JSON.stringify({version:1,packId:pack.id,completedAt:new Date().toISOString()}));
 window.dispatchEvent(new Event('pamana:discovery-changed'));
}
