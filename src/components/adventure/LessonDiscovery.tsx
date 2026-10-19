import {useState} from 'react';
import {IonIcon} from '@ionic/react';
import {sparklesOutline,eyeOutline,checkmarkCircleOutline} from 'ionicons/icons';
import type {Lesson} from '../../data/content';
/** Optional self-paced observation prompts from an existing reviewed lesson;
 * not a substitute for reading its full cited article.
 */
export default function LessonDiscovery({lesson}:{lesson:Lesson}){
 const [revealed,setRevealed]=useState<string[]>([]);
 const all=lesson.points.every(point=>revealed.includes(point));
 return <section className="pamana7-reveal" aria-label="Discover the documented key ideas">
   <div className="pamana7-head"><span className="pamana-eyebrow"><IonIcon icon={sparklesOutline}/> EXPLORE THE IDEAS</span><h2>Reveal a little at a time</h2>
    <p>Read a prompt, make a guess, then reveal the exact documented idea from this lesson. No score or timer.</p></div>
   <div className="pamana7-reveal-grid">{lesson.points.map((point,i)=><button type="button" key={i}
    className="pamana7-reveal-card" aria-expanded={revealed.includes(point)} onClick={()=>setRevealed(old=>old.includes(point)?old.filter(p=>p!==point):[...old,point])}>
    <span className="pamana7-reveal-top"><span>Discovery {i+1}</span><IonIcon icon={revealed.includes(point)?checkmarkCircleOutline:eyeOutline} aria-hidden="true"/></span>
    {revealed.includes(point)?<strong>{point}</strong>:<strong>Tap to reveal a key idea</strong>}
   </button>)}</div>
   <p className="pamana7-footnote" role="status">{all?'All key ideas revealed! You can review them again.':revealed.length+' of '+lesson.points.length+' ideas revealed.'} These facts come from the full lesson and its existing source references.</p>
 </section>;
}
