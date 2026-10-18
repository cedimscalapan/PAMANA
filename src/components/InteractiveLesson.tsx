import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {checkmarkCircleOutline,arrowForwardOutline,sparklesOutline,helpCircleOutline,refreshOutline} from 'ionicons/icons';
import {IonIcon} from '@ionic/react';
import type {DiscoveryPack} from '../data/interactive-lessons';
import {isDiscoveryAnswerCorrect} from '../data/interactive-lessons';
import {isDiscoveryComplete,finishDiscovery} from '../services/interactive-lessons';
import {imageById} from '../data/gallery';
import {MediaFigure} from './MediaFigure';
import {townId} from '../data/heritage-journey';

export default function InteractiveLesson({pack}:{pack:DiscoveryPack}){
 const [index,setIndex]=useState(0);
 const [selected,setSelected]=useState('');
 const [checked,setChecked]=useState(false);
 const [hint,setHint]=useState(false);
 const [done,setDone]=useState(()=>isDiscoveryComplete(pack.lessonId));
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 useEffect(()=>{
  setIndex(0);setSelected('');setChecked(false);setHint(false);setDone(isDiscoveryComplete(pack.lessonId));setError('');
 },[pack.lessonId]);
 const prompt=pack.prompts[index],correct=isDiscoveryAnswerCorrect(prompt,selected);
 const image=pack.imageId?imageById(pack.imageId):undefined;
 const pick=(id:string)=>{setSelected(id);setChecked(false);setError('');};
 const reset=()=>{setDone(false);setIndex(0);setSelected('');setChecked(false);setHint(false);setError('');};
 const advance=async()=>{
  if(!checked||!correct||busy)return;
  if(index+1<pack.prompts.length){setIndex(index+1);setSelected('');setChecked(false);setHint(false);setError('');return;}
  setBusy(true);setError('');
  try{await finishDiscovery(pack.lessonId);setDone(true);}
  catch{setError('Could not save this discovery. Please try again; your lesson progress was not changed.');}
  finally{setBusy(false);}
 };
 return <section className="pamana-interactive-lesson" aria-label={'Interactive discovery for '+pack.town}>
  <div className="pamana-interactive-heading">
   <div><span className="pamana-eyebrow"><IonIcon icon={sparklesOutline}/> INTERACTIVE DISCOVERY · OPTIONAL</span><h2>{pack.title}</h2><p>{pack.subtitle}</p></div>
   <span className="pamana-interactive-symbol" aria-hidden="true">{pack.symbol}</span>
  </div>
  <p className="pamana-interactive-intro">Explore two short, source-based challenges. Take your time and retry as often as you like. This activity is separate from marking the lesson as read.</p>
  {done?<div className="pamana-interactive-finished" role="status">
    <span aria-hidden="true">🌟</span><div><strong>Discovery complete!</strong><p>Both activities were completed and saved on this device. You can replay them any time.</p></div>
    <div className="pamana-interactive-actions"><button type="button" className="secondary-action" onClick={reset}><IonIcon icon={refreshOutline}/> Replay</button><Link to={'/journey?town='+townId(pack.town)} className="primary-action">Open {pack.town} journey <IonIcon icon={arrowForwardOutline}/></Link></div>
  </div>:<>
    <div className="pamana-interactive-progress"><span>Discovery {index+1} of {pack.prompts.length}</span><progress max={pack.prompts.length} value={index} aria-label="Completed interaction steps"/></div>
    {prompt.kind==='observe'&&<div className="pamana-observe-panel">
      {image?<MediaFigure image={image}/>:<div className="pamana-observe-symbol" role="img" aria-label={pack.imageDescription}><span aria-hidden="true">{pack.symbol}</span></div>}
      <p className="pamana-observe-note">{pack.imageDescription}</p>
    </div>}
    <div className="pamana-discovery-question"><span className="pamana-eyebrow">{prompt.kind==='observe'?'LOOK CLOSELY':'MAKE THE CONNECTION'}</span><h3>{prompt.question}</h3>
      <div className="pamana-discovery-choices" role="group" aria-label="Choose your answer">
       {prompt.choices.map((choice,j)=><button type="button" key={choice.id}
        className={selected===choice.id?'selected':''} aria-pressed={selected===choice.id}
        disabled={busy||checked&&correct}
        onClick={()=>pick(choice.id)}><span className="pamana-discovery-letter">{String.fromCharCode(65+j)}</span><span>{choice.label}</span>{selected===choice.id&&<IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/>}</button>)}
      </div>
      {hint&&!checked&&<p className="pamana-discovery-hint" role="status"><IonIcon icon={helpCircleOutline}/> {prompt.hint}</p>}
      {checked&&<div role="status" className={'pamana-discovery-feedback '+(correct?'correct':'try-again')}>
       <strong>{correct?'Well connected!':'Not quite—try another answer.'}</strong>
       <p>{correct?prompt.explanation:prompt.hint}</p>
      </div>}
      <div className="pamana-interactive-actions">
       {!checked&&<button type="button" className="secondary-action" onClick={()=>setHint(true)} disabled={hint||busy}>Give me a hint</button>}
       {!checked&&<button type="button" className="primary-action" disabled={!selected||busy} onClick={()=>setChecked(true)}>Check answer <IonIcon icon={arrowForwardOutline}/></button>}
       {checked&&!correct&&<button type="button" className="secondary-action" onClick={()=>{setChecked(false);setSelected('');}}>Try again</button>}
       {checked&&correct&&<button type="button" className="primary-action" disabled={busy} onClick={()=>void advance()}>{busy?'Saving…':index===pack.prompts.length-1?'Save discovery':'Next discovery'} <IonIcon icon={arrowForwardOutline}/></button>}
      </div>
      {error&&<p className="inline-status" role="alert">{error}</p>}
      <p className="pamana-discovery-source">Source-backed challenge · lesson references remain available below.</p>
    </div>
  </>}
 </section>;
}
