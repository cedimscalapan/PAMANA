import {setStored} from './storage';
export const SOUND_KEY='pamana.interfaceSound.v1';
export const soundSettingValid=(raw:string|null)=>raw==='on'||raw==='off';
/** Sound starts muted. Sounds are synthesized on-device, not fetched. */
export function uiSoundEnabled():boolean{
 try{return localStorage.getItem(SOUND_KEY)==='on';}catch{return false;}
}
export async function setUiSoundEnabled(enabled:boolean):Promise<void>{
 await setStored(SOUND_KEY,enabled?'on':'off');
 window.dispatchEvent(new Event('pamana:sound-changed'));
}
/** Short, low-volume local sound, invoked only in response to a user action.
 * If Web Audio is missing or blocked, interaction stays functional.
 */
export function playUiSound(kind:'success'|'select'='success'):void{
 if(!uiSoundEnabled()||typeof window==='undefined')return;
 try{
  const AudioCtor=window.AudioContext;
  if(!AudioCtor)return;
  const ctx=new AudioCtor(),osc=ctx.createOscillator(),gain=ctx.createGain();
  const when=ctx.currentTime;
  osc.type='sine';osc.frequency.setValueAtTime(kind==='success'?660:480,when);
  if(kind==='success')osc.frequency.linearRampToValueAtTime(825,when+.14);
  gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(.042,when+.022);
  gain.gain.exponentialRampToValueAtTime(.0001,when+.2);
  osc.connect(gain);gain.connect(ctx.destination);osc.start(when);osc.stop(when+.205);
  osc.onended=()=>{void ctx.close().catch(()=>{});};
 }catch{ /* WebView does not support AudioContext or denies sound; remain silent. */ }
}
