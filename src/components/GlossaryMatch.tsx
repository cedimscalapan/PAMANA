import {useEffect,useState} from 'react';
import {lessonArticles} from '../data/lesson-articles';

/** Optional tap-to-match exercise using the exact existing reviewed glossary,
 * independent of lesson completion and journey stamp requirements.
 */
export default function GlossaryMatch({lessonId}:{lessonId:string}){
 const article=lessonArticles[lessonId];
 const pairs=article?article.terms.slice(0,Math.min(3,article.terms.length)):[];
 const [term,setTerm]=useState('');
 const [matched,setMatched]=useState<string[]>([]);
 const [feedback,setFeedback]=useState('');
 useEffect(()=>{setTerm('');setMatched([]);setFeedback('');},[lessonId]);
 if(pairs.length<2)return null;
 // Keep order stable for screen reader and motor accessibility; no drag/drop required.
 const definitions=[...pairs].reverse();
 const match=(name:string)=>{
  if(!term)return;
  if(name===term){
   setMatched(previous=>[...new Set([...previous,name])]);
   setFeedback('Matched: '+name);
   setTerm('');
  }else{setFeedback('Not a match yet. Read the definitions and try again.');}
 };
 return <section className="pamana-glossary-match" aria-label="Match glossary words to their source-backed definitions">
  <div className="pamana-glossary-header"><span className="pamana-eyebrow">OPTIONAL WORD GAME</span><h3>Match the meaning</h3><p>Choose one glossary word, then tap its matching definition. No time limit, no score penalty.</p></div>
  <div className="pamana-glossary-grid">
   <div className="pamana-glossary-terms"><h4>Words</h4>{pairs.map(([name])=><button key={name} type="button" disabled={matched.includes(name)} aria-pressed={term===name} className={term===name?'selected':''} onClick={()=>{setTerm(name);setFeedback('Choose the matching definition for '+name+'.');}}>{matched.includes(name)?'✓ ':''}{name}</button>)}</div>
   <div className="pamana-glossary-definitions"><h4>Meanings</h4>{definitions.map(([name,meaning])=><button type="button" key={name} disabled={matched.includes(name)||!term} onClick={()=>match(name)}>{matched.includes(name)?'✓ ':''}{meaning}</button>)}</div>
  </div>
  <p className="pamana-glossary-feedback" role="status">{matched.length===pairs.length?'All words matched! You can replay or keep reading.':feedback||'Tap a word to begin.'}</p>
  {matched.length===pairs.length&&<button type="button" className="secondary-action" onClick={()=>{setMatched([]);setTerm('');setFeedback('Ready for another round.');}}>Play again</button>}
 </section>;
}
