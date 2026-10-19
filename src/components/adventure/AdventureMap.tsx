import {useState} from 'react';
import {IonIcon} from '@ionic/react';
import {listOutline,mapOutline,checkmarkCircleOutline,compassOutline} from 'ionicons/icons';
import {mindoroPaths} from '../../data/mindoro-map';
import {heritageChapters,chapterStatus,type HeritageChapter,type JourneyProgress,type QuestResultRef} from '../../data/heritage-journey';
import type {Municipality} from '../../data/festival-themes';
/** Attribution: source coastline from geoBoundaries ADM1, CC BY 3.0 IGO.
 * Trail cards are NOT placed at geocoordinates or municipality centroids.
 */
export type MapView='map'|'list';
export function IslandOutline(){
 return <svg className="pamana5-coast" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 420"
  role="img" aria-label="Illustrated outline of Mindoro island from geoBoundaries. The outline does not show municipality boundaries.">
  <defs><linearGradient id="pamana5-island" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ACDAC0"/><stop offset="1" stopColor="#6AB195"/></linearGradient></defs>
  <rect x="0" y="0" width="360" height="420" rx="22" fill="#DBF2F4"/>
  <path d="M23 90C99 52 270 52 333 97M20 340C113 374 261 365 335 319" fill="none" stroke="#A8DEEB" strokeWidth="5" strokeLinecap="round" opacity=".8"/>
  <g transform="translate(0,3)">{mindoroPaths.map((d,index)=><path key={index} d={d} stroke="#3C9575" strokeWidth=".9" fill="url(#pamana5-island)"/>)}</g>
  <g fill="#FFF" opacity=".75"><circle cx="30" cy="190" r="3"/><circle cx="333" cy="231" r="4"/><circle cx="66" cy="404" r="3"/></g>
  <text x="28" y="23" fontSize="10" fontWeight="800" fill="#467B83" letterSpacing="1.4">MINDORO ISLAND</text>
  <text x="180" y="402" fontSize="9" textAnchor="middle" fontWeight="600" fill="#4B7B79">Coastline outline only · Not a municipal boundary map</text>
 </svg>;
}
export default function AdventureMap({selected,onSelect,progress,completedLessons,results,hometown}:{
 selected:string;onSelect:(chapter:HeritageChapter)=>void;progress:JourneyProgress;
 completedLessons:ReadonlySet<string>;results:readonly QuestResultRef[];hometown:Municipality|string
}){
 const [view,setView]=useState<MapView>('map');
 const [filter,setFilter]=useState<'all'|'in-progress'|'complete'>('all');
 const entries=heritageChapters.map(chapter=>({chapter,status:chapterStatus(chapter,progress,completedLessons,results)}));
 const visible=entries.filter(({status})=>filter==='all'||filter==='complete'&&status.completed||filter==='in-progress'&&status.done>0&&!status.completed);
 return <section className="pamana5-adventure-map" aria-label="Offline Mindoro adventure chapter selector">
   <div className="pamana5-map-head"><div><span className="pamana-eyebrow">PHASE 05 · HERITAGE ADVENTURE</span><h2>Discover Mindoro's 15 hometowns</h2><p>The map shows Mindoro's attributed coastline. Hometown cards form a <strong>decorative chapter trail, not geographical map pins</strong>. Choose any chapter freely.</p></div>
    <div className="pamana5-switch" role="group" aria-label="Adventure presentation">
     <button type="button" aria-pressed={view==='map'} onClick={()=>setView('map')}><IonIcon icon={mapOutline} aria-hidden="true"/> Island</button>
     <button type="button" aria-pressed={view==='list'} onClick={()=>setView('list')}><IonIcon icon={listOutline} aria-hidden="true"/> List</button>
    </div></div>
   <div className="pamana5-filters" role="group" aria-label="Filter hometown adventures">
    {(['all','in-progress','complete'] as const).map(type=><button key={type} type="button" aria-pressed={filter===type} onClick={()=>setFilter(type)}>{type==='all'?'All towns':type==='in-progress'?'In progress':'Earned stamps'}</button>)}
   </div>
   {view==='map'&&<div className="pamana5-island-layout">
      <div className="pamana5-coast-pane"><IslandOutline/><p><IonIcon icon={compassOutline} aria-hidden="true"/> Cultural adventure map · outline only</p></div>
      <div className="pamana5-trail"><p className="pamana5-trail-caption">Choose a hometown from the illustrated journey trail</p>
       <div className="pamana5-chapter-trail">{visible.map(({chapter,status},i)=><button type="button" key={chapter.id}
        aria-pressed={chapter.id===selected} onClick={()=>onSelect(chapter)}
        className="pamana5-trail-stop">
        <span className="pamana5-trail-icon" aria-hidden="true">{status.completed?'🏅':i+1}</span>
        <span><strong>{chapter.town}</strong><small>{status.completed?'Stamp earned':status.done+'/3 discoveries'}</small></span>
       </button>)}</div></div>
     </div>}
   {view==='list'&&<div className="pamana5-list">{visible.map(({chapter,status})=><button type="button" key={chapter.id} className="pamana5-list-item"
      aria-pressed={chapter.id===selected} onClick={()=>onSelect(chapter)}>
      <span aria-hidden="true">{status.completed?'🏅':'🧭'}</span><span><strong>{chapter.town}</strong><small>{chapter.festivalName}</small></span>
      <span className="pamana5-list-status">{status.completed?<><IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/> Complete</>:status.done+' of 3'}</span>
     </button>)}</div>}
   {visible.length===0&&<p className="pamana5-none" role="status">No hometown chapters in this category yet. Choose All towns to keep exploring.</p>}
   <p className="pamana5-attribution">Island outline: geoBoundaries gbOpen, Philippines ADM1, CC BY 3.0 IGO. Decorative chapter trail is not for navigation or travel planning. For documented destination coordinates, use Lakbay's separate map.</p>
 </section>;
}
