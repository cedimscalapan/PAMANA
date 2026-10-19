import {IonContent,IonIcon,IonPage,useIonViewWillEnter} from '@ionic/react';
import {arrowForwardOutline,bookOutline,checkmarkCircleOutline,compassOutline,gameControllerOutline,lockClosedOutline,mapOutline,trophyOutline} from 'ionicons/icons';
import {useHistory,useLocation} from 'react-router-dom';
import {useState} from 'react';
import {PageFrame} from '../components/AppChrome';
import HometownScene from '../components/HometownScene';
import AdventureScenery from '../components/adventure/AdventureScenery';
import {townId,findChapter,heritageChapters,chapterStatus,type HeritageChapter} from '../data/heritage-journey';
import {readJourneyProgress,markFestivalOpened,syncJourneyQuestCompletion} from '../services/heritage-journey';
import {readQuestProgress} from '../services/quest-games';
import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {readProfile} from '../services/personalization';
import kaPamana from '../assets/reference/ka-pamana-icon.png';
import {interactiveLessonFor} from '../data/interactive-lessons';
import {isDiscoveryComplete} from '../services/interactive-lessons';
import AdventureMap from '../components/adventure/AdventureMap';
import {officialFestivals} from '../data/official-heritage';
import {SourceNotes} from '../components/HeritageUI';
import {photoForFestival} from '../data/gallery';

