import {IonContent,IonIcon,IonPage,useIonViewWillEnter} from '@ionic/react';
import {
 arrowForwardOutline,bookOutline,cameraOutline,compassOutline,pencilOutline,
 trophyOutline,albumsOutline,checkmarkCircleOutline,ellipseOutline,
 ribbonOutline,chevronForwardOutline,mapOutline,sparklesOutline
} from 'ionicons/icons';
import {useHistory} from 'react-router-dom';
import {useEffect,useState} from 'react';
import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';
import {PageFrame} from '../components/AppChrome';
import {PamanaBadge,PamanaButton,PamanaProgress} from '../components/adventure/PamanaUI';
import AdventureScenery from '../components/adventure/AdventureScenery';
import HometownScene from '../components/HometownScene';
import CulturalFactCard from '../components/CulturalFactCard';
import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {photoForLesson} from '../data/gallery';
import {resolveTheme} from '../data/festival-themes';
import {officialFestivals} from '../data/official-heritage';
import {buildHomeDashboard} from '../data/home-dashboard';
import {readJourneyProgress} from '../services/heritage-journey';
import {readQuestProgress} from '../services/quest-games';
import {readProfile} from '../services/personalization';
import {hasCompletedOnboarding} from '../services/onboarding';

const modules=[
 {label:'Matuto',sub:'Stories and lessons',icon:bookOutline,tone:'mint',path:'/learn'},
 {label:'Sulat',sub:'Hanunó’o practice',icon:pencilOutline,tone:'peach',path:'/writing'},
 {label:'Lakbay',sub:'Places and festivals',icon:compassOutline,tone:'sky',path:'/explore'},
 {label:'Quest',sub:'Play and discover',icon:trophyOutline,tone:'lavender',path:'/quest'},
 {label:'Kuwento',sub:'Private memories',icon:cameraOutline,tone:'rose',path:'/stories'},
 {label:'Koleksyon',sub:'My heritage passport',icon:albumsOutline,tone:'gold',path:'/collection'}
] as const;
const avatarSymbols={leaf:'🌿',star:'✨',book:'📚',art:'🎨'};
const steps=[
 {key:'festival',title:'Discover',text:'A hometown celebration',icon:compassOutline},
 {key:'lesson',title:'Learn',text:'A reviewed heritage lesson',icon:bookOutline},
 {key:'quest',title:'Play',text:'A connected Mindoro Quest',icon:trophyOutline}
] as const;
const activityMessages={
 festival:'Each place has a story. Begin with a documented local celebration, then choose what to explore next.',
 lesson:'You found a local celebration! Your next discovery is a reviewed Matuto lesson.',
 quest:'Great progress! Play the linked Mindoro Quest at your own pace to complete this chapter.',
 complete:'Your hometown journey is complete! You can revisit your discoveries or explore another place.'
};
export default function HomePage(){
 const history=useHistory();
 const [,refresh]=useState(0);
 useIonViewWillEnter(()=>refresh(value=>value+1));
 useEffect(()=>{
  if(!hasCompletedOnboarding())history.replace('/welcome');
  const onChange=()=>refresh(v=>v+1);
  window.addEventListener('pamana:profile-changed',onChange);
  window.addEventListener('pamana:journey-changed',onChange);
  window.addEventListener('pamana:discovery-changed',onChange);
  return ()=>{
   window.removeEventListener('pamana:profile-changed',onChange);
   window.removeEventListener('pamana:journey-changed',onChange);
   window.removeEventListener('pamana:discovery-changed',onChange);
  };
 },[history]);
 const profile=readProfile();
 const theme=resolveTheme(profile.themeId);
 const festival=officialFestivals.find(f=>f.municipality===profile.hometown&&f.id===profile.favoriteFestivalId)
  ??officialFestivals.find(f=>f.municipality===profile.hometown);
 const completedLessonIds=new Set(lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').map(l=>l.id));
 const journeyProgress=readJourneyProgress();
 const questProgress=readQuestProgress();
 const dashboard=buildHomeDashboard({
  hometown:profile.hometown,progress:journeyProgress,completedLessonIds,
  questResults:questProgress.results,totalQuestCompletions:questProgress.totals.completed
 });
 const continueLesson=lessons.find(l=>l.id===localStorage.getItem('pamana.lastLesson')&&!completedLessonIds.has(l.id))
  ??lessons.find(l=>!completedLessonIds.has(l.id))
  ??lessons[0];
 const lessonImage=photoForLesson(continueLesson.id);
 const readingComplete=dashboard.finishedLessons===dashboard.totalLessons;
 const lessonLabel=readingComplete?'Revisit your learning':'Continue learning';
 const chapter=dashboard.chapter,status=dashboard.status;
 const path='/journey?town='+chapter.id;
 const stepActions={
  festival:'/explore?festival='+encodeURIComponent(chapter.festivalId),
  lesson:'/learn?lesson='+encodeURIComponent(chapter.lessonId),
  quest:'/quest?journey='+chapter.id+'&mode='+chapter.mode
 };
 return <IonPage><IonContent fullscreen>
  <PageFrame active="home">
   <div className="pamana4-home">
    <header className="pamana4-topbar">
     <div><p className="pamana4-brand">SMART PAMANA <span>· OFFLINE HERITAGE</span></p>
      <h1>Welcome back,<br/><span>{profile.nickname}!</span></h1>
      <p className="pamana4-top-caption">Your Mindoro discoveries are waiting.</p>
     </div>
     <button type="button" className="pamana4-avatar" aria-label="Edit your profile" onClick={()=>history.push('/profile')}>
      {profile.avatar==='mascot'?<img src={kaPamanaIcon} alt="" />:
       <span aria-hidden="true">{avatarSymbols[profile.avatar]}</span>}
     </button>
    </header>

    <section className="pamana4-welcome-hero" aria-label="Your illustrated heritage adventure">
     <AdventureScenery variant="sunrise" className="pamana4-hero-landscape"/>
     <div className="pamana4-hero-copy">
      <PamanaBadge tone="gold">YOUR CULTURAL ADVENTURE</PamanaBadge>
      <h2>Every discovery<br/>keeps a story alive.</h2>
      <p>Explore, learn and play—with no internet or timer required.</p>
      <PamanaButton onClick={()=>history.push(path)}>
       Continue the journey <IonIcon icon={arrowForwardOutline} aria-hidden="true"/>
      </PamanaButton>
     </div>
     <img className="pamana4-hero-mascot" src={kaPamanaIcon} alt="" aria-hidden="true" />
    </section>

    <section className="pamana4-overview" aria-label="Your real saved heritage progress">
     <div className="pamana4-stat mint"><IonIcon icon={bookOutline} aria-hidden="true"/>
      <strong>{dashboard.finishedLessons}<span>/{dashboard.totalLessons}</span></strong><small>Lessons read</small></div>
     <div className="pamana4-stat sky"><IonIcon icon={trophyOutline} aria-hidden="true"/>
      <strong>{dashboard.finishedQuests}</strong><small>Quests finished</small></div>
     <div className="pamana4-stat peach"><IonIcon icon={ribbonOutline} aria-hidden="true"/>
      <strong>{dashboard.finishedTowns}<span>/15</span></strong><small>Town stamps</small></div>
    </section>

    <section className="pamana4-journey" aria-labelledby="pamana4-journey-heading">
     <div className="pamana4-heading-row">
      <div><p className="pamana-eyebrow">YOUR NEXT ADVENTURE</p><h2 id="pamana4-journey-heading">Continue your heritage journey</h2></div>
      <button type="button" className="pamana4-text-link" onClick={()=>history.push('/journey')}>
       All towns <IonIcon icon={chevronForwardOutline} aria-hidden="true"/>
      </button>
     </div>
     <div className="pamana4-chapter-card">
      <div className="pamana4-chapter-top">
       <HometownScene className="pamana4-town-art" hometown={chapter.town}/>
       <div className="pamana4-chapter-headline">
        <span className="pamana4-chapter-eyebrow">{dashboard.chapterIsSuggestion?'Suggested hometown':'Your hometown'} · 3 discoveries</span>
        <h3>{chapter.town}</h3>
        <p>{status.completed?'A completed hometown journey':status.done===0?'Ready for your first discovery':'Your discoveries are saved on this device'}</p>
       </div>
      </div>
      <PamanaProgress label={chapter.town+' journey progress'} value={status.done} max={3}/>
      <div className="pamana4-mission-path" aria-label={chapter.town+' journey steps'}>
       {steps.map((step,index)=>{
        const done=index===0?status.festivalOpened:index===1?status.lessonCompleted:status.questCompleted;
        return <button type="button" key={step.key} className={'pamana4-mission '+(done?'done':'')}
          aria-label={step.title+'. '+step.text+'. '+(done?'Completed. Reopen':'Available')}
          onClick={()=>history.push(stepActions[step.key])}>
         <span className="pamana4-mission-icon"><IonIcon icon={done?checkmarkCircleOutline:step.icon} aria-hidden="true"/></span>
         <strong>{step.title}</strong><small>{done?'Done':step.text}</small>
         {index<2&&<span className="pamana4-mission-connector" aria-hidden="true"/>}
        </button>;
       })}
      </div>
      <div className="pamana4-next">
       <span className="pamana4-next-symbol" aria-hidden="true"><IonIcon icon={status.completed?sparklesOutline:status.done===0?compassOutline:status.done===1?bookOutline:trophyOutline}/></span>
       <div><span className="pamana-eyebrow">{status.completed?'STAMP EARNED':'YOUR NEXT STEP'}</span>
        <strong>{dashboard.next.title}</strong><p>{dashboard.next.description}</p></div>
       <PamanaButton onClick={()=>history.push(dashboard.next.path)}>
        {dashboard.next.buttonLabel} <IonIcon icon={arrowForwardOutline} aria-hidden="true"/>
       </PamanaButton>
      </div>
     </div>
    </section>

    <div className="pamana4-mascot-note"><img src={kaPamanaIcon} alt="" aria-hidden="true"/>
     <div><strong>Ka-Pamana says</strong><p>{activityMessages[dashboard.next.kind]}</p></div></div>

    <section className="pamana4-hometown" aria-label="Your hometown and festival preferences">
     <div><span className="pamana-eyebrow">MY HOMETOWN</span><h2>{profile.hometown||'Discover Oriental Mindoro'}</h2>
      <p>{festival?.name??'Explore places and celebrations from across the province.'}</p>
      <button type="button" onClick={()=>history.push(festival?'/explore?festival='+festival.id:'/profile')}>
       {festival?'See the festival':'Choose a hometown'} <IonIcon icon={arrowForwardOutline} aria-hidden="true"/>
      </button>
     </div>
     <HometownScene className="pamana4-hometown-art" hometown={theme.municipality}/>
    </section>

    <section className="pamana4-lesson" aria-label="Your current reading activity">
     <div className="pamana4-heading-row">
      <div><p className="pamana-eyebrow">LEARN AT YOUR OWN PACE</p><h2>{lessonLabel}</h2></div>
      <button type="button" className="pamana4-text-link" onClick={()=>history.push('/learn')}>All lessons <IonIcon icon={chevronForwardOutline} aria-hidden="true"/></button>
     </div>
     <button type="button" className="pamana4-lesson-card" onClick={()=>history.push('/learn?lesson='+continueLesson.id)}>
      <div className="pamana4-lesson-photo">{lessonImage?<img src={lessonImage.src} alt="" loading="lazy"/>:<IonIcon icon={bookOutline} aria-hidden="true"/>}</div>
      <div><span>{continueLesson.category} · {continueLesson.duration} MIN READ</span>
       <strong>{continueLesson.title}</strong>
       <p>{readingComplete?'All lessons completed. You can revisit any story.':continueLesson.summary}</p>
       <div className="pamana4-lesson-meter"><progress max={dashboard.totalLessons} value={dashboard.finishedLessons} aria-label="Lessons completed"/> <small>{dashboard.finishedLessons} of {dashboard.totalLessons} lessons completed</small></div>
      </div>
      <IonIcon className="pamana4-lesson-chevron" icon={arrowForwardOutline} aria-hidden="true"/>
     </button>
    </section>

    <section className="pamana4-quick" aria-label="Choose a short activity">
     <button type="button" className="pamana4-quick-link quest" onClick={()=>history.push('/quest')}>
      <span><IonIcon icon={trophyOutline} aria-hidden="true"/></span><strong>Play a Quest</strong><small>Short cultural challenges</small><IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
     <button type="button" className="pamana4-quick-link sulat" onClick={()=>history.push('/writing')}>
      <span><IonIcon icon={pencilOutline} aria-hidden="true"/></span><strong>Practice Sulat</strong><small>Explore Hanunó’o characters</small><IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
    </section>

    <section className="pamana4-modules" aria-labelledby="pamana4-tools-heading">
     <div className="pamana4-heading-row"><div><p className="pamana-eyebrow">YOUR CULTURAL TOOLKIT</p>
      <h2 id="pamana4-tools-heading">Explore SMART PAMANA</h2></div></div>
     <div className="pamana4-module-grid">{modules.map(item=><button type="button" key={item.path}
       className={'pamana4-module '+item.tone} onClick={()=>history.push(item.path)}>
      <span className="pamana4-module-icon"><IonIcon icon={item.icon} aria-hidden="true"/></span>
      <strong>{item.label}</strong><small>{item.sub}</small><IonIcon className="pamana4-module-arrow" icon={arrowForwardOutline} aria-hidden="true"/>
     </button>)}</div>
    </section>

    <div className="pamana4-cultural-fact"><div className="pamana4-heading-row"><div>
     <p className="pamana-eyebrow">ONE MORE DISCOVERY</p><h2>Something interesting today</h2>
    </div></div><CulturalFactCard/></div>
    <p className="pamana4-footnote"><IonIcon icon={mapOutline} aria-hidden="true"/> All fifteen hometowns are free to explore. Progress stays on your device.</p>
   </div>
  </PageFrame>
 </IonContent></IonPage>;
}
