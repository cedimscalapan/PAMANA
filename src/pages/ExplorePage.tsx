import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { arrowForwardOutline, calendarOutline, closeOutline, compassOutline, locationOutline, mapOutline } from 'ionicons/icons';
import { useState } from 'react';
import { festivals, officialCatalogStats, officialMunicipalities, places, Place, sourceById, travelPlanningNotes } from '../data/content';
import { media } from '../data/media';
import { ModuleHeader, PageFrame } from '../components/AppChrome';

export default function ExplorePage() {
  const [selected, setSelected] = useState<Place>();
  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="explore">
          <ModuleHeader title="Lakbay Pamana" subtitle="Explore places, landscapes, and living heritage offline." tone="blue" icon={mapOutline} />
          <section className="module-content explore-content">
            <div className="module-intro-row"><div><p className="module-kicker">OFFLINE MAP</p><h2>Discover Oriental Mindoro</h2></div><span className="module-count">{places.length} places</span></div>
            <div className="map-card">
              <div className="offline-map polished-map" aria-label="Illustrated offline map of learning places in Oriental Mindoro">
                <span className="map-water">ORIENTAL MINDORO</span>
                <span className="map-island map-island-one" /><span className="map-island map-island-two" /><span className="map-island map-island-three" />
                {places.map((place, index) => <button className="map-pin" key={place.id} style={{ left: `${18 + (index * 16) % 68}%`, top: `${24 + (index * 13) % 48}%` }} onClick={() => setSelected(place)} aria-label={`Open ${place.name}`}><IonIcon icon={locationOutline} /><small>{place.name}</small></button>)}
              </div>
              <div className="map-card-footer"><span><IonIcon icon={compassOutline} /> Learning map</span><small>No GPS · no live directions</small></div>
            </div>

            <article className="catalog-snapshot">
              <div className="home-section-heading"><h2>Official directory snapshot</h2><span className="module-count">Source linked</span></div>
              <p className="module-note">A curated snapshot from the provincial tourism portal. Counts can change as listings are updated.</p>
              <div className="catalog-stat-grid">{officialCatalogStats.slice(0, 6).map((stat) => <div className="catalog-stat" key={stat.id}><strong>{stat.count}</strong><span>{stat.label}</span></div>)}</div>
              <div className="municipality-list"><small>Municipalities covered</small><div>{officialMunicipalities.map((municipality) => <span key={municipality}>{municipality}</span>)}</div></div>
            </article>

            <article className="feature-media-card">
              <img src={media.tamaraw.src} alt={media.tamaraw.alt} />
              <div><p className="module-kicker">WILDLIFE &amp; CONSERVATION</p><h2>Tamaraw</h2><p>Mindoro’s endemic dwarf buffalo reminds us that heritage learning includes the living landscape.</p><small>{media.tamaraw.credit}</small></div>
            </article>

            <div className="place-list">
              <div className="home-section-heading"><h2>Places to explore</h2><span className="module-count">Tap to open</span></div>
              {places.map((place) => <button type="button" className="place-row" key={place.id} onClick={() => setSelected(place)}><span className="place-icon"><IonIcon icon={locationOutline} /></span><span><small>{place.type} · {place.municipality}</small><strong>{place.name}</strong><em>{place.description}</em></span><IonIcon icon={arrowForwardOutline} /></button>)}
            </div>

            <div className="place-list festival-list">
              <div className="home-section-heading"><h2>Festival calendar</h2><span className="module-count">{festivals.length} dates</span></div>
              <p className="module-note">Annual dates are from the official tourism calendar. Confirm the current program and venue before traveling.</p>
              {festivals.map((festival) => <article className="festival-row" key={festival.id}><span className="place-icon"><IonIcon icon={calendarOutline} /></span><span><small>{new Date(2026, festival.month - 1, festival.day).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} · {festival.municipality}</small><strong>{festival.name}</strong><em>{festival.description}</em></span>{festival.detailUrl && <a href={festival.detailUrl} target="_blank" rel="noreferrer" aria-label={`Open source for ${festival.name}`}><IonIcon icon={arrowForwardOutline} /></a>}</article>)}
            </div>

            <article className="travel-planning-card">
              <div className="home-section-heading"><h2>Travel planning reference</h2><span className="module-count">Approximate</span></div>
              <p className="module-note">These are planning notes from the official portal, not live schedules. Confirm transport, weather, and access before leaving.</p>
              {travelPlanningNotes.map((note) => <div className="travel-note-row" key={note.id}><strong>{note.label}</strong><span>{note.value}</span></div>)}
              <div className="source-chips"><span>Source:</span><a href={sourceById('lakbay-how-to-get-here')?.url} target="_blank" rel="noreferrer">Travel Oriental Mindoro</a></div>
            </article>

            {selected && <article className="detail-card place-detail"><div className="detail-card-topline"><span className="module-kicker">SELECTED PLACE · {selected.municipality}</span><IonButton fill="clear" onClick={() => setSelected(undefined)} aria-label="Close place"><IonIcon icon={closeOutline} /></IonButton></div><h2>{selected.name}</h2><p>{selected.description}</p><div className="notice"><strong>Travel note</strong><br />Respect local guidelines and verify access information before visiting.</div><div className="source-chips"><span>Sources:</span>{selected.sourceIds.map((id) => <a key={id} href={sourceById(id)?.url} target="_blank" rel="noreferrer">{sourceById(id)?.publisher}</a>)}</div></article>}
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
