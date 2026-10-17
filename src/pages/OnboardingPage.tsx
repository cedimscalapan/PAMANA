import {IonButton,IonContent,IonPage} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import mascot from '../assets/reference/ka-pamana-icon.png';
import {festivalThemes,municipalities,themeForHometown} from '../data/festival-themes';
import {learningStages} from '../data/learning-levels';
import { artworkForTheme } from '../data/festival-artwork';
import {defaultProfile,nextHometownProfile,type AvatarId,type LocalProfile} from '../data/personalization';
import {readProfile,saveProfile} from '../services/personalization';
import {setStored} from '../services/storage';
const steps=['Welcome','Create your profile','Choose your hometown','Choose your learning experience','Festival theme','Begin exploring'];
const avatars:Array<[AvatarId,string]>=[['mascot','🌟'],['leaf','🌿'],['star','✨'],['book','📚'],['art','🎨']];
export default function OnboardingPage(){
 const history=useHistory(),[step,setStep]=useState(0);
 const [draft,setDraft]=useState<LocalProfile>(()=>({...defaultProfile,...readProfile()}));
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const update=(p:Partial<LocalProfile>)=>setDraft(old=>({...old,...p}));
 const finish=async()=>{if(busy)return;setBusy(true);setError('');try{await saveProfile(draft);await setStored('pamana.onboardingComplete','true');history.replace('/home');}catch{setError('Unable to save your offline profile. Please retry.');}finally{setBusy(false);}};
 return <IonPage><IonContent fullscreen><main className="pamana-onboarding">
   <header><p className="home-brand">SMART PAMANA</p><img src={mascot} alt="Ka-Pamana mascot"/></header>
   <section><p className="module-kicker">{step+1} OF {steps.length} · MY OFFLINE HERITAGE</p><h1>{steps[step]}</h1>
    {step===0&&<p>Discover Oriental Mindoro's people, places, writing traditions, and celebrations—offline.</p>}
    {step===1&&<><p>No real name or account needed. Choose a nickname and avatar.</p><label>Nickname<input maxLength={32} value={draft.nickname} onChange={e=>update({nickname:e.target.value})}/></label><div className="pamana-avatar-grid">{avatars.map(([id,emoji])=><button type="button" key={id} aria-pressed={draft.avatar===id} onClick={()=>update({avatar:id})}>{emoji} {id}</button>)}</div></>}
    {step===2&&<><p>Pick your hometown to see related festival and heritage discoveries. This is optional.</p><label>My hometown<select value={draft.hometown} onChange={e=>setDraft(old=>nextHometownProfile(old,e.target.value))}><option value="">Prefer not to say</option>{municipalities.map(t=><option key={t}>{t}</option>)}</select></label></>}
    {step===3&&<><p>Everyone can choose any reading experience at any age.</p><div className="pamana-level-grid">{learningStages.map(s=><button type="button" key={s.id} aria-pressed={draft.learningStage===s.id} onClick={()=>update({learningStage:s.id})}><strong>{s.name}</strong><small>{s.detail}</small></button>)}</div></>}
    {step===4&&<><p>Suggested for your hometown: {themeForHometown(draft.hometown).name}. Original palettes, not official festival designs.</p><div className="pamana-theme-grid">{festivalThemes.map(t=><button type="button" key={t.id} aria-pressed={draft.themeId===t.id} style={{background:t.canvas,color:'#25251f',borderColor:draft.themeId===t.id?t.primary:'transparent'}} onClick={()=>update({themeId:t.id})}><img className="pamana-theme-art" src={artworkForTheme(t)} alt="" loading="lazy"/><strong>{t.name}</strong></button>)}</div></>}
    {step===5&&<><p>Welcome, <strong>{draft.nickname||'Ka-Pamana'}</strong>!</p><p>{draft.hometown||'Oriental Mindoro'} · {learningStages.find(s=>s.id===draft.learningStage)?.name} · {festivalThemes.find(t=>t.id===draft.themeId)?.name}</p><p>Your profile stays on this device and can be edited in Aking Pamana.</p></>}
    <div className="pamana-steps"><IonButton fill="clear" disabled={busy} onClick={()=>step===0?void finish():setStep(n=>n-1)}>{step===0?'Skip setup':'Back'}</IonButton><IonButton disabled={busy} onClick={()=>step<steps.length-1?setStep(n=>n+1):void finish()}>{busy?'Saving…':step===steps.length-1?'Start exploring':'Continue'}</IonButton></div>
    {error&&<p role="alert">{error}</p>}
   </section>
 </main></IonContent></IonPage>;
}