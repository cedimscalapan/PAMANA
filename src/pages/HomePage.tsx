import { IonButton, IonContent, IonIcon, IonPage, useIonViewWillEnter } from '@ionic/react';
import {
  arrowForwardOutline,
  bookOutline,
  cameraOutline,
  compassOutline,
  pencilOutline,
  trophyOutline,
} from 'ionicons/icons';
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
import { artworkForTheme } from '../data/festival-artwork';
import { officialFestivals } from '../data/official-heritage';

const modules = [
  { label: 'Matuto', sub: 'Learn', icon: bookOutline, tone: 'brown', path: '/learn' },
  { label: 'Sulat', sub: 'Write', icon: pencilOutline, tone: 'green', path: '/writing' },
  { label: 'Lakbay', sub: 'Explore', icon: compassOutline, tone: 'blue', path: '/explore' },
  { label: 'Quest', sub: 'Play', icon: trophyOutline, tone: 'amber', path: '/quest' },
  { label: 'Kuwento', sub: 'Memories', icon: cameraOutline, tone: 'purple', path: '/stories' },
  { label: 'Koleksyon', sub: 'Photo folders', icon: bookOutline, tone: 'red', path: '/collection' },
];

export default function HomePage() {
  const history = useHistory();
  const profile = readProfile();
  const theme = resolveTheme(profile.themeId);
  const hometownFestival = officialFestivals.find(f => f.municipality === profile.hometown && f.id === profile.favoriteFestivalId) ?? officialFestivals.find(f => f.municipality === profile.hometown);
  const [, refresh] = useState(0);
  useIonViewWillEnter(() => refresh(value => value + 1));
  const completed = lessons.filter(lesson => localStorage.getItem(storageKey(lesson.id)) === 'complete').length;
  const continueLesson = lessons.find(lesson => lesson.id === localStorage.getItem('pamana.lastLesson')) ?? lessons.find(lesson => localStorage.getItem(storageKey(lesson.id)) !== 'complete') ?? lessons[0];
  const lessonImage = photoForLesson(continueLesson.id);
  useEffect(() => {
    if (localStorage.getItem('pamana.onboardingComplete') !== 'true') history.replace('/onboarding');
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="home">
          <header className="home-topbar">
            <div>
              <p className="home-brand">SMART PAMANA</p>
              <h1>Magandang araw,<br /><span>{profile.nickname}!</span></h1>
            </div>
            <button
              type="button"
              className="home-avatar"
              style={{ backgroundImage: profile.avatar === 'mascot' ? `url(${kaPamanaIcon})` : 'none' }}
              onClick={() => history.push('/profile')}
              aria-label="Open my profile"
            >{profile.avatar === 'mascot' ? null : <span className="pamana-avatar-emoji" aria-hidden="true">{({leaf:'🌿',star:'✨',book:'📚',art:'🎨'} as Record<string,string>)[profile.avatar]}</span>}</button>
          </header>

          <section className="pamana-home-highlight"><img className="pamana-home-art" src={artworkForTheme(theme)} alt="" aria-hidden="true" /><div className="pamana-home-caption"><p>MY HERITAGE JOURNEY</p><h2>{profile.hometown || "Discover Oriental Mindoro"}</h2><p>{hometownFestival?.name || theme.name} · {theme.motif}</p><button type="button" onClick={() => history.push(hometownFestival ? "/explore?festival=" + hometownFestival.id : "/profile")}>{hometownFestival ? "Discover my festival" : "Edit my profile"}</button></div><span className="pamana-hero-token" aria-hidden="true">{theme.emoji}</span></section>
          <section className="home-hero-card">
            <div className="home-hero-copy">
              <p className="home-hero-kicker">TUKLASIN · PAGYAMANIN · IPAGPATULOY</p>
              <h2>Your heritage journey<br />starts here.</h2>
              <IonButton fill="clear" onClick={() => history.push('/explore')}>
                Explore today <IonIcon icon={arrowForwardOutline} slot="end" />
              </IonButton>
            </div>
            <div className="home-hero-mascot" style={{ backgroundImage: `url(${kaPamanaIcon})` }} aria-hidden="true" />
          </section>

          <section className="home-continue-card">
            <div className="home-section-heading">
              <h2>Continue learning</h2>
              <IonButton fill="clear" onClick={() => history.push('/learn')}>See all</IonButton>
            </div>
            <button type="button" className="home-lesson-row" onClick={() => history.push(`/learn?lesson=${continueLesson.id}`)}>
              <div className="home-lesson-badge">{lessonImage ? <img src={lessonImage.src} alt="" /> : <IonIcon icon={compassOutline} />}</div>
              <div className="home-lesson-copy">
                <span className="home-meta">{continueLesson.category} · {continueLesson.duration} MIN READ</span>
                <h3>{continueLesson.title}</h3>
                <div className="home-progress-track"><span style={{ width: `${completed / lessons.length * 100}%` }} /></div>
                <small>{completed} of {lessons.length} lessons explored</small>
              </div>
              <span className="home-play"><IonIcon icon={arrowForwardOutline} /></span>
            </button>
          </section>

          <section className="home-module-section">
            <div className="home-section-heading"><h2>Explore Pamana</h2><IonButton fill="clear" onClick={() => history.push('/settings')}>More</IonButton></div>
            <div className="home-module-grid">
              {modules.map((module) => (
                <button key={module.label} type="button" className={`home-module-tile ${module.tone}`} onClick={() => history.push(module.path)}>
                  <IonIcon icon={module.icon} />
                  <strong>{module.label}</strong>
                  <small>{module.sub}</small>
                </button>
              ))}
            </div>
          </section>

          <CulturalFactCard />
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
