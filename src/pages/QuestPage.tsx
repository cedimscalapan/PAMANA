import { IonContent, IonPage } from '@ionic/react';
import { useRef, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import {findChapter} from '../data/heritage-journey';
import {linkJourneyQuestSession} from '../services/heritage-journey';
import { PageFrame } from '../components/AppChrome';
import { DetailBack, HeritageHero, SourceNotes } from '../components/HeritageUI';
import { MediaCredit } from '../components/MediaFigure';
import { imageById } from '../data/gallery';
import { GameLevel, GameMode, GameRound, gameModes } from '../data/quest-games';
import { mindoroPaths, projectMindoro } from '../data/mindoro-map';
import { advance, GameSession, isCorrect, newSession, QuestProgress, readQuestProgress, RoundDraft, roundPoints, saveQuestProgress } from '../services/quest-games';
import '../quest.css';
import KaPamanaGuide from '../components/adventure/KaPamanaGuide';
import {playUiSound} from '../services/ui-sounds';

const photoAlt: Record<string,string> = {
  puerto:'A sandy beach and buildings seen from the sea.', naujan:'A freshwater lake bordered by green vegetation and distant hills.', halcon:'A mountain rising above a wooded landscape.', tamaraw:'A small wild buffalo with dark hair and closely set, V-shaped horns.',
  'muelle-port':'A paved waterfront beside blue water and moored boats.', 'calapan-hall':'A pale, columned public building bearing the words City Hall.', 'calapan-port':'An entrance arch bearing the words Port of Calapan.',
};
function Choice({id,selected,children,onChoose,disabled}:{id:string;selected?:string;children:React.ReactNode;onChoose:(id:string)=>void;disabled:boolean}) {
  return <button type="button" className={`game-choice ${selected===id?'is-selected':''}`} aria-pressed={selected===id} onClick={()=>onChoose(id)} disabled={disabled}>{children}<span aria-hidden="true">{selected===id?'●':'○'}</span></button>;
}
function Puzzle({round,draft,disabled,change}:{round:GameRound;draft:RoundDraft;disabled:boolean;change:(next:RoundDraft)=>void}) {
  const locked=disabled||draft.checked;
  if(round.mode==='quiz')return <div className="game-choices">{round.items.map(item=><Choice key={item.id} id={item.id} selected={draft.selected} onChoose={id=>change({...draft,selected:id})} disabled={locked}>{item.label}</Choice>)}</div>;
  if(round.mode==='photo'){
    const photo=imageById(round.answer);
    return <>{photo&&<figure className="detective-photo"><img src={photo.src} alt={photoAlt[photo.id]??photo.alt}/><figcaption><MediaCredit image={photo} title={false}/></figcaption></figure>}<div className="game-choices">{round.items.map(item=><Choice key={item.id} id={item.id} selected={draft.selected} onChoose={id=>change({...draft,selected:id})} disabled={locked}>{item.label}</Choice>)}</div></>;
  }
  if(round.mode==='map')return <><div className="game-map"><svg viewBox="0 0 380 420" role="group" aria-label="Mindoro coastline with lettered destination reference points"><rect width="380" height="420" fill="#e9f1eb"/>{mindoroPaths.map((path,i)=><path key={i} d={path} fill="#b5ceb7" stroke="#688d79" strokeWidth=".6"/>)}<text x="25" y="25">VERDE ISLAND PASSAGE</text><text x="320" y="34">N ↑</text><text x="95" y="220" transform="rotate(30 95 220)">MINDORO</text>{round.items.map((item,index)=>{
    const [x,y]=projectMindoro(item.longitude!,item.latitude!);
    const choose=()=>{if(!locked)change({...draft,selected:item.id});};
    return <g key={item.id} transform={`translate(${x},${y})`} role="button" tabIndex={locked?-1:0} aria-label={`Choose point ${String.fromCharCode(65+index)}`} aria-disabled={locked} aria-pressed={draft.selected===item.id} onClick={choose} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose();}}}><circle r="21" fill={draft.selected===item.id?'#ac542d':'#215b50'} stroke="white" strokeWidth="3"/><text textAnchor="middle" dy="6" fill="white">{String.fromCharCode(65+index)}</text></g>;
  })}</svg></div><p className="quiet-note">Use the map or the same lettered choices below. Latitude is north; longitude is east.</p><div className="game-choices">{round.items.map((item,i)=><Choice key={item.id} id={item.id} selected={draft.selected} onChoose={id=>change({...draft,selected:id})} disabled={locked}><span><b>Point {String.fromCharCode(65+i)}</b><small>{item.latitude!.toFixed(4)}° N, {item.longitude!.toFixed(4)}° E</small></span></Choice>)}</div><p className="quiet-note">Coastline: geoBoundaries gbOpen PHL ADM1, CC BY 3.0 IGO. Points: provincial directory. Orientation references only.</p></>;
  if(round.mode==='timeline')return <ol className="timeline-puzzle">{draft.order.map((id,index)=>{
    const item=round.items.find(item=>item.id===id)!;
    const move=(delta:number)=>{const order=[...draft.order];[order[index],order[index+delta]]=[order[index+delta],order[index]];change({...draft,order});};
    return <li key={id}><span className="timeline-number">{index+1}</span><span><strong>{item.label}</strong>{draft.checked&&<small>{item.date} · {item.detail}</small>}</span><div><button type="button" aria-label={`Move ${item.label} earlier`} disabled={locked||index===0} onClick={()=>move(-1)}>↑</button><button type="button" aria-label={`Move ${item.label} later`} disabled={locked||index===draft.order.length-1} onClick={()=>move(1)}>↓</button></div></li>;
  })}</ol>;
  if(round.mode==='sort'){
    const groups=[...new Set(round.items.map(item=>item.group!))].sort();
    return <div className="sorting-puzzle">{round.items.map(item=><label key={item.id}><strong>{item.label}</strong><select value={draft.groups[item.id]??''} disabled={locked} onChange={event=>change({...draft,groups:{...draft.groups,[item.id]:event.target.value}})}><option value="">Choose a municipality</option>{groups.map(group=><option key={group}>{group}</option>)}</select>{draft.checked&&<small>{draft.groups[item.id]===item.group?'Correct. ':`This belongs to ${item.group}. `}{item.detail}</small>}</label>)}</div>;
  }
  if(round.mode==='word')return <div className="word-puzzle"><p>{round.answer!.length} letters · spelling follows the source</p><div className="word-answer" aria-label="Your assembled word">{Array.from(round.answer!).map((_,i)=>{const tile=draft.word[i];return <button type="button" key={i} disabled={locked||tile===undefined} aria-label={tile===undefined?`Empty position ${i+1}`:`Return letter ${draft.tiles[tile]} at position ${i+1}`} onClick={()=>change({...draft,word:draft.word.filter((_,index)=>index!==i)})}>{tile===undefined?'·':draft.tiles[tile]}</button>;})}</div><p className="sr-only" aria-live="polite">{draft.word.map(index=>draft.tiles[index]).join(' ')||'No letters selected'}</p><div className="word-tiles" aria-label="Available letter tiles">{draft.tiles.map((letter,index)=><button type="button" key={index} disabled={locked||draft.word.includes(index)||draft.word.length>=round.answer!.length} onClick={()=>change({...draft,word:[...draft.word,index]})} aria-label={`Add ${letter}, tile ${index+1}`}>{letter}</button>)}</div><div className="button-row"><button className="text-action" type="button" disabled={locked||!draft.word.length} onClick={()=>change({...draft,word:draft.word.slice(0,-1)})}>Undo letter</button><button className="text-action" type="button" disabled={locked||!draft.word.length} onClick={()=>change({...draft,word:[]})}>Clear word</button></div></div>;
  const turn=(key:string)=>{
    if(locked||draft.flipped.length===2||draft.flipped.includes(key)||draft.matched.includes(key.split(':')[0]))return;
    const flipped=[...draft.flipped,key];
    if(flipped.length===2){
      const ids=flipped.map(value=>value.split(':')[0]);
      if(ids[0]===ids[1])change({...draft,flipped:[],matched:[...draft.matched,ids[0]]});
      else change({...draft,flipped,misses:draft.misses+1});
    }else change({...draft,flipped});
  };
  return <><div className="memory-status" role="status">{draft.matched.length} of {round.items.length} pairs found · {draft.misses} {draft.misses===1?'mismatch':'mismatches'}</div><div className="memory-board">{draft.deck.map((key,index)=>{
    const [id,variant]=key.split(':'),item=round.items.find(item=>item.id===id)!,photo=imageById(item.imageId);
    const matched=draft.matched.includes(id),visible=matched||draft.flipped.includes(key);
    return <button type="button" className={`memory-tile ${visible?'is-open':''} ${matched?'is-matched':''}`} key={key} disabled={locked||matched||draft.flipped.includes(key)||draft.flipped.length===2} aria-label={visible?`${variant==='image'?'Picture of':'Name:'} ${item.label}${matched?', matched':''}`:`Reveal card ${index+1}`} onClick={()=>turn(key)}>{visible?(variant==='image'&&photo?<img src={photo.src} alt={photo.alt}/>:<strong>{item.label}</strong>):<><span aria-hidden="true">✧</span><small>{index+1}</small></>}{matched&&<span className="matched-mark" aria-hidden="true">✓</span>}</button>;
  })}</div>{draft.flipped.length===2&&<div className="memory-mismatch" role="status"><p>These belong to different pairs. Keep their positions in mind.</p><button type="button" className="secondary-action" disabled={disabled} onClick={()=>change({...draft,flipped:[]})}>Turn these cards back</button></div>}<details className="reference-notes"><summary>Image credits &amp; open-book references</summary>{round.items.map(item=>{const photo=imageById(item.imageId);return photo&&<p key={item.id}><MediaCredit image={photo}/></p>;})}</details></>;
}
function ready(round:GameRound,draft:RoundDraft){
  if(round.mode==='map'||round.mode==='photo'||round.mode==='quiz')return !!draft.selected;
  if(round.mode==='word')return draft.word.length===round.answer!.length;
  if(round.mode==='sort')return round.items.every(item=>!!draft.groups[item.id]);
  if(round.mode==='memory')return draft.matched.length===round.items.length;
  return true;
}
function showAnswer(round:GameRound,draft:RoundDraft):RoundDraft {
  const result={...draft,hinted:true,revealed:true,checked:true,correct:true};
  if(round.mode==='map'||round.mode==='photo'||round.mode==='quiz')result.selected=round.answer;
  if(round.mode==='timeline')result.order=[...round.items].sort((a,b)=>a.date!-b.date!).map(item=>item.id);
  if(round.mode==='sort')result.groups=Object.fromEntries(round.items.map(item=>[item.id,item.group!]));
  if(round.mode==='word'){result.tiles=Array.from(round.answer!);result.word=result.tiles.map((_,index)=>index);}
  if(round.mode==='memory'){result.matched=round.items.map(item=>item.id);result.flipped=[];}
  return result;
}

