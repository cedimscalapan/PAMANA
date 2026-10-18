import {IonIcon} from '@ionic/react';
import {compassOutline,bookOutline,gameControllerOutline,albumsOutline} from 'ionicons/icons';
import {introActivities,type IntroActivity} from '../../data/onboarding-flow';
const icons:Record<IntroActivity['id'],string>={
 discover:compassOutline,learn:bookOutline,play:gameControllerOutline,preserve:albumsOutline
};
/** Compact offline-first tour; describes working modules, not future features. */
export default function AdventureIntro({compact=false}:{compact?:boolean}){
 return <div className={`pamana-welcome-activities ${compact?'compact':''}`}>
  {introActivities.map(item=><div className={`pamana-welcome-activity ${item.id}`} key={item.id}>
   <span className="pamana-welcome-activity-icon"><IonIcon icon={icons[item.id]} aria-hidden="true"/></span>
   <div><strong>{item.title}</strong><p>{item.detail}</p></div>
  </div>)}
 </div>;
}
