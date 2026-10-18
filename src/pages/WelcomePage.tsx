import {IonContent,IonIcon,IonPage} from '@ionic/react';
import {arrowForwardOutline,cloudOfflineOutline,shieldCheckmarkOutline} from 'ionicons/icons';
import {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import mascot from '../assets/reference/ka-pamana-icon.png';
import AdventureScenery from '../components/adventure/AdventureScenery';
import AdventureIntro from '../components/adventure/AdventureIntro';
import {PamanaButton,PamanaBadge} from '../components/adventure/PamanaUI';
import {completeOnboarding,hasCompletedOnboarding} from '../services/onboarding';

export default function WelcomePage(){
 const history=useHistory();
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 useEffect(()=>{if(hasCompletedOnboarding())history.replace('/home');},[history]);
 const skip=async()=>{
  if(busy)return;
  setBusy(true);setError('');
  try{await completeOnboarding();history.replace('/home');}
  catch{setError('Your offline preference could not be saved. Please try again.');}
  finally{setBusy(false);}
 };
 return <IonPage><IonContent fullscreen>
  <main className="pamana-welcome" aria-label="Welcome to SMART PAMANA">
   <div className="pamana-welcome-topline"><strong>SMART PAMANA</strong><span><IonIcon icon={cloudOfflineOutline} aria-hidden="true"/> Works offline</span></div>
   <section className="pamana-welcome-hero">
    <AdventureScenery variant="hills" className="pamana-welcome-landscape"/>
    <div className="pamana-welcome-mascot"><img src={mascot} alt="Ka-Pamana, your heritage adventure companion"/></div>
    <div className="pamana-welcome-title">
     <PamanaBadge tone="gold">A HERITAGE ADVENTURE</PamanaBadge>
     <h1>Discover<br/><span>Our Heritage.</span></h1>
     <p>Explore the stories, places, and living traditions of Oriental Mindoro—at your own pace.</p>
    </div>
   </section>
   <div className="pamana-welcome-body">
    <h2>A journey worth sharing</h2>
    <p>Choose your own path through short discoveries, meaningful learning, and playful challenges.</p>
    <AdventureIntro/>
    <div className="pamana-welcome-actions">
     <PamanaButton disabled={busy} onClick={()=>history.replace('/onboarding')}>Get started <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></PamanaButton>
     <PamanaButton variant="quiet" disabled={busy} onClick={()=>void skip()}>{busy?'Saving…':'Explore now — skip setup'}</PamanaButton>
    </div>
    {error&&<p className="pamana-welcome-error" role="alert">{error}</p>}
    <p className="pamana-welcome-privacy"><IonIcon icon={shieldCheckmarkOutline} aria-hidden="true"/> No account needed. Your profile and progress stay on this device.</p>
   </div>
  </main>
 </IonContent></IonPage>;
}
