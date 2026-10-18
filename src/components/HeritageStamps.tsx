import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {deriveHeritageStamps} from '../data/heritage-stamps';
import {readQuestProgress} from '../services/quest-games';
import {heritageChapters,chapterStatus} from '../data/heritage-journey';
import {readJourneyProgress} from '../services/heritage-journey';
import {Link} from 'react-router-dom';
export default function HeritageStamps(){
 const completed=lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').length;
 const questResults=readQuestProgress().results;
 const questCount=questResults.length;
 const stamps=deriveHeritageStamps(completed,questCount);
 const learned=new Set(lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').map(l=>l.id));
 const journeyProgress=readJourneyProgress();
 const towns=heritageChapters.filter(chapter=>chapterStatus(chapter,journeyProgress,learned,questResults).completed);
 return <section className="pamana-stamps" aria-label="Learning achievement stamps">
   <h2>My Heritage Passport</h2><p className="quiet-note">Stamps unlock from completed lessons and Quests saved on this device. No account required.</p>
   <div className="pamana-stamp-grid">{stamps.map(s=><article key={s.id} className={s.earned?'earned':'locked'} aria-label={s.title+(s.earned?', earned':', not yet earned')}>
      <span aria-hidden="true">{s.earned?s.emoji:'🔒'}</span><strong>{s.title}</strong><small>{s.requirement}</small><em>{s.earned?'Earned':'Not yet earned'}</em>
   </article>)}</div>
   <div className="pamana-passport-towns"><div><strong>Hometown discovery stamps</strong><p>{towns.length} of {heritageChapters.length} hometown journeys completed</p></div><div className="pamana-passport-earned">{towns.length?towns.map(chapter=><Link key={chapter.id} to={'/journey?town='+chapter.id} aria-label={'View completed '+chapter.town+' journey'}>🏅 {chapter.town}</Link>):<p>No hometown stamps yet. Start with your own town or explore another.</p>}</div><Link to="/journey" className="pamana-passport-link">Explore Heritage Journey →</Link></div>
 </section>;
}
