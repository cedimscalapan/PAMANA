import {useState} from 'react';
import {IonIcon} from '@ionic/react';
import {bookOutline,compassOutline,searchOutline,checkmarkCircleOutline,heartOutline,libraryOutline,flowerOutline} from 'ionicons/icons';
import {municipalities,isMunicipality,festivalThemes,themeForHometown,resolveTheme} from '../../data/festival-themes';
import {learningStages,type LearningStage,getReadingPlan} from '../../data/learning-levels';
import {type AvatarId} from '../../data/personalization';
import HometownScene from '../HometownScene';

const learningIcons:Record<LearningStage,string>={little:flowerOutline,young:compassOutline,researcher:bookOutline,lifelong:libraryOutline};
const learningHighlights:Record<LearningStage,string>={
 little:'A few short sections from the original source-backed lessons',
 young:'Guided reading with selected sections and key terms',
 researcher:'Complete referenced articles and reflection prompts',
 lifelong:'The complete library with optional learning challenges'
};
export function LearningStylePicker({value,onChange}:{value:LearningStage;onChange:(v:LearningStage)=>void}){
 return <div className="pamana3-learning" role="group" aria-label="Learning style. Choose any learning style at any age.">
  {learningStages.map((stage)=>{
   const count=getReadingPlan(stage.id,5,5);
   return <button type="button" key={stage.id} className={`pamana3-learning-card ${stage.id}`}
    aria-pressed={value===stage.id} onClick={()=>onChange(stage.id)}>
    <span className="pamana3-learning-icon"><IonIcon icon={learningIcons[stage.id]} aria-hidden="true"/></span>
    <span className="pamana3-learning-copy"><strong>{stage.name}</strong><small>{stage.detail}</small>
      <span className="pamana3-learning-specific">{learningHighlights[stage.id]}</span>
      <span className="pamana3-learning-footnote">{count.showReflection?'Reflection included':'Read the complete source anytime'}</span>
    </span>
    <span className="pamana3-learning-check" aria-hidden="true"><IonIcon icon={checkmarkCircleOutline}/></span>
   </button>;
  })}
 </div>;
}
export function HometownPicker({value,onChange}:{value:string;onChange:(v:string)=>void}){
 const [query,setQuery]=useState('');
 const filtered=municipalities.filter(t=>t.toLowerCase().includes(query.trim().toLowerCase()));
 return <section className="pamana3-hometown" aria-label="Choose one of the fifteen Oriental Mindoro localities">
  <div className="pamana3-hometown-search"><IonIcon icon={searchOutline} aria-hidden="true"/>
   <label className="sr-only" htmlFor="pamana-hometown-search">Search hometowns</label>
   <input id="pamana-hometown-search" type="search" placeholder="Search the 15 hometowns" value={query}
    onChange={e=>setQuery(e.target.value)} autoComplete="off" /></div>
  <button type="button" className="pamana3-no-hometown" aria-pressed={!value} onClick={()=>onChange('')}>
   <IonIcon icon={heartOutline} aria-hidden="true"/> Explore all of Oriental Mindoro (no hometown selected)
   {!value&&<IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/>}
  </button>
  {filtered.length>0?<div className="pamana3-hometown-grid" role="group" aria-label="Hometown choices">
   {filtered.map(town=>{const theme=themeForHometown(town);
    return <button type="button" key={town} aria-pressed={value===town}
      className="pamana3-hometown-card" onClick={()=>onChange(town)}>
     <HometownScene className="pamana3-hometown-art" hometown={town}/>
     <span className="pamana3-hometown-label"><strong>{town}</strong><small>{theme.name}</small></span>
     {value===town&&<IonIcon className="pamana3-hometown-selected" icon={checkmarkCircleOutline} aria-hidden="true"/>}
    </button>;
   })}
  </div>:<p className="pamana3-hometown-empty" role="status">No matching hometown. Try another spelling.</p>}
  <p className="pamana3-hometown-note">{isMunicipality(value)?`Selected: ${value}. You can still explore every other hometown.`:'Your hometown is optional. All fifteen adventures remain available.'}</p>
 </section>;
}
const avatarChoices:Array<{id:AvatarId;name:string;emoji:string}>=[
 {id:'mascot',name:'Ka-Pamana',emoji:'🌟'},{id:'leaf',name:'Leaf',emoji:'🌿'},{id:'star',name:'Star',emoji:'✨'},
 {id:'book',name:'Book',emoji:'📚'},{id:'art',name:'Art',emoji:'🎨'}
];
export function AvatarPicker({value,onChange}:{value:AvatarId;onChange:(v:AvatarId)=>void}){
 return <div className="pamana3-avatars" role="group" aria-label="Choose a private profile avatar">
  {avatarChoices.map(a=><button type="button" className="pamana3-avatar" key={a.id} aria-pressed={value===a.id} onClick={()=>onChange(a.id)}>
   <span aria-hidden="true">{a.emoji}</span><strong>{a.name}</strong>
  </button>)}
 </div>;
}
export function FestivalPalettePicker({value,hometown,onChange}:{value:string;hometown:string;onChange:(id:string)=>void}){
 const [all,setAll]=useState(false);
 const recommended=themeForHometown(hometown);
 const chosen=resolveTheme(value);
 const shortlist=festivalThemes.filter(t=>t.id==='heritage'||t.id===chosen.id||t.municipality===hometown);
 const choices=all?festivalThemes:shortlist;
 return <section className="pamana3-palette">
  <div className="pamana3-palette-intro">
   <div><strong>Gentle festival color accents</strong><p>Suggested for your hometown: {recommended.name}. Colors are decorative, not official festival branding.</p></div>
   <button type="button" onClick={()=>setAll(v=>!v)} aria-expanded={all} aria-controls="pamana-festival-choices">
     {all?'Show suggested':'Browse all themes'}
   </button>
  </div>
  <div className="pamana3-palette-grid" id="pamana-festival-choices" role="group" aria-label="Festival-inspired color palette">
   {choices.map(t=><button type="button" key={t.id} aria-pressed={value===t.id} className="pamana3-palette-card" onClick={()=>onChange(t.id)}>
    <span className="pamana3-palette-swatches" aria-hidden="true"><i style={{background:t.primary}}/><i style={{background:t.accent}}/><i style={{background:t.canvas}}/></span>
    <span className="pamana3-palette-label"><strong>{t.name}</strong><small>{t.municipality||'Classic heritage'}</small></span>
    {value===t.id&&<IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/>}
   </button>)}
  </div>
 </section>;
}
