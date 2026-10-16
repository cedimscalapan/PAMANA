import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { stories, Story } from '../data/content';
import { setStored } from '../services/storage';

export default function StoriesPage() {
  const history = useHistory();
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
  return <IonPage><IonHeader><IonToolbar><IonButton slot="start" fill="clear" aria-label="Back to home" onClick={() => history.push('/home')}>‹</IonButton><IonTitle>Kuwento Pamana</IonTitle></IonToolbar></IonHeader><IonContent><main className="module-page">
    <p className="lead">Read approved local stories and keep your own recordings private on this device.</p><p className="notice">Personal stories are private by default and are not automatically published or shared.</p>
    <IonList>{stories.map((story) => <IonItem key={story.id}><IonLabel><span className="meta">{story.status === 'private_template' ? 'PRIVATE SPACE' : 'OFFLINE STORY'}</span><h2>{story.title}</h2><p>{story.summary}</p></IonLabel><IonButton slot="end" onClick={() => setSelected(story)}>Open</IonButton></IonItem>)}</IonList>
    {selected?.id === 'story-private' && <IonCard className="list-card"><IonCardContent><IonButton fill="clear" onClick={() => setSelected(undefined)}>Close</IonButton><span className="meta">PRIVATE STORY · DEVICE ONLY</span><IonItem><IonInput label="Title" labelPlacement="stacked" value={title} onIonInput={(event) => setTitle(String(event.detail.value ?? ''))} /></IonItem><IonItem><IonTextarea label="Your memory" labelPlacement="stacked" autoGrow value={body} onIonInput={(event) => setBody(String(event.detail.value ?? ''))} /></IonItem><IonButton expand="block" onClick={saveStory} disabled={!title.trim() || !body.trim()}>{saved ? 'Saved locally' : 'Save private story'}</IonButton></IonCardContent></IonCard>}
    {selected && selected.id !== 'story-private' && <IonCard className="list-card"><IonCardContent><IonButton fill="clear" onClick={() => setSelected(undefined)}>Close</IonButton><span className="meta">STORY PREVIEW</span><h2>{selected.title}</h2><p>{selected.summary} Content remains local until text, creator attribution, and permission records are approved.</p></IonCardContent></IonCard>}
  </main></IonContent></IonPage>;
}
