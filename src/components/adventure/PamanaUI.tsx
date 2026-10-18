import type {ReactNode,ButtonHTMLAttributes,HTMLAttributes} from 'react';
import {IonIcon,IonModal,IonHeader,IonToolbar,IonTitle,IonContent} from '@ionic/react';
import {arrowForwardOutline,checkmarkCircleOutline,cloudOfflineOutline} from 'ionicons/icons';
import mascot from '../../assets/reference/ka-pamana-icon.png';
import AdventureScenery,{type SceneryVariant} from './AdventureScenery';
export type PamanaButtonVariant='primary'|'secondary'|'quiet';
export function PamanaButton({variant='primary',children,className='',...props}:ButtonHTMLAttributes<HTMLButtonElement>&{variant?:PamanaButtonVariant}){
 return <button type="button" {...props} className={`pamana2-button pamana2-button--${variant} ${className}`}>{children}</button>;
}
export function PamanaBadge({children,tone='mint'}:{children:ReactNode;tone?:'mint'|'sky'|'peach'|'lavender'|'gold'}){
 return <span className={`pamana2-badge pamana2-badge--${tone}`}>{children}</span>;
}
export function PamanaCard({children,className='',...props}:HTMLAttributes<HTMLElement>){
 return <article {...props} className={`pamana2-card ${className}`}>{children}</article>;
}
export function PamanaIllustratedCard({children,variant='coast',className=''}:{children:ReactNode;variant?:SceneryVariant;className?:string}){
 return <section className={`pamana2-illustrated-card ${className}`}><AdventureScenery variant={variant}/><div className="pamana2-illustrated-content">{children}</div></section>;
}
export function PamanaProgress({value,max,label}:{value:number;max:number;label:string}){
 const safeMax=Math.max(1,max),safeValue=Math.min(safeMax,Math.max(0,value));
 return <div className="pamana2-progress" role="group" aria-label={label}>
  <progress max={safeMax} value={safeValue} aria-label={label}/>
  <small>{safeValue} of {max} completed</small>
 </div>;
}
export function PamanaMascot({message,compact=false}:{message:string;compact?:boolean}){
 return <div className={`pamana2-mascot ${compact?'pamana2-mascot--compact':''}`}>
  <img src={mascot} alt="" loading="lazy"/><p><span>Ka-Pamana</span>{message}</p>
 </div>;
}
export function PamanaFeedback({children,tone='success'}:{children:ReactNode;tone?:'success'|'info'|'warning'}){
 return <div className={`pamana2-feedback pamana2-feedback--${tone}`} role="status">
  {tone==='success'&&<IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/>}{children}
 </div>;
}
export function PamanaEmptyState({title,description,action}:{title:string;description:string;action?:ReactNode}){
 return <section className="pamana2-state" role="status"><span aria-hidden="true">🧭</span><h2>{title}</h2><p>{description}</p>{action}</section>;
}
export function PamanaLoadingState({message='Preparing your offline adventure…'}:{message?:string}){
 return <div className="pamana2-loading" role="status" aria-live="polite">
  <IonIcon icon={cloudOfflineOutline} aria-hidden="true"/><span>{message}</span>
 </div>;
}
export function PamanaAdventureCard({title,description,progress,children}:{title:string;description:string;progress?:{completed:number;total:number};children:ReactNode}){
 return <PamanaCard className="pamana2-adventure-card"><div><PamanaBadge tone="gold">HERITAGE ADVENTURE</PamanaBadge>
  <h2>{title}</h2><p>{description}</p>
  {progress&&<PamanaProgress value={progress.completed} max={progress.total} label={title+' progress'}/>}</div>
  <div className="pamana2-adventure-action">{children}<IonIcon icon={arrowForwardOutline} aria-hidden="true"/></div>
 </PamanaCard>;
}

/** Controlled chip filter — clear selected and disabled states for every screen. */
export function PamanaChip({children,selected=false,onClick,disabled=false}:{children:ReactNode;selected?:boolean;onClick:()=>void;disabled?:boolean}){
 return <button type="button" className={`pamana2-chip ${selected?'selected':''}`} aria-pressed={selected} disabled={disabled} onClick={onClick}>{children}</button>;
}
/** Optional accessible dialog; Ionic handles focus containment, Escape and backdrop dismissal. */
export function PamanaDialog({open,title,children,onClose}:{open:boolean;title:string;children:ReactNode;onClose:()=>void}){
 return <IonModal isOpen={open} onDidDismiss={onClose} className="pamana2-dialog">
  <IonHeader><IonToolbar><IonTitle>{title}</IonTitle><button slot="end" type="button" className="pamana2-dialog-close" aria-label="Close dialog" onClick={onClose}>Close</button></IonToolbar></IonHeader>
  <IonContent><div className="pamana2-dialog-content">{children}</div></IonContent>
 </IonModal>;
}
