import { IonContent, IonIcon, IonPage } from '@ionic/react';
import {
  albumsOutline, cameraOutline, colorPaletteOutline, pencilOutline,
  settingsOutline, personCircleOutline, shieldCheckmarkOutline, chevronForwardOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { PageFrame } from '../components/AppChrome';
import { readProfile } from '../services/personalization';
import { resolveTheme } from '../data/festival-themes';

const destinations = [
  { label: 'Sulat Pamana', description: 'Practice Hanunó’o writing', path: '/writing', icon: pencilOutline, tone: 'mint' },
  { label: 'Kuwento', description: 'Keep family stories privately', path: '/stories', icon: cameraOutline, tone: 'peach' },
  { label: 'Koleksyon', description: 'Saved pictures and heritage stamps', path: '/collection', icon: albumsOutline, tone: 'lavender' },
  { label: 'Aking Pamana', description: 'Your hometown and reading preferences', path: '/profile', icon: personCircleOutline, tone: 'mint' },
  { label: 'Appearance', description: 'Festival colors, text size, and motion', path: '/profile', icon: colorPaletteOutline, tone: 'peach' },
  { label: 'Settings', description: 'Offline data and app information', path: '/settings', icon: settingsOutline, tone: 'lavender' },
] as const;

export default function MorePage() {
  const history = useHistory();
  const profile = readProfile();
  const theme = resolveTheme(profile.themeId);
  return <IonPage><IonContent>
    <PageFrame active="settings">
      <section className="pamana-more-screen">
        <div className="pamana-more-intro">
          <span className="pamana-eyebrow">YOUR SPACE · SMART PAMANA</span>
          <h1>More to explore</h1>
          <p>Find writing practice, your personal collection, stories, and settings in one place.</p>
          <div className="pamana-more-identity">
            <span aria-hidden="true">{theme.emoji}</span>
            <div><strong>{profile.nickname}</strong><small>{profile.hometown || 'Exploring Oriental Mindoro'} · {theme.name}</small></div>
            <button type="button" onClick={() => history.push('/profile')}>Edit profile</button>
          </div>
        </div>
        <div className="pamana-more-grid">
          {destinations.map(item => <button key={item.label} type="button" className={`pamana-more-link ${item.tone}`} onClick={() => history.push(item.path)}>
            <span className="pamana-more-link-icon"><IonIcon icon={item.icon} /></span>
            <span className="pamana-more-link-copy"><strong>{item.label}</strong><small>{item.description}</small></span>
            <IonIcon className="pamana-more-chevron" icon={chevronForwardOutline} />
          </button>)}
        </div>
        <p className="pamana-privacy-foot"><IonIcon icon={shieldCheckmarkOutline} /> Your personal data stays on this device.</p>
      </section>
    </PageFrame>
  </IonContent></IonPage>;
}
