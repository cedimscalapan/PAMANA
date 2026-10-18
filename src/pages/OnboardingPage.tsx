import {IonButton,IonContent,IonIcon,IonPage} from '@ionic/react';
import {arrowBackOutline,arrowForwardOutline,checkmarkCircleOutline} from 'ionicons/icons';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import mascot from '../assets/reference/ka-pamana-icon.png';
import {festivalThemes,municipalities,themeForHometown} from '../data/festival-themes';
import {learningStages} from '../data/learning-levels';
import HometownScene from '../components/HometownScene';
import AdventureScenery from '../components/adventure/AdventureScenery';
import AdventureIntro from '../components/adventure/AdventureIntro';
import {ONBOARDING_STEPS} from '../data/onboarding-flow';
import {defaultProfile,nextHometownProfile,type AvatarId,type LocalProfile} from '../data/personalization';
import {readProfile} from '../services/personalization';
import {completeOnboarding} from '../services/onboarding';

const avatars:Array<[AvatarId,string]>=[['mascot','🌟'],['leaf','🌿'],['star','✨'],['book','📚'],['art','🎨']];
export default function OnboardingPage(){
 const history=useHistory();
 const [step,setStep]=useState(0);
 const [draft,setDraft]=useState<LocalProfile>(()=>({...defaultProfile,...readProfile()}));
 const [busy,setBusy]=useState(false),[error,setError]=useState('');
 const update=(p:Partial<LocalProfile>)=>setDraft(old=>({...old,...p}));
 const navigate=(next:number)=>{if(busy)return;setError('');setStep(Math.max(0,Math.min(ONBOARDING_STEPS.length-1,next)));};
 const finish=async(skip=false)=>{
  if(busy)return;
  setBusy(true);setError('');
  try{await completeOnboarding(skip?undefined:draft);history.replace('/home');}
  catch{setError('Your offline setup could not be saved. Please try again.');}
  finally{setBusy(false);}
 };
 return <IonPage><IonContent fullscreen>
  <main className="pamana-onboarding pamana2-onboarding">
   <header className="pamana2-onboarding-header">
    <div><span className="pamana2-onboarding-brand">SMART PAMANA</span><span className="pamana2-onboarding-brand-sub">YOUR OFFLINE HERITAGE ADVENTURE</span></div>
    <img src={mascot} alt="Ka-Pamana"/>
   </header>
   <div className="pamana2-onboarding-art" aria-hidden="true"><AdventureScenery variant="sunrise"/></div>
   <section className="pamana2-onboarding-panel">
    <div className="pamana2-onboarding-progress">
     <span className="module-kicker">STEP {step+1} OF {ONBOARDING_STEPS.length}</span>
     <span className="pamana2-onboarding-step-label">{Math.round((step+1)/ONBOARDING_STEPS.length*100)}% through setup</span>
    </div>
    <progress value={step+1} max={ONBOARDING_STEPS.length} aria-label="Onboarding progress"/>
    <h1>{ONBOARDING_STEPS[step]}</h1>
    {step===0&&<><p>Welcome! Discover places, learn meaningful stories, try friendly activities, and preserve your discoveries—all without an account.</p><AdventureIntro compact/><p className="pamana2-onboarding-hint">Everything works at your pace. You can skip setup and change your profile later.</p></>}
    {step===1&&<><p>No real name or account needed. Choose a nickname and an avatar that feels right for you.</p>
     <label>Explorer nickname<input maxLength={32} autoComplete="off" value={draft.nickname} onChange={e=>update({nickname:e.target.value})}/></label>
     <div className="pamana-avatar-grid" role="group" aria-label="Choose an avatar">
      {avatars.map(([id,emoji])=><button type="button" key={id} aria-pressed={draft.avatar===id} onClick={()=>update({avatar:id})}><span aria-hidden="true">{emoji}</span><strong>{id==='mascot'?'Ka-Pamana':id[0].toUpperCase()+id.slice(1)}</strong></button>)}
     </div>
    </>}
    {step===2&&<><p>Choose your hometown to see related festival and heritage discoveries. You can explore any municipality or city, regardless of your choice.</p>
     <label>My hometown<select value={draft.hometown} onChange={e=>setDraft(old=>nextHometownProfile(old,e.target.value))}><option value="">I prefer not to say</option>{municipalities.map(t=><option key={t} value={t}>{t}</option>)}</select></label>
     <p className="pamana2-onboarding-hint">This choice is optional, editable, and stored on your device.</p>
    </>}
    {step===3&&<><p>Everyone can choose any learning experience, regardless of age. This setting can be changed at any time.</p>
     <div className="pamana-level-grid" role="group" aria-label="Choose your learning experience">
      {learningStages.map(s=><button type="button" key={s.id} aria-pressed={draft.learningStage===s.id} onClick={()=>update({learningStage:s.id})}><strong>{s.name}</strong><small>{s.detail}</small></button>)}
     </div>
    </>}
    {step===4&&<><p>Choose a light, image-free festival color palette. Your hometown suggestion is <strong>{themeForHometown(draft.hometown).name}</strong>, but all themes are available.</p>
     <div className="pamana-theme-grid" role="group" aria-label="Choose a festival color palette">
      {festivalThemes.map(t=><button type="button" key={t.id} aria-pressed={draft.themeId===t.id} onClick={()=>update({themeId:t.id})}>
       <HometownScene className="pamana-theme-art" hometown={t.municipality}/>
       <strong>{t.name}</strong><small>{t.municipality||'Heritage theme'}</small>
      </button>)}
     </div>
    </>}
    {step===5&&<div className="pamana2-onboarding-summary">
     <span className="pamana2-onboarding-celebrate" aria-hidden="true">🌿</span>
     <p>Ready to discover, <strong>{draft.nickname.trim()||'Ka-Pamana'}</strong>?</p>
     <div className="pamana2-onboarding-summary-info">
      <span><IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/> {draft.hometown||'All of Oriental Mindoro'}</span>
      <span><IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/> {learningStages.find(s=>s.id===draft.learningStage)?.name}</span>
      <span><IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/> {festivalThemes.find(t=>t.id===draft.themeId)?.name}</span>
     </div>
     <p className="pamana2-onboarding-hint">Your profile is private to this device. No registration or internet connection is needed.</p>
    </div>}
    <div className="pamana-steps pamana2-onboarding-controls">
     <IonButton fill="clear" disabled={busy} onClick={()=>step===0?history.replace('/welcome'):navigate(step-1)}><IonIcon icon={arrowBackOutline} slot="start"/>{step===0?'Welcome':'Back'}</IonButton>
     <IonButton disabled={busy} onClick={()=>step<ONBOARDING_STEPS.length-1?navigate(step+1):void finish()}>{busy?'Saving…':step===ONBOARDING_STEPS.length-1?'Start exploring':'Continue'}<IonIcon icon={arrowForwardOutline} slot="end"/></IonButton>
    </div>
    {step!==ONBOARDING_STEPS.length-1&&<button className="pamana2-onboarding-skip" type="button" disabled={busy} onClick={()=>void finish(true)}>Skip setup and explore now</button>}
    {error&&<p className="pamana-welcome-error" role="alert">{error}</p>}
   </section>
  </main>
 </IonContent></IonPage>;
}
