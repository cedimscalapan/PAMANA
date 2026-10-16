import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { arrowForwardOutline, bookOutline, compassOutline, cloudOfflineOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';
import { setStored } from '../services/storage';

const slides = [
  { title: 'Discover Oriental Mindoro', body: 'Meet Ka-Pamana and explore the people, places, and living traditions of Mindoro.', icon: compassOutline },
  { title: 'Learn our heritage', body: 'Build your knowledge through short lessons, writing practice, and stories.', icon: bookOutline },
  { title: 'Everything works offline', body: 'Your lessons, progress, and activities stay on your device so you can learn anywhere.', icon: cloudOfflineOutline },
];

export default function OnboardingPage() {
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const slide = slides[step];
  const start = async () => { if (saving) return; setSaving(true); setError(''); try { await setStored('pamana.onboardingComplete', 'true'); history.replace('/home'); } catch { setError('Your welcome progress could not be saved. Please try again.'); } finally { setSaving(false); } };
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="onboarding-page">
          <button type="button" className="onboarding-skip" disabled={saving} onClick={() => void start()}>Skip</button>
          <section className="onboarding-hero">
            <p className="home-brand">SMART PAMANA</p>
            <div className="onboarding-mascot" style={{ backgroundImage: `url(${kaPamanaIcon})` }} />
            <span className="onboarding-spark onboarding-spark-one">✦</span><span className="onboarding-spark onboarding-spark-two">✦</span>
          </section>
          <section className="onboarding-copy"><p className="module-kicker">{step + 1} / {slides.length} · YOUR CULTURAL LEARNING GUIDE</p><h1>{slide.title}</h1><p>{slide.body}</p><div className="onboarding-slide-icon"><IonIcon icon={slide.icon} /></div><div className="onboarding-dots">{slides.map((item, index) => <button type="button" key={item.title} className={index === step ? 'active' : ''} onClick={() => setStep(index)} aria-label={`Go to slide ${index + 1}`} />)}</div><IonButton className="full-primary-button" expand="block" disabled={saving} onClick={() => step < slides.length - 1 ? setStep(step + 1) : start()}>{step === slides.length - 1 ? 'Get started' : 'Continue'} <IonIcon icon={arrowForwardOutline} slot="end" /></IonButton>{error && <p className="inline-status" role="alert">{error}</p>}</section>
        </main>
      </IonContent>
    </IonPage>
  );
}