const descriptions={
 little:'Explore pictures, stories, and gentle challenges at your own pace.',
 young:'Follow a trail of short discoveries and fun heritage challenges.',
 researcher:'Use source-backed references, close reading, and knowledge challenges.',
 lifelong:'Choose a place, explore its cultural references, and learn at your own pace.'
};
const names:Record<string,string>={sort:'Festival Connections',photo:'Picture Detective',map:'Mindoro Map',memory:'Memory Match',quiz:'Knowledge Check',word:'Word Explorer',timeline:'Heritage Timeline'};
const pathFor=(chapter:HeritageChapter)=>'/journey?town='+chapter.id;
export default function JourneyPage(){
 const history=useHistory(),location=useLocation();
 const profile=readProfile();
 const requested=new URLSearchParams(location.search).get('town');
 const selected=findChapter(requested)??findChapter(townId(profile.hometown))??heritageChapters[0];
 const [saved,setSaved]=useState(readJourneyProgress);
 const [,refresh]=useState(0);
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState('');
 useIonViewWillEnter(()=>{
  setSaved(readJourneyProgress());refresh(n=>n+1);
  void syncJourneyQuestCompletion(selected.id).then(next=>{setSaved(next);refresh(n=>n+1);}).catch(()=>setMessage('Progress could not be refreshed. You can retry by returning to this page.'));
 });
 const results=readQuestProgress().results;
 const completedLessons=new Set(lessons.filter(lesson=>localStorage.getItem(storageKey(lesson.id))==='complete').map(lesson=>lesson.id));
 const status=chapterStatus(selected,saved,completedLessons,results);
 const discovery=interactiveLessonFor(selected.lessonId);
 const bonusCompleted=discovery?isDiscoveryComplete(selected.lessonId):false;
 const stamps=heritageChapters.filter(chapter=>chapterStatus(chapter,saved,completedLessons,results).completed).length;
 const festivalReference=officialFestivals.find(item=>item.id===selected.festivalId);
 const creditedImage=photoForFestival(selected.festivalId);
 const chapterPhoto=creditedImage?.license&&creditedImage?.credit?creditedImage:undefined;
 const sorted=[...heritageChapters].sort((a,b)=>Number(b.town===profile.hometown)-Number(a.town===profile.hometown));
 const openFestival=async()=>{
  if(busy)return;setBusy(true);setMessage('');
  try{const next=await markFestivalOpened(selected.id);setSaved(next);history.push('/explore?festival='+selected.festivalId);}
  catch{setMessage('Your discovery could not be saved. Please try again.');}
  finally{setBusy(false);}
 };
 const milestones=[
  {id:'festival',icon:compassOutline,done:status.festivalOpened,title:'Discover the local celebration',description:selected.festivalName,action:'Open festival',onClick:()=>void openFestival()},
  {id:'lesson',icon:bookOutline,done:status.lessonCompleted,title:'Read the related heritage lesson',description:selected.lessonTitle,action:'Read in Matuto',onClick:()=>history.push('/learn?lesson='+selected.lessonId)},
  {id:'quest',icon:gameControllerOutline,done:status.questCompleted,title:'Play a Mindoro heritage challenge',description:names[selected.mode]+' · a province-wide activity, not a town-specific simulation',action:'Go to Quest',onClick:()=>history.push('/quest?journey='+selected.id+'&mode='+selected.mode)}
 ];
 return <IonPage><IonContent>
  <PageFrame active="journey">
   <section className="pamana-journey-page">
    <header className="pamana-journey-header">
     <AdventureScenery variant="sunrise" className="pamana2-journey-scene"/>
     <div><span className="pamana-eyebrow">SMART PAMANA · OFFLINE ADVENTURES</span><h1>Heritage Journey</h1><p>{descriptions[profile.learningStage]}</p></div>
     <div className="pamana-journey-mascot"><img src={kaPamana} alt="Ka-Pamana, your cultural exploration companion"/></div>
    </header>
    <div className="pamana-journey-summary"><span><IonIcon icon={mapOutline}/> {heritageChapters.length} hometowns</span><span><IonIcon icon={trophyOutline}/> {stamps} heritage {stamps===1?'stamp':'stamps'}</span><span><IonIcon icon={checkmarkCircleOutline}/> Save progress offline</span></div>
    <AdventureMap selected={selected.id} onSelect={chapter=>{history.push(pathFor(chapter));setMessage('');}} progress={saved} completedLessons={completedLessons} results={results} hometown={profile.hometown}/>
    <div className="pamana-journey-title"><div><span className="pamana-eyebrow">ALL FIFTEEN CHAPTERS</span><h2>Choose a hometown card</h2></div></div>
    <div className="pamana-journey-towns" aria-label="Choose one of the fifteen hometown journeys">
     {sorted.map(chapter=>{
      const local=chapterStatus(chapter,saved,completedLessons,results);
      return <button type="button" key={chapter.id} aria-pressed={selected.id===chapter.id}
       className="pamana-journey-town" onClick={()=>{history.push(pathFor(chapter));setMessage('');}}>
       <HometownScene className="pamana-journey-town-art" hometown={chapter.town}/>
       <strong>{chapter.town}</strong>
       <small>{local.completed?'Stamp earned':local.done+' of 3 discoveries'}</small>
       {local.completed&&<span className="pamana-journey-earned" aria-label="Completed">✓</span>}
      </button>;
     })}
    </div>
    <section className="pamana-chapter" aria-label={'Adventure missions for '+selected.town}>
     <div className="pamana-chapter-top">
      <div><span className="pamana-eyebrow">YOUR SELECTED ADVENTURE</span><h2>{selected.town}</h2><p>Follow three short discoveries using existing reviewed references and activities.</p></div>
      <HometownScene className="pamana-chapter-symbol" hometown={selected.town}/>
     </div>
     <section className="pamana6-heritage-context" aria-label={selected.town+' source-backed cultural information'}>
      <span className="pamana-eyebrow">CULTURAL DISCOVERY · DOCUMENTED REFERENCE</span>
      <h3>{selected.festivalName}</h3>
      {chapterPhoto&&<img src={chapterPhoto.src} alt={chapterPhoto.alt} loading="lazy"/>}
      <p>{festivalReference?.description??'Open the linked official directory to learn more about this celebration.'}</p>
      <p className="pamana6-media-note">{chapterPhoto?'Photograph attribution is available in the linked cultural library.':'No approved documentary photo is displayed for this chapter.'} Festival calendars are annual directory references, not confirmed live events.</p>
      {festivalReference&&<SourceNotes ids={festivalReference.sourceIds}/>}
     </section>
     <div className="pamana-chapter-progress"><div><strong>{status.done} of 3 discoveries</strong><span>{status.completed?'Your hometown passport stamp is earned!':'No timer. Continue whenever you like.'}</span></div><progress max={3} value={status.done} aria-label={'Journey milestones completed in '+selected.town}/></div>
     <ol className="pamana-mission-trail">
      {milestones.map((step,index)=><li key={step.id} className={step.done?'is-done':''}>
       <span className="pamana-mission-index" aria-hidden="true">{step.done?'✓':index+1}</span>
       <div className="pamana-mission-copy"><div className="pamana-mission-name"><IonIcon icon={step.icon}/><h3>{step.title}</h3></div><p>{step.description}</p><span className="pamana-mission-status">{step.done?step.id==='festival'?'Opened the festival reference':step.id==='quest'?'Completed a linked Quest':'Lesson marked complete':'Ready to explore'}</span></div>
       <button type="button" disabled={busy} onClick={step.onClick}>{step.done?'Open again':step.action}<IonIcon icon={arrowForwardOutline}/></button>
      </li>)}
     </ol>
     {discovery&&<aside className="pamana-journey-bonus"><span className="pamana-journey-bonus-icon" aria-hidden="true">🌟</span><div><strong>Optional interactive discovery: {discovery.title}</strong><p>{bonusCompleted?'Completed and saved offline. Replay whenever you like.':'Two short activities with hints and feedback. Your heritage stamp does not depend on this extra activity.'}</p></div><button type="button" onClick={()=>history.push('/learn?lesson='+selected.lessonId)}>{bonusCompleted?'Replay in Matuto':'Try the discovery'} →</button></aside>}
     {status.completed?<div className="pamana-chapter-complete" role="status"><span aria-hidden="true">🏅</span><div><strong>{selected.town} Heritage Stamp</strong><p>You've opened its festival reference, completed a related lesson, and finished a linked Mindoro Quest.</p></div></div>:
       <p className="pamana-chapter-note"><IonIcon icon={lockClosedOutline}/> A stamp unlocks when all three activities are recorded. Unfinished steps stay available.</p>}
     <p className="pamana-chapter-culture">Cultural references remain available directly through Matuto and Lakbay. Games do not replace living communities, permission, or source review.</p>
     {message&&<p className="inline-status" role="alert">{message}</p>}
    </section>
    <div className="pamana-journey-footer"><button type="button" onClick={()=>history.push('/learn')}>Explore all lessons <IonIcon icon={arrowForwardOutline}/></button><button type="button" onClick={()=>history.push('/collection')}>View my heritage passport <IonIcon icon={arrowForwardOutline}/></button></div>
   </section>
  </PageFrame>
 </IonContent></IonPage>;
}
