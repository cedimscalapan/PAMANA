import { IonContent, IonIcon, IonPage, useIonViewWillEnter } from '@ionic/react';
import { arrowForwardOutline, bookOutline, cameraOutline, compassOutline, pencilOutline, trophyOutline, albumsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';
import { PageFrame } from '../components/AppChrome';
import { lessons } from '../data/learning';
import { storageKey } from '../data/content';
import CulturalFactCard from '../components/CulturalFactCard';
import { photoForLesson } from '../data/gallery';
import { readProfile } from '../services/personalization';
import { resolveTheme } from '../data/festival-themes';
import { officialFestivals } from '../data/official-heritage';
import HometownScene from '../components/HometownScene';
import {heritageChapters,findChapter,townId,chapterStatus} from '../data/heritage-journey';
import {readJourneyProgress} from '../services/heritage-journey';
import {readQuestProgress} from '../services/quest-games';
import {storageKey as lessonStorageKey} from '../data/content';

const modules = [
  { label: 'Matuto', sub: 'Stories & lessons', icon: bookOutline, tone: 'mint', path: '/learn' },
  { label: 'Sulat', sub: 'Writing & language', icon: pencilOutline, tone: 'peach', path: '/writing' },
  { label: 'Lakbay', sub: 'Places & festivals', icon: compassOutline, tone: 'sky', path: '/explore' },
  { label: 'Quest', sub: 'Play & discover', icon: trophyOutline, tone: 'lavender', path: '/quest' },
  { label: 'Kuwento', sub: 'Private memories', icon: cameraOutline, tone: 'rose', path: '/stories' },
  { label: 'Koleksyon', sub: 'My collections', icon: albumsOutline, tone: 'cream', path: '/collection' },
];

export default function HomePage() {
  const history = useHistory();
  const [, refresh] = useState(0);
  useIonViewWillEnter(() => refresh(value => value + 1));
  const profile = readProfile();
  const theme = resolveTheme(profile.themeId);
  const festival = officialFestivals.find(f => f.municipality === profile.hometown && f.id === profile.favoriteFestivalId)
    ?? officialFestivals.find(f => f.municipality === profile.hometown);
  const completed = lessons.filter(lesson => localStorage.getItem(storageKey(lesson.id)) === 'complete').length;
  const continueLesson = lessons.find(lesson => lesson.id === localStorage.getItem('pamana.lastLesson'))
    ?? lessons.find(lesson => localStorage.getItem(storageKey(lesson.id)) !== 'complete')
    ?? lessons[0];
  const lessonImage = photoForLesson(continueLesson.id);
  const percent = Math.round(completed / lessons.length * 100);
  const townChapter=findChapter(townId(profile.hometown))??heritageChapters[0];
  const journeyStatus=chapterStatus(townChapter,readJourneyProgress(),new Set(lessons.filter(lesson=>localStorage.getItem(lessonStorageKey(lesson.id))==='complete').map(lesson=>lesson.id)),readQuestProgress().results);

  useEffect(() => {
    if (localStorage.getItem('pamana.onboardingComplete') !== 'true') history.replace('/onboarding');
  }, [history]);

  return <IonPage><IonContent fullscreen>
    <PageFrame active="home">
      <header className="home-topbar">
        <div><p className="home-brand">SMART PAMANA <span>· OFFLINE HERITAGE</span></p>
          <h1>Magandang araw,<br/><span>{profile.nickname}!</span></h1>
        </div>
        <button type="button" className="home-avatar"
          style={{ backgroundImage: profile.avatar === 'mascot' ? `url(${kaPamanaIcon})` : 'none' }}
          onClick={() => history.push('/profile')} aria-label="Edit my profile">
          {profile.avatar === 'mascot' ? null : <span className="pamana-avatar-emoji" aria-hidden="true">{({leaf:'🌿',star:'✨',book:'📚',art:'🎨'} as Record<string,string>)[profile.avatar]}</span>}
        </button>
      </header>

      <section className="pamana-home-highlight" aria-label="Your hometown theme">
        <HometownScene className="pamana-home-art" hometown={theme.municipality} />
        <div className="pamana-home-caption">
          <p className="pamana-eyebrow">YOUR HOMETOWN · YOUR STORY</p>
          <h2>{profile.hometown || 'Discover Oriental Mindoro'}</h2>
          <p>{festival?.name ?? theme.name}</p>
          <button type="button" onClick={() => history.push(festival ? `/explore?festival=${festival.id}` : '/profile')}>
            {festival ? 'Explore the celebration' : 'Choose a hometown'} <IonIcon icon={arrowForwardOutline}/>
          </button>
        </div>
      </section>

      <section className="pamana-home-journey"><div className="pamana-home-journey-symbol" aria-hidden="true">🧭</div><div><span className="pamana-eyebrow">NEW · INTERACTIVE HERITAGE JOURNEY</span><h2>Turn discoveries into adventures</h2><p>Choose a hometown, follow three short activities, and earn its heritage stamp. No timer, no internet.</p><div className="pamana-home-journey-progress"><span>{townChapter.town}</span><span>{journeyStatus.done}/3 discoveries</span></div></div><button type="button" onClick={()=>history.push("/journey?town="+townChapter.id)}>Start my journey <IonIcon icon={arrowForwardOutline}/></button></section>
      <section className="home-continue-card">
        <div className="home-section-heading">
          <div><span className="pamana-eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Continue learning</h2></div>
          <span className="pamana-progress-pill">{percent}% explored</span>
        </div>
        <button type="button" className="home-lesson-row" onClick={() => history.push(`/learn?lesson=${continueLesson.id}`)}>
          <div className="home-lesson-badge">{lessonImage ? <img src={lessonImage.src} alt="" /> : <IonIcon icon={bookOutline}/>}</div>
          <div className="home-lesson-copy">
            <span className="home-meta">{continueLesson.category} · {continueLesson.duration} MIN READ</span>
            <h3>{continueLesson.title}</h3>
            <div className="home-progress-track" role="progressbar" aria-label="Completed cultural lessons" aria-valuemin={0} aria-valuemax={lessons.length} aria-valuenow={completed}>
              <span style={{ width: `${percent}%` }} />
            </div>
            <small>{completed} of {lessons.length} lessons explored</small>
          </div>
          <span className="home-play" aria-hidden="true"><IonIcon icon={arrowForwardOutline}/></span>
        </button>
      </section>

      <section className="pamana-home-quick" aria-label="Try something now">
        <button type="button" onClick={() => history.push('/quest')}><IonIcon icon={trophyOutline}/><span><strong>Play a Quest</strong><small>Learn through a game</small></span><IonIcon icon={arrowForwardOutline}/></button>
        <button type="button" onClick={() => history.push('/writing')}><IonIcon icon={pencilOutline}/><span><strong>Practice Sulat</strong><small>Explore Hanunó’o writing</small></span><IonIcon icon={arrowForwardOutline}/></button>
      </section>

      <section className="home-module-section">
        <div className="home-section-heading"><div><span className="pamana-eyebrow">YOUR CULTURAL TOOLKIT</span><h2>Explore SMART PAMANA</h2></div></div>
        <div className="home-module-grid">{modules.map(item => (
          <button key={item.label} type="button" className={`home-module-tile ${item.tone}`} onClick={() => history.push(item.path)}>
            <span className="pamana-module-icon"><IonIcon icon={item.icon}/></span><strong>{item.label}</strong><small>{item.sub}</small>
            <IonIcon className="pamana-module-arrow" icon={arrowForwardOutline}/>
          </button>
        ))}</div>
      </section>
      <CulturalFactCard/>
    </PageFrame>
  </IonContent></IonPage>;
}
