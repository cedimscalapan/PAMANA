import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import {
  arrowForwardOutline,
  bookOutline,
  cameraOutline,
  compassOutline,
  pencilOutline,
  refreshOutline,
  trophyOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';
import { PageFrame } from '../components/AppChrome';

const modules = [
  { label: 'Matuto', sub: 'Learn', icon: bookOutline, tone: 'brown', path: '/learn' },
  { label: 'Sulat', sub: 'Write', icon: pencilOutline, tone: 'green', path: '/writing' },
  { label: 'Lakbay', sub: 'Explore', icon: compassOutline, tone: 'blue', path: '/explore' },
  { label: 'Quest', sub: 'Play', icon: trophyOutline, tone: 'amber', path: '/quest' },
  { label: 'Kuwento', sub: 'Stories', icon: cameraOutline, tone: 'purple', path: '/stories' },
  { label: 'Koleksyon', sub: 'Collect', icon: bookOutline, tone: 'red', path: '/collection' },
];

const facts = [
  'Ang pamana ay tumutukoy sa mga bagay na tinatanggap, inaalagaan, at ipinapasa sa susunod na henerasyon.',
  'Ang Oriental Mindoro ay tahanan ng magkakaibang Mangyan communities, languages, at living traditions.',
];

export default function HomePage() {
  const history = useHistory();
  const [factIndex, setFactIndex] = useState(0);
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
              <h1>Magandang araw,<br /><span>Ka-Pamana!</span></h1>
            </div>
            <button
              type="button"
              className="home-avatar"
              style={{ backgroundImage: `url(${kaPamanaIcon})` }}
              onClick={() => history.push('/settings')}
              aria-label="Open settings"
            />
          </header>

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
            <button type="button" className="home-lesson-row" onClick={() => history.push('/learn')}>
              <div className="home-lesson-badge"><IonIcon icon={compassOutline} /></div>
              <div className="home-lesson-copy">
                <span className="home-meta">HISTORY &amp; GEOGRAPHY · 12 MIN</span>
                <h3>Getting to know Oriental Mindoro</h3>
                <div className="home-progress-track"><span /></div>
                <small>Offline lesson · start anytime</small>
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

          <section className="home-fact-card">
            <div>
              <p className="home-brand">DAILY CULTURAL FACT</p>
              <p>{facts[factIndex]}</p>
            </div>
            <IonButton fill="clear" onClick={() => setFactIndex((value) => (value + 1) % facts.length)} aria-label="Next cultural fact">
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
