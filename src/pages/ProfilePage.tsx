import {IonContent,IonPage,IonButton} from '@ionic/react';
import {useState} from 'react';
import {personCircleOutline} from 'ionicons/icons';
import {PageFrame,ModuleHeader} from '../components/AppChrome';
import {festivalThemes,municipalities,themeForHometown} from '../data/festival-themes';
import {learningStages} from '../data/learning-levels';
import { artworkForTheme } from '../data/festival-artwork';
import {type LocalProfile,nextHometownProfile} from '../data/personalization';
import {readProfile,saveProfile} from '../services/personalization';
const avatars=[['mascot','🌟'],['leaf','🌿'],['star','✨'],['book','📚'],['art','🎨']] as const;
export default function ProfilePage(){
 const [profile,setProfile]=useState<LocalProfile>(readProfile);
 const [busy,setBusy]=useState(false),[message,setMessage]=useState('');
 const update=(change:Partial<LocalProfile>)=>setProfile(p=>({...p,...change}));
 const save=async()=>{if(busy)return;setBusy(true);setMessage('');
  try{const p=await saveProfile(profile);setProfile(p);setMessage('Your profile is saved privately on this device.');}
  catch{setMessage('Could not save changes. Your previous profile remains.');}
  finally{setBusy(false);}};
 return <IonPage><IonContent><PageFrame active="settings">
  <ModuleHeader title="Aking Pamana" subtitle="Your hometown, your heritage journey." icon={personCircleOutline}/>
  <div className="pamana-profile">
   <section className="pamana-panel"><h2>My profile</h2><p>A nickname is enough—no account or personal contact details required.</p>
    <label>Nickname<input maxLength={32} value={profile.nickname} onChange={e=>update({nickname:e.target.value})}/></label>
    <p>Avatar</p><div className="pamana-avatar-grid">{avatars.map(([id,emoji])=><button key={id} type="button" aria-pressed={profile.avatar===id} onClick={()=>update({avatar:id})}><span>{emoji}</span><small>{id}</small></button>)}</div>
    <label>Hometown<select value={profile.hometown} onChange={e=>setProfile(p=>nextHometownProfile(p,e.target.value))}><option value="">Prefer not to say</option>{municipalities.map(t=><option key={t}>{t}</option>)}</select></label>
   </section>
   <section className="pamana-panel"><h2>My festival theme</h2><p>Original color palettes inspired by festivals, not official festival branding. Choose any theme.</p>
    <p>Hometown suggestion: {themeForHometown(profile.hometown).name}</p>
    <div className="pamana-theme-grid">{festivalThemes.map(t=><button key={t.id} type="button" aria-pressed={profile.themeId===t.id} style={{background:t.canvas,color:'#25251F',borderColor:profile.themeId===t.id?t.primary:'transparent'}} onClick={()=>update({themeId:t.id})}><img className="pamana-theme-art" src={artworkForTheme(t)} alt="" loading="lazy"/><strong>{t.name}</strong><small>{t.municipality||'Classic PAMANA'}</small></button>)}</div>
    <label>Favorite festival<select value={profile.favoriteFestivalId} onChange={e=>update({favoriteFestivalId:e.target.value})}><option value="">No preference</option>{festivalThemes.filter(t=>t.municipality).map(t=><option value={t.id} key={t.id}>{t.name} — {t.municipality}</option>)}</select></label>
   </section>
   <section className="pamana-panel"><h2>Learning experience</h2><p>Any learner can use any reading level, at any age.</p>
    <div className="pamana-level-grid">{learningStages.map(s=><button key={s.id} type="button" aria-pressed={profile.learningStage===s.id} onClick={()=>update({learningStage:s.id})}><strong>{s.name}</strong><small>{s.detail}</small></button>)}</div>
   </section>
   <section className="pamana-panel"><h2>Reading & accessibility</h2>
    <label>Appearance<select value={profile.mode} onChange={e=>update({mode:e.target.value as LocalProfile['mode']})}><option value="system">Follow device</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
    <label>Text size<select value={profile.textSize} onChange={e=>update({textSize:e.target.value as LocalProfile['textSize']})}><option value="small">Small</option><option value="default">Default</option><option value="large">Large</option><option value="extra-large">Extra large</option></select></label>
    <label>Language preference<select value={profile.language} onChange={e=>update({language:e.target.value as LocalProfile['language']})}><option value="en">English</option><option value="fil">Filipino (full UI translation pending)</option></select></label>
    <label className="pamana-checkbox"><input type="checkbox" checked={profile.reducedMotion} onChange={e=>update({reducedMotion:e.target.checked})}/>Reduce decorative motion</label>
   </section>
   <IonButton expand="block" disabled={busy} onClick={()=>void save()}>{busy?'Saving…':'Save my profile'}</IonButton>
   {message&&<p role="status">{message}</p>}
  </div>
 </PageFrame></IonContent></IonPage>;
}