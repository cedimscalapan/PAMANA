import {Link} from 'react-router-dom';
import {IonIcon} from '@ionic/react';
import {compassOutline,mapOutline,gameControllerOutline} from 'ionicons/icons';
type Area='adventure'|'places'|'challenges';
const sections=[
 {id:'adventure',label:'Hometowns',description:'15 heritage chapters',path:'/journey',icon:compassOutline},
 {id:'places',label:'Places & Festivals',description:'Documented cultural destinations',path:'/explore',icon:mapOutline},
 {id:'challenges',label:'Mga Laro',description:'Free-play Mindoro challenges',path:'/quest',icon:gameControllerOutline}
] as const;
export default function LakbaySections({active}:{active:Area}){
 return <nav aria-label="Lakbay exploration sections" className="pamana-final-lakbay-nav">
  {sections.map(section=><Link key={section.id} to={section.path}
   aria-current={active===section.id?'page':undefined} className={active===section.id?'selected':''}>
    <IonIcon icon={section.icon} aria-hidden="true"/>
    <span><strong>{section.label}</strong><small>{section.description}</small></span>
   </Link>)}
 </nav>;
}
