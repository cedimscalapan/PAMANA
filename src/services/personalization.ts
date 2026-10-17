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
export function applyPersonalization(p:LocalProfile=readProfile()):void{
 const root=document.documentElement,festival=resolveTheme(p.themeId);
 const dark=p.mode==='dark'||(p.mode==='system'&&window.matchMedia?.('(prefers-color-scheme: dark)').matches);
 const set=(key:string,value:string)=>root.style.setProperty(key,value);
 set('--green',festival.primary);set('--deep-green',festival.primary);
 set('--brown',festival.secondary);set('--terracotta',festival.accent);
 set('--pamana-theme-primary',festival.primary);
 set('--pamana-theme-accent',festival.accent);
 set('--cream',dark?'#172320':festival.canvas);
 set('--beige',dark?'#26332D':'#F2E7D3');
 set('--ink',dark?'#F5F2E8':'#25251F');
 set('--muted',dark?'#C5CCBE':'#635F55');
 set('--ion-background-color',dark?'#172320':festival.canvas);
 set('--ion-text-color',dark?'#F5F2E8':'#25251F');
 set('--ion-color-primary',festival.primary);
 const rgb=festival.primary.match(/[0-9A-Fa-f]{2}/g);
 if(rgb&&rgb.length===3)set('--ion-color-primary-rgb',rgb.map(s=>parseInt(s,16)).join(','));
 const scales={small:'0.92',default:'1',large:'1.12','extra-large':'1.24'};
 set('--pamana-text-scale',scales[p.textSize]);
 root.dataset.pamanaTheme=festival.id;
 root.dataset.pamanaMode=dark?'dark':'light';
 root.dataset.pamanaMotion=p.reducedMotion?'reduce':'normal';
 root.lang=p.language==='fil'?'fil':'en';
}
