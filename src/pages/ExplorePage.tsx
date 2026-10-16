import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { places, Place, sourceById } from '../data/content';
import { media } from '../data/media';

export default function ExplorePage() {
  const history = useHistory();
  const [selected, setSelected] = useState<Place>();
  return <IonPage><IonHeader><IonToolbar><IonButton slot="start" fill="clear" aria-label="Back to home" onClick={() => history.push('/home')}>‹</IonButton><IonTitle>Lakbay Pamana</IonTitle></IonToolbar></IonHeader><IonContent><main className="module-page">
    <p className="lead">Explore an offline educational heritage map—not turn-by-turn navigation.</p>
    <div className="list-card"><div className="offline-map" aria-label="Illustrated offline map of learning places in Oriental Mindoro">
      <span className="map-water">ORIENTAL MINDORO</span>
      {places.map((place, index) => <button className="map-pin" key={place.id} style={{ left: `${18 + (index * 16) % 68}%`, top: `${26 + (index * 13) % 48}%` }} onClick={() => setSelected(place)} aria-label={`Open ${place.name}`}>●<small>{place.name}</small></button>)}
    </div><p className="notice">Map content is bundled for learning. It does not use GPS, live directions, or network tiles.</p></div>
    <IonCard className="media-card"><img src={media.tamaraw.src} alt={media.tamaraw.alt} /><IonCardContent><span className="meta">WILDLIFE &amp; CONSERVATION</span><h2>Tamaraw</h2><p>Mindoro’s endemic dwarf buffalo is a protected species and a reminder that heritage learning includes the living landscape.</p><small>{media.tamaraw.credit}</small></IonCardContent></IonCard>
    <IonList>{places.map((place) => <IonItem key={place.id}><IonLabel><span className="meta">{place.type} · {place.municipality}</span><h2>{place.name}</h2><p>{place.description}</p></IonLabel><IonButton slot="end" onClick={() => setSelected(place)}>Explore</IonButton></IonItem>)}</IonList>
    {selected && <IonCard className="list-card"><IonCardContent><IonButton fill="clear" onClick={() => setSelected(undefined)}>Close</IonButton><span className="meta">SELECTED PLACE · {selected.latitude.toFixed(3)}, {selected.longitude.toFixed(3)}</span><h2>{selected.name}</h2><p>{selected.description}</p><p className="notice">Respect local guidelines and verify access information before visiting.</p><div className="source-chips"><span>Sources:</span>{selected.sourceIds.map((id) => <a key={id} href={sourceById(id)?.url} target="_blank" rel="noreferrer">{sourceById(id)?.publisher}</a>)}</div></IonCardContent></IonCard>}
  </main></IonContent></IonPage>;
}
