import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { checkmarkCircleOutline, cloudOfflineOutline, informationCircleOutline, linkOutline, refreshOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { sources } from '../data/content';
import { localAssets } from '../data/asset-catalog';
import { clearStoredState, storageInfo } from '../services/storage';
import { ModuleHeader, PageFrame } from '../components/AppChrome';

export default function SettingsPage() {
  const history = useHistory();
  const reset = async () => { if (!window.confirm('Permanently delete local progress, writings, private memories, collections, and profile settings? This cannot be undone. Back up important files before continuing.')) return; try { await clearStoredState(); history.replace('/onboarding'); } catch { window.alert('Reset failed; some records may remain.'); } };
  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="settings">
          <ModuleHeader title="Settings" subtitle="Keep your learning space personal, local, and offline." tone="brown" icon={settingsOutline} />
          <section className="module-content settings-content">
            <article className="settings-status-card"><div className="settings-status-icon"><IonIcon icon={cloudOfflineOutline} /></div><div><p className="module-kicker">OFFLINE STATUS</p><h2>Ready to learn offline</h2><p>Lessons, practice state, quest score, collection state, and bundled assets are available without an account.</p><span className="settings-badge"><IonIcon icon={checkmarkCircleOutline} /> {storageInfo.nativeDatabase ? 'Native SQLite database' : 'Local web storage fallback'}</span></div></article>
            <article className="settings-card"><h2>Aking Pamana</h2><p>Choose your hometown, festival theme, reading experience, and accessibility preferences.</p><IonButton onClick={() => history.push("/profile")}>Edit my profile</IonButton></article>
            <article className="settings-card"><div className="settings-card-title"><IonIcon icon={informationCircleOutline} /><h2>About SMART PAMANA</h2></div><p>Kultura ng Mindoro, Buhay sa Bawat Henerasyon.</p><p>Community-sensitive entries are marked until appropriate review and permission.</p></article>
            <article className="settings-card"><div className="settings-card-title"><IonIcon icon={linkOutline} /><h2>Bundled visual assets</h2></div><div className="settings-list">{localAssets.map((asset) => <div className="settings-list-row" key={asset.id}><strong>{asset.id}</strong><span>{asset.purpose}</span><small>{asset.rights === 'provided_by_project_owner' ? 'Provided by project owner' : asset.attribution}</small></div>)}</div></article>
            <article className="settings-card"><div className="settings-card-title"><IonIcon icon={linkOutline} /><h2>Content references</h2></div><div className="settings-list">{sources.map((source) => <div className="settings-list-row" key={source.id}><strong>{source.title}</strong><span>{source.publisher} · {source.status}</span><small>{source.use}</small><a href={source.url} target="_blank" rel="noreferrer">Open source reference</a></div>)}</div></article>
            <article className="settings-card settings-danger"><div className="settings-card-title"><IonIcon icon={refreshOutline} /><h2>Reset local state</h2></div><p>Remove onboarding, progress, practice, quest, private story, and collection data from this device.</p><IonButton color="danger" fill="outline" onClick={reset}>Reset local state</IonButton></article>
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
