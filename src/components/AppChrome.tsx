import { IonButton, IonIcon } from '@ionic/react';
import {
  arrowBackOutline, bookOutline, homeOutline, mapOutline,
  menuOutline, trophyOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import type { ReactNode } from 'react';

type Icon = typeof homeOutline;
export type ModuleTone = 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'brown';
export type ActiveTab = 'home' | 'learn' | 'writing' | 'explore' | 'quest' | 'collection' | 'stories' | 'settings';

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
      <button className="module-hero-avatar" type="button" onClick={() => history.push('/profile')} aria-label="Open my profile"><IonIcon icon={menuOutline} /></button>
    </div>
    <div className="module-hero-title-row">
      <div><p className="module-hero-kicker">DISCOVER · LEARN · PRESERVE</p><h1>{title}</h1><p>{subtitle}</p></div>
      <div className="module-hero-icon"><IonIcon icon={icon} /></div>
    </div>
  </header>;
}

type MainTab = 'home' | 'learn' | 'explore' | 'quest' | 'more';
const navItems: Array<{ id: MainTab; label: string; path: string; icon: Icon }> = [
  { id: 'home', label: 'Home', path: '/home', icon: homeOutline },
  { id: 'learn', label: 'Matuto', path: '/learn', icon: bookOutline },
  { id: 'explore', label: 'Lakbay', path: '/explore', icon: mapOutline },
  { id: 'quest', label: 'Quest', path: '/quest', icon: trophyOutline },
  { id: 'more', label: 'More', path: '/more', icon: menuOutline },
];

export function AppBottomNav({ active }: { active: ActiveTab }) {
  const history = useHistory();
  const current: MainTab = ['writing','collection','stories','settings'].includes(active) ? 'more' : active as MainTab;
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

export function PageFrame({ children, active }: { children: ReactNode; active: ActiveTab }) {
  return <main className={`page-frame ${['learn','explore','collection','stories','quest'].includes(active) ? 'heritage-frame' : ''}`}>{children}<AppBottomNav active={active} /></main>;
}
