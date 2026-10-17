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
 // Hometown choices personalize accent colors, not the entire reading background.
 // Neutral surfaces keep all sixteen reading levels and content areas legible.
 set('--green', dark ? '#A5D4BC' : '#245A43');
 set('--deep-green', dark ? '#BBDCCC' : '#193E30');
 set('--brown', dark ? '#F2F6F2' : '#233C31');
 set('--terracotta', festival.accent);
 set('--pamana-theme-primary', festival.primary);
 set('--pamana-theme-accent', festival.accent);
 set('--pamana-theme-secondary', festival.secondary);
 set('--pamana-theme-canvas', festival.canvas);
 set('--cream',dark?'#141E1A':'#F6F8F4');
 set('--beige',dark?'#25352C':'#EAF1EA');
 set('--ink',dark?'#EFF5EF':'#1C3027');
 set('--muted',dark?'#B8C9BE':'#5E7065');
 set('--pamana-surface',dark?'#213028':'#FFFFFF');
 set('--pamana-border',dark?'#42584A':'#DCE7DE');
 set('--pamana-shadow',dark?'0 9px 26px rgba(0,0,0,.16)':'0 8px 26px rgba(31,67,47,.055)');
 set('--ion-background-color',dark?'#141E1A':'#F6F8F4');
 set('--ion-text-color',dark?'#EFF5EF':'#1C3027');
 set('--ion-color-primary', dark ? '#A5D4BC' : '#245A43');
 const rgb=festival.primary.match(/[0-9A-Fa-f]{2}/g);
 if(rgb&&rgb.length===3)set('--ion-color-primary-rgb',rgb.map(s=>parseInt(s,16)).join(','));
 const scales={small:'0.92',default:'1',large:'1.12','extra-large':'1.24'};
 set('--pamana-text-scale',scales[p.textSize]);
 root.dataset.pamanaTheme=festival.id;
 root.dataset.pamanaMode=dark?'dark':'light';
 root.dataset.pamanaMotion=p.reducedMotion?'reduce':'normal';
 root.lang=p.language==='fil'?'fil':'en';
}