export default function QuestPage(){
  const location=useLocation();
  const params=new URLSearchParams(location.search);
  const journey=findChapter(params.get('journey'));
  const linkedMode=journey&&params.get('mode')===journey.mode?journey.mode:undefined;
  const [progress,setProgress]=useState<QuestProgress>(readQuestProgress);
  const [playing,setPlaying]=useState(false);
  const [level,setLevel]=useState<GameLevel>('gentle');
  const [busy,setBusy]=useState(false),[error,setError]=useState('');
  const saving=useRef(false),content=useRef<HTMLIonContentElement>(null);
  const session=progress.active,round=session?.rounds[session.index];
  const definition=gameModes.find(mode=>mode.id===session?.mode);
  const persist=async(next:QuestProgress,after?:()=>void)=>{
    if(saving.current)return;
    saving.current=true;setBusy(true);setError('');
    try{setProgress(await saveQuestProgress(next));after?.();}catch{setError('This change could not be saved. Your previous saved progress is kept. Retry the action when storage is available.');}finally{saving.current=false;setBusy(false);}
  };
  const update=(draft:RoundDraft)=>{if(session)void persist({...progress,active:{...session,draft}});};
  const start=(mode:GameMode)=>{
    const nextSession=newSession(mode,level,progress);
    void persist({...progress,active:nextSession},()=>{
      if(journey&&linkedMode===mode){
        void linkJourneyQuestSession(journey.id,nextSession.id).catch(()=>setError('Your Quest is saved, but its journey link could not be saved. Return to the journey and try again.'));
      }
      setPlaying(true);void content.current?.scrollToTop(0);
    });
  };
  const check=()=>{if(!session||!round)return;const correct=isCorrect(round,session.draft);update({...session.draft,checked:true,correct,misses:session.draft.misses+(correct?0:1)});if(correct)playUiSound('success');};
  const next=()=>{if(session)void persist(advance(progress,session),()=>void content.current?.scrollToTop(0));};
  const legacyScore=localStorage.getItem('pamana.quest.bestScore');
  return <IonPage><IonContent ref={content}><PageFrame active="quest">
    {!playing||!session||!round?<><HeritageHero eyebrow="Curiosity is your best companion." title="Pamana Quest" description="Look closer. Make connections. Discover something worth remembering." tone="amber"/><section className="heritage-body game-hub">
      <KaPamanaGuide state="play" compact/>
      <div className="game-hub-intro"><div><span className="eyebrow">SIX WAYS TO DISCOVER</span><h2>What will you explore today?</h2><p>Short, source-linked games. No countdown. Everything you need is available offline.</p></div><span className="game-total"><b>{progress.totals.completed}</b>games completed</span></div>
      {journey&&linkedMode&&<div className="pamana-journey-quest-prompt"><div><small>CONNECTED HERITAGE JOURNEY</small><strong>{journey.town}: {gameModes.find(m=>m.id===linkedMode)?.name}</strong><p>This is a source-backed Mindoro-wide game. Complete it to earn the Quest step in your {journey.town} journey.</p></div><button type="button" className="primary-action" disabled={busy} onClick={()=>start(linkedMode)}>Play journey challenge →</button><Link to={'/journey?town='+journey.id}>Return to journey</Link></div>}
      {session&&!session.complete&&<div className="resume-game"><div><small>READY WHEN YOU ARE</small><strong>{definition?.name}</strong><span>Activity {session.index+1} of {session.rounds.length} · {session.score} points banked</span></div><button type="button" className="primary-action" disabled={busy} onClick={()=>setPlaying(true)}>Continue game →</button></div>}
      <fieldset className="game-level"><legend>Choose your pace</legend><label className={level==='gentle'?'chosen':''}><input type="radio" name="level" value="gentle" checked={level==='gentle'} onChange={()=>setLevel('gentle')}/><strong>Gentle start</strong><span>Fewer cards and shorter sessions</span></label><label className={level==='challenge'?'chosen':''}><input type="radio" name="level" value="challenge" checked={level==='challenge'} onChange={()=>setLevel('challenge')}/><strong>A little challenge</strong><span>More cards and longer sessions</span></label></fieldset>
      {session&&!session.complete&&<p className="quiet-note">Starting a new game replaces your unfinished game. Completed results stay saved.</p>}
      <div className="game-grid">{gameModes.filter(mode=>mode.id!=='quiz').map(mode=>{
        const best=progress.totals.games[`${mode.id}:${level}`];
        return <article className={`game-tile game-tone-${mode.tone}`} key={mode.id}><div className="game-tile-art" aria-hidden="true"><span>{mode.symbol}</span><i/><i/><i/></div><div className="game-tile-copy"><small>{mode.verb}</small><h3>{mode.name}</h3><p>{mode.description}</p><span className="game-personal-best">{best?`Best at this level: ${best.bestScore}/${best.possible} · ${best.completed} completed`:'A new discovery awaits'}</span><button type="button" className="secondary-action" disabled={busy} onClick={()=>start(mode.id)}>Play {mode.name} <span aria-hidden="true">→</span></button></div></article>;
      })}</div>
      <div className="classic-quest"><div><h3>Keep the classic questions close.</h3><p>The original knowledge library is still here, now with untimed play and saved sessions.</p></div><button className="secondary-action" disabled={busy} onClick={()=>start('quiz')}>Play Knowledge Check →</button></div>
      <details className="reference-notes"><summary>Your progress &amp; how points work</summary><p>10 points for an unassisted first check; 5 after a hint, retry, or memory mismatch; 2 for following a revealed answer; 0 for continuing after an incorrect check. Each activity has a maximum of 10 points. Compare best results within the same game and level.</p><p>Selections and results are saved on this device only after storage succeeds. Leaving the page keeps your unfinished game.</p>{legacyScore!==null&&<p>Your earlier multiple-choice best score is preserved: {legacyScore}/100. New games keep separate results.</p>}{progress.results.slice(0,10).map(result=><p key={result.id}>{gameModes.find(mode=>mode.id===result.mode)?.name} · {result.level==='gentle'?'Gentle start':'A little challenge'} · {result.score}/{result.possible} · {new Date(result.completedAt).toLocaleDateString('en-PH')}</p>)}</details>
    </section></>:<section className="heritage-body game-play"><DetailBack label="All games · progress saved" onBack={()=>setPlaying(false)}/>{session.complete?<article className="game-finished"><span className="eyebrow">A DISCOVERY TO KEEP</span><div className="game-medallion" aria-hidden="true">✧</div><h1>Nicely explored.</h1><p>You completed {definition?.name}. Your result is saved on this device.</p><div className="game-final-score"><strong>{session.score}</strong><span>of {session.possible} points</span></div><p>Keep following the ideas that caught your attention.</p><div className="button-row">{journey&&linkedMode===session.mode&&<Link className="primary-action" to={'/journey?town='+journey.id}>Return to {journey.town} journey →</Link>}<button className="secondary-action" disabled={busy} onClick={()=>start(session.mode)}>Play a fresh game →</button><button className="secondary-action" onClick={()=>setPlaying(false)}>Explore other games</button></div><div className="related-links">{[...new Set(session.rounds.map(item=>item.link))].slice(0,4).map(link=><Link key={link} to={link}>Keep learning in Pamana →</Link>)}</div></article>:<article className="game-activity"><div className="game-play-heading"><span className="eyebrow">{definition?.name} · {session.level==='gentle'?'GENTLE START':'A LITTLE CHALLENGE'}</span><span>{session.index+1} / {session.rounds.length}</span></div><progress aria-label="Activities completed" max={session.rounds.length} value={session.index}/><h1>{round.prompt}</h1><p className="game-instruction">{definition?.instruction}</p><p className="game-score-note">{session.score} points banked · up to 10 for this activity</p>
        <Puzzle key={session.id+'-'+session.index} round={round} draft={session.draft} disabled={busy} change={update}/>
        {session.draft.hinted&&<aside className="game-hint" role="status"><strong>A little help</strong><p>{round.hint}</p></aside>}
        {session.draft.checked?<div className={`game-feedback ${session.draft.correct?'correct-feedback':''}`} role="status"><h2>{session.draft.revealed?'A guided discovery':session.draft.correct?'You made the connection.':'A chance to look again.'}</h2><p>{round.explanation}</p>{(round.mode==='map'||round.mode==='photo'||round.mode==='quiz')&&<p><strong>Answer: {round.items.find(item=>item.id===round.answer)?.label}</strong></p>}{session.draft.correct?<p>{roundPoints(session.draft)} of 10 points for this activity.</p>:<p>No points yet. Retry for up to 5, follow the answer for 2, or continue with 0.</p>}<div className="button-row">{!session.draft.correct&&<button className="secondary-action" disabled={busy} onClick={()=>update({...session.draft,checked:false})}>Try again</button>}<button className="primary-action" disabled={busy} onClick={next}>{session.index===session.rounds.length-1?'Save & finish':'Save & continue'} →</button></div></div>:<div className="game-controls"><button type="button" className="primary-action" disabled={busy||!ready(round,session.draft)} onClick={check}>Check {round.mode==='memory'?'my matches':'my answer'} →</button><button className="text-action" disabled={busy||session.draft.hinted} onClick={()=>update({...session.draft,hinted:true})}>Show a hint · up to 5 points</button></div>}
        {(!session.draft.checked||!session.draft.correct)&&<button className="text-action reveal-answer" disabled={busy} onClick={()=>update(showAnswer(round,session.draft))}>Learn with the answer · 2 points</button>}
        <div className="game-learning-links"><Link to={round.link}>Explore the related lesson or place →</Link></div><SourceNotes ids={round.sourceIds}/>
      </article>}</section>}
    {busy&&<p className="game-save-status" role="status">Saving on this device…</p>}{error&&<p className="inline-status" role="alert">{error}</p>}
  </PageFrame></IonContent></IonPage>;
}
