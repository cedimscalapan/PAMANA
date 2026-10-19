import {useState} from 'react';
import {IonIcon,IonModal} from '@ionic/react';
import {arrowForwardOutline,checkmarkCircleOutline,compassOutline,eyeOutline,listOutline,mapOutline,searchOutline,sparklesOutline,trophyOutline} from 'ionicons/icons';
import {journeyLevels,journeyTrailPath,adventureZones} from '../../data/journey-levels';
import {chapterStatus,type HeritageChapter,type JourneyProgress,type QuestResultRef} from '../../data/heritage-journey';
import AdventureScenery from './AdventureScenery';
import HometownScene from '../HometownScene';

export default function JourneyLevelMap({selected,progress,completedLessons,results,onSelect,onStart,onDetails,busy=false}:{
 selected:HeritageChapter;progress:JourneyProgress;completedLessons:ReadonlySet<string>;
 results:readonly QuestResultRef[];onSelect:(chapter:HeritageChapter)=>void;
 onStart:()=>void;onDetails:()=>void;busy?:boolean
}){
 const [view,setView]=useState<'path'|'list'>('path');
 const [query,setQuery]=useState('');
 const [showLevel,setShowLevel]=useState(false);
 const chooseLevel=(chapter:HeritageChapter)=>{onSelect(chapter);setShowLevel(true);};
 const chapters=journeyLevels.map(level=>({...level,status:chapterStatus(level.chapter,progress,completedLessons,results)}));
 const selectedStatus=chapterStatus(selected,progress,completedLessons,results);
 const completedCount=chapters.filter(item=>item.status.completed).length;
 const nextKind=selectedStatus.completed?'revisit':!selectedStatus.festivalOpened?'discover':!selectedStatus.lessonCompleted?'learn':'play';
 const nextLabel={revisit:'Explore again',discover:'Discover local history',learn:'Explore festivals & heritage',play:'Start hometown challenge'}[nextKind];
 const available=chapters.filter(item=>item.chapter.town.toLowerCase().includes(query.trim().toLowerCase()));
 return <section className="pamana-gameworld" aria-labelledby="pamana-gameworld-title">
  <div className="pamana-gameworld-top">
   <div><span className="pamana-gameworld-eyebrow"><IonIcon icon={compassOutline} aria-hidden="true"/> ORIENTAL MINDORO HERITAGE JOURNEY</span>
    <h2 id="pamana-gameworld-title">Choose your next level</h2>
    <p>Choose any of the 15 hometowns. Learn its history, livelihoods, heritage places and festivals, then earn a stamp. Every level is open!</p></div>
   <div className="pamana-gameworld-total" aria-label={completedCount+' of 15 hometown stamps earned'}>
    <IonIcon icon={trophyOutline} aria-hidden="true"/><strong>{completedCount}<span>/15</span></strong><small>Stamps earned</small></div>
  </div>
  <div className="pamana-gameworld-selection" aria-live="polite">
   <HometownScene hometown={selected.town} className="pamana-gameworld-selected-art"/>
   <div className="pamana-gameworld-selection-copy">
    <span className="pamana-gameworld-selection-tag"><IonIcon icon={sparklesOutline} aria-hidden="true"/> SELECTED ADVENTURE</span>
    <h3>{selected.town}</h3><p>{selectedStatus.completed?'All three learning steps completed. Your hometown stamp is earned!':
      selectedStatus.done+' of 3 discoveries completed · Next: '+({discover:'Discover',learn:'Learn',play:'Play',revisit:'Explore'}[nextKind])}</p>
    <div className="pamana-gameworld-mini-progress" aria-label={selectedStatus.done+' of 3 chapter activities completed'}>
     {[0,1,2].map(i=><span key={i} className={i<selectedStatus.done?'filled':''}/>)}
    </div>
   </div>
   <button type="button" className="pamana-gameworld-start" onClick={onStart} disabled={busy}>
    {nextLabel}<IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
  </div>
  <div className="pamana-gameworld-toolbar">
   <div className="pamana-gameworld-switch" role="group" aria-label="Choose adventure view">
    <button type="button" aria-pressed={view==='path'} onClick={()=>setView('path')}><IonIcon icon={mapOutline} aria-hidden="true"/> Level path</button>
    <button type="button" aria-pressed={view==='list'} onClick={()=>setView('list')}><IonIcon icon={listOutline} aria-hidden="true"/> Town list</button>
   </div>
   <button type="button" className="pamana-gameworld-details" onClick={onDetails}><IonIcon icon={eyeOutline} aria-hidden="true"/> View chapter details</button>
  </div>
  {view==='path'?<div className="pamana-gameworld-board-wrap">
   <div className="pamana-gameworld-board" aria-label="Illustrated level trail with fifteen selectable hometown levels">
    <div className="pamana-gameworld-landscape zone-a"><AdventureScenery variant="coast"/></div>
    <div className="pamana-gameworld-landscape zone-b"><AdventureScenery variant="hills"/></div>
    <div className="pamana-gameworld-landscape zone-c"><AdventureScenery variant="sunrise"/></div>
    <svg className="pamana-gameworld-road" viewBox="0 0 360 1810" preserveAspectRatio="none" aria-hidden="true" focusable="false">
     <path d={journeyTrailPath()} className="pamana-gameworld-road-outline"/>
     <path d={journeyTrailPath()} className="pamana-gameworld-road-dashes"/>
    </svg>
    {adventureZones.map((zone,i)=><div key={zone.id} className={'pamana-gameworld-zone-label zone-'+zone.id}>
     <span>TRAIL {String(zone.id).padStart(2,'0')}</span><strong>{zone.title}</strong><small>{zone.subtitle}</small>
    </div>)}
    {chapters.map(({number,x,y,chapter,status,zone})=><button type="button" key={chapter.id}
     className={'pamana-gameworld-node zone-'+zone+(status.completed?' completed':'')+(selected.id===chapter.id?' selected':'')}
     style={{left:(x/360*100)+'%',top:y+'px'}} aria-pressed={selected.id===chapter.id}
     aria-label={'Level '+number+': '+chapter.town+'. '+(status.completed?'Heritage Stamp earned':status.done+' of 3 discoveries completed')+'. Select chapter.'}
     onClick={()=>chooseLevel(chapter)}>
     <span className="pamana-gameworld-node-circle"><span aria-hidden="true">{status.completed?'✓':number}</span>
      {selected.id===chapter.id&&<span className="pamana-gameworld-node-active" aria-hidden="true"/>}
     </span>
     <span className="pamana-gameworld-node-name">{chapter.town}</span>
     {status.completed&&<span className="pamana-gameworld-node-stamp" aria-hidden="true">★</span>}
    </button>)}
    <div className="pamana-gameworld-finish" aria-hidden="true">KEEP EXPLORING ✦</div>
   </div>
  </div>:<div className="pamana-gameworld-list-view">
   <label className="pamana-gameworld-search"><IonIcon icon={searchOutline} aria-hidden="true"/>
    <span className="pamana-visually-hidden">Search hometowns</span>
    <input type="search" autoComplete="off" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search all 15 hometowns"/></label>
   <div className="pamana-gameworld-list" aria-label="All hometown levels">
    {available.map(({number,chapter,status})=><button type="button" key={chapter.id}
     className={'pamana-gameworld-list-item'+(selected.id===chapter.id?' selected':'')} aria-pressed={selected.id===chapter.id} onClick={()=>chooseLevel(chapter)}>
     <span className="pamana-gameworld-list-number">{status.completed?<IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/>:number}</span>
     <span className="pamana-gameworld-list-name"><strong>{chapter.town}</strong><small>{status.completed?'Stamp earned':status.done+' of 3 discoveries completed'}</small></span>
     <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>)}
   </div>
   {available.length===0&&<p className="pamana-gameworld-empty" role="status">No matching hometown found. Try another name.</p>}
  </div>}
  <IonModal isOpen={showLevel} onDidDismiss={()=>setShowLevel(false)} className="pamana-gameworld-modal">
    <div className="pamana-gameworld-modal-body">
     <div className="pamana-gameworld-modal-top">
      <span className="pamana-gameworld-modal-kicker">LEVEL {journeyLevels.find(item=>item.chapter.id===selected.id)?.number} · HERITAGE ADVENTURE</span>
      <button type="button" className="pamana-gameworld-modal-close" aria-label="Close level details" onClick={()=>setShowLevel(false)}>✕</button>
     </div>
     <HometownScene hometown={selected.town} className="pamana-gameworld-modal-art"/>
     <h3>{selected.town}</h3>
     <p>{selectedStatus.completed?'Heritage Stamp earned. All three discoveries completed.':selectedStatus.done+' of 3 learning steps completed. Every activity stays available.'}</p>
     <div className="pamana-gameworld-modal-actions">
      <button type="button" className="pamana-gameworld-modal-continue" disabled={busy} onClick={()=>{setShowLevel(false);onStart();}}>{nextLabel}<IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
      <button type="button" className="pamana-gameworld-modal-details" onClick={()=>{setShowLevel(false);onDetails();}}>View chapter missions</button>
     </div>
    </div>
   </IonModal>
  <p className="pamana-gameworld-disclaimer">This is an illustrated <strong>learning-level path</strong>, not a road, travel route or geographic municipality map. Levels are numbered for play; no town is locked. The original cultural references remain in each chapter.</p>
 </section>;
}
