import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {deriveHeritageStamps} from '../data/heritage-stamps';
import {readQuestProgress} from '../services/quest-games';
export default function HeritageStamps(){
 const completed=lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').length;
 const questCount=readQuestProgress().results.length;
 const stamps=deriveHeritageStamps(completed,questCount);
 return <section className="pamana-stamps" aria-label="Learning achievement stamps">
   <h2>My Heritage Passport</h2><p className="quiet-note">Stamps unlock from completed lessons and Quests saved on this device. No account required.</p>
   <div className="pamana-stamp-grid">{stamps.map(s=><article key={s.id} className={s.earned?'earned':'locked'} aria-label={s.title+(s.earned?', earned':', not yet earned')}>
      <span aria-hidden="true">{s.earned?s.emoji:'🔒'}</span><strong>{s.title}</strong><small>{s.requirement}</small><em>{s.earned?'Earned':'Not yet earned'}</em>
   </article>)}</div>
 </section>;
}
