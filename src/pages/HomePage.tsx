import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const modules = [
  ['Matuto','Learn','▣','brown','/learn'],['Sulat','Write','✎','green','/writing'],['Lakbay','Explore','⌖','blue','/explore'],
  ['Quest','Play','♜','amber','/quest'],['Kuwento','Stories','◉','purple','/stories'],['Koleksyon','Collect','▤','red','/collection']
];

export default function HomePage(){
  const history=useHistory(); const [factIndex,setFactIndex]=useState(0);
  const facts=['The word pamana means heritage—what we receive, care for, and pass on.','Oriental Mindoro is home to distinct Mangyan communities with their own languages and traditions.'];
  return <IonPage><IonContent fullscreen><main className="home"><header className="home-header"><div><p className="eyebrow">SMART PAMANA</p><h1>Magandang araw,<br/><span>Ka-Pamana!</span></h1></div><IonButton className="avatar" fill="clear" aria-label="Open settings" onClick={()=>history.push('/settings')}/></header>
    <section className="welcome"><div><p className="eyebrow" style={{color:'#e5f0e8'}}>TUKLASIN · PAGYAMANIN · IPAGPATULOY</p><h2>Your heritage journey<br/>starts here.</h2><IonButton fill="clear" color="light" onClick={()=>history.push('/explore')}>Explore today&nbsp; →</IonButton></div><div className="mini-mascot"/></section>
    <IonCard className="card"><IonCardContent><div className="section-title"><h3>Continue learning</h3><IonButton fill="clear" size="small" onClick={()=>history.push('/learn')}>See all</IonButton></div><IonButton fill="clear" expand="block" onClick={()=>history.push('/learn')}><div style={{textAlign:'left',width:'100%'}}><span className="meta">HISTORY &amp; GEOGRAPHY · 12 MIN</span><h3>Getting to know Oriental Mindoro</h3><small>Offline lesson · start anytime</small></div></IonButton></IonCardContent></IonCard>
    <section><div className="section-title"><h3>Explore Pamana</h3><IonButton fill="clear" size="small" onClick={()=>history.push('/settings')}>More</IonButton></div><div className="module-grid">{modules.map(([label,sub,icon,tone,path])=><IonButton key={label} className={`module-tile ${tone}`} fill="clear" onClick={()=>history.push(path)}><span>{icon}</span><strong>{label}</strong><small>{sub}</small></IonButton>)}</div></section>
    <IonCard className="card"><IonCardContent><div className="section-title"><div><p className="eyebrow">DAILY CULTURAL FACT</p><p>{facts[factIndex]}</p></div><IonButton fill="clear" onClick={()=>setFactIndex((factIndex+1)%facts.length)}>↻</IonButton></div></IonCardContent></IonCard>
    <nav className="bottom-nav"><IonButton className="active" fill="clear" onClick={()=>history.push('/home')}>⌂<small>Home</small></IonButton><IonButton fill="clear" onClick={()=>history.push('/learn')}>▣<small>Matuto</small></IonButton><IonButton fill="clear" onClick={()=>history.push('/explore')}>⌖<small>Lakbay</small></IonButton><IonButton fill="clear" onClick={()=>history.push('/quest')}>♜<small>Quest</small></IonButton><IonButton fill="clear" onClick={()=>history.push('/settings')}>☰<small>More</small></IonButton></nav>
  </main></IonContent></IonPage>;
}
