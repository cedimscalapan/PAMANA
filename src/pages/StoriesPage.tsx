import { IonButton, IonContent, IonIcon, IonInput, IonPage, IonTextarea } from '@ionic/react';
import { cameraOutline, closeOutline, lockClosedOutline, playCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { stories, Story } from '../data/content';
import { setStored } from '../services/storage';
import { ModuleHeader, PageFrame } from '../components/AppChrome';

export default function StoriesPage() {
  const [selected, setSelected] = useState<Story>();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [saved, setSaved] = useState(localStorage.getItem('pamana.privateStory') === 'saved');
  const saveStory = () => {
    if (!title.trim() || !body.trim()) return;
    void setStored('pamana.privateStory', 'saved');
    void setStored('pamana.privateStory.title', title.trim());
    void setStored('pamana.privateStory.body', body.trim());
    setSaved(true);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="home">
          <ModuleHeader title="Kuwento Pamana" subtitle="Listen, remember, and keep your own story safe offline." tone="purple" icon={cameraOutline} />
          <section className="module-content stories-content">
            <div className="module-intro-row"><div><p className="module-kicker">STORIES &amp; MEMORY</p><h2>Mga kuwentong ipinapasa</h2></div><span className="module-count">Offline</span></div>
            <div className="notice stories-notice"><IonIcon icon={lockClosedOutline} /><span>Personal stories are private by default and remain on this device.</span></div>
            <div className="story-list">
              {stories.map((story) => <button type="button" className="story-row" key={story.id} onClick={() => setSelected(story)}><span className="story-row-icon"><IonIcon icon={story.id === 'story-private' ? lockClosedOutline : playCircleOutline} /></span><span><small>{story.status === 'private_template' ? 'PRIVATE SPACE' : 'OFFLINE STORY'}</small><strong>{story.title}</strong><em>{story.summary}</em></span><IonIcon icon={playCircleOutline} /></button>)}
            </div>

            {selected?.id === 'story-private' && <article className="detail-card story-editor"><div className="detail-card-topline"><span className="module-kicker">PRIVATE STORY · DEVICE ONLY</span><IonButton fill="clear" onClick={() => setSelected(undefined)} aria-label="Close editor"><IonIcon icon={closeOutline} /></IonButton></div><h2>Write your own memory</h2><div className="field-card"><IonInput label="Title" labelPlacement="stacked" placeholder="Give your memory a title" value={title} onIonInput={(event) => setTitle(String(event.detail.value ?? ''))} /><IonTextarea label="Your memory" labelPlacement="stacked" placeholder="What do you want to remember?" autoGrow value={body} onIonInput={(event) => setBody(String(event.detail.value ?? ''))} /></div><IonButton className="full-primary-button" expand="block" onClick={saveStory} disabled={!title.trim() || !body.trim()}>{saved ? 'Saved locally' : 'Save private story'}</IonButton></article>}
            {selected && selected.id !== 'story-private' && <article className="detail-card"><div className="detail-card-topline"><span className="module-kicker">STORY PREVIEW</span><IonButton fill="clear" onClick={() => setSelected(undefined)} aria-label="Close story"><IonIcon icon={closeOutline} /></IonButton></div><h2>{selected.title}</h2><p>{selected.summary}</p><div className="notice">Content remains local until text, creator attribution, and permission records are approved.</div></article>}
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
