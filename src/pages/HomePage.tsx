import {IonContent,IonIcon,IonPage,useIonViewWillEnter} from '@ionic/react';
import {arrowForwardOutline,bookOutline,compassOutline,pencilOutline,ribbonOutline,trophyOutline,personCircleOutline} from 'ionicons/icons';
import {useEffect,useState} from 'react';
import {useHistory} from 'react-router-dom';
import {PageFrame} from '../components/AppChrome';
import AdventureScenery from '../components/adventure/AdventureScenery';
import CulturalFactCard from '../components/CulturalFactCard';
import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';
import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {buildHomeDashboard} from '../data/home-dashboard';
import {readJourneyProgress} from '../services/heritage-journey';
import {readQuestProgress} from '../services/quest-games';
import {readProfile} from '../services/personalization';
import {hasCompletedOnboarding} from '../services/onboarding';

export default function HomePage(){
 const history=useHistory();
 const [,refresh]=useState(0);
 useIonViewWillEnter(()=>refresh(value=>value+1));
 useEffect(()=>{
  if(!hasCompletedOnboarding())history.replace('/welcome');
  const changed=()=>refresh(value=>value+1);
  for(const name of ['pamana:profile-changed','pamana:journey-changed','pamana:discovery-changed'])window.addEventListener(name,changed);
  return ()=>{for(const name of ['pamana:profile-changed','pamana:journey-changed','pamana:discovery-changed'])window.removeEventListener(name,changed);};
 },[history]);
 const profile=readProfile();
 const finished=new Set(lessons.filter(lesson=>localStorage.getItem(storageKey(lesson.id))==='complete').map(lesson=>lesson.id));
 const quest=readQuestProgress();
 const hometownChallenges=Object.values(readJourneyProgress().chapters).filter(item=>item.chapterQuestCompleted===true).length;
 const dashboard=buildHomeDashboard({hometown:profile.hometown,progress:readJourneyProgress(),
  completedLessonIds:finished,questResults:quest.results,totalQuestCompletions:quest.totals.completed});
 const chapter=dashboard.chapter;
 const pendingLesson=lessons.find(item=>item.id===localStorage.getItem('pamana.lastLesson')&&!finished.has(item.id))
  ??lessons.find(item=>!finished.has(item.id))??lessons[0];
 const quick=[
  {name:'Matuto',desc:'Read cultural lessons',icon:bookOutline,path:'/learn'},
  {name:'Sulat',desc:'Practice Hanunó’o',icon:pencilOutline,path:'/writing'},
  {name:'Mga Laro',desc:'Try heritage challenges',icon:trophyOutline,path:'/quest'},
  {name:'Aking Pamana',desc:'Stamps and memories',icon:ribbonOutline,path:'/my-pamana'}
 ] as const;
 return <IonPage><IonContent fullscreen><PageFrame active="home">
  <div className="pamana-final-home">
   <header className="pamana-final-home-header">
    <div><span className="pamana-eyebrow">SMART PAMANA · OFFLINE HERITAGE</span>
     <h1>Simula</h1><p>Welcome back, <strong>{profile.nickname}</strong>!</p></div>
    <button type="button" onClick={()=>history.push('/profile')} aria-label="Edit explorer profile" className="pamana-final-home-avatar">
     {profile.avatar==='mascot'?<img src={kaPamanaIcon} alt=""/>:<IonIcon icon={personCircleOutline} aria-hidden="true"/>}</button>
   </header>
   <section className="pamana-final-home-hero" aria-labelledby="pamana-final-hero-title">
    <AdventureScenery variant="sunrise" className="pamana-final-home-scenery"/>
    <div className="pamana-final-home-hero-copy">
     <span className="pamana-eyebrow">YOUR NEXT HERITAGE DISCOVERY</span>
     <h2 id="pamana-final-hero-title">{chapter.town}</h2>
     <p>{dashboard.status.completed?'You earned this town stamp. Explore another chapter!':
       dashboard.status.done+' of 3 discoveries saved · '+dashboard.next.title}</p>
     <button type="button" className="pamana-final-primary" onClick={()=>history.push('/journey?town='+chapter.id)}>
      Continue adventure <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
    </div>
   </section>
   <section className="pamana-final-home-progress" aria-label="Saved learning progress">
    <div><IonIcon icon={bookOutline} aria-hidden="true"/><strong>{dashboard.finishedLessons}<small>/{dashboard.totalLessons}</small></strong><span>Lessons</span></div>
    <div><IonIcon icon={trophyOutline} aria-hidden="true"/><strong>{dashboard.finishedQuests+hometownChallenges}</strong><span>Challenges</span></div>
    <div><IonIcon icon={ribbonOutline} aria-hidden="true"/><strong>{dashboard.finishedTowns}<small>/15</small></strong><span>Town stamps</span></div>
   </section>
   <section className="pamana-final-home-lesson" aria-labelledby="pamana-final-lesson-title">
    <div><span className="pamana-eyebrow">CONTINUE LEARNING</span><h2 id="pamana-final-lesson-title">{pendingLesson.title}</h2>
     <p>{finished.size===lessons.length?'All lessons completed. Revisit any topic.':pendingLesson.summary}</p></div>
    <button type="button" onClick={()=>history.push('/learn?lesson='+pendingLesson.id)}>Open lesson <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
   </section>
   <section className="pamana-final-home-shortcuts" aria-labelledby="pamana-final-activities-title">
    <h2 id="pamana-final-activities-title">What would you like to do?</h2>
    <div>{quick.map(item=><button type="button" key={item.path} onClick={()=>history.push(item.path)}>
     <IonIcon icon={item.icon} aria-hidden="true"/><strong>{item.name}</strong><small>{item.desc}</small></button>)}</div>
   </section>
   <details className="pamana-final-home-discovery">
    <summary><IonIcon icon={compassOutline} aria-hidden="true"/> Discover something interesting</summary>
    <CulturalFactCard/>
   </details>
  </div>
 </PageFrame></IonContent></IonPage>;
}
