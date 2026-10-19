import {IonIcon} from '@ionic/react';
import {bookOutline,compassOutline,gameControllerOutline,helpCircleOutline,checkmarkCircleOutline} from 'ionicons/icons';
import kaPamana from '../../assets/reference/ka-pamana-icon.png';
export type GuideState='welcome'|'discover'|'learn'|'play'|'hint'|'celebrate';
const guide={
 welcome:{title:'Ready to explore?',text:'Your heritage journey is yours to choose. Every hometown stays open.',symbol:'🌿',icon:compassOutline},
 discover:{title:'Look closely',text:'Read the documented context before choosing what to explore next.',symbol:'🔍',icon:compassOutline},
 learn:{title:'Understand the story',text:'Try the key ideas, explore the glossary, and keep the original sources close.',symbol:'📚',icon:bookOutline},
 play:{title:'Have a go',text:'Quests are untimed. Hints and retries are here when you want them.',symbol:'✨',icon:gameControllerOutline},
 hint:{title:'Try a hint',text:'A wrong answer is another chance to inspect the explanation.',symbol:'💡',icon:helpCircleOutline},
 celebrate:{title:'A discovery saved!',text:'Keep exploring when you are ready. Your progress belongs to you.',symbol:'⭐',icon:checkmarkCircleOutline}
} as const;
export default function KaPamanaGuide({state='welcome',compact=false}:{state?:GuideState;compact?:boolean}){
 const m=guide[state];
 return <aside className={'pamana10-guide '+(compact?'compact':'')} aria-label="Ka-Pamana guide">
  <img src={kaPamana} alt="" loading="lazy"/>
  <div><span className="pamana10-kicker">KA-PAMANA SAYS <span aria-hidden="true">{m.symbol}</span></span>
  <strong>{m.title}</strong><p>{m.text}</p></div><IonIcon icon={m.icon} className="pamana10-guide-icon" aria-hidden="true"/>
 </aside>;
}
