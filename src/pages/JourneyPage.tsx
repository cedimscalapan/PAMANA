import LakbaySections from '../components/LakbaySections';
import {IonContent,IonIcon,IonPage,useIonViewWillEnter} from '@ionic/react';
import {arrowForwardOutline,bookOutline,checkmarkCircleOutline,compassOutline,trophyOutline} from 'ionicons/icons';
import {useHistory,useLocation} from 'react-router-dom';
import {useRef,useState} from 'react';
import {PageFrame} from '../components/AppChrome';
import HometownScene from '../components/HometownScene';
import AdventureScenery from '../components/adventure/AdventureScenery';
import {townId,findChapter,heritageChapters,chapterStatus,type HeritageChapter,type JourneyStatus} from '../data/heritage-journey';
import {readJourneyProgress,syncJourneyQuestCompletion} from '../services/heritage-journey';
import {readQuestProgress} from '../services/quest-games';
import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {readProfile} from '../services/personalization';
import JourneyLevelMap from '../components/adventure/JourneyLevelMap';
import KaPamanaGuide from '../components/adventure/KaPamanaGuide';

export const nextJourneyStep=(status:JourneyStatus):'festival'|'lesson'|'quest'|'complete'=>
 !status.festivalOpened?'festival':!status.lessonCompleted?'lesson':!status.questCompleted?'quest':'complete';
const activityLink=(chapter:HeritageChapter,step:'festival'|'lesson'|'quest'|'complete')=>
 '/journey/activity?town='+encodeURIComponent(chapter.id)+'&step='+step;
export default function JourneyPage(){
 const history=useHistory(),location=useLocation();
 const profile=readProfile();
 const requested=new URLSearchParams(location.search).get('town');
 const selected=findChapter(requested)??findChapter(townId(profile.hometown))??heritageChapters[0];
 const [saved,setSaved]=useState(readJourneyProgress);
 const [,refresh]=useState(0),[message,setMessage]=useState('');
 const details=useRef<HTMLElement>(null);
 useIonViewWillEnter(()=>{
  setSaved(readJourneyProgress());refresh(n=>n+1);
  void syncJourneyQuestCompletion(selected.id).then(next=>{setSaved(next);refresh(n=>n+1);})
   .catch(()=>setMessage('Could not refresh your earlier Quest result. Your saved learning data has not been reset.'));
 });
 const results=readQuestProgress().results;
 const completedLessons=new Set(lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').map(l=>l.id));
 const status=chapterStatus(selected,saved,completedLessons,results);
 const stamps=heritageChapters.filter(chapter=>chapterStatus(chapter,saved,completedLessons,results).completed).length;
 const start=()=>history.push(activityLink(selected,nextJourneyStep(status)));
 const goToDetails=()=>{details.current?.scrollIntoView({behavior:'auto',block:'start'});details.current?.focus();};
 const steps=[
  {title:'Tuklas',subtitle:'Read the unique hometown history, livelihood and cultural heritage research.',icon:compassOutline,
   done:status.festivalOpened,step:'festival' as const,available:true},
  {title:'Matuto',subtitle:'Discover all official annual festivals, documented heritage places and the sources behind local claims.',icon:bookOutline,
   done:status.lessonCompleted,step:'lesson' as const,available:status.festivalOpened},
  {title:'Hometown Challenge',subtitle:'Answer individual source-linked questions about this town’s history, local life, festivals and heritage places.',icon:trophyOutline,
   done:status.questCompleted,step:'quest' as const,available:status.festivalOpened&&status.lessonCompleted}
 ];
 return <IonPage><IonContent><PageFrame active="journey">
  <section className="pamana-journey-page">
   <header className="pamana-journey-header">
    <AdventureScenery variant="sunrise" className="pamana2-journey-scene"/>
    <div><span className="pamana-eyebrow">SMART PAMANA · OFFLINE HERITAGE LEARNING</span><h1>Lakbay</h1>
     <p>Choose a hometown, follow three connected learning steps and earn a stamp.</p></div>
   </header>
   <LakbaySections active="adventure"/>
   <div className="pamana-journey-summary">
    <span><IonIcon icon={compassOutline} aria-hidden="true"/> 15 hometowns</span>
    <span><IonIcon icon={trophyOutline} aria-hidden="true"/> {stamps} of 15 stamps earned</span>
    <span><IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/> Saves progress offline</span>
   </div>
   <JourneyLevelMap selected={selected} onSelect={chapter=>{history.push('/journey?town='+chapter.id);setMessage('');}}
    onStart={start} onDetails={goToDetails} progress={saved} completedLessons={completedLessons} results={results}/>
   <section className="pamana-chapter pamana-journey-detail" ref={details} tabIndex={-1} aria-label={'Learning steps for '+selected.town}>
    <div className="pamana-chapter-top"><div><span className="pamana-eyebrow">SELECTED HOMETOWN</span>
     <h2>{selected.town}</h2><p>History · Livelihoods · Heritage · Festivals · {status.done} of 3 steps completed</p></div>
     <HometownScene className="pamana-chapter-symbol" hometown={selected.town}/></div>
    <div className="pamana-chapter-progress"><div><strong>{status.done} of 3 steps</strong>
     <span>{status.completed?'Your hometown stamp is earned. Explore again anytime.':'Your reading, questions and progress remain on this device.'}</span></div>
     <progress max={3} value={status.done} aria-label={selected.town+' learning progress'}/></div>
    <ol className="pamana-mission-trail">{steps.map((item,index)=><li key={item.step} className={item.done?'is-done':''}>
     <span className="pamana-mission-index" aria-hidden="true">{item.done?'✓':index+1}</span>
     <div className="pamana-mission-copy"><div className="pamana-mission-name"><IonIcon icon={item.icon} aria-hidden="true"/><h3>{item.title}</h3></div>
      <p>{item.subtitle}</p><span className="pamana-mission-status">{item.done?'Completed':'Available when earlier reading is finished'}</span></div>
     <button type="button" disabled={!item.available} onClick={()=>history.push(activityLink(selected,item.step))}>
      {item.done?'Review':item.available?'Start step':'Finish earlier step'} <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
    </li>)}</ol>
    <button type="button" className="pamana-flow-primary" onClick={start}>
     {status.completed?'View completed journey':'Continue '+selected.town+' journey'} <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
    {message&&<p className="inline-status" role="status">{message}</p>}
   </section>
   <div className="pamana-journey-footer">
    <button type="button" onClick={()=>history.push('/my-pamana')}>View my Heritage Passport <IonIcon icon={arrowForwardOutline}/></button>
    <button type="button" onClick={()=>history.push('/explore')}>Explore Places & Festivals <IonIcon icon={arrowForwardOutline}/></button>
   </div>
  </section>
 </PageFrame></IonContent></IonPage>;
}
