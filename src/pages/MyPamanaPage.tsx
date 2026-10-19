import {IonContent,IonIcon,IonPage,useIonViewWillEnter} from '@ionic/react';
import {useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {albumsOutline,arrowForwardOutline,bookmarksOutline,cameraOutline,personCircleOutline,settingsOutline} from 'ionicons/icons';
import {PageFrame} from '../components/AppChrome';
import HeritageStamps from '../components/HeritageStamps';
import {useLibrary} from '../components/HeritageUI';
import {readProfile} from '../services/personalization';
import {resolveTheme} from '../data/festival-themes';

type Section='passport'|'stories'|'photos';
const sections:ReadonlyArray<{id:Section;label:string;icon:typeof albumsOutline}>=[
 {id:'passport',label:'Passport',icon:bookmarksOutline},
 {id:'stories',label:'Kuwento',icon:cameraOutline},
 {id:'photos',label:'Koleksyon',icon:albumsOutline}
];
export default function MyPamanaPage(){
 const history=useHistory();
 const [section,setSection]=useState<Section>('passport');
 const [,refresh]=useState(0);
 const {state,error}=useLibrary();
 useIonViewWillEnter(()=>refresh(value=>value+1));
 const profile=readProfile(),theme=resolveTheme(profile.themeId);
 const stories=[...state.memories].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).slice(0,3);
 const photoCount=state.media.filter(item=>item.kind==='photo').length;
 return <IonPage><IonContent fullscreen>
  <PageFrame active="my-pamana">
   <div className="pamana-final-space">
    <header className="pamana-final-space-header">
     <span className="pamana-eyebrow">MY CULTURAL MEMORIES · SAVED OFFLINE</span>
     <h1>Aking Pamana</h1>
     <p>Keep your discoveries, meaningful memories and heritage achievements in one place.</p>
     <div className="pamana-final-profile">
      <span className="pamana-final-avatar" aria-hidden="true">{theme.emoji}</span>
      <div><strong>{profile.nickname}</strong><small>{profile.hometown||'Exploring Oriental Mindoro'}</small></div>
      <button type="button" onClick={()=>history.push('/profile')}><IonIcon icon={personCircleOutline} aria-hidden="true"/> Edit profile</button>
     </div>
    </header>
    <div role="group" aria-label="My Pamana sections" className="pamana-final-space-tabs">
     {sections.map(item=><button key={item.id} type="button" aria-pressed={section===item.id}
      onClick={()=>setSection(item.id)}><IonIcon icon={item.icon} aria-hidden="true"/>{item.label}</button>)}
    </div>
    {section==='passport'&&<div className="pamana-final-space-content">
     <HeritageStamps/>
    </div>}
    {section==='stories'&&<section className="pamana-final-space-content" aria-labelledby="pamana-final-stories">
     <div className="pamana-final-space-title"><div><span className="pamana-eyebrow">PRIVATE HERITAGE STORIES</span><h2 id="pamana-final-stories">Kuwento</h2></div>
      <Link to="/stories?memory=new" className="pamana-final-primary">Write a story <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></Link></div>
     <p>Record a family story or a meaningful experience. You can add photographs, locations and dates.</p>
     {stories.length?<div className="pamana-final-story-list">{stories.map(story=><Link key={story.id}
       to={'/stories?memory='+encodeURIComponent(story.id)}><strong>{story.title}</strong><small>{story.location||'Private memory'}</small><IonIcon icon={arrowForwardOutline} aria-hidden="true"/></Link>)}</div>:
       <p className="pamana-final-space-empty">You have not saved a story yet. Start with a moment you would like to remember.</p>}
     <Link className="pamana-final-more-link" to="/stories">View all {state.memories.length} stories →</Link>
    </section>}
    {section==='photos'&&<section className="pamana-final-space-content" aria-labelledby="pamana-final-photos">
     <div className="pamana-final-space-title"><div><span className="pamana-eyebrow">PRIVATE PERSONAL PHOTOS</span><h2 id="pamana-final-photos">Koleksyon</h2></div>
      <Link className="pamana-final-primary" to="/collection?folder=all-photos">Open my photos <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></Link></div>
     <p>Your photographs can be linked to several memories without making copies. You have {photoCount} saved {photoCount===1?'photo':'photos'}.</p>
     <div className="pamana-final-shortcuts">
      <Link to="/collection?folder=all-photos"><IonIcon icon={albumsOutline} aria-hidden="true"/><span><strong>My photographs</strong><small>View, organize and manage saved photos</small></span><IonIcon icon={arrowForwardOutline} aria-hidden="true"/></Link>
      <Link to="/collection"><IonIcon icon={bookmarksOutline} aria-hidden="true"/><span><strong>Heritage reference gallery</strong><small>Browse cited cultural photographs</small></span><IonIcon icon={arrowForwardOutline} aria-hidden="true"/></Link>
     </div>
    </section>}
    <div className="pamana-final-settings-link">
     <div><IonIcon icon={settingsOutline} aria-hidden="true"/><span><strong>Settings & accessibility</strong><small>Sound, text size, offline data and backups</small></span></div>
     <Link to="/settings">Open settings <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></Link>
    </div>
    {error&&<p className="inline-status" role="alert">{error}</p>}
   </div>
  </PageFrame>
 </IonContent></IonPage>;
}
