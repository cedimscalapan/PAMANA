import { IonButton, IonIcon } from '@ionic/react';
import {
  arrowBackOutline, bookOutline, homeOutline, compassOutline,
  menuOutline, trophyOutline, personCircleOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import type { ReactNode } from 'react';
import {adventureTabs,tabForSection,type ExistingSection} from '../data/adventure-navigation';

type Icon = typeof homeOutline;
export type ModuleTone = 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'brown';
export type ActiveTab = ExistingSection;

type ModuleHeaderProps = {
  title: string;
  subtitle: string;
  tone?: ModuleTone;
  icon: Icon;
  onBack?: () => void;
};

export function ModuleHeader({ title, subtitle, tone = 'green', icon, onBack }: ModuleHeaderProps) {
  const history = useHistory();
  return <header className={`module-hero module-hero-${tone}`}>
    <div className="module-hero-topline">
      <IonButton fill="clear" className="module-hero-back" onClick={onBack ?? (() => history.push('/home'))} aria-label="Back to home"><IonIcon icon={arrowBackOutline} /></IonButton>
      <span>SMART PAMANA</span>
      <button className="module-hero-avatar" type="button" onClick={() => history.push('/profile')} aria-label="Open my profile"><IonIcon icon={personCircleOutline} /></button>
    </div>
    <div className="module-hero-title-row">
      <div><p className="module-hero-kicker">DISCOVER · LEARN · PRESERVE</p><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="module-hero-icon"><IonIcon icon={icon} /></div>
    </div>
  </header>;
}

const navIcons: Record<typeof adventureTabs[number]['symbol'],Icon>={home:homeOutline,compass:compassOutline,book:bookOutline,trophy:trophyOutline,menu:menuOutline};
const navItems=adventureTabs.map(tab=>({...tab,icon:navIcons[tab.symbol]}));

export function PamanaBottomNavigation({ active }: { active: ActiveTab }) {
  const history = useHistory();
  const current=tabForSection(active);
  return <nav className="app-bottom-nav" aria-label="Primary navigation">
    {navItems.map(item => <button
      key={item.id}
      type="button"
      className={current === item.id ? 'active' : ''}
      aria-current={current === item.id ? 'page' : undefined}
      onClick={() => history.push(item.path)}
    >
      <IonIcon icon={item.icon} aria-hidden="true" />
      <span>{item.label}</span>
    </button>)}
  </nav>;
}

export const AppBottomNav=PamanaBottomNavigation;
export function PageFrame({ children, active }: { children: ReactNode; active: ActiveTab }) {
  return <main className={`page-frame ${['journey','learn','explore','collection','stories','quest'].includes(active) ? 'heritage-frame' : ''}`}>{children}<PamanaBottomNavigation active={active} /></main>;
}
