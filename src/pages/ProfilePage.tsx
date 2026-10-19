import {IonContent,IonPage,IonButton,IonIcon} from '@ionic/react';
import {useState} from 'react';
import {personCircleOutline,shieldCheckmarkOutline,checkmarkCircleOutline,refreshOutline} from 'ionicons/icons';
import {PageFrame,ModuleHeader} from '../components/AppChrome';
import {festivalThemes} from '../data/festival-themes';
import {type LocalProfile,nextHometownProfile} from '../data/personalization';
import {readProfile,saveProfile} from '../services/personalization';
import {PamanaIllustratedCard,PamanaBadge,PamanaMascot} from '../components/adventure/PamanaUI';
import {HometownPicker,LearningStylePicker,AvatarPicker,FestivalPalettePicker} from '../components/adventure/PersonalizationChoices';

export default function ProfilePage(){
 const [profile,setProfile]=useState<LocalProfile>(readProfile);
 const [saved,setSaved]=useState<LocalProfile>(readProfile);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 const dirty=JSON.stringify(profile)!==JSON.stringify(saved);
 const update=(change:Partial<LocalProfile>)=>{setMessage('');setProfile(p=>({...p,...change}));};
 const save=async()=>{
  if(busy)return;
  setBusy(true);setMessage('');
  try{const result=await saveProfile(profile);setProfile(result);setSaved(result);setMessage('Your choices are saved privately on this device. Your lessons, Quest results and stamps stay unchanged.');}
  catch{setMessage('Could not save changes. Your earlier preferences are still stored; please try again.');}
  finally{setBusy(false);}
 };
 const discard=()=>{if(busy)return;const previous=readProfile();setProfile(previous);setSaved(previous);setMessage('Unsaved choices discarded.');};
 return <IonPage><IonContent>
  <PageFrame active="settings">
   <ModuleHeader title="Aking Pamana" subtitle="Make your heritage adventure your own." icon={personCircleOutline}/>
   <div className="pamana-profile pamana3-profile">
    <PamanaIllustratedCard variant="hills" className="pamana3-profile-hero">
     <PamanaBadge tone="mint">MY ADVENTURE · MY CHOICE</PamanaBadge>
     <h2>A journey that feels like yours</h2>
     <p>Choose a hometown, your preferred learning style and gentle festival colors. You can change them whenever you like.</p>
    </PamanaIllustratedCard>
    <PamanaMascot compact message="Your preferences help me suggest where to explore. Every lesson and hometown stays available to you!"/>

    <section className="pamana-panel pamana3-section" aria-labelledby="profile-basic-heading">
     <div className="pamana3-section-top"><span className="pamana3-section-step">01</span><div><h2 id="profile-basic-heading">Your explorer profile</h2><p>A nickname is enough—no real name, contact details or account required.</p></div></div>
     <label>Explorer nickname<input maxLength={32} autoComplete="off" value={profile.nickname} onChange={e=>update({nickname:e.target.value})}/></label>
     <strong className="pamana3-field-label">Your avatar</strong>
     <AvatarPicker value={profile.avatar} onChange={avatar=>update({avatar})}/>
    </section>

    <section className="pamana-panel pamana3-section" aria-labelledby="profile-town-heading">
     <div className="pamana3-section-top"><span className="pamana3-section-step">02</span><div><h2 id="profile-town-heading">Choose your hometown</h2><p>Pick one of Oriental Mindoro's 14 municipalities or Calapan City, or skip this choice.</p></div></div>
     <HometownPicker value={profile.hometown} onChange={town=>{setMessage('');setProfile(p=>nextHometownProfile(p,town));}}/>
    </section>

    <section className="pamana-panel pamana3-section" aria-labelledby="profile-level-heading">
     <div className="pamana3-section-top"><span className="pamana3-section-step">03</span><div><h2 id="profile-level-heading">How do you like to learn?</h2><p>Learning styles are preferences, not age categories. Original source-backed material remains accessible.</p></div></div>
     <LearningStylePicker value={profile.learningStage} onChange={learningStage=>update({learningStage})}/>
    </section>

    <section className="pamana-panel pamana3-section" aria-labelledby="profile-colors-heading">
     <div className="pamana3-section-top"><span className="pamana3-section-step">04</span><div><h2 id="profile-colors-heading">Festival-inspired colors</h2><p>Colors are decorative. Changing your theme does not change history or festival information.</p></div></div>
     <FestivalPalettePicker value={profile.themeId} hometown={profile.hometown} onChange={themeId=>update({themeId})}/>
     <label>Favorite festival
      <select value={profile.favoriteFestivalId} onChange={e=>update({favoriteFestivalId:e.target.value})}>
       <option value="">No preference</option>
       {festivalThemes.filter(t=>t.municipality).map(t=><option value={t.id} key={t.id}>{t.name} — {t.municipality}</option>)}
      </select>
     </label>
    </section>

    <section className="pamana-panel pamana3-section" aria-labelledby="profile-access-heading">
     <div className="pamana3-section-top"><span className="pamana3-section-step">05</span><div><h2 id="profile-access-heading">Reading and accessibility</h2><p>Comfortable controls that work offline, across different ages and preferences.</p></div></div>
     <p className="pamana-soft-light-note"><strong>Soft Light appearance is active.</strong> Reading uses bright surfaces and gentle colors.</p>
     <div className="pamana3-comfort-row">
      <label>Text size
       <select value={profile.textSize} onChange={e=>update({textSize:e.target.value as LocalProfile['textSize']})}>
        <option value="small">Small</option><option value="default">Default</option><option value="large">Large</option><option value="extra-large">Extra large</option>
       </select>
      </label>
      <label>Language preference
       <select value={profile.language} onChange={e=>update({language:e.target.value as LocalProfile['language']})}>
        <option value="en">English</option><option value="fil">Filipino (full translation not yet available)</option>
       </select>
      </label>
     </div>
     <label className="pamana-checkbox pamana3-motion"><input type="checkbox" checked={profile.reducedMotion} onChange={e=>update({reducedMotion:e.target.checked})}/>Reduce decorative animations</label>
     <p className="pamana3-field-note">Text size and reduced motion take effect after saving. Optional interface sounds are planned for a later phase and are not enabled here.</p>
    </section>

    <div className="pamana3-save-bar">
     <span className={dirty?'pamana3-pending':'pamana3-saved'}><IonIcon icon={dirty?refreshOutline:checkmarkCircleOutline} aria-hidden="true"/>{dirty?'Unsaved changes':'All choices saved'}</span>
     <div className="pamana3-save-actions">
      <button type="button" className="pamana2-button pamana2-button--quiet" disabled={!dirty||busy} onClick={discard}>Discard</button>
      <IonButton disabled={busy||!dirty} onClick={()=>void save()}>{busy?'Saving…':'Save my preferences'}</IonButton>
     </div>
    </div>
    {message&&<p className="pamana3-save-message" role="status">{message}</p>}
    <p className="pamana3-privacy"><IonIcon icon={shieldCheckmarkOutline} aria-hidden="true"/> Your preferences stay on this device. Your heritage stamps, writings and learning history are not reset when you personalize.</p>
   </div>
  </PageFrame>
 </IonContent></IonPage>;
}
