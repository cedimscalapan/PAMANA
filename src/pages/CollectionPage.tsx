import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { albumsOutline, checkmarkCircleOutline, closeOutline, layersOutline } from 'ionicons/icons';
import { useState } from 'react';
import { collectionItems, CollectionItem } from '../data/content';
import { media } from '../data/media';
import { setStored } from '../services/storage';
import { ModuleHeader, PageFrame } from '../components/AppChrome';

export default function CollectionPage() {
  const [selected, setSelected] = useState<CollectionItem>();
  const [collected, setCollected] = useState<string[]>(JSON.parse(localStorage.getItem('pamana.collectedItems') || '[]'));
  const collect = (item: CollectionItem) => {
    const next = collected.includes(item.id) ? collected : [...collected, item.id];
    setCollected(next);
    void setStored('pamana.collectedItems', JSON.stringify(next));
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="home">
          <ModuleHeader title="Koleksyon" subtitle="Keep a respectful, offline gallery of heritage learning cards." tone="red" icon={albumsOutline} />
          <section className="module-content collection-content">
            <div className="module-intro-row"><div><p className="module-kicker">YOUR LOCAL GALLERY</p><h2>Mga bagay na may kuwento</h2></div><span className="module-count">{collected.length}/{collectionItems.length} saved</span></div>
            <div className="collection-grid">
              {collectionItems.map((item) => {
                const isCollected = collected.includes(item.id);
                return <article className={`collection-tile ${isCollected ? 'is-collected' : ''}`} key={item.id}>
                  <button type="button" onClick={() => setSelected(item)} className="collection-tile-open">
                    {item.id === 'nature' ? <img src={media.tamaraw.src} alt={media.tamaraw.alt} /> : <span className="collection-tile-symbol"><IonIcon icon={item.id === 'writing' ? layersOutline : albumsOutline} /></span>}
                    <span className="collection-tile-category">{item.category}</span>
                    <strong>{item.title}</strong>
                  </button>
                  <IonButton fill="clear" onClick={() => collect(item)}>{isCollected ? <><IonIcon icon={checkmarkCircleOutline} /> Saved</> : 'Collect'}</IonButton>
                </article>;
              })}
            </div>
            {selected && <article className="detail-card collection-detail"><div className="detail-card-topline"><span className="module-kicker">COLLECTION ITEM · {selected.category}</span><IonButton fill="clear" onClick={() => setSelected(undefined)} aria-label="Close item"><IonIcon icon={closeOutline} /></IonButton></div><h2>{selected.title}</h2><p>{selected.description}</p><div className="notice"><strong>Respect the source.</strong><br />Entries keep provenance, creator credit, and community permissions with the local record.</div></article>}
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
