import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {deriveHeritageStamps} from '../data/heritage-stamps';
import {readQuestProgress} from '../services/quest-games';
import {heritageChapters,chapterStatus} from '../data/heritage-journey';
import {readJourneyProgress} from '../services/heritage-journey';
import {Link} from 'react-router-dom';
import KaPamanaGuide from './adventure/KaPamanaGuide';

export default function HeritageStamps(){
 const completedLessons=new Set(lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').map(l=>l.id));
 const questProgress=readQuestProgress();
 const stamps=deriveHeritageStamps(completedLessons.size,questProgress.totals.completed);
 const progress=readJourneyProgress();
 const chapterStatuses=heritageChapters.map(chapter=>({chapter,status:chapterStatus(chapter,progress,completedLessons,questProgress.results)}));
 const earned=chapterStatuses.filter(item=>item.status.completed).length;
 return <section className="pamana-stamps pamana9-passport" aria-label="My Heritage Passport and earned discoveries">
   <div className="pamana9-passport-header"><div><span className="pamana-eyebrow">MY OFFLINE CULTURAL DISCOVERIES</span><h2>Heritage Passport</h2>
      <p>Every locality is yours to explore. A stamp is earned only after its documented festival, linked lesson and matching Quest session.</p>
    </div><div className="pamana9-passport-total"><strong>{earned}<span>/15</span></strong><small>Town stamps earned</small></div></div>
   <KaPamanaGuide state={earned>0?'celebrate':'welcome'} compact/>
   <div className="pamana9-town-stamps">{chapterStatuses.map(({chapter,status})=><Link key={chapter.id} className={'pamana9-stamp '+(status.completed?'earned':'unearned')}
     to={'/journey?town='+chapter.id} aria-label={chapter.town+', '+(status.completed?'stamp earned':status.done+' of 3 steps completed')}>
     <span className="pamana9-stamp-art" aria-hidden="true">{status.completed?'🏅':'🧭'}</span>
     <strong>{chapter.town}</strong><small>{status.completed?'Stamp earned':status.done+'/3 discoveries'}</small>
     <span className="pamana9-stamp-action">{status.completed?'Explore again':'Continue journey'} →</span>
    </Link>)}</div>
   <p className="pamana9-passport-explain">A heritage stamp represents completed learning activities, not mastery of a living community or permission to visit protected places.</p>
   <h3 className="pamana9-bonus-title">More learning milestones</h3>
   <p className="quiet-note">These smaller milestones are based on existing saved lesson and Quest totals, not extra game currencies.</p>
   <div className="pamana-stamp-grid">{stamps.map(s=><article key={s.id} className={s.earned?'earned':'locked'} aria-label={s.title+(s.earned?', earned':', not yet earned')}>
      <span aria-hidden="true">{s.earned?s.emoji:'🔒'}</span><strong>{s.title}</strong><small>{s.requirement}</small><em>{s.earned?'Earned':'Not yet earned'}</em>
   </article>)}</div>
   <Link to="/journey" className="pamana-passport-link">Explore all hometown journeys →</Link>
 </section>;
}
