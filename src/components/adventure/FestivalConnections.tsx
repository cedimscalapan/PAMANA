import {useState} from 'react';
import {IonIcon} from '@ionic/react';
import {helpCircleOutline,checkmarkCircleOutline} from 'ionicons/icons';
import {festivalMatchQuestions,correctFestivalMatch} from '../../data/festival-matching';
import {SourceNotes} from '../HeritageUI';
import {playUiSound} from '../../services/ui-sounds';
/** Optional verified-reference pairing. No new score or stamp authority. */
export default function FestivalConnections(){
 const [index,setIndex]=useState(0),[answer,setAnswer]=useState('');
 const [checked,setChecked]=useState(false),[hint,setHint]=useState(false);
 const current=festivalMatchQuestions[index],correct=correctFestivalMatch(current,answer);
 const advance=()=>{if(!checked||!correct)return;if(index+1<festivalMatchQuestions.length){setIndex(index+1);setAnswer('');setChecked(false);setHint(false);}};
 const reset=()=>{setIndex(0);setAnswer('');setChecked(false);setHint(false);};
 return <section className="pamana8-festival-game" aria-label="Festival and hometown matching challenge">
  <div className="pamana8-header"><span className="pamana-eyebrow">OPTIONAL MINI-GAME · ALL 15 HOMETOWNS</span><h2>Festival Connections</h2>
   <p>Match a documented festival to its directory locality. Take your time, use the hints and explore the original references. This practice does not replace Quest results or earn stamps by itself.</p></div>
  {index===festivalMatchQuestions.length-1&&checked&&correct?<div className="pamana8-complete" role="status"><IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/><strong>All fifteen festival connections explored!</strong>
   <p>Return to the Journey for the full three-step heritage adventure.</p><button type="button" onClick={reset}>Play the connections again</button></div>:<>
   <progress value={index} max={festivalMatchQuestions.length} aria-label="Festival connections completed"/>
   <p className="pamana8-number">Connection {index+1} of {festivalMatchQuestions.length}</p>
   <h3>Which locality lists <em>{current.festival}</em>?</h3>
   <div className="pamana8-options" role="group" aria-label="Choose the festival locality">{current.options.map(town=><button type="button" key={town}
    aria-pressed={answer===town} disabled={checked&&correct} onClick={()=>{setAnswer(town);setChecked(false);}}>{town}</button>)}</div>
   {hint&&<p className="pamana8-hint" role="status"><IonIcon icon={helpCircleOutline}/> Read the locality within the official festival record in Lakbay to discover the answer.</p>}
   {checked&&<p role="status" className={'pamana8-response '+(correct?'correct':'retry')}>
     {correct?'Correct! '+current.festival+' is listed for '+current.town+'.':'Try another choice. Check the source and use the locality listed in the directory.'}</p>}
   <div className="pamana8-actions">
    {!checked&&<button type="button" onClick={()=>setHint(true)} disabled={hint}>Show a hint</button>}
    {(!checked||!correct)&&<button type="button" disabled={!answer} onClick={()=>{setChecked(true);if(correct)playUiSound('success');}}>{checked?'Try checking again':'Check connection'}</button>}
    {checked&&correct&&<button type="button" onClick={advance}>Next festival →</button>}
   </div>
   {checked&&correct&&<p className="pamana8-context">{current.description}</p>}
   <SourceNotes ids={current.sourceIds}/>
  </>}
 </section>;
}
