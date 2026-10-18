import {PROFILE_KEY,defaultProfile,sanitizeProfile,type LocalProfile} from '../data/personalization';
import {resolveTheme} from '../data/festival-themes';
import {setStored} from './storage';
export function readProfile():LocalProfile{
 try {const stored=localStorage.getItem(PROFILE_KEY);return stored?sanitizeProfile(JSON.parse(stored)):{...defaultProfile};}
 catch{return {...defaultProfile};}
}
export async function saveProfile(change:Partial<LocalProfile>):Promise<LocalProfile>{
 const updated=sanitizeProfile({...readProfile(),...change});
 await setStored(PROFILE_KEY,JSON.stringify(updated));
 applyPersonalization(updated);
 window.dispatchEvent(new Event('pamana:profile-changed'));
 return updated;
}
/** Apply one calm light palette across every module, regardless of phone dark mode.
 * Municipality schemes remain individual decorative accent choices only.
 * Existing saved profile records are retained; old dark preferences are ignored.
 */
export function applyPersonalization(p:LocalProfile=readProfile()):void {
 const root=document.documentElement;
 const festival=resolveTheme(p.themeId);
 const set=(key:string,value:string)=>root.style.setProperty(key,value);
 const tokens:Record<string,string>={
  '--green':'#276D5B',
  '--deep-green':'#215847',
  '--brown':'#2A3B4A',
  '--terracotta':'#BD7867',
  '--amber':'#D5A455',
  '--cream':'#FAFBF8',
  '--beige':'#EEF6F0',
  '--ink':'#273848',
  '--muted':'#60717E',
  '--pamana-surface':'#FFFFFF',
  '--pamana-border':'#E3EAE6',
  '--pamana-shadow':'0 7px 24px rgba(40,75,63,.055)',
  '--pamana-theme-primary':festival.primary,
  '--pamana-theme-accent':festival.accent,
  '--pamana-theme-secondary':festival.secondary,
  '--pamana-theme-canvas':festival.canvas,
  '--ion-background-color':'#FAFBF8',
  '--ion-text-color':'#273848',
  '--ion-item-background':'#FFFFFF',
  '--ion-card-background':'#FFFFFF',
  '--ion-toolbar-background':'#FFFFFF',
  '--ion-color-primary':'#276D5B',
  '--ion-color-primary-rgb':'39,109,91',
  '--ion-color-primary-contrast':'#FFFFFF',
  '--ion-color-step-50':'#F3F6F3',
  '--ion-color-step-100':'#E8EFEA',
  '--ion-color-step-150':'#DCE7DF',
  '--ion-color-step-200':'#D0DED4',
  '--ion-color-step-300':'#B8C9BF',
  '--ion-color-step-400':'#95AC9E',
  '--ion-color-step-500':'#778D80',
  '--ion-color-step-600':'#627468',
  '--ion-color-step-700':'#47584D',
  '--ion-color-step-800':'#38473E',
  '--ion-color-step-900':'#27352D',
 };
 for(const [key,value] of Object.entries(tokens))set(key,value);
 const scales={small:'0.94',default:'1',large:'1.12','extra-large':'1.24'};
 set('--pamana-text-scale',scales[p.textSize]);
 root.dataset.pamanaTheme=festival.id;
 root.dataset.pamanaMode='light';
 root.dataset.pamanaMotion=p.reducedMotion?'reduce':'normal';
 root.style.colorScheme='light';
 root.classList.remove('ion-palette-dark','dark');
 document.body?.classList.remove('ion-palette-dark','dark');
 root.lang=p.language==='fil'?'fil':'en';
}
