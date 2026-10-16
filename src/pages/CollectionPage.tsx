import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { collectionItems, CollectionItem } from '../data/content';
import { media } from '../data/media';
import { setStored } from '../services/storage';

export default function CollectionPage() {
  const history = useHistory();
  const [selected, setSelected] = useState<CollectionItem>();
  const [collected, setCollected] = useState<string[]>(JSON.parse(localStorage.getItem('pamana.collectedItems') || '[]'));
  const collect = (item: CollectionItem) => {
    const next = collected.includes(item.id) ? collected : [...collected, item.id];
    setCollected(next);
    void setStored('pamana.collectedItems', JSON.stringify(next));
  };
  return <IonPage><IonHeader><IonToolbar><IonButton slot="start" fill="clear" aria-label="Back to home" onClick={() => history.push('/home')}>‹</IonButton><IonTitle>Koleksyon</IonTitle></IonToolbar></IonHeader><IonContent><main className="module-page">
    <p className="lead">A local gallery for documented heritage items and approved imagery.</p>
    <IonGrid><IonRow>{collectionItems.map((item) => <IonCol size="6" key={item.id}><IonCard className="collection-card"><IonCardContent><IonButton fill="clear" expand="block" onClick={() => setSelected(item)}>{item.id === 'nature' ? <img className="collection-image" src={media.tamaraw.src} alt={media.tamaraw.alt} /> : <div className="collection-symbol">✦</div>}<strong>{item.title}</strong></IonButton><span className="meta">{collected.includes(item.id) ? 'SAVED LOCALLY' : item.category.toUpperCase()}</span><IonButton expand="block" onClick={() => collect(item)}>{collected.includes(item.id) ? 'Collected' : 'Collect'}</IonButton></IonCardContent></IonCard></IonCol>)}</IonRow></IonGrid>
    {selected && <IonCard className="list-card"><IonCardContent><IonButton fill="clear" onClick={() => setSelected(undefined)}>Close</IonButton><span className="meta">COLLECTION ITEM · {selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p><p className="notice">Entries must keep provenance, creator credit, and community permissions with the local record.</p></IonCardContent></IonCard>}
  </main></IonContent></IonPage>;
}
